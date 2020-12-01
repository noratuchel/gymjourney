const Posts = require('../models/posts.js')

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};

async function getAll() {
  return await Posts.find();
}

async function getById(id) {
    return await Posts.findById(id);
}

async function create(post_object) {

  const post = new Posts({
    content: post_object.content,
    date: post_object.date,
    photo: post_object.photo,
    content_img: post_object.content_img,
    user_id: post_object.user_id,
    forum_id: post_object.forum_id,
  })
  return await post.save();
}

async function update(id, post_object) {
  // Finde bestehenden User in Datenbank
  let foundPost = await getById(id)
  if (foundPost == null) {
    return null
  }

  if(post_object.content != null) {
    foundPost.content = post_object.content
  }

  if(post_object.date != null) {
    foundPost.date = post_object.date
  }

  if(post_object.photo != null) {
    foundPost.photo = post_object.photo
  }

  if(post_object.content_img != null) {
    foundPost.content_img = post_object.content_img
  }

  if(post_object.user_id != null) {
    foundPost.user_id = post_object.user_id
  }
  
  if(post_object.forum_id != null) {
    foundPost.forum_id = post_object.forum_id
  }
  return await foundPost.save();
}

async function remove(id) {
    return await Posts.findByIdAndRemove(id);
  }