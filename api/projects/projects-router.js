// Write your "projects" router here!
const router = require("express").Router();

const {
  checkProjectId,
  checkProjectPayload,
  checkPutPayload,
} = require("./projects-middleware");
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

router.post("/", checkProjectPayload, (req, res, next) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.put(
  "/:id",
  checkProjectId,
  checkProjectPayload,
  checkPutPayload,
  (req, res, next) => {
    const { name, description, completed } = req.body;

    Project.update(req.params.id, { name, description, completed })
      .then((project) => {
        res.status(200).json(project);
        // console.log(project);
      })
      .catch(next);
  }
);

router.delete("/:id", checkProjectId, (req, res, next) => {
  Project.remove(req.params.id).then().res.status(200).catch(next);
});

router.get("/:id/actions", checkProjectId, (req, res, next) => {
  Project.getProjectActions(req.params.id).then((actions) => {
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.json([]);

      //   next({
      //     status: 404,
      //     message: "Not found",
      //   });
    }
  });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong in the projects router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
