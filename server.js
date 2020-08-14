const express = require("express");
const server = express();
const port = 4000;
const logger = require("./middleware/logger");
const usersRouter = require("./users/userRouter");

server.use(express.json());
server.use(logger());
server.use(usersRouter);

server.get("/", logger(), (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
