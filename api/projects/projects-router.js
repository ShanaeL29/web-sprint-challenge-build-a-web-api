// Write your "projects" router here!
const router = require("express").Router();

const { checkProjectId } = require("./projects-middleware");
const Project = require("./projects-model");

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      if (projects) {
        res.json(projects);
      } else {
        res.json([]);
      }
    })
    .catch(next);
});

router.get("/:id", checkProjectId, (req, res, next) => {
  res.json(req.project);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong in the projects router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
