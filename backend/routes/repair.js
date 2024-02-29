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
const { searchByNumberResultCategory } = require("../controllers/searchByNumberResultCategory");
const { updateMachine } = require("../controllers/updateMachine");
const { getPartsOfMachine } = require("../controllers/getPartsOfMachine");
const router = require("express").Router();

router
  .post("/add-part", addPart)
  .post("/add-machine", addMachine)
  .post("/sign-up",signUp)
  .get("/get-parts", getParts)
  .post("/login",login)
  .get("/get-machines", getMachines)
  .get("/get-categories", getCategories)
  .get("/get-parts-of-machine", getPartsOfMachine)
  .delete("/delete-part/:id", deletePart)
  .delete("/delete-machine/:id", deleteMachine)
  .put('/parts/:partId', updatePart)
  .put('/parts/:partId', updateMachine)
  .get('/parts-by-category', searchByNumberResultCategory);

module.exports = router;
