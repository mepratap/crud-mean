const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/database');
const users = require('./routes/users');

//conect to database
mongoose.connect(config.database);

//on successful connection
mongoose.connection.on('connected', () => {
    console.log('database connected!');
});

//on connection error 
mongoose.connection.on('error', (err) => {
    console.log(`error during connection ${err}`);
});
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors());


//passort midleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/jwtStrategy')(passport);

//all user related routes use this url
app.use('/users', users);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
//starts the server
app.listen(port, () => {
    console.log('server started at 3000');
});

