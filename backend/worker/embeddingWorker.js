// workers/embeddingWorker.js
import path from 'path';
import { Worker } from 'bullmq';
import mongoose from 'mongoose';
import redisConnection from '../config/redis.js';
import { generateEmbedding } from '../services/embeddings/embeddingService.js';
import { Blogs } from '../model/blog.model.js';
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), ".env")
});

const QUEUE_NAME = 'embedding-queue'; // must match embeddingQueue.js

// Connect worker to MongoDB
// Worker is a separate process so it needs its own DB connection
console.log("ENV:", process.env.MONGO_URI);
await mongoose.connect(process.env.MONGO_URI);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log('Worker connected to MongoDB');

/**
 * This function runs every time a job is picked from the queue.
 * BullMQ calls it automatically — you don't call it yourself.
 *
 * job.data contains whatever you passed in addEmbeddingJob()
 * In our case: { blogId: '64abc...' }
 */
async function processEmbeddingJob(job) {
  const { blogId } = job.data;
  console.log(`Processing embedding for blog: ${blogId}`);

  // Step 1: fetch the blog from MongoDB
  const blog = await Blogs.findById(blogId);

  if (!blog) {
    // Job will be marked as failed — don't throw for "not found"
    // because retrying won't help if the blog doesn't exist
    console.warn(`Blog not found: ${blogId}, skipping`);
    return;
  }

  // Step 2: generate the embedding
  // THIS is where the blog object comes from — answers your earlier question!
  const { vector, model } = await generateEmbedding(blog);

  // Step 3: save the vector back to the blog document
  await Blogs.findByIdAndUpdate(blogId, {
    $set: {
      embedding: vector,
      embeddingModel: model,
      embeddingUpdatedAt: new Date(),
    },
  });

  console.log(`Embedding saved for blog: ${blogId}, dimensions: ${vector.length}`);
}

// Create the worker — it starts listening immediately
const worker = new Worker(QUEUE_NAME, processEmbeddingJob, {
  connection: redisConnection,
  concurrency: 2, // process 2 blogs at the same time — safe for most machines
});

// Event listeners — important for knowing what's happening
worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, error) => {
  console.error(`Job ${job.id} failed:`, error.message);
});

worker.on('error', (error) => {
  console.error('Worker error:', error.message);
});

console.log('Embedding worker started, waiting for jobs...');