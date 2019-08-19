const express = require('express');

const server = express();

server.use(express.json());


const users = [ "Kelvin","Jonas","Tester" ];


// criadno uma middleware
server.use((req, res, next) => {
    console.time('Request');
    console.log(`Método: ${req.method}; URL:${req.url }`);

    next();
    console.timeEnd('Request');
});

function checkUserExist(req, res, next){

    if(!req.body.name){
        return res.status(400).json({ erro: "Usuário não encontrado" })
    }   
    return next();
};

function checkPostCreateUser(req, res, next){
    if(!req.body.name){
        return res.status(400).json({
            error:"Parametros incorretos"
        });
    }
    return next();
};

// aqui ele vai pegar o params na url e vai 
// rodar todo array ate achar se nao achar ele
// vai retorno erro e termina ali
function checkUserInArray (req, res, next) {
    const user = users[req.params.index];
    
    if(!user){
        return res.status(400).json({
            error:"Usuário não existe"
        });
    }
    req.user = user;

    return next();
};

// GET ALL USERS
server.get(`/users`, (req, res) =>{
    return res.json(users);
});

// GET USER BY ID 
server.get('/users/:index', checkUserInArray, (req, res) => {

    // const nome =  req.query.nome;
    // const id = req.params.id;
    // const { id } = req.params;

    // const { index } = req.params;
    return res.json(req.user);
    // exemplo para enviar 
    // /nome=Kelvin
});

// POST DE CRIAÇÃO DE USUARIO
server.post(`/users`, checkPostCreateUser, (req, res) => {

    const { name } = req.body;

    users.push(name);
     
    return res.json(users);

});
// ATUALIZAR USUARIOS BY CODE
server.put(`/users/:index`, checkUserExist, checkUserInArray, (req, res) => {

    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

// DELETE USER BY CODE
server.delete(`/users/:index`, checkUserInArray, (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);
    
    return res.send();
});

server.listen(3000);