//////////////////////////////////////////////////////////////////
// ESTA APLICAÇÃO DEVERÁ CRIAR UMA API COM OS SEGUINTES METODOS //
// CREATE PROJECTS                                              //
// READ PROJECTS                                                //
// READBYID PROJECTS                                            //
// DELETE PROJECTS                                              //
// DEVERÁ CONTER TAMBEM MIDDLEWARES DE TRATAR ERROS             //
//////////////////////////////////////////////////////////////////
const express = require("express");
const server = express();
server.use(express.json()); //recebe e envia parametros do tipo json

//MIDLEWARE

const projectsNotMiddleware = [
  { id: "1", title: "Novo projeto", tasks: ["Tarefa 1"] },
  { id: "2", title: "Segundo projeto", tasks: ["Tarefa 2"] },
  { id: "2", title: "Terceiro projeto", tasks: ["Tarefa 3"] }
];
// const projects = [];
////////////////////////////////////////////////////////////
////////////////////// METODO GET /////////////////////////
///////////////////////////////////////////////////////////
server.get(`/projectsNotMiddleware`, (req, res) => {
  return res.json(projectsNotMiddleware);
});
////////////////////////////////////////////////////////////
/////////// METODO GETBYID PROJECT SEM MIDDLEWARE //////////
///////////////////////////////////////////////////////////
server.get(`/projectsNotMiddleware/:index`, (req, res) => {
  const { index } = req.params;
  return res.json(projectsNotMiddleware[index]);
});
////////////////////////////////////////////////////////////
//////////// METODO POST PROJECT SEM MIDDLEWARE ////////////
////////////////////////////////////////////////////////////
server.post(`/projectsNotMiddleware`, (req, res) => {
  const project = req.body;
  projectsNotMiddleware.push(project);
  return res.json(project);
});
////////////////////////////////////////////////////////////
//////////////METODO PUT SEM MIDDLEWARE ////////////////////
////////////////////////////////////////////////////////////
server.put(`/projectsNotMiddleware/:index`, (req, res) => {
  const { index } = req.params;
  const project = req.body;
  projectsNotMiddleware[index] = project;
  return res.json(project);
});
///////////////////////////////////////////////////////////
////////////METODO DELETE SEM O MIDDLEWARE/////////////////
///////////////////////////////////////////////////////////
server.delete(`/projectsNotMiddleware/:index`, (req, res) => {
  const { index } = req.params;
  projectsNotMiddleware.splice(index, 1);
  return res.send();
});

/////////////////////////////////////////////////////////
//////////////////// COM MIDDLEWARE /////////////////////
////////////////////////////////////////////////////////
const projects = [];

server.get(`/projects`, (req, res) => {
  return res.json(projectsNotMiddleware);
});
// server.post(``);
server.listen(3000);
