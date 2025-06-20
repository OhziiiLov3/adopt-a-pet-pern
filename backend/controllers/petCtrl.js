const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


// CREATE -> POST /pets
const createPet = async (req, res)=>{
 const {name, type, breed, age, description} = req.body;
 
 if(!name || !type || !breed || !age || !description){
   return res.status(400).json({error: "All fields required. "})
 }

 try {
    const pet = await prisma.pet.create({
        data: {
            name,
            type,
            breed,
            age,
            description
        }
    });
    res.status(201).json(pet)
 } catch (error) {
    res.status(500).json({error: error.message})
 }

};

// READ -> GET /pets
// const findAllPets = async (req, res)=>{
//  try {
//     const pets = await prisma.pet.findMany();
//     // console.log(pets);
//     res.json(pets)
//  } catch (error) {
//     res.status(500).json({error: error.message})
//  }
// };


// READ ->GET /pets?type=dog&breed=labrador (filtering via query parameters )

const findAllPets = async (req, res) =>{
 const {type, breed, age} = req.query;
 
const filters = {};

if(type) filters.type = type;

if(breed){
    filters.breed = {
        contains: breed,
        mode: 'insensitive'
    }
}
if(age) filters.age = parseInt(age);

 try {
    const pets = await prisma.pet.findMany({
        where: filters
    })
    res.json(pets)
 } catch (error) {
    res.status(500).json({error: error.message})
 }
};



// READ ONE -> GET By id /pets/:petId
const findPetById = async (req, res) =>{
  const {petId} = req.params;
  try {
    const pet = await prisma.pet.findUnique({
        where: { id: parseInt(petId)},
    });
    if(!pet) return res.status(404).json({error: "Product not found"});
    res.json(pet);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};



// UPDATE -> PUT /pets/:petId
const updatedPet = async (req, res) =>{
    const {petId} = req.params;
    const {name, type, breed, age, description} = req.body;
    try {
      const updatedPet = await prisma.pet.update({
          where: { id: parseInt(petId)},
          data: {
            name,
            type,
            breed,
            age,
            description
        }
      });
     
      res.json(updatedPet);
    } catch (error) {
      res.status(500).json({error: error.message})
    }
};

// DELETE - DELETE Pet ->  /pets/:petId

const deletePet = async (req, res)=>{
const {petId} = req.params;
try {
    const deletePet = await prisma.pet.delete({
        where: {
            id: parseInt(petId)
        }
    });
    res.json({
        message: "Pet deleted successfully",
        deletePet
    });
} catch (error) {
    res.status(500).json({error: error.message})
}
};




module.exports = {
findAllPets,
createPet,
findPetById,
updatedPet,
deletePet
}