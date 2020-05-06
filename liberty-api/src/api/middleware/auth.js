const jwt = require("jsonwebtoken");

exports.isAuthorized = () => async (req, res, next) => {
  //get the token from the header if present
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");
  // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjgyNzA3NjEsImlhdCI6MTU2NTY3ODc2MSwiaWQiOiI1ZDQ4MTY3YWE2MjdmZTQwZjU1N2ZjZjYifQ.NnvH9g_-vwb1l25Mf0dcItV-RzS8SK3tgA_Trwhtz5c
  try {
    //if can verify the token, set req.user and pass to next middleware
    token = token.replace("Bearer ", "");
    const decoded = jwt.decode(token, "config.secret");
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(401).send("Invalid token.");
  }
};
