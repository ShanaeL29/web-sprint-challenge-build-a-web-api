// add middlewares here related to actions
const { restart } = require("nodemon");
const { get } = require("./actions-model");

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

const checkUpdatePayload = (req, res, next) => {
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
  checkUpdatePayload,
};
