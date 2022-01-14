// add middlewares here related to projects
const { get } = require("./projects-model");

const checkProjectId = (req, res, next) => {
  get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        next({
          status: 404,
          message: `project ${req.params.id} not found`,
        });
      }
    })
    .catch(next);
};

const checkProjectPayload = (req, res, next) => {
  if (req.body.name && req.body.description) {
    next();
  } else {
    next({
      status: 400,
      message: "name and description are required",
    });
  }
};

module.exports = {
  checkProjectId,
  checkProjectPayload,
};
