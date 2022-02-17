const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {isValidEmail} = require('../helpers');
const nodemailer = require('nodemailer');
const isValidRole = require('../helpers/posible_roles')

const Schema = mongoose.Schema;

const userSchema_conservacion = Schema({
    matricula:{
        type: Number,
        required: true,
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
    role:{
        type:String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false,
})

userSchema_conservacion.statics.buildUp = buildUp;
userSchema_conservacion.statics.signup = signup;
userSchema_conservacion.statics.login = login;
userSchema_conservacion.statics.findUserById = findUserById;
userSchema_conservacion.statics.getTechnicians = getTechnicians;

mongoose.model('user_conservacion',userSchema_conservacion,'users_conservacion');


function buildUp(){
    return this.count().then(data=>{
        if(data == 0){
            const initial_user ={
                matricula: process.env.ADMIN_USERNAME,
                password:bcrypt.hashSync(process.env.ADMIN_PASSWORD, 9),
                firstName:'admin',
                lastName:'admin',
                role:'SUDO',
            };
            console.log('Usuario super_usuario creado...')
            this.create(initial_user)
        }
    })
} 



function getTechnicians(){
    return this.find({role:"TECNICO"}).select({_id:0,matricula:1,firstName:1,lastName:1})
}

function signup(userInfo){

    console.log(userInfo)
    if(!userInfo.matricula || userInfo.matricula == "") throw new Error('Ingresa una matricula válida')
    if(!userInfo.password || userInfo.password == "") throw new Error('Password is required');
    if(!userInfo.firstName || userInfo.firstName == "") throw new Error('firsName is required');
    if(!userInfo.lastName ||  userInfo.lastName == "") throw new Error('lastName is required');
    if(!isValidRole(userInfo.role)) throw new Error("Es necesario asignar un rol valido al usuario");


    return this.findOne({matricula: userInfo.matricula})
        .then(user=>{
            if(user) throw new Error('User already exist');

            const newUser = {
                matricula: userInfo.matricula,
                password: bcrypt.hashSync(userInfo.password, 9), 
                firstName:userInfo.firstName,
                lastName:userInfo.lastName,
                role: userInfo.role,
            };

            return this.create(newUser);
        })
        .then(user=>user);   
}


function login(matricula,password){  
  
    return this.findOne({matricula})
        .then(user=>{
            console.log(user)
            if(!user) throw new Error('Incorrect credentials');

            const isMatch = bcrypt.compareSync(password, user.password);
            if(!isMatch) throw new Error('Incorrect Password');

            const userObject = {
                _id: user._id,
                matricula: user.matricula,
                firstName: user.firstName,
                lastName: user.lastName,
                role:user.role,
            };

            const access_token = jwt.sign(Object.assign({},userObject),process.env.TOKEN_SECRET,{
                expiresIn: 60 * 60 * 4,
            });
            const user_= userObject;
            const session_created_date = new Date().getTime();
            return {access_token, user_, session_created_date};
        })
}

function findUserById({_id}){
    return this.findOne(_id)
        .then(user=>{
            if(!user) throw new Error('Usuario no encontrado');

            return {
                _id: user._id,
                matricula: user.matricula,
                firstName: user.firstName,
                lastName: user.lastName,
                role:user.role,
            }
        })
}
