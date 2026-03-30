// services/embedding/embeddingQueue.js

import { Queue } from 'bullmq';
import redisConnection from '../../config/redis.js';

// Give the queue a name — worker must use the exact same name
const QUEUE_NAME = 'embedding-queue';

// Create the queue instance
const embeddingQueue = new Queue(QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,           // retry failed jobs up to 3 times
    backoff: {
      type: 'exponential', // wait longer between each retry
      delay: 2000,         // start with 2 seconds, then 4s, then 8s
    },
    removeOnComplete: 100, // keep last 100 completed jobs for debugging
    removeOnFail: 500,     // keep last 500 failed jobs to inspect errors
  },
});

/**
 * Adds a blog embedding job to the queue.
 * Called from your blog controller after saving a blog.
 *
 * @param {string} blogId - the MongoDB _id of the blog
 */
export async function addEmbeddingJob(blogId) {
  const job = await embeddingQueue.add(
    'generate-embedding',  // job name — just a label for clarity
    { blogId },            // job data — this is what the worker receives
  );

  console.log(`Embedding job added for blog: ${blogId}, jobId: ${job.id}`);
  return job;
}

export default embeddingQueue;