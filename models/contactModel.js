const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type: String,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        require: [true, "please enter name"]
    },
    email:{
        type: String,
        required: [true, "please enter email"]
    },
    phone:{
        type: String,
        require: [true, "please enter phone number"]
    }
},
{ timestamps: true});

module.exports = mongoose.model("Contact", contactSchema);