//Validasi
const Joi = require('@hapi/joi');

//Register Validasi
const registerValidation = (data) => {
    const schema ={
        name : Joi.string()
            .min(2)
            .required(),
        email : Joi.string()
            .min(6)
            .required()
            .email(),
        nohp : Joi.string()
            .min(5)
            .required(),
        password : Joi.string()
            .min(6)
            .required()

    };
    return Joi.validate(data, schema);
};

const loginValidation = (data) => {
    const schema ={
    
        nohp : Joi.string()
            .min(5)
            .required(),
        password : Joi.string()
            .min(6)
            .required()

    };
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;