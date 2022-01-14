// Write your "actions" router here!
const router = require("express").Router();

const { checkActionId } = require("./actions-middlware");

const Action = require("./actions-model");

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      if (actions) {
        res.json(actions);
      } else {
        res.json([]);
      }
    })
    .catch(next);
});

router.get("/:id", checkActionId, (req, res, next) => {
  res.json(req.action);
});

router.delete("/:id", checkActionId, (req, res, next) => {
  Action.remove(req.params.id).then().res.status(200).catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong in the actions router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
