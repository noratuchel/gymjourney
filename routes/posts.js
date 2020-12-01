const express = require("express");
const router = express.Router();

const Posts = require("../models/posts.js");
const postservices = require("../services/posts.js");

// Alle Post ausgeben  gymjourney.de/v1/posts/ (Route müsste Admin geschützt sein)
router.get("/", async (req, res) => {
  try {
    const posts = await postservices.getAll();
    res.status(200).json({ posts: posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Einen Post anhand PostID ausgeben   gymjourney.de/v1/posts/3
router.get("/:id", async (req, res) => {
  try {
    const {
      params: { id },
    } = req; //destructuring const id = req.params.id

    const post = await postservices.getById(id);
    res.status(200).json({ post: post });

    //JAVASCRIPT OBJECT NOTATION { key: value }
    /* Post ? 
        res.status(200).json({ Post: Post }) // Post ist da -> true
        : 
        res.status(404).json({ message: "Post not found" }) // Post nicht da -> false */
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post erstellen durch Admin (ADMIN GESCHÜTZT)
router.post("/new", async (req, res) => {
  try {
    const newPost = await postservices.create(req.body); // Speichere das spezifische Objekt in posts ab
    res.status(201).json({ post: newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post löschen
router.delete("/:id", async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const removedPost = postservices.remove(id);
    res.status(200).json({ deletedpost: removedPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post updaten/bearbeiten
router.post("/update/:id", async (req, res) => {
  try {
    // Finde bestehenden Post in Datenbank
    const {
      params: { id },
    } = req;

    let updatedPost = await postservices.update(id, req.body);
    if (updatedPost == null) {
      res.status(404).json({ message: `Post ${id} not found!` });
    }
    res.status(200).json({ updatedpost: updatedPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
