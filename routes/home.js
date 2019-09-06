const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req,res)=> {
    res.json({
        home : {
            title : 'Home'
            
        }
    });
});

module.exports = router;

