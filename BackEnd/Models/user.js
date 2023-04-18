const mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true,
        
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePicture: {
        type: String,
        default: "",
    },
    desc: {
        type: String,
        max: 50,
    },
    searchUser:{
        type: String,
        max: 10
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
}, { timestamps: true }
);
module.exports = mongoose.model("user",userSchema);