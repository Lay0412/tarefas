import React, { useEffect, useState } from 'react';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const tarefasResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
        const tarefasData = await tarefasResponse.json();
        setTarefas(tarefasData);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const usuariosResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuariosData = await usuariosResponse.json();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchTarefas();
    fetchUsuarios();
  }, []);

  const obterNomeUsuario = (userId) => {
    const usuario = usuarios.find((user) => user.id === userId);
    return usuario ? usuario.name : 'Usuário desconhecido';
  };

  const handleTarefaClick = (id) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completed: !tarefa.completed } : tarefa
      )
    );
  };

  return (
    <div className='container'>
      <h1>Tarefas</h1>
  
      <div className="tarefas-pendentes">
        <h2>Tarefas Pendentes</h2>
        {tarefas
          .filter((tarefa) => !tarefa.completed)
          .map((tarefa) => (
            <div key={tarefa.id} onClick={() => handleTarefaClick(tarefa.id)}>
              <p>
                <strong>{obterNomeUsuario(tarefa.userId)}: </strong>
                {tarefa.title}
              </p>
            </div>
          ))}
      </div>
 <div className="tarefas-completas">
 <h2>Tarefas Completas</h2>
 {tarefas
   .filter((tarefa) => tarefa.completed)
   .map((tarefa) => (
     <div key={tarefa.id} onClick={() => handleTarefaClick(tarefa.id)}>
       <p>
         <strong>{obterNomeUsuario(tarefa.userId)}: </strong>
         <strike>{tarefa.title}</strike>
       </p>
     </div>
      
          ))}
      </div>
    </div>
  );
}

export default App;
