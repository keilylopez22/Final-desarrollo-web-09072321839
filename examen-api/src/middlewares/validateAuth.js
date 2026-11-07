
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function normalizeEmail(email){
    return email.trim().toLowerCase();
}

export function valiteRegister(req, res, next){
    const email= normalizeEmail(req.body.email??'');
    const {password}= req.body??{};
    const errors= [];
    if(typeof email !=='string'|| !regex.test(email)){
        errors.push('email invalido');
        
    }
    if(typeof password !== 'string' || password.length <8){
        errors.push('el password debe tener al menos 8 caracteres');
    }
    if (errors.length>0){
        return res.status(400).json({message:'datos invalidos',errors});
    }
    req.body= {email, password};
    next();
}

export function validateLogin(req, res, next){
    const email= normalizeEmail(req.body.email??'');
    const {password}= req.body??{};
   
  
    if(typeof email !=='string'||typeof password !== 'string'){
        return res.status(400).json({message:'el email y el password son obligatorios'});
        
    }
  
    req.body= {email, password};
    next();
}