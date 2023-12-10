import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faEdit, faPlus, faMinus  } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from 'date-fns';
import SelectView from './components/selectview.jsx';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [shownumeros, setShownumeros] = useState(1);
  const [submitButton, setSubmitButton] = useState(null);
  const [formValues, setFormValues] = useState({
    nome: '',
    cpf: '',
    telefoneinput: Array(shownumeros).fill('')
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/usuarios');
        setTodos(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos países:', error);
      }
    };

    fetchData();
  }, []); // Este useEffect será chamado sempre que o estado 'todo' mudar

  // UseEffect para buscar dados adicionais quando o estado 'todos' muda
  useEffect(() => {
    console.log('O estado todo mudou:', todos);
    // Faça qualquer outra coisa que você precise fazer quando 'todos' mudar
  }, [todos]); // Este useEffect será chamado apenas quando 'todos' mudar


  // Função para incrementar a quantidade de inputs
  const incrementInputs = () => {
    setShownumeros(shownumeros + 1);
    setFormValues({
      ...formValues,
      telefoneinput: [...formValues.telefoneinput, '']
    });
  };

  // Função para decrementar a quantidade de inputs
  const decrementInputs = () => {
    if (shownumeros > 1) {
      setShownumeros(shownumeros - 1);
      setFormValues({
        ...formValues,
        telefoneinput: formValues.telefoneinput.slice(0, -1)
      });
    }
  };

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  const handleTelefoneChange = (index, value) => {
    const newTelefoneInput = [...formValues.telefoneinput];
    newTelefoneInput[index] = value;
    setFormValues({
      ...formValues,
      telefoneinput: newTelefoneInput
    });
  };

  const handleButtonClick = (buttonId) => {
    setSubmitButton(buttonId);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Crie um objeto com os dados que deseja enviar para a API
      const data = new FormData();
      data.append('nome', formValues.nome);
      data.append('cpf', formValues.cpf);

      // Adicione os números de telefone ao FormData
      formValues.telefoneinput.forEach((telefone, index) => {
        data.append(`telefoneinput[${index}]`, telefone);
      });

      // Faça a requisição para a API usando o Axios
      const response = await axios.post('http://localhost:8000/usuarios', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data && response.data.errors) {
        const errorMessage = response.data.errors.cpf[0] || 'Erro desconhecido';
        setErrorPopup(errorMessage);
      }

      // Atualize o estado 'todos' com os dados recebidos da API
      setTodos((prevTodos) => [...prevTodos, response.data]);

      // Lógica adicional se necessário
      console.log('Resposta da API:', response.data);
    } catch (error) {
      // Lógica de tratamento de erro
      console.error('Erro ao enviar requisição:', error);
    }
  };

  return (
    <div className='todo-app'>
      <form className="input-section" onSubmit={handleSubmit}>
        <div className="input-grid">
            <button 
              id="addNumb" 
              type="number" 
              onClick={() => {
                incrementInputs();
                handleButtonClick('addNumb');
              }}
              className="add">
                Incrementar Telefone
            </button>
            <button
              id="removeNumb"
              type="button"
              onClick={() => {
                decrementInputs();
                handleButtonClick('removeNumb');
              }}
              className="add"
            >
              Decrementar Telefone
            </button>
            <button
              id="addBtn"
              type="submit"
              onClick={() => handleButtonClick('addBtn')}
              className="add"
            >
              Cadastrar
            </button>
            <button
              type="button"
              className="add"
              id="update-button"
              style={{ display: "none"}}
            >
              Update
            </button>
        </div>

        <div className="input-grid">
        <input
          id="todoInputNome"
          type="text"
          name="nome"
          placeholder="Nome..."
          value={formValues.nome}
          onChange={handleInputChange}
          />
        <input
          id="todoInputCpf"
          type="text"
          name="cpf"
          placeholder="CPF..."
          value={formValues.cpf}
          onChange={handleInputChange}
          />
          {formValues.telefoneinput.map((value, index) => (
            <div key={index} className='conjun'>
              <SelectView chave={index} name={`ddiinput[${index}]`} />
              <input
                key={index}
                type="text"
                name={`telefoneinput[${index}]`}
                placeholder={`Telefone ${index + 1}...`}
                value={value}
                className='cnormal'
                onChange={(e) => handleTelefoneChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </form>
      <div className="todos">
        <ul className="todo-list">
          {todos.map(({NOME, CPF, created_at}, index) => (  
            <li className="li" key={index}> 
              <input className="form-check-input" type="checkbox" value="option1"/>
              <label className="form-check-label" htmlFor="inlineCheckbox1"></label>
              <span className="todo-text">{NOME}</span>
              <span className="todo-text">{CPF}</span>
              <span className="todo-text">Data de Criação: {format(parseISO(created_at), 'dd/MM/yyyy HH:mm')}</span>
              <span className="span-button"><FontAwesomeIcon icon={faTrash} /></span>
              <span className="span-button"><FontAwesomeIcon icon={faEdit} /></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
