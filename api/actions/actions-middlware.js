// add middlewares here related to actions
const { get } = require("./actions-model");
const Project = require("../projects/projects-model");

const checkActionId = (req, res, next) => {
  get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({
          status: 404,
          message: `Action ${req.params.id} not found`,
        });
      }
    })
    .catch(next);
};

async function checkPostPayload(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "No such project for that project_id",
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
}
// if (
//   req.body.project_id &&
//   req.body.description.trim() &&
//   req.body.notes.trim()
// ) {
//   next();
// } else {
//   next({
//     status: 400,
//     message: "project_id, description, & notes are required",
//   });
// res.status(400).json({
//   message: "project_id, description, & notes are required",
// });
// }

// make sure the project_id belongs to an existing project
// };

const checkPutPayload = (req, res, next) => {
  if (
    !req.body.project_id ||
    !req.body.description.trim() ||
    !req.body.notes.trim() ||
    !req.body.completed
  ) {
    res.status(400).json({
      message: "project_id, description, notes, and completed are required",
    });
  } else {
    next();
  }
};

module.exports = {
  checkActionId,
  checkPostPayload,
  checkPutPayload,
};
