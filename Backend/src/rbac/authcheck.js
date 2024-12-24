const jwtToken = require("jsonwebtoken");
const usersrv = require("../service/auth.service");

const AuthCheck = async (req, res, next) => {
  try {
    let token = null;
    if (req.headers["authorization"]) {
      token = req.headers["authorization"];
    }
    if (!token) {
      throw { msg: "TOken not provided" };
    }

    token = token.split(" ").pop();

    let response = await jwtToken.verify(token, process.env.JWT_KEY);
    let UserDetails = await usersrv.findUserById(response.id);
    console.log(UserDetails);

    if (UserDetails) {
      req.User = UserDetails;
      next();
    }
  } catch (error) {
    next({
      data: "Authcheck",
      msg: error,
    });
  }
};

module.exports = AuthCheck;
