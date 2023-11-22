const Joi = require ('joi')

const usuariosSchema= Joi.object({
    quantidade: Joi.number(),
    usuarios: Joi.array(),
    nome: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),



});
        

export default usuariosSchema;  
