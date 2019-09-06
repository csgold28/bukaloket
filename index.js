const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Inport routes
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');

dotenv.config();

//Koneksi DB
mongoose.connect(process.env.DB_CONNECT, 
{useNewUrlParser :true},
()=> console.log('Terkoneksi ke DB!')
);

// Middleware
app.use(express.json());


//Route Middleware
app.use('/api/member', authRoute);
app.use('/api/home', homeRoute);

app.listen(3000, ()=> console.log('Server Berjalan'));