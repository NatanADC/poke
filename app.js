const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const usersController = require('./controllers/users');
require('./auth')(passport);

const app = express();
const port = 3000;

app.get('/',(req, res)=>{
    //req rquest peticion 
    //res respuesta 
    res.status(200).send('Hello world')
});

app.post('/login', (req,res)=>{
    //comprobando las credenciales 
    usersController.checkUserCredentials(req.body.user, req.body.password, (err,result)=>{
        if(!result){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        // si son validos se genera el JWT y se devuelve 
        const token = jwt.sign({userId: req.body.user});
        res.status(200).json(
            {token: 'token'}
        )
    })
    res.status(200).json(
        {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zX5MPQtbjoNAS7rpsx_hI7gqGIlXOQq758dIqyBVxxY'}
    )
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