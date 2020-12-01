const Users = require("../models/users.js");
const Posts = require("../models/posts.js");

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getAllPosts,
};

async function getAll() {
  return await Users.find();
}

async function getById(id) {
  return await Users.findById(id);
}

async function create(user_object) {
  // Erstelle ein spezifisches Dokument des User Models mit Daten aus HTTP Request Body
  const user = new Users({
    surname: user_object.surname,
    firstname: user_object.firstname,
    email: user_object.email,
    password: user_object.password,
    role: "user",
  });
  return await user.save();
}

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
  if (user_object.role != null) {
    foundUser.role = user_object.role;
  }
  return await foundUser.save();
}

async function remove(id) {
  return await Users.findByIdAndRemove(id);
}

async function getAllPosts(user_id) {
  return await Posts.find({ user_id: user_id }).exec();
}
