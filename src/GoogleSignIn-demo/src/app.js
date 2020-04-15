const express = require('express');
const colors = require('colors');
const path = require('path');
const googleLoginRoutes = require('./routes/googleLogin.routes');

const app = express();

//Settings
app.set('port', process.env.PORT || 4200);


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.use(googleLoginRoutes);


//Start
async function main() { 
    await app.listen(app.get('port'));
    console.log(`${colors.magenta('Server on Port:')} ${colors.green(app.get('port'))}`)
};

main();
