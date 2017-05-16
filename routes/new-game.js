/**
 * Created by Bo on 13-May-17.
 */
let express = require('express');
let router = express.Router();
let GamesController = require('../controllers/games');

router.post('/',[GamesController.createNewGame], (req,res,next) => {
    res.json({success : "Updated Successfully", status : 200, data: res.body || null});
});


router.get('/', (req,res,next) => {});
module.exports = router;
