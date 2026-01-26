const express = require('express');
const {DogsController} = require('./DogsController');

const router = express.Router();

router.get('/', DogsController.getAllDogs);
router.get('/:id', DogsController.getDogById);
router.post('/', DogsController.addDog);
router.delete('/:id', DogsController.deleteDog);

module.exports = router;