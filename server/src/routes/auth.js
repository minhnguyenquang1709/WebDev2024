const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../schemas/User");

const router = express.Router();
const secret_key = "170904";

router.use(express.json());
router.use(cookieParser());

const createJWT = (payload) => {
  let token = null;
  try {
    token = jwt.sign(payload, secret_key, { expiresIn: "1h" });
  } catch (e) {
    console.log(e);
  }
  return token;
};

const verifyJWT = (token) => {
  let key = secret_key;
  let data = null;
  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (e) {
    console.log(e);
  }

  return data;
};

// middleware to authenticate jwt from cookies
const authJWT = async (req, res, next) => {
  const cookieString = req.headers.cookie;
  // console.log("cookies: ", cookieString);
  const token = cookieString.split("=")[1];
  // console.log(token);

  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }

  try {
    const decoded = jwt.verify(token, secret_key); // return the payload
    // decoded = { username: 'something', iat: 1728470309, exp: 1728473909 }

    const acc = await User.findOne({ username: decoded.username });
    req.userId = acc._id;
    next();
  } catch (e) {
    return res.status(403).send("Invalid token");
  }
};

// login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`req.body: ${req.body}`);
  try {
    const accounts = await User.find({ username: username });
    if (accounts.length > 0) console.log(accounts);

    if (
      accounts &&
      username === accounts[0].username &&
      password === accounts[0].password
    ) {
      const token = createJWT({ username: username });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });

      return res.status(200).send("Login successful, token stored in cookie");
    } else {
      return res.status(401).send("Invalid credentials");
    }
  } catch (e) {
    console.log(e.message);
  }
});

// logout route
router.post("/logout", async (req, res) => {
  res.clearCookie("token");
});

module.exports = { router, authJWT, createJWT, verifyJWT };
