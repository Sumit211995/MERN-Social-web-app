const User = require("../Models/user");
const Post = require("../Models/postModel");
const router = require("express").Router();

//get a user
router.get("/", async (req, res) => {
  const id = req.query.id ? req.query.id : "";
  const firstName = req.query.firstName ? req.query.firstName : "";
  console.log('id==',req.query.id);
  try {
    const user = id
    ? await User.findById({ _id: id }) 
    : await User.findOne({ firstName: firstName });
    console.log('user---',user);
    // const { password, ...other } = user._doc;  
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search multiple users
router.get("/search", async (req, res) => {
  // const id = req.query.id ? req.query.id : "";
  const firstName = req.query.searchUser ? req.query.searchUser : "";
  try {
    const user = await User.find({ firstName: firstName });  
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  const loggedInUserID = req.cookies.loggedIn_user_id;
  if (loggedInUserID !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(loggedInUserID);
      if (!user.followers.includes(loggedInUserID)) {
        await user.updateOne({ $push: { followers: loggedInUserID } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
}); 
module.exports = router;
