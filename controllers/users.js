const passport = require('passport');
const { unsubscribe } = require('superagent');
const uuid = require('uuid');
const crypto = require('./crypto.js')
const userDatabase = {
    '001':{
        'password': '',
        'salt': '',
        'userName': ''
    }
};

const registerUser = (userName, password) => {
    crypto.hashPassword(password, (err,result)=>{
        userDatabase[uuid.v4()] ={
            userName: userName,
            password: result
        }
    });
    //guardar en la base de datos nuestro user
}
const checkUserCredentials = (userId, password, done) =>{
    //comporbar en la se de datos nuestro user 
    let user = userDatabase[userId];
    crypto.comparePassword(password,user.password, done);
    return false;
}