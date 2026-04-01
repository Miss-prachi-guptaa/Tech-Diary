// services/recommendation/similaritySearch.js

import { generateEmbedding } from '../embeddings/embeddingService.js';
import { Blogs } from '../../model/blog.model.js';

/**
 * WHAT THIS FUNCTION DOES:
 * Takes a blog document → generates its vector → searches Atlas HNSW index
 * → returns the most similar blogs from the entire collection
 *
 * @param {Object} sourceBlog   - the blog you want to find similar blogs for
 * @param {number} limit        - how many similar blogs to return (default 10)
 * @returns {Array}             - array of similar blog documents with scores
 */
export async function findSimilarBlogs(sourceBlog, limit = 10) {

  // Step 1: Generate vector for the source blog
  // We need to convert it to numbers before we can search
  const { vector } = await generateEmbedding(sourceBlog);

  // Step 2: Build the aggregation pipeline
  const pipeline = [
    {
      // $vectorSearch is the stage that talks to your HNSW index
      $vectorSearch: {
        index: 'blog_vector_index',   // must match exact name in Atlas
        path: 'embedding',            // field in your document that has vectors
        queryVector: vector,          // the vector we just generated
        numCandidates: limit * 10,    // cast wide net first for accuracy
        limit: limit + 1,             // +1 because source blog itself may appear
        // filter: {
        //   // only search among published blogs
        //   // this uses the filter field we declared in the index
        //   status: { $eq: 'PUBLISHED' },
        // },
      },
    },

    {
      // $addFields adds new fields to each result document
      // vectorSearchScore is the similarity score Atlas gives each result
      // 1.0 = identical, 0.0 = completely different
      $addFields: {
        similarityScore: { $meta: 'vectorSearchScore' },
      },
    },

    {
      // $match filters AFTER the vector search
      // removes the source blog itself from results
      // (a blog is always most similar to itself — we don't want that)
      $match: {
        _id: { $ne: sourceBlog._id },
        category: { $exists: true },   // ← only blogs with category
      },
    },

    {
      // $limit ensures we return exactly what was requested
      // after removing the source blog
      $limit: limit,
    },

    {
      $project: {
        title: 1,
        content: 1,
        slug: 1,
        tags: 1,
        category: 1,
        status: 1,
        author: 1,
        createdAt: 1,
        similarityScore: 1,
        embedding: 1,

        // _id is included by default, that's fine
      },
    },
  ];

  // Step 3: Run the pipeline against your blogs collection
  const results = await Blogs.aggregate(pipeline);

  return results;
}
// ```

// ---

// ## Before testing — check your status field value

// Look at your Atlas documents. Your blogs have:
// ```
// status: "DRAFT"