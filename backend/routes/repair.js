const { get } = require('mongoose')
const { addPart } = require('../controllers/addPart')
const { getParts } = require('../controllers/getParts')
const { getMachines } = require('../controllers/getMachines')
const { deletePart } = require('../controllers/deletePart')
const { addMachine } = require('../controllers/addMachine')
const { deleteMachine } = require('../controllers/deleteMachine')

const router = require('express').Router()

router.post('/add-part', addPart)
.post('/add-machine', addMachine)
      .get("/get-parts",getParts)
      .get("/get-machines",getMachines)
      .delete("/delete-part/:id",deletePart)
      .delete("/delete-machine/:id",deleteMachine)
      
module.exports = router