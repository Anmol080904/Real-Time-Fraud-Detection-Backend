const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { jwtSecret, jwtExpire } = require("../config/jwt");

exports.register = async (req, res, next) => {
  try {
    const { username, firstname, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, firstname, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpire });
    res.json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};
