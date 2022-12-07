const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const userController = require('./controller/user')

const app = express();
const port = process.env.PORT || 2023;

app.use(bodyParser.json());

app.get("/api/users", (req, res) => {
  userController.getUsers().then((data) => res.json(data));
});

app.post("/api/users", (req, res) => {
  userController.createUser(req.body).then((data) => res.json(data));
});

app.post("/api/auth", (req, res) => {
    userController.login(req.body).then((data) => res.json(data));
  });

app.put("/api/users", (req, res) => {
  userController.updateUser(req.body).then((data) => res.json(data));
});

app.get("/api/users/:id", (req, res) => {
  userController.getUserById(req.params.id).then((data) => res.json(data));
});

app.delete("/api/users/:id", (req, res) => {
    userController.deleteUser(req.params.id).then((data) => res.json(data));
  });

app.get("/", (req, res) => {
  res.send('Hello and Welcome!!');
});

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
