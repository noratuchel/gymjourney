# Introducing gymjourney API

GymJourney ist eine Plattform auf der sich Sportbegeisterte miteinander in Form von Foren austauschen und ihre eigene Erfolge festhalten können.

Die API ist mit clever-cloud gehostet.

Die API ist mithilfe von Heroku live unter der URL
https://gymjourney.herokuapp.com/

Eine REST API, die mithilfe von Node.js und Express erstellt wurde. MongoDB wurde als Datenbank benutzt und Mongoose als ORM library um mit MongoDB besser zu interagieren.

Des Weiteren wurde JSON Web Token (JWT) zur Authentifizierung hinzugefügt. Somit haben wir unsere routes geschützt.

Aktuell kann noch jeder User jeden Post in einem Forum editieren.

## Setup and Installation

1. **Repository von Gitlab klonen**

   ```sh
   git clone //todo
   cd  //todo
   ```

2. **Alle npm dependencies installieren**

   ```sh
   npm install
   ```

3. **MongoDB installieren**

Backend arbeitet mit MongoDB. Entweder eigene lokale DB aufsetzen oder sich wie ich auf eine Cloud Lösung festlegen. Ich habe Clever-Cloud benutzt für eine kostenlose Datenbank.

4. **Umgebungsvariablen benutzen**

   folgende Umgebungsvariablen müssen vorhanden sein:

   ```
   PORT, HOSTNAME, ENVIRONMENT, USERNAME, PASSWORD,

   DB_HOST, DB_NAME, DB_PORT, SIGNATURE
   ```

5. **Die Applikation starten**
   Zum Starten auf der Produktions Umgebung

   ```
    npm start
   ```

Zum Starten auf der DEntwicklungsumgebung

```

    npm run server

```

Dies läuft auf allen dem Standartport 5000. Alle Routen können über http://localhost:5000 erreicht werden.

API Dokumentation

![](./gymjourney-local.png)
