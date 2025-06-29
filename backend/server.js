require('dotenv').config();
const express = require("express");
const cors = require('cors')
const app = express();
const petRoutes = require('./routes/petRoutes');

const PORT = process.env.PORT || 3001;


// Enable CORS for all routes
app.use(cors())
// used to parse data from incoming request
app.use(express.json());



// Home Route
app.get('/', (req,res) => {
    console.log("Redirecting to /api/pets");
    res.redirect('/api/pets');
});







app.use('/api/pets',petRoutes);









app.listen(PORT, () =>{ 
console.log(`Your server is running on PORT:${PORT}`)
});

