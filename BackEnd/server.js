//jshint esversion:6

const express = require("express");
const authRoute = require("./Routes/auth");
const postRoute = require("./Routes/posts");
const userRoute = require("./Routes/users");
const cors = require("cors");
var cookieParser = require('cookie-parser')
const mongoose=require("mongoose");
const multer = require("multer");
const path = require("path");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/socialmediadb",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");    
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
// app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
app.use("/api/users",userRoute);


app.listen(8000,function(){
    console.log("Server started on port 8000");
});