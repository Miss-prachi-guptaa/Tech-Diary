// routes/search.routes.js

import express from 'express';
import { searchBlogs, searchSuggestions } from '../controller/search.controller.js';

const router = express.Router();

// GET /api/search/suggestions?q=docker  ← must be above /:id routes
router.get('/suggestions', searchSuggestions);

// GET /api/search?q=docker
router.get('/', searchBlogs);

export const searchrouter = router;