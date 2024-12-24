const usersrv = require("../service/auth.service");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");

class AuthController {
  login = async (req, res, next) => {
    try {
      let payload = req.body;
      await usersrv.login(payload);
      let response = await usersrv.findUserByEmail(payload.email);
      if (response) {
        let checkPass = bcrypt.compareSync(payload.password, response.password);
        console.log("passcheck", checkPass);

        let accessToken = jwtToken.sign(
          { id: response._id },
          process.env.JWT_KEY,
          {
            expiresIn: "1 day",
          }
        );
        if (checkPass) {
          res.json({
            data: {
              AscessToken: accessToken,
              role: response.role,
              data: response,
            },
            msg: "login successfull",
          });
        } else {
          throw { msg: "Credential doesnot match" };
        }
      } else {
        throw { msg: "Credential doesnot match" };
      }
    } catch (error) {
      console.log("login", error);
      next({
        msg: error,
        code: 500,
        meta: null,
      });
    }
  };

  register = async (req, res, next) => {
    try {
      let data = req.body;
      await usersrv.registerValidation(data);
      data.password = bcrypt.hashSync(data.password, 10);
      let response = await usersrv.createUser(data);
      if (response) {
        res.json({
          data: response,
          msg: "Registered Successfully",
          code: 200,
          meta: null,
        });
      }
    } catch (error) {
      console.log("register", error);
      next({
        msg: error,
      });
    }
  };
}

const authctrl = new AuthController();
module.exports = authctrl;
