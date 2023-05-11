import Post from '../models/postModel.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('admin_id');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get posts' });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { admin_id, image, title, description } = req.body;

  try {
    const post = await Post.create({ admin_id, image, title, description });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get post by ID
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate('admin_id');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get post' });
  }
};

// Update post
export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { image, title, description } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { image, title, description },
      { new: true }
    ).populate('admin_id');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
