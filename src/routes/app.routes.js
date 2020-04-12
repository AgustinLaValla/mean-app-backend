const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => { 
    res.status(200).json({
        ok:true,
        mensaje: 'Petición realizada correctamente'
    });
});

module.exports = router;