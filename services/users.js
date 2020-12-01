const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const Users = require("../models/users.js");
const Posts = require("../models/posts.js");

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getAllPosts,
  login,
};

async function getAll() {
  return await Users.find();
}

async function getById(id) {
  return await Users.findById(id);
}

async function create(user_object) {
  // Erstelle ein spezifisches Dokument des User Models mit Daten aus HTTP Request Body
  const salt = await bcrypt.genSalt();

  const user = new Users({
    surname: user_object.surname,
    firstname: user_object.firstname,
    email: user_object.email,
    password: bcrypt.hashSync(user_object.password, salt),
    role: "user",
  });
  return await user.save();
}

// User können ihr Passwort und Role erstmal nicht ändern
async function update(id, user_object) {
  // Finde bestehenden User in Datenbank
  let foundUser = await getById(id);
  if (foundUser == null) {
    return null;
  }

  if (user_object.surname != null) {
    foundUser.surname = user_object.surname;
  }
  if (user_object.lastname != null) {
    foundUser.lastname = user_object.lastname;
  }
  if (user_object.email != null) {
    foundUser.email = user_object.email;
  }
  return await foundUser.save();
}

async function remove(id) {
  return await Users.findByIdAndRemove(id);
}

async function getAllPosts(user_id) {
  return await Posts.find({ user_id: user_id }).exec();
}
async function login(email, password) {
  const user = await Users.findOne({ email: email });
  if (user) {
    // Wenn user gefunden wurde
    const passwordMatching = bcrypt.compareSync(password, user.password);
    if (passwordMatching) {
      // Wenn password stimmt
      return [user, generiereJWT(user)];
    }
  }
  return null;
}

function generiereJWT(user) {
  const payload = {
    userid: user._id,
    surname: user.surname,
    firstname: user.firstname,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: "7d",
  };

  return jsonwebtoken.sign(payload, process.env.SIGNATURE, options);
}
