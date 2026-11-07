import * as authService from '../services/auth.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT= 10;
const DUMMY_PASSWORD=bcrypt.hashSync('12345678', SALT);
export async function login(req, res) {
    const {email, password} = req.body;
    const user = await authService.findByEmail(email);
    const valid = await bcrypt.compare(password,user?.password_hash??DUMMY_PASSWORD);
    if(!user || !valid){
        return res.status(401).json({message:'credenciales invalidas'});
    }
    const expiresIn= process.env.JWT_EXPIRES_IN;
    const token = jwt.sign(
        {sub: String(user.id),email:user.email}, 
        process.env.JWT_SECRET,
        {expiresIn, algorithm:'HS256'}
    );
    res.json({token,tokentype:'Bearer',expiresIn});

    
}

export async function register(req, res) {
    const {email, password}= req.body;
    const user = await authService.findByEmail(email);
    if(user){
        return res.status(409).json({message:'email ya registrado'});
    }
    const passwordHash=await bcrypt.hash(password, SALT);
    const newUser = await authService.createUser(email, passwordHash); 
    res.status(201).json(newUser);
    
}

export function me(req, res){
    res.json({id:Number(req.auth.sub), email:req.auth.email});
}
