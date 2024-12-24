const IsAdmin = (req, res, next) => {
  try {
    let userDetails = req.User;
    if (userDetails.role === "Admin") {
      next();
    }
  } catch (error) {
    next({
      msg: "User is not admin",
    });
  }
};

module.exports = { IsAdmin };
