
import { pipeline } from '@xenova/transformers';

const EMBEDDING_MODEL = 'Xenova/all-MiniLM-L6-v2';

// Load the model once and reuse — loading is slow, inference is fast
let embedder = null;

async function getEmbedder() {
  if (!embedder) {
    // First call downloads the model (~25MB), subsequent calls reuse it
    embedder = await pipeline('feature-extraction', EMBEDDING_MODEL);
  }
  return embedder;
}


export function buildEmbeddingInput(blog) {
  const parts = [
    blog.title,
    blog.excerpt || blog.content?.slice(0, 300), // use excerpt if available
    blog.tags?.join(' '),
    blog.category,
  ];

  return parts
    .filter(Boolean)
    .join(' | ')
    .trim()
    .slice(0, 2000);
}

/*
 */
export async function generateEmbedding(blog) {
  const inputText = buildEmbeddingInput(blog);

  // Safety check — don't call OpenAI with empty text
  if (!inputText) {
    throw new Error(`Blog ${blog._id} has no embeddable content`);
  }

  const embed = await getEmbedder();

  // mean_pooling: converts token-level vectors into one sentence vector
  const output = await embed(inputText, { pooling: 'mean', normalize: true });

  return {
    vector: Array.from(output.data),   // Float32Array → regular JS array
    model: EMBEDDING_MODEL,
  };
}
