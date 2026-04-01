// scripts/testSimilaritySearch.js

import mongoose from 'mongoose';
import { Blogs } from '../model/blog.model.js';
import { findSimilarBlogs } from '../services/recommendation/similaritySearch.js';
import 'dotenv/config';

// connect to MongoDB
await mongoose.connect(process.env.MONGO_URI);

// fetch any one blog that has an embedding
// fetch a blog with real content instead
const sourceBlog = await Blogs.findOne({
  title: "Microservices with Docker"
});

console.log('Searching similar blogs for:', sourceBlog.title);
console.log('---');

const results = await findSimilarBlogs(sourceBlog, 5);

results.forEach((blog, index) => {
  console.log(`${index + 1}. ${blog.title}`);
  console.log(`   Score: ${blog.similarityScore.toFixed(4)}`);
  console.log(`   Category: ${blog.category}`);
  console.log('---');
});

await mongoose.disconnect();