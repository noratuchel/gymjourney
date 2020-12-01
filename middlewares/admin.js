const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  checkLoggedInIsAdmin,
};

// JWT überprüfen
// Brauchen wir den Secret
function checkLoggedInIsAdmin(req, res, next) {
  const jwt = req.headers.authorization;

  jsonwebtoken.verify(jwt, process.env.SIGNATURE, (error, decodedToken) => {
    if (error) {
      res
        .status(401) // 401 Unauthorized Status Code
        .json({ message: "Authorization failed" });
    } else {
      // TOKEN IS VORHANDEN, NIMM USER ROLE
      // CHECK ROLE === ADMIN
      // WENN ADMIN NEXT
      // WENN NICHT DANN 401 UNAUTHORIZED
      decodedToken.role === "administrator"
        ? next()
        : res
            .status(401) // 401 Unauthorized Status Code
            .json({ message: "Authorization Admin failed" });
    }
  });
}
