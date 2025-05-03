const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController");
const User = require("../models/userModel");
const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.get("/debug/users", async (req, res) => {
  try {
    const users = await User.find({});
    console.log("All users in database:", users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.get("/debug/check-username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    console.log("Checking username:", username);
    const user = await User.findOne({ username });
    console.log("User found:", user ? "Yes" : "No");
    res.json({ exists: !!user, user });
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ error: "Error checking username" });
  }
});

module.exports = router;
