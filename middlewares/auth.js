const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  checkLoggedIn,
};

// JWT überprüfen
// Brauchen wir den Secret
function checkLoggedIn(req, res, next) {
  const jwt = req.headers.authorization;

  jsonwebtoken.verify(jwt, process.env.SIGNATURE, (error, decodedToken) => {
    error
      ? res
          .status(401) // 401 Unauthorized Status Code
          .json({ message: "Authorization failed" })
      : ((req.decodedToken = decodedToken), next());
  });
}
