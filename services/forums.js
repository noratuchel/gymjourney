const Forums = require("../models/forums.js");
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
  return await Forums.find();
}

async function getById(id) {
  return await Forums.findById(id);
}

async function create(forum_object) {
  const forum = new Forums({
    title: forum_object.title,
  });
  return await forum.save();
}

async function update(id, forum_object) {
  let foundforum = await getById(id);
  if (foundforum == null) {
    return null;
  }

  if (forum_object.title != null) {
    foundforum.title = forum_object.title;
  }
  return await foundforum.save();
}

async function remove(id) {
  return await Forums.findByIdAndRemove(id);
}

async function getAllPosts(forum_id) {
  return await Posts.find({ forum_id: forum_id }).exec();
}
