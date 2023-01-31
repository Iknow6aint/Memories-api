import mongoose from 'mongoose'
import PostMessage from "../models/postMessage.js"


export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();

        res.status(200).json(postMessage)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        console.log(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body
    if (!mongoose.Type.ObjectId.isValid(_id))
        return res.status(404).send("no Post with this Id")


    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost)
    console.log(updatedPost);

}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Type.ObjectId.isValid(id))
        return res.status(404).send('No post has this id')

    await postMessage.findByIdAndRemove(id)
    req.json({ message: "Post deleted" })
}


export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthorized' })

    if (!mongoose.Type.ObjectId.isValid(id))
        return res.status(404).send('No post with id ')

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
        //like post 
        post.likes.push(req.userId)
    } else {
        //dislike post 
        post.likes = post.likes.filter((id) => id === String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost)
}