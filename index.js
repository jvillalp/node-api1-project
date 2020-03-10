const express = require("express"); //npm i express
const shortid = require("shortid"); //npm i shortid

const server = express();

let users = [];

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running ..." });
});

//create enpoint to create new user
server.post("/api/users", (req, res) => {
  if (req.body.hasOwnProperty("bio") && req.body.hasOwnProperty("name")) {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
    users.push(userInfo);
    res.status(201).json(userInfo);
  }
  else{
      const err = { errorMessage: "Please provide name and bio for the user." };
      res.status(400).json(err)
  }
});

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n** API on http://localhost:${PORT} **\n`)
);
