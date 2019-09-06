const router = require('express').Router();
const Member = require('../model/Member');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');

//Register
router.post('/register', async(req, res) => {
   
    //Validasi data sebelum ke data member
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Cek jika  data user sudah terdaftar
    const nohpExist = await Member.findOne({nohp: req.body.nohp});
    if (nohpExist) return res.status(400).send('No. Handphone sudah terdaftar!');

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create member baru
    const member = new Member({
    name : req.body.name,
    email : req.body.email,
    nohp : req.body.nohp,
    password : hashedPassword
   });
   try{
    const savedMember = await member.save();
    res.send({member: member._id});
   }catch(err){
       res.status(400).send(err);
   }
});

//Login
router.post('/login', async(req, res)=> {
    //Validasi data sebelum ke data member
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Cek jika  NO.HP sudah terdaftar
    const member = await Member.findOne({nohp: req.body.nohp});
    if (!member) return res.status(400).send('No. Handphone tidak terdaftar!');

    //Jika Password salah
    const validPass = await bcrypt.compare(req.body.password, member.password);
    if(!validPass) return res.status(400).send('Password Anda salah!');

    //Create dan assign token
    const token = jwt.sign({_id: member._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Berhasil Masuk!');

});

module.exports = router;