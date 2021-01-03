const express = require("express"); // express.js framework fuer node
const helmet = require("helmet"); // web security
const cors = require("cors"); // cross origin resource sharing (header) erlauben
const morgan = require("morgan"); // logging
const mongoose = require("mongoose"); //interaktion mit db

const usersservice = require("./services/users.js");

require("dotenv").config();

// Initialisiere Express Server
const server = express();

//Initialisiere Datenbank Verbindung
mongoose.connect(
  `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  const users = await usersservice.getAll();
  if (users.length == 0) {
    const defaultUser = await usersservice.create(
      {
        surname: "Mustermann",
        firstname: "Max",
        email: "maxmusterman@gmx.de",
        password: process.env.STANDARDPASSWORD,
      },
      "administrator"
    );
    console.log("No user found, created default user.", defaultUser);
  }
  console.log("Connected to database");
});

// Middleware auf unseren Server anwenden
server.use(express.json()); // Server kann JSON sprechen
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

// Route zur Hauptdomain mit HTTP GET Methode/Request
server.get("/", function welcome(req, res) {
  res.send(
    `Welcome to the ${process.env.ENVIRONMENT} environment API of Gym Journey!`
  );
});

const usersRouter = require("./routes/users.js");
server.use("/v1/users", usersRouter);

const forumsRouter = require("./routes/forums.js");
server.use("/v1/forums", forumsRouter);

const postsRouter = require("./routes/posts.js");
const { getMaxListeners } = require("./models/users.js");
server.use("/v1/posts", postsRouter);

module.exports = server;
