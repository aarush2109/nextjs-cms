import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // Optional to allow Google OAuth logins
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);

export default User;
