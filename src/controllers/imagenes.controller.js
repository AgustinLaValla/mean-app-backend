const path = require('path');
const fs = require('fs');

const getImage = (req, res) => {
    const { tipo, img } = req.params;

    const imagePath = path.resolve(__dirname + `/../uploads/${tipo}/${img}`);

    if(fs.existsSync(imagePath)) { 
        return res.sendFile(imagePath);
    } else {
        const pathNoImage = path.resolve(__dirname + '/../assets/noimage.jpg');
        return res.sendFile(pathNoImage);
    };
};

module.exports = { getImage };