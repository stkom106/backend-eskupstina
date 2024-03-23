const { UserSchema } = require("../models");

const Auth = {
  create: async (props) => {
    const { name, email, password, role, city } = props;

    try {
      const newData = new UserSchema({
        name: name,
        email: email,
        password: password,
        role: role,
        city: city,
        createdAt: new Date(),
      });

      const saveData = await newData.save();

      if (!saveData) {
        throw new Error("Database Error");
      }

      return saveData;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  findOne: async (props) => {
    const { filter } = props;

    try {
      const result = await UserSchema.findOne(filter);

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  fintByCity: async (props) => {
    const { param } = props;
    try {
      const user = await UserSchema.findOne(param);
      const result = await UserSchema.find({ city: user.city });

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  authenticateUser: async (props) => {
    const { email, password } = props;
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (!isValidEmail(email)) {
      throw new Error("Invalid email format");
    }

    try {
      const result = await UserSchema.findOne({ email, password });

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = Auth;
