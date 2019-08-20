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
// 
////////////////////////////////////////////////////////////
////////////////////// METODO GET /////////////////////////
///////////////////////////////////////////////////////////
server.get(`/projectsNotMiddleware`, (req, res) => {
  return res.json(projectsNotMiddleware);
});
////////////////////////////////////////////////////////////
/////////// METODO GETBYID PROJECT SEM MIDDLEWARE //////////
///////////////////////////////////////////////////////////
server.get(`/projectsNotMiddleware/:id`, (req, res) => {
  const { id } = req.params;
  return res.json(projectsNotMiddleware[id]);
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
server.put(`/projectsNotMiddleware/:id`, (req, res) => {
  const { id } = req.params;
  const project = req.body;
  projectsNotMiddleware[id] = project;
  return res.json(project);
});
///////////////////////////////////////////////////////////
////////////METODO DELETE SEM O MIDDLEWARE/////////////////
///////////////////////////////////////////////////////////
server.delete(`/projectsNotMiddleware/:id`, (req, res) => {
  const { id } = req.params;
  projectsNotMiddleware.splice(id, 1);
  return res.send();
});
///////////////////////////////////////////////////////////
/////////////METODO POST TASKS SEM MIDDLEWARE//////////////
///////////////////////////////////////////////////////////
server.post(`/projectsNotMiddleware/:id/tasks`, verifyExistProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projectsNotMiddleware.find(p => p.id === id);
  project.tasks.push(title);
  return res.json(title);
});

/////////////////////////////////////////////////////////
//////////////////// COM MIDDLEWARE /////////////////////
////////////////////////////////////////////////////////
let numberOfRequests = 0;
const projects = [];

function logRequests(req, res, next) {
  numberOfRequests++;
  console.log(`Número de requisições: ${numberOfRequests}`);
  return next();
}

server.use(logRequests);

// MIDDLEWARES
function verifyExistProject(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }
  req.project = project;
  return next();
}

//////////////
server.get(`/projects`, (req, res) => {
  return res.json(projects);
});
server.post(`/projects`, (req, res) => {
  const { id, title } = req.body;
  const newProject = {
    id,
    title,
    tasks: []
  };
  projects.push(newProject);
  return res.json(newProject);
});

server.put(`/projects/:id`, verifyExistProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.title = title;
  return res.json(project);
});
server.delete(`/projects/:id`, verifyExistProject, (req, res) => {
  const { id } = req.params;
  const positionId = projects.findIndex(p => p.id === id);
  projects.splice(positionId, 1);
  return res.send();
});
//create tasks
server.post('/projects/:id/tasks', verifyExistProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  
  project.tasks.push(title);
  
  return res.json(project);
});
server.listen(3000);
