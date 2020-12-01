const express = require('express')
const router = express.Router()

const Users = require('../models/users.js')
const userservices = require('../services/users.js')

// Routes unterscheiden nach URL/Route -> HTTP Methode und finden dann ihre Funktion

// Alle User ausgeben  gymjourney.de/v1/users/ (Route müsste Admin geschützt sein)
// 1. Frontend schickt HTTP Request an Backend Route mit GET HTTP Methode
// 2. Gucke in Datenbank, selektiere alle user
// 3. Gebe alle User zurück und gebe HTTP Antwort mit Statuscode
router.get('/', async (req, res) => {
  try {
    const users = await userservices.getAll()
    res.status(200).json({ users: users })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Einen User anhand UserID ausgeben   gymjourney.de/v1/users/3
router.get('/:id', async (req, res) => {
    try {
      const { params: { id } } = req //destructuring const id = req.params.id
      
      const user = await userservices.getById(id)
      res.status(200).json({ user: user })

      //JAVASCRIPT OBJECT NOTATION { key: value }
    /* user ? 
        res.status(200).json({ user: user }) // user ist da -> true
        : 
        res.status(404).json({ message: "User not found" }) // user nicht da -> false */
      
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// User erstellen durch Admin (ADMIN GESCHÜTZT)
router.post('/new', async (req, res) => {
    try {
      const newUser = await userservices.create(req.body) // Speichere das spezifische Objekt in users ab
      res.status(201).json({ user: newUser })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

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

// User löschen
router.delete('/:id', async (req, res) => {
    try {
      const { params: { id } } = req
      const removedUser = userservices.remove(id)
      res.status(200).json({ deleted: removedUser })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// User updaten/bearbeiten
router.post('/update/:id', async (req, res) => {
  try {
    // Finde bestehenden User in Datenbank
    const { params: { id } } = req

    let updatedUser = await userservices.update(id, req.body)
    if (updatedUser == null) {
      res.status(404).json({ message: `User ${id} not found!` })
    }
    res.status(200).json({ updateduser: updatedUser })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// User Login

module.exports = router
