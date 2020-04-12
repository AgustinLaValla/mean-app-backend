const { app } = require('./app');
const { connect } = require('./database');
const colors = require('colors');


async function main() {
    //Databse
    connect();
    //start server
    await app.listen(app.get('port'));
    console.log(`${colors.magenta('Server on port:')} ${colors.green(app.get('port'))}`);
};

main();