const express = require('express');
const router = express.Router();
const petsControlller = require('../controllers/petController');



router.get('/', petsControlller.getPets);
router.get('/:petId', petsControlller.getPetById);
router.post('/', petsControlller.createPet);
router.put('/:petId', petsControlller.updatePet);
router.delete('/:petId', petsControlller.deletePet);





module.exports = router;