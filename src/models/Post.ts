import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags: [{
        type: String,
    }],
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
}, { timestamps: true });

const Post = models.Post || model("Post", PostSchema);

export default Post;
