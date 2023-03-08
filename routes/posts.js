import express, { Router } from 'express'
import { getPosts, createPost, updatePost, deletePost, likePost, getPostBySearch, getPost, commentPost } from '../controllers/posts.js'
import auth from '../middleware/auth.js';

const postRouter = express.Router()

postRouter.get('/search', getPostBySearch);
postRouter.get('/', getPosts);
postRouter.get('/:id', getPost);
postRouter.post('/', auth, createPost);
postRouter.patch('/:id', auth, updatePost);
postRouter.delete("/:id", auth, deletePost);
postRouter.patch('/:id/likepost', auth, likePost);
postRouter.patch('/:id/commentPost', auth, commentPost);


export default postRouter;