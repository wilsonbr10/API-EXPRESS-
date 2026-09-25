const express = require('express');
const app = express();
const PORT = 3000;
 
app.use(express.json());
 
let tarefas = [
  { id: 1, titulo: 'Estudar Express.js', concluida: false },
  { id: 2, titulo: 'Fazer os exercícios', concluida: false },
  { id: 3, titulo: 'Revisar middlewares', concluida: true },
];
 
app.get('/', (req, res) => {
  res.send('API de Tarefas no ar');
});
 
app.get('/tarefas', (req, res) => {
  const { concluida } = req.query;
 
  if (concluida === undefined) {
    return res.json(tarefas);
  }
 
  const filtroBooleano = concluida === 'true';
  const tarefasFiltradas = tarefas.filter((t) => t.concluida === filtroBooleano);
  res.json(tarefasFiltradas);
});
 
app.get('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);
 
  if (!tarefa) {
    return res.status(404).json({ erro: `Tarefa com id ${id} não encontrada` });
  }
 
  res.json(tarefa);
});
 
app.post('/tarefas', (req, res) => {
  if (!req.body.titulo) {
    return res.status(400).json({ erro: 'Campo "titulo" é obrigatório' });
  }
 
  const novaTarefa = {
    id: tarefas.length + 1,
    titulo: req.body.titulo,
    concluida: false,
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});
 
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});