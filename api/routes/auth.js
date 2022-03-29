const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (password.length < 6) {
    return res.send({message:"Password too small" });
  }

  try {
    let user1 = await User.findOne({
      email,
    });
    if (user1) {
      return res.send({message:"Same email"});
    }

    let user2 = await User.findOne({
      username,
    });
    if(user2){
        return res.send({message:"Same username"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const user_ = await newUser.save();
    res.status(200).json(user_);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) {
      return res.send({message:"Email not"});
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.send({message:"Wrong p"});
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;