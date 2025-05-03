const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    console.log("Registration request received:", req.body);
    const { username, email, password } = req.body;
    
    // Log the exact query being used
    console.log("Checking for existing username with query:", { username });
    const usernameCheck = await User.findOne({ username });
    console.log("Username check result:", usernameCheck ? "Found" : "Not found");
    
    if (usernameCheck) {
      console.log("Username already exists:", username);
      return res.json({ msg: "Username already used", status: false });
    }
    
    console.log("Checking for existing email with query:", { email });
    const emailCheck = await User.findOne({ email });
    console.log("Email check result:", emailCheck ? "Found" : "Not found");
    
    if (emailCheck) {
      console.log("Email already exists:", email);
      return res.json({ msg: "Email already used", status: false });
    }
    
    console.log("Creating new user with data:", { username, email });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    
    console.log("User created successfully:", {
      id: user._id,
      username: user.username,
      email: user.email
    });
    
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    console.error("Registration error:", ex);
    // Send more detailed error information
    return res.status(500).json({ 
      msg: "Registration failed", 
      error: ex.message,
      status: false 
    });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
