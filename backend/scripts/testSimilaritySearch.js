// // scripts/testSimilaritySearch.js

// import mongoose from 'mongoose';
// import { Blogs } from '../model/blog.model.js';
// import { findSimilarBlogs } from '../services/recommendation/similaritySearch.js';
// import 'dotenv/config';

// // connect to MongoDB
// await mongoose.connect(process.env.MONGO_URI);

// // fetch any one blog that has an embedding
// // fetch a blog with real content instead
// const sourceBlog = await Blogs.findOne({
//   title: "Microservices with Docker"
// });

// console.log('Searching similar blogs for:', sourceBlog.title);
// console.log('---');

// const results = await findSimilarBlogs(sourceBlog, 5);

// results.forEach((blog, index) => {
//   console.log(`${index + 1}. ${blog.title}`);
//   console.log(`   Score: ${blog.similarityScore.toFixed(4)}`);
//   console.log(`   Category: ${blog.category}`);
//   console.log('---');
// });

// await mongoose.disconnect();

// scripts/testSimilaritySearch.js

import mongoose from 'mongoose';
import { Blogs } from '../model/blog.model.js';
import { getRecommendations } from '../services/recommendation/recommendationService.js';
import 'dotenv/config';

await mongoose.connect(process.env.MONGO_URI);

const sourceBlog = await Blogs.findOne({ title: 'Microservices with Docker' });

console.log('Getting recommendations for:', sourceBlog.title);
console.log('---');

const results = await getRecommendations(sourceBlog, 5);

results.forEach((blog, index) => {
  console.log(`${index + 1}. ${blog.title}`);
  console.log(`   Category     : ${blog.category}`);
  console.log(`   Similarity   : ${blog.similarityScore?.toFixed(4)}`);
  console.log(`   Freshness    : ${blog.freshnessScore?.toFixed(4)}`);
  console.log(`   Final Score  : ${blog.finalScore?.toFixed(4)}`);
  console.log('---');
});

await mongoose.disconnect();