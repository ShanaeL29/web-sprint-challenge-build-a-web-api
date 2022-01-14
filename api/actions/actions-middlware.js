// add middlewares here related to actions
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

module.exports = {
  checkActionId,
};
