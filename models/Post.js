const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    text: { type: String, required: true },
    media: { type: String, default: null }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
