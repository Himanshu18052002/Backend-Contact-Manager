const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter username"]
    },
    email: {
        type: String,
        required: [true, "please add email"],
        unique: [true, "Email already taken"]
    },
    password: {
        type: String,
        required: [true, "please add a strong password"]
    }
}, { timestamps: true});

module.exports = mongoose.model("User", userSchema);