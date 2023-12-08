import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import './TodoList.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log('O estado todo mudou:', todos);
  }, [todos]); // Este useEffect será chamado sempre que o estado 'todo' mudar


  const handleAddTodo = async () => {
    const newTodo = {
      text: 'Novo Todo',
    };

    try {
      const response = await axios.get('localhost:8000/usuarios', newTodo);
      console.log(response.data);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`sua-api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Erro ao excluir todo:', error);
    }
  };

  const handleToggleDetails = (id) => {
    // Implemente a lógica para alternar a visibilidade dos detalhes do todo
  };

  return (
    // <div className="container mx-auto p-4">
    //   <button
    //     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //     onClick={handleAddTodo}
    //   >
    //     Adicionar Todo
    //   </button>
    //   <ul className="mt-4">
    //     <TransitionGroup>
    //       {todos.map((todo) => (
    //         <CSSTransition key={todo.id} timeout={500} classNames="fade">
    //           <li className="border-t border-gray-300 py-2 flex items-center justify-between">
    //             <div
    //               className="cursor-pointer"
    //               onClick={() => handleToggleDetails(todo.id)}
    //             >
    //               {todo.text}
    //             </div>
    //             <button
    //               className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
    //               onClick={() => handleDeleteTodo(todo.id)}
    //             >
    //               Excluir
    //             </button>
    //             {/* Adicione aqui o conteúdo dos detalhes do todo */}
    //           </li>
    //         </CSSTransition>
    //       ))}
    //     </TransitionGroup>
    //   </ul>
    // </div>
    <div>
      <p>Test</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddTodo}
      />
    </div>
  )
}

export default App
