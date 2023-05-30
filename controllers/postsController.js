import Post from "../models/postsModel.js";

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };
    const posts = await Post.paginate({}, options);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const {
    admin_id,
    title,
    description,
    image,
  } = req.body;

  const post = new Post({
    admin_id,
    title,
    description,
    image,
  });

  try {

    const newPost = await post.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get post by ID
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate("admin_id");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to get post" });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.PostId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    post.admin_id = req.body.admin_id || post.admin_id;
    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    
    if (req.file) {
      post.image = "/uploads/" + req.file.filename;
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
