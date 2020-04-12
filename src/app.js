const express = require('express');
const appRoutes = require('./routes/app.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const loginRoutes = require('./routes/login.routes');


const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false})); 

//Routes
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

module.exports = { app };
