// Fake DB

let pets = [
  {
    id: 0,
    name: "Zooty",
    type: "dog",
    breed: "English Bulldog",
    age: 5,
    description: "Coolest Dog on the planet",
  },
  {
    id: 1,
    name: "Wizard",
    type: "dog",
    breed: "Jack Russell",
    age: 10,
    description: "all dogs go to Heaven",
  },
  {
    id: 2,
    name: "Mabel",
    type: "dog",
    breed: "English Bulldog",
    age: 5,
    description: "Coolest Dog on the planet",
  },
];

console.log(pets);

//  Get All Pets
const getPets = (req, res) => {
  res.json(pets);
};

// Get petById
const getPetById = (req, res) => {
  const petId = parseInt(req.params.petId);
  const pet = pets.find((pet) => pet.id === petId);
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).send("Book not found");
  }
};

// Create pet
const createPet = (req, res) => {
  const { name, type, breed, age, description } = req.body;

  const newPet = {
    id: pets.length + 1,
    name,
    type,
    breed,
    age,
    description,
  };

  pets.push(newPet);
  res.status(201).json(newPet);
};

// update pet 

const updatePet = (req, res) =>{
    const petId = parseInt(req.params.petId);
    const petIndex = pets.findIndex((pet) => pet.id === petId);

    if (petIndex !== -1) {
        const updatedPet = req.body;
        pets[petIndex] = {
            ...pets[petIndex],
            ...updatedPet
        }
      console.log(pets[petIndex])
      res.json(pets[petIndex]);
    } else {
      res.status(404).send("Book not found");
    }
};


// delete pet 
const deletePet = (req, res) =>{
const  petId = parseInt(req.params.petId);
const petIndex = pets.findIndex(pet => pet.id === petId);

if (petIndex === -1) {
    return res.status(404).json({ error: "Pet not found." });
  }

pets.splice(petIndex,1);
res.status(200).json({ message: 'Pet has been deleted.'});
};




module.exports = {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
};
