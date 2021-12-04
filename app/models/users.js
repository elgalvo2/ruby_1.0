const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {isValidEmail} = require('../helpers');
const nodemailer = require('nodemailer');

const Schema = mongoose.Schema;

const userSchema = Schema({
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
        trim: true,

    }, 
    lastName:{
        type:String,
        required:true,
        trim: true,

    },
    emailIsVerified:{
        type:Boolean,
        default:false,
    }
},
{
    timestamps: true,
    versionKey: false,
})

userSchema.statics.signup = signup;
//userSchema.statics.sendConfirmationEmail = sendConfirmationEmail;
userSchema.statics.confirmAccount = confirmAccount;
userSchema.statics.login = login;
userSchema.statics.findUserById = findUserById;

mongoose.model('user',userSchema,'users');

function signup(userInfo){
    if(!userInfo.email || !isValidEmail(userInfo.email)) throw new Error('Email is invalid');
    if(!userInfo.password || userInfo.password == "") throw new Error('Password is required');
    if(!userInfo.firstName || userInfo.firstName == "") throw new Error('firsName is required');
    if(!userInfo.lastName ||  userInfo.lastName == "") throw new Error('lastName is required');

    return this.findOne({email: userInfo.email})
        .then(user=>{
            if(user) throw new Error('User already exist');

            const newUser = {
                email: userInfo.email,
                password: bcrypt.hashSync(userInfo.password, 9), 
                firstName:userInfo.firstName,
                lastName:userInfo.lastName,
            };

            return this.create(newUser);
        })
        .then(userCreated => this.sendConfirmationEmail(userCreated))
        .then(user=>user);   
}

function sendConfirmationEmail(user){
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth:{
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    });

    var token = jwt.sign({email:user.email},process.env.TOKEN_SECRET);

    const urlConfirm = `${process.env.APIGATEWAY_URL}/account/confirm/${token}`;

    return transporter.sendMail({
        from: process.env.MAIL_ADNMIN_ADDRESS,
        to: user.email,
        subject: "please confirme your email!!",
        html: `<H1>Confirmation email HERE: <a href=${urlConfirm}>Click Here!!!</a></H1>`,
    }).then(()=>user);

};

function confirmAccount(token){
    var email = null;
    try{
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        email = payload.email;
    }catch(err){
        throw new Error('Invalid token');
    }

    return this.findOne({email})
        .then(user=>{
            if(!user) throw new Error('user not found');
            if(user.emailIsVerified) throw new Error('User Already verified');
            
            user.emailIsVerified = true;
            return user.save();
        })
}

function login(email,password){
    if(!isValidEmail(email)) throw new Error('email is invalid');
    
    return this.findOne({email})
        .then(user=>{
            if(!user) throw new Error('Incorrect credentials');
            if(!user.emailIsVerified) throw new Error('Email is not verified yet');

            const isMatch = bcrypt.compareSync(password, user.password);
            if(!isMatch) throw new Error('Incorrect Password');

            const userObject = {
                _id: user._id,
                email: user.email,
                emailIsVerified: user.emailIsVerified,
                firstName: user.firstName,
                lastName: user.lastName,
            };

            const access_token = jwt.sign(Object.assign({},userObject),process.env.TOKEN_SECRET,{
                expiresIn: 60 * 60 * 4,
            });
            const user_= userObject
            return {access_token, user_};
        })
}

function findUserById({_id}){
    return this.findOne(_id)
        .then(user=>{
            if(!user) throw new Error('Usuario no encontrado');

            return {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                emailIsVerified: user.emailIsVerified,
            }
        })
}