const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {getAllDogs} = require('../controllers/getAllDogs')
const {getDetail} = require('../controllers/getDetail');
const { getByRaza } = require('../controllers/getByRaza');
const { postDog } = require('../controllers/postDog');
const { getTemperaments } = require('../controllers/getTemperaments');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', getAllDogs)
router.get('/dogs/name',getByRaza)
// /dogs/name?name=pug 

router.get('/dogs/:idRaza', getDetail)

router.post('/dogs', postDog )
router.get('/temperaments', getTemperaments)

module.exports = router;
