const express = require('express');
const router = express.Router();
// const petsControlller = require('../controllers/petController');
const petsCtrl = require('../controllers/petCtrl');



router.get('/', petsCtrl.findAllPets);
router.get('/:petId', petsCtrl.findPetById);
router.post('/', petsCtrl.createPet);
router.put('/:petId', petsCtrl.updatedPet);
router.delete('/:petId', petsCtrl.deletePet);





module.exports = router;