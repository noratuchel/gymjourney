const express = require("express");
const router = express.Router();

const Forums = require("../models/forums.js");
const forumservices = require("../services/forums.js");
const authorization = require("../middlewares/auth.js");
const adminauth = require("../middlewares/admin.js");

// Routes unterscheiden nach URL/Route -> HTTP Methode und finden dann ihre Funktion

// Alle Forums ausgeben  gymjourney.de/v1/forums/ (Route müsste Admin geschützt sein)
router.get("/", adminauth.checkLoggedInIsAdmin, async (req, res) => {
  try {
    const forums = await forumservices.getAll();
    res.status(200).json({ forums: forums });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ein Forum anhand ForumID ausgeben
router.get("/:id", authorization.checkLoggedIn, async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const forum = await forumservices.getById(id);
    res.status(200).json({ forum: forum });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Forum erstellen durch Admin (ADMIN GESCHÜTZT)
router.post("/new", adminauth.checkLoggedInIsAdmin, async (req, res) => {
  try {
    const newForum = await forumservices.create(req.body);
    res.status(201).json({ forum: newForum });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Forums löschen (ADMIN GESCHÜTZT)
router.delete("/:id", adminauth.checkLoggedInIsAdmin, async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const removedForum = forumservices.remove(id);
    res.status(200).json({ deletedforum: removedForum });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Forum updaten/bearbeiten (ADMIN GESCHÜTZT)
router.post("/update/:id", adminauth.checkLoggedInIsAdmin, async (req, res) => {
  try {
    // Finde bestehenden Forums in Datenbank
    const {
      params: { id },
    } = req;

    let updatedForum = await forumservices.update(id, req.body);
    if (updatedForum == null) {
      res.status(404).json({ message: `Forum ${id} not found!` });
    }
    res.status(200).json({ updatedForum: updatedForum });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Alle Posts eines Forums
// Get Methode
// Forumid übergeben
// Welche Posts mit dieser Forumid
// Alle ausgeben

router.get("/posts/:id", authorization.checkLoggedIn, async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const posts = await forumservices.getAllPosts(id);
    res.status(200).json({ posts: posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
