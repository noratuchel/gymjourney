const express = require('express'); // express.js framework fuer node
const helmet = require('helmet'); // web security
const cors = require('cors'); // cross origin resource sharing (header) erlauben
const morgan = require('morgan'); // logging
const mongoose = require('mongoose'); //interaktion mit db

require('dotenv').config();

// Initialisiere Express Server
const server = express();

//Initialisiere Datenbank Verbindung
mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to database")
});

// Middleware auf unseren Server anwenden
server.use(express.json()); // Server kann JSON sprechen
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// Route zur Hauptdomain mit HTTP GET Methode/Request
server.get('/', function welcome(req, res) {
  res.send(
    `Welcome to the ${process.env.ENVIRONMENT} environment API of Gym Journey!`,
  );
});

const usersRouter = require('./routes/users.js')
server.use('/v1/users', usersRouter)

const forumsRouter = require('./routes/forums.js')
server.use('/v1/forums', forumsRouter)

const postsRouter = require('./routes/posts.js')
server.use('/v1/posts', postsRouter)

module.exports = server;
