const express = require("express");
const router = express.Router();

const Users = require("../models/users.js");
const userservices = require("../services/users.js");
const authorization = require("../middlewares/auth.js");
const adminauth = require("../middlewares/admin.js");
const basicAuth = require("basic-auth");

// Routes unterscheiden nach URL/Route -> HTTP Methode und finden dann ihre Funktion

// Alle User ausgeben  gymjourney.de/v1/users/ (Route müsste Admin geschützt sein)
// 1. Frontend schickt HTTP Request an Backend Route mit GET HTTP Methode
// 2. Gucke in Datenbank, selektiere alle user
// 3. Gebe alle User zurück und gebe HTTP Antwort mit Statuscode
router.get("/", adminauth.checkLoggedInIsAdmin, async (req, res) => {
  try {
    const users = await userservices.getAll();
    res.status(200).json({ users: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Einen User anhand UserID ausgeben   gymjourney.de/v1/users/3
router.get("/:id", authorization.checkLoggedIn, async (req, res) => {
  try {
    const {
      params: { id },
    } = req; //destructuring const id = req.params.id

    const user = await userservices.getById(id);
    res.status(200).json({
      user: {
        surname: user.surname,
        firstname: user.firstname,
        email: user.email,
        role: user.role,
      },
    });

    //JAVASCRIPT OBJECT NOTATION { key: value }
    /* user ? 
        res.status(200).json({ user: user }) // user ist da -> true
        : 
        res.status(404).json({ message: "User not found" }) // user nicht da -> false */
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User erstellen durch Admin (ADMIN GESCHÜTZT)
router.post("/new", adminauth.checkLoggedInIsAdmin, async (req, res) => {
  try {
    const newUser = await userservices.create(req.body, "user"); // Speichere das spezifische Objekt in users ab
    res.status(201).json({
      user: {
        surname: newUser.surname,
        firstname: newUser.firstname,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* // User Registrierung (Zusatzaufgabe Emailverifikation)
router.post('/register', async (req, res) => {

  // Erstelle ein spezifisches Dokument des User Models mit Daten aus HTTP Request Body
  const user = new Users({
    surname: req.body.surname,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
    role: "user"
  })

  try {
    const newUser = await user.save() // Speichere das spezifische Objekt in users ab
    res.status(201).json({ user: newUser })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}) */

// User löschen (ADMIN GESCHÜTZT)
router.delete("/:id", adminauth.checkLoggedInIsAdmin, async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const removedUser = userservices.remove(id);
    res.status(200).json({ deleted: removedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User updaten/bearbeiten
router.post("/update/:id", authorization.checkLoggedIn, async (req, res) => {
  try {
    // Finde bestehenden User in Datenbank
    const {
      params: { id },
    } = req;

    let updatedUser = await userservices.update(id, req.body);
    if (updatedUser == null) {
      res.status(404).json({ message: `User ${id} not found!` });
    }
    res.status(200).json({
      updatedUser: {
        surname: updatedUser.surname,
        firstname: updatedUser.firstname,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Alle Posts eines Users
router.get("/posts/:id", authorization.checkLoggedIn, async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const posts = await userservices.getAllPosts(id);
    res.status(200).json({ posts: posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User Login
// Route zum Login mit post
// eingegebene Daten übergeben (email, passwort)
// email mit db abgleichen
// passwort mit db abgleichen
// Generiere JWT und gebe es zurück
router.post("/login", async (req, res) => {
  try {
    const loggedInUser = await userservices.login(
      req.body.email,
      req.body.password
    );
    if (loggedInUser) {
      res.status(200).json({
        user: {
          surname: loggedInUser[0].surname,
          firstname: loggedInUser[0].firstname,
          email: loggedInUser[0].email,
          role: loggedInUser[0].role,
        },
        token: loggedInUser[1],
      });
    } else {
      res.status(404).json({ message: "Login fehlgeschlagen." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
