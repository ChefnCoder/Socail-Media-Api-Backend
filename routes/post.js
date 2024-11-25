const express = require("express");
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const router = express.Router();

// Create a Post
router.post("/posts", auth, async (req, res) => {
    const { text, media } = req.body;

    try {
        const post = new Post({
            text,
            media,
            user: req.user, 
        });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get All Posts
router.get("/posts", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const posts = await Post.find()
            .populate("user", "name email") 
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit) 
            .limit(Number(limit)); 

        const totalPosts = await Post.countDocuments(); 
        const totalPages = Math.ceil(totalPosts / limit); 

        res.json({
            totalPosts,
            totalPages,
            currentPage: Number(page),
            posts,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// Add a Comment
router.post("/comments", auth, async (req, res) => {
    const { text, postId } = req.body;

    try {
        // Validate postId
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Create the comment
        const comment = new Comment({
            text,
            user: req.user, 
            post: postId,   
        });

        // Save the comment to the database
        await comment.save();

        // Emit a WebSocket notification for new comment
        req.io.emit("newComment", { 
            postId, 
            text, 
            user: req.user, 
        });

        console.log("Notification sent for new comment:", { postId, text });

        res.status(201).json(comment);
    } catch (err) {
        console.error("Error Creating Comment:", err.message); 
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
