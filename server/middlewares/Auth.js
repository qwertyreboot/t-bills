const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "please sign in to proceed" });
  }

  const token = authorization.replace("Bearer ", "").trim();
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Fail to authenticate" });
    }

    req.user = user;
    next();
  });
};

const ownerOnly = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res.status(403).json({ message: "Not Permitted" });
  }

  next();
};

module.exports = { verifyJwt, ownerOnly };
