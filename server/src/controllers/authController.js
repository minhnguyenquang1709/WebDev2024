const jwt = require("jsonwebtoken");
const User = require("../schemas/User");
const accConstants = require("../constants/account");
const secret_key = process.env.SECRET_KEY;

const createJWT = (payload, key) => {
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: "1h" });
  } catch (e) {
    console.log(e);
  }
  return token;
};

const verifyJWT = (token, key) => {
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

// middleware to check account info
const checkAccInfo = (req, res, next) => {
  const { email, username, password } = req.body;
  if (
    email.length < accConstants.MIN_EMAIL_LENGTH ||
    username.length < accConstants.MIN_USERNAME_LENGTH ||
    password.length < accConstants.MIN_PASSWORD_LENGTH
  ) {
    console.log("Invalid account info");
    return res.status(400).send("Invalid account info");
  } else {
    next();
  }
};

// login handler
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(`username: ${username}`);
  try {
    const accounts = await User.find({ username: username });
    // console.log(`accounts.length: ${accounts.length}`);
    if (accounts.length <= 0) {
      return res.status(400).send("Username or password is wrong");
    }

    if (
      accounts &&
      username === accounts[0].username &&
      password === accounts[0].password
    ) {
      const token = createJWT({ username: username }, secret_key);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000,
      });

      return res.status(200).send("Login successful, token stored in cookie");
    } else {
      return res.status(401).send("Invalid credentials");
    }
  } catch (e) {
    console.log(e);
  }
};

// register handler
const register = async (req, res) => {
  const { email, username, password } = req.body;
  let users = null;
  try {
    users = await User.find({ username: username });
    // console.log(`users: ${users.length}`);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Cannot check existing account");
  }

  if (users && users.length > 0) {
    console.log("Username already registrated");
    res.status(400).send("Username already registrated");
    return;
  } else {
    try {
      const account = await User.create({
        email: email,
        username: username,
        password: password,
        profileName: `N ${Date.now()}`,
      });
      await account.save();
      console.log("Account registrated");
    } catch (e) {
      console.log(e);
      return res.status(500).send("Cannot create new account in database");
    }
    const token = createJWT({ username: username }, secret_key);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    return res
      .status(201)
      .send("Registration successful, token stored in cookie");
  }
};

// logout handler
const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Deleted user token from cookie");
};

module.exports = {
  login,
  register,
  logout,
  checkAccInfo,
  authJWT,
  verifyJWT,
  createJWT,
};
