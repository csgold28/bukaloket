const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req,res)=> {
    res.send(req.member);
});

module.exports = router;

