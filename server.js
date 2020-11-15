const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8001"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log("Drop and Resync Db");
  initial();
})

app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome my first Node.js app"
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  }),

  Role.create({
    id: 2,
    name: "moderator"
  }),

  Role.create({
    id: 3,
    name: "admin"
  });
};