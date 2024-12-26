const Joi = require("joi");
const UserModel = require("../model/auth.model");

class AuthService {
  login = (payload) => {
    try {
      let rules = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.required(),
      });
      let response = rules.validateAsync(payload);
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  registerValidation = (data) => {
    try {
      let rules = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.number(),
      });

      let response = rules.validate(data);
      if (!response.error) {
        return response;
      } else {
        throw response.error;
      }
    } catch (exception) {
      throw exception;
    }
  };

  updatePass = async (password) => {
    try {
      let rules = Joi.object({
        currentPass: Joi.string().required(),
        newPass: Joi.string().required(),
        confirmPass: Joi.string().required(),
      });
      let response = await rules.validateAsync(password);
      return response;
    } catch (error) {
      throw error;
    }
  };
  createUser = async (data) => {
    try {
      const user = new UserModel(data);
      return await user.save();
    } catch (exception) {
      console.error("Error while creating user:", exception);
      throw exception;
    }
  };

  findUserByEmail = async (email) => {
    try {
      let response = await UserModel.findOne({ email });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  findUserById = async (id) => {
    try {
      let response = await UserModel.findById(id);
      return response;
    } catch (exception) {
      throw exception;
    }
  };
}

const usersrv = new AuthService();
module.exports = usersrv;
