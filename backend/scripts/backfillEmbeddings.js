// scripts/backfillEmbeddings.js

import mongoose from 'mongoose';
import { Blogs } from '../model/blog.model.js';
import { generateEmbedding } from '../services/embeddings/embeddingService.js';
import 'dotenv/config';

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to MongoDB');

// find all blogs that do NOT have an embedding yet
const blogs = await Blogs.find({
  embedding: { $exists: false }
});

console.log(`Found ${blogs.length} blogs without embeddings`);
console.log('Starting backfill...');
console.log('---');

let success = 0;
let failed = 0;

for (const blog of blogs) {
  try {
    // generate embedding for this blog
    const { vector, model } = await generateEmbedding(blog);

    // save it back to MongoDB
    await Blogs.findByIdAndUpdate(blog._id, {
      $set: {
        embedding: vector,
        embeddingModel: model,
        embeddingUpdatedAt: new Date(),
      },
    });

    success++;
    console.log(`✅ ${success}/${blogs.length} - ${blog.title}`);

  } catch (error) {
    failed++;
    console.log(`❌ Failed - ${blog.title} - ${error.message}`);
  }
}

console.log('---');
console.log(`Backfill complete. Success: ${success}, Failed: ${failed}`);

await mongoose.disconnect();