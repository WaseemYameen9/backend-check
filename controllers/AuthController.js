const user = require('../models/user')
const admin = require('../models/AdminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');




let SecretKey = '1c279d2dcdb8aac5259c1d5b474d558289f2cba9551b4e8293a39430ecbae97f';



const AdminLogin = async (req, res) => {
    const { email, password } = req.body;
    const Exist = await admin.findOne({ email: email });
    
    if (Exist) {
        const matched = await bcrypt.compare(password, Exist.password);
        
        if (matched) {
            // // Generate a JWT token
            // const token = jwt.sign({ id: Exist._id, email: Exist.email }, SecretKey, { expiresIn: '1d' }); // expires in 1 day

            // // Set the token in cookies
            // res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 }); // 1 day in milliseconds

            return res.status(200).json({ User: Exist, auth: true });
        } else {
            const error = {
                message: 'Password is Incorrect'
            };
            return res.status(400).json(error);
        }
    } else {
        const error = {
            message: 'User Not Found'
        };
        return res.status(400).json(error);
    }
}

const AdminSignUp = async(req,res) =>{

    const userr = await admin.findOne({email:req.body.email})
    if(userr != null)
    {
        return res.status(400).json({'message':'User Already Exists'})
    }
    const {firstname, lastname, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)

    let Admin;
    try{
        Admin = new admin({
            firstname,
            lastname,
            email,
            password:hashedPassword
        })
        Admin.save();
    }
    catch(error){
        return next(error)
    }

    return res.status(200).json({Admin, auth: true});
}


const Login = async (req, res) => {
    const { email, password } = req.body;
    const Exist = await user.findOne({ email: email });
    
    if (Exist) {
        const matched = await bcrypt.compare(password, Exist.password);
        
        if (matched) {
            // Generate a JWT token
            const token = jwt.sign({ id: Exist._id, email: Exist.email }, SecretKey, { expiresIn: '1d' }); // expires in 1 day

            // Set the token in cookies
            res.cookie('token', token, {sameSite: 'None', httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 }); // 1 day in milliseconds

            return res.status(200).json({ User: Exist, auth: true });
        } else {
            const error = {
                message: 'Password is Incorrect'
            };
            return res.status(400).json(error);
        }
    } else {
        const error = {
            message: 'User Not Found'
        };
        return res.status(400).json(error);
    }
}

const SignUp = async(req,res) =>{

    const userr = await user.findOne({email:req.body.email})
    if(userr != null)
    {
        return res.status(400).json({'message':'User Already Exists'})
    }
    const {firstname, lastname, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)

    let User;
    try{
        User = new user({
            firstname,
            lastname,
            email,
            password:hashedPassword
        })
        User.save();
    }
    catch(error){
        return next(error)
    }

    return res.status(200).json({User, auth: true});
}
const Logout = async(req,res) =>{
    res.send("Logout Called")
}
const ForgotPassword = async(req,res) =>{
    res.send("ForgotPassword Called")
}

module.exports = {
    AdminLogin,
    AdminSignUp,
    Login,
    SignUp,
    Logout,
    ForgotPassword
}