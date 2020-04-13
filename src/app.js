const express = require('express');
const appRoutes = require('./routes/app.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const loginRoutes = require('./routes/login.routes');
const hospitalesRoutes = require('./routes/hospitales.routes');
const medicosRoutes = require('./routes/medicos.routes');
const busquedaRoutes = require('./routes/busqueda.routes');
const uploadRoutes = require('./routes/upload.routes');
const imagenesRoutes = require('./routes/imagenes.routes');


const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false})); 


//Routes
app.use('/', appRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/hospitales', hospitalesRoutes);
app.use('/medicos', medicosRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

module.exports = { app };
