const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const usersController = require('./controllers/users');

usersController.registerUser('Natan', '1234');

require('./auth')(passport);

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/',(req, res)=>{
    //req rquest peticion 
    //res respuesta 
    res.status(200).send('Hello world')
});

app.post('/login', (req,res)=>{
    if(!req.body){
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }
    //comprobando las credenciales 
    usersController.checkUserCredentials(req.body.user, req.body.password, (err,result)=>{
        if(err || !result){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        // si son validos se genera el JWT y se devuelve 
        const token = jwt.sign({userId: result}, 'secretPassword');
        res.status(200).json(
            {token: 'token'}
        )
    })
    
});

app.post('/team/pokemons',()=>{
    res.status(200).send('Hello world')
})
//middleware
app.get('/team', passport.authenticate('jwt',{session: false}), (req, res)=>{
    res.status(200).send('Hello world')
})

app.delete('/team/pokemons/:pokeid', ()=>{
    res.status(200).send('Hello world')
})

app.put('/team',()=>{
    res.status(200).send('Hello world')
})

app.listen(port, ()=>{
    console.log('Server started at port 3000');
})

exports.app = app;