const express = require('express');

const server = express();

server.get('/users/:id', (req, res) => {

    // const nome =  req.query.nome;

    const id = req.params.id;
 
    return res.json({
        Message: `Buscando o Usuário: ${id}`
    });
    // exemplo para enviar 
    // /nome=Kelvin
});

server.listen(3000);