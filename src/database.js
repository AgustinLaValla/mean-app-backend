const mongoose = require('mongoose');
const colors = require('colors');

//Conexión a la base de datos
async function connect() {
    try {
        await mongoose.connection.openUri(process.env.DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology:true
        });
        console.log(`${colors.yellow('DATABASE IS CONNECTED')}`);
    } catch (err) {
        console.log(err);
        throw err;
    };

};

module.exports = { connect };
