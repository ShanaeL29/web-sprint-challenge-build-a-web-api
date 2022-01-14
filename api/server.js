const express = require("express");

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const server = express();

server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Projects API</h2>
    <p>Welcome to the Projects API</p>
  `);
});

server.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.method} ${req.baseUrl} unable to be located!`,
  });
});

module.exports = server;

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
