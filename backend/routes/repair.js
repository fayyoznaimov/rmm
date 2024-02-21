const { get } = require("mongoose");
const { addPart } = require("../controllers/addPart");
const { getParts } = require("../controllers/getParts");
const { getMachines } = require("../controllers/getMachines");
const { deletePart } = require("../controllers/deletePart");
const { addMachine } = require("../controllers/addMachine");
const { deleteMachine } = require("../controllers/deleteMachine");
const { getCategories } = require("../controllers/getCategories");
const { signUp } = require("../controllers/signUp");
const { login } = require("../controllers/login");
const { updatePart } = require("../controllers/updatePart");

const router = require("express").Router();

router
  .post("/add-part", addPart)
  .post("/add-machine", addMachine)
  .post("/sign-up",signUp)
  .get("/get-parts", getParts)
  .post("/login",login)
  .get("/get-machines", getMachines)
  .get("/get-categories", getCategories)
  .delete("/delete-part/:id", deletePart)
  .delete("/delete-machine/:id", deleteMachine)
  .put('/parts/:partId', updatePart);

module.exports = router;
