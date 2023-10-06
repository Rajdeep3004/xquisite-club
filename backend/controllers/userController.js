const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const signUp = async (req, res) => {
  const { email, pass } = req.body;
  const hashPass = await bcrypt.hash(pass, 10);

  User.findOne({ email })
    .then((emailFound) => {
      if (emailFound) {
        return res.json({ message: "Email already registered!" });
      } else {
        const newUser = new User({ email: email, pass: hashPass });
        newUser.save().then((data) => res.json(data));
      }
    })
    .catch((error) => {
      return res.json(error);
    });
};

const login = (req, res) => {
  const { email, pass } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({ message: "User not found!" });
      } else {
        bcrypt.compare(pass, user.pass).then((passwordMatch) => {
          if (passwordMatch) {
            return res.json(user);
          } else {
            return res.json({ message: "Invalid password!" });
          }
        });
      }
    })
    .catch((error) => {
      return res.json(error);
    });
};

exports.signUp = signUp;
exports.login = login;
