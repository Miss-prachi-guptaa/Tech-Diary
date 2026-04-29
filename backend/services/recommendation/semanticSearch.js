

import { Blogs } from '../../model/blog.model.js';
import { generateEmbeddingFromText } from '../embeddings/embeddingService.js';

/**
 * SEMANTIC SEARCH
 * Takes a text query from user → converts to vector → searches HNSW index
 * Returns blogs that are semantically similar to the query
 * 
 * Example:
 * query: "how to use containers in deployment"
 * returns: blogs about Docker, Kubernetes, microservices
 * even if they don't contain the exact words "containers" or "deployment"
 * 
 * This is the power of semantic search over keyword search
 */
export async function semanticSearch(queryText, limit = 10) {

  // Step 1: convert user's text to a vector
  const { vector } = await generateEmbeddingFromText(queryText);

  // Step 2: search HNSW index with that vector
  const pipeline = [
    {
      $vectorSearch: {
        index: 'blog_vector_index',
        path: 'embedding',
        queryVector: vector,
        numCandidates: limit * 10,
        limit,
      },
    },
    {
      $addFields: {
        similarityScore: { $meta: 'vectorSearchScore' },
      },
    },
    {
      // only return published blogs
      $match: {
        status: { $eq: 'PUBLISHED' },
      },
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
        image: 1,
        createdAt: 1,
        similarityScore: 1,
      },
    },
  ];

  const results = await Blogs.aggregate(pipeline);
  return results;
}

/**
 * SUGGESTIONS
 * Same as semanticSearch but returns fewer results
 * and only title + id — just enough for dropdown
 * 
 * Called on every keystroke — must be fast and lightweight
 */
export async function getSearchSuggestions(queryText, limit = 5) {

  // don't search if query is too short
  // avoids unnecessary API calls while user is still typing
  if (queryText.trim().length < 2) {
    return [];
  }

  const { vector } = await generateEmbeddingFromText(queryText);

  const pipeline = [
    {
      $vectorSearch: {
        index: 'blog_vector_index',
        path: 'embedding',
        queryVector: vector,
        numCandidates: 50,
        limit,
      },
    },
    {
      $addFields: {
        similarityScore: { $meta: 'vectorSearchScore' },
      },
    },
    {
      $match: {
        status: { $eq: 'PUBLISHED' },
        // only return results with decent similarity
        // avoids showing completely unrelated suggestions
        similarityScore: { $gte: 0.3 },
      },
    },
    {
      // lightweight response — only what dropdown needs
      $project: {
        title: 1,
        category: 1,
        slug: 1,
        similarityScore: 1,
      },
    },
  ];

  const results = await Blogs.aggregate(pipeline);
  return results;
}