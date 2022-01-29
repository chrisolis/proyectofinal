const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// connection to db

mongoose.connect(process.env.MONGODB)
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/routeindex');


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));


// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
})


