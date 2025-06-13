import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      res.status(400).json({ error: "passwords do not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({ error: "username already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // avatar placeholder
    const firstLast = fullName.split(" ");

    const profilePic = `https://avatar.iran.liara.run/username?username=${firstLast[0]}+${firstLast[1]}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "User data invalid" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "internal sever error user not saved" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPassword = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPassword) {
      res.status(400).json({ error: "Invalid username or password" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "internal sever error user not logged in" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Logged out succesfully");
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "internal sever error" });
  }
};
