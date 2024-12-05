const express = require('express');
const router = express.Router();
const cors = require('cors');

const { createnotice ,
    viewnotice,
    getnotice,
    updatenotice,
    deletenotice
    
} = require('../controllers/lessonmaterialController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)


router.post('/createnotice', createnotice)
router.get('/viewnotice', viewnotice)
router.get('/getnotice/:id', getnotice)
router.put('/updatenotice/:id', updatenotice)
router.delete('/deletenotice/:id', deletenotice)


module.exports = router;