const Joi = require("joi");

// Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(12).required(),
        email: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).max(255).required(),
        introduction: Joi.string().min(10).max(100),
    })

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).max(255).required(),
    })

    return schema.validate(data);
}

const petValidation = (data) => {

    const schema = Joi.object({
        //image: Joi.butter(),
        name: Joi.string().min(1).max(50).required(),
        petType: Joi.string().valid("貓", "狗").required(),
        species: Joi.string().min(1).max(50).required(),
        age: Joi.number().min(0).max(50).required(),
        description: Joi.string().min(1).max(50).required(),
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.petValidation = petValidation;