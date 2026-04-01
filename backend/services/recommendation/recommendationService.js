// services/recommendation/recommendationService.js

import { findSimilarBlogs } from './similaritySearch.js';

/**
 * FRESHNESS DECAY
 * Newer blogs get higher freshness score
 * Formula: e^(-0.0077 * days_old)
 * Half-life = 90 days (blog loses half its freshness boost after 90 days)
 */
function calculateFreshness(createdAt) {
  const now = new Date();
  const blogDate = new Date(createdAt);

  // how many days old is this blog
  const daysOld = Math.floor((now - blogDate) / (1000 * 60 * 60 * 24));

  // exponential decay formula
  // λ = 0.0077 gives half-life of ~90 days
  return Math.exp(-0.0077 * daysOld);
}

/**
 * FINAL SCORE
 * Combines similarity and freshness into one score
 * Weights: 70% similarity, 30% freshness
 * You can tune these weights later
 */
function calculateFinalScore(similarityScore, freshnessScore) {
  const SIMILARITY_WEIGHT = 0.7;
  const FRESHNESS_WEIGHT = 0.3;

  return (SIMILARITY_WEIGHT * similarityScore) +
    (FRESHNESS_WEIGHT * freshnessScore);
}

/**
 * COSINE SIMILARITY between two vectors
 * Used by MMR to measure how similar two result blogs are to each other
 * Returns a number between 0 (different) and 1 (identical)
 */
function cosineSimilarity(vectorA, vectorB) {
  // dot product of two vectors
  const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);

  // magnitude of each vector
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));

  // avoid division by zero
  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * MMR — MAXIMAL MARGINAL RELEVANCE
 * Picks results that are relevant to source BUT diverse from each other
 *
 * @param {Array} candidates      - blogs returned by similarity search (with embeddings)
 * @param {number} topK           - how many to return
 * @param {number} lambda         - 0 = max diversity, 1 = max relevance, 0.7 = balanced
 */
function applyMMR(candidates, topK, lambda = 0.7) {
  // nothing to process
  if (candidates.length === 0) return [];

  const selected = [];      // final picked results
  const remaining = [...candidates];   // blogs not yet picked

  while (selected.length < topK && remaining.length > 0) {
    let bestScore = -Infinity;
    let bestIndex = 0;

    remaining.forEach((candidate, index) => {
      // relevance — how similar to source blog
      const relevance = candidate.similarityScore;

      // redundancy — how similar to already selected blogs
      // if nothing selected yet, redundancy is 0
      let redundancy = 0;
      if (selected.length > 0) {
        redundancy = Math.max(
          ...selected.map(s =>
            cosineSimilarity(candidate.embedding, s.embedding)
          )
        );
      }

      // MMR formula
      const mmrScore = lambda * relevance - (1 - lambda) * redundancy;

      if (mmrScore > bestScore) {
        bestScore = mmrScore;
        bestIndex = index;
      }
    });

    // pick the best candidate and move it to selected
    selected.push(remaining[bestIndex]);
    remaining.splice(bestIndex, 1);
  }

  return selected;
}

/**
 * MAIN FUNCTION — getRecommendations
 * This is what your controller will call
 *
 * Flow:
 * 1. Get raw similar blogs from HNSW index
 * 2. Apply freshness + final scoring
 * 3. Apply MMR for diversity
 * 4. Return clean final list without embedding arrays
 *
 * @param {Object} sourceBlog   - the blog to get recommendations for
 * @param {number} topK         - how many recommendations to return
 */
export async function getRecommendations(sourceBlog, topK = 5) {

  // Step 1: get more candidates than we need
  // we fetch topK * 3 so MMR has enough to pick from
  // if we only fetch 5 and MMR needs to diversify, it has no room
  const candidates = await findSimilarBlogs(sourceBlog, topK * 3);

  if (candidates.length === 0) {
    return [];
  }

  // Step 2: add freshness score and final score to each candidate
  const scoredCandidates = candidates.map(blog => ({
    ...blog,
    freshnessScore: calculateFreshness(blog.createdAt),
    finalScore: calculateFinalScore(
      blog.similarityScore,
      calculateFreshness(blog.createdAt)
    ),
  }));

  // Step 3: apply MMR for diversity
  // MMR needs embedding arrays to compare blogs to each other
  // but our $project removed embeddings — we need to fetch them back
  // we handle this by fetching with embeddings in similaritySearch
  // for MMR, then stripping them before returning to user
  const diverseResults = applyMMR(scoredCandidates, topK, 0.7);

  // Step 4: sort by finalScore and clean up the response
  // remove embedding array — frontend doesn't need 384 numbers
  const finalResults = diverseResults
    .sort((a, b) => b.finalScore - a.finalScore)
    .map(({ embedding, ...blog }) => blog);  // remove embedding field

  return finalResults;
}