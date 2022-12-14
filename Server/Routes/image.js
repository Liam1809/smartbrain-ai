import express from 'express';

// import controller & middleware
import { handleImageURL } from '../Controllers/imageURL.js';
import { auth } from '../Middlewares/auth.js';

// create router
const router = express.Router();

router.post('/', auth, handleImageURL);

export default router;
