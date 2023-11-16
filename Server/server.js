const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors =require("cors");


const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000;

const URI='Your Mongo DB URI';

// Connect to MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log("DB Connected")
});

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
