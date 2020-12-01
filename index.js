require('dotenv').config(); // Zugriff auf Umgebungsvariablen in dieser Datei

const server = require('./server.js');

const port = process.env.PORT || 5000;
const host = process.env.HOSTNAME;

// Server starten auf Host:Port der Umgebungsvariable
server.listen(port, () => {
  console.log(
    `\n Server laueft auf http://${host}:${port}  \n`,
  );
});
