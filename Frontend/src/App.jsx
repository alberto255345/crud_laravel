import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faEdit, faPlus, faMinus  } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from 'date-fns';
import { cpf } from 'cpf-cnpj-validator';
import { ToastContainer, toast } from 'react-toastify';
import SelectView from './components/selectview.jsx';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [cruds, setcruds] = useState([]);
  const [shownumeros, setShownumeros] = useState(1);
  const [submitButton, setSubmitButton] = useState(null);
  const [cpfValido, setCpfValido] = useState(true);
  // Estado para rastrear o ID do item em edição
  const [editItemId, setEditItemId] = useState(null);
  const [formValues, setFormValues] = useState({
    nome: '',
    cpf: '',
    telefoneinput: Array(shownumeros).fill(''),
    ddiinput: Array(shownumeros).fill(''),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/usuarios');
        setcruds(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos países:', error);
      }
    };

    fetchData();
  }, []); // Este useEffect será chamado sempre que o estado 'cruds' mudar

  // UseEffect para buscar dados adicionais quando o estado 'cruds' muda
  useEffect(() => {
    console.log('O estado cruds mudou:', cruds);
    // Faça qualquer outra coisa que você precise fazer quando 'cruds' mudar
  }, [cruds]); // Este useEffect será chamado apenas quando 'cruds' mudar


  // Função para incrementar a quantidade de inputs
  const incrementInputs = () => {
    setShownumeros(shownumeros + 1);
    setFormValues({
      ...formValues,
      telefoneinput: [...formValues.telefoneinput, ''],
      ddiinput:      [...formValues.ddiinput, '']
    });
  };

  // Função para decrementar a quantidade de inputs
  const decrementInputs = () => {
    if (shownumeros > 1) {
      setShownumeros(shownumeros - 1);
      setFormValues({
        ...formValues,
        telefoneinput: formValues.telefoneinput.slice(0, -1),
        ddiinput:      formValues.ddiinput.slice(0, -1)
      });
    }
  };

  const handleInputChange = (event) => {
    if(event.target.name === 'cpf'){
      // Remove qualquer caractere não numérico
      const numeroApenas = event.target.value.replace(/\D/g, '');
      event.target.value = numeroApenas;
      // Validar o CPF e atualizar o estado cpfValido
      const valido = cpf.isValid(numeroApenas);
      setCpfValido(valido);
      if(valido){
        event.target.value = cpf.format(numeroApenas);
      }
    }
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  // Função para formatar o número de telefone com tratamento de erro
  const formatarTelefone = (numero) => {
    try {
      if (!numero) {
        return ''; // Retorna uma string vazia se o número estiver vazio
      }

      // Remover qualquer caractere não numérico
      const digits = numero.replace(/\D/g, '');

      // Verificar a quantidade de dígitos para aplicar a formatação correta
      if (digits.length === 11) {
        // Formatar número com 11 dígitos (e.g., telefone móvel com 9 dígitos)
        return `(${digits.slice(0, 2)}) ${digits[2]} ${digits.slice(3, 7)}-${digits.slice(7)}`;
      } else if (digits.length === 10) {
        // Formatar número com 10 dígitos (e.g., telefone fixo sem o 9 inicial)
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else {
        // Retornar o número original caso não tenha 10 ou 11 dígitos
        return phoneNumber;
      }
    } catch (error) {
      console.error('Erro ao formatar o número de telefone:', error);
      return numero; // Retorna o número original em caso de erro
    }
  };

  // Função para cancelar a edição
  const cancelEdit = () => {
    setFormValues({
      nome: '',
      cpf: '',
      telefoneinput: Array(shownumeros).fill(''),
      ddiinput: Array(shownumeros).fill(''),
    });
    setEditItemId(null);
    handleButtonClick(null); // Oculta todos os botões
  };

  // Função para preencher os campos do formulário ao editar
  const handleEdit = async (id) => {
    const itemToEdit = cruds.find((item) => item.ID === id);
    console.log(itemToEdit);
    // se o item não for encontrado, retorna
    if (!itemToEdit) {
      return;
    }
    // telefoneinput será consultado pelo o axios e retornar um array, se ele for vazio tem que ser um array vazio
    const telefoneinputArray = await axios.get(`http://localhost:8000/telefone/${itemToEdit.ID}`);
    if (telefoneinputArray.data === '') {
      telefoneinputArray.data = [];
    }
    // telefoneinput vou tranformar em um array simples do campo TELEFONE
    const telefoneinputArraySimples = telefoneinputArray.data.map(telefone => telefone.TELEFONE);

    const ddiinputArray = telefoneinputArray.data.map(telefone => telefone.COUNTRY_CODE);

    // Preencher os campos do formulário com os valores do item a ser editado
    setFormValues({
      nome: itemToEdit.NOME,
      cpf: itemToEdit.CPF,
      telefoneinput: telefoneinputArraySimples,
      ddiinput: ddiinputArray,
    });
    setEditItemId(id);
    handleButtonClick('update-button'); // Mostra o botão de atualização
  };

  const handleTelefoneChange = (index, value) => {
    // Remove qualquer caractere não numérico
    const numeroApenas = value.replace(/\D/g, '');
    // Validar o telefone se ele tem 8 ou 9 digitos, se tiver mais deleta o ultimo digito
    if (numeroApenas.length > 11) {
      value = numeroApenas.slice(0, -1);
    }
    value = formatarTelefone(value);

    const newTelefoneInput = [...formValues.telefoneinput];
    newTelefoneInput[index] = value;

    // Verificar se ddiinput para este índice é vazio ou nulo
    const valorDDIAtual = formValues.ddiinput[index];
    const novoDDI = valorDDIAtual === '' || valorDDIAtual === null ? '1' : valorDDIAtual;

    // Atualizar o valor de ddiinput no estado formValues
    const novosDDIs = [...formValues.ddiinput];
    novosDDIs[index] = novoDDI;

    setFormValues({
      ...formValues,
      telefoneinput: newTelefoneInput,
      ddiinput: novosDDIs,
    });
  };

  const handleDDIChange = (index, value) => {
    const newDDIInput = [...formValues.ddiinput];
    newDDIInput[index] = value;
    setFormValues({
      ...formValues,
      ddiinput:      newDDIInput
    });
  };

  const handleButtonClick = (buttonId) => {
    setSubmitButton(buttonId);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se submitButton é igual a addBtn, se for igual continue se não for encerre
    if (submitButton !== 'addBtn') {
      return;
    }

    // verifica se os campos estão vazios
    if (formValues.nome === '' || formValues.cpf === '' || formValues.telefoneinput.some(telefone => telefone === '') || formValues.ddiinput.some(ddi => ddi === '')) {
      toast.warn('Por favor, preencha todos os campos.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        return;
    }

    // Se o CPF for válido, pode prosseguir com o envio do formulário
    if (cpfValido) {
      // Seu código de envio do formulário aqui
      console.log('Formulário enviado!');
    } else {
      // Exibir toast de erro se o CPF for inválido
      toast.warn('CPF inválido. Por favor, corrija o CPF.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        return;
    }

    try {
      // Crie um objeto com os dados que deseja enviar para a API
      const data = new FormData();
      data.append('nome', formValues.nome);
      data.append('cpf', formValues.cpf);

      // Adicione os números de telefone ao FormData
      formValues.telefoneinput.forEach((telefone, index) => {
        data.append(`telefoneinput[${index}]`, telefone);
      });

      // Adiciona os ddi de telefone ao FormData
      formValues.ddiinput.forEach((ddi, index) => {
        data.append(`ddiinput[${index}]`, ddi);
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

      // Atualize o estado 'cruds' com os dados recebidos da API
      setcruds((prevcruds) => [...prevcruds, response.data]);

      // Limpar os campos do formulário
      setFormValues({
        nome: '',
        cpf: '',
        telefoneinput: [''],
        ddiinput: ['']
      });

      // Lógica adicional se necessário
      console.log('Resposta da API:', response.data);
    } catch (error) {
      // Lógica de tratamento de erro
      console.error('Erro ao enviar requisição:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/usuarios/${id}`);

      setcruds((prevcruds) => prevcruds.filter(crud => crud.ID !== id));

      // Lógica adicional se necessário
      console.log('Item excluído com sucesso:', response.data);
    } catch (error) {
      // Lógica de tratamento de erro
      console.error('Erro ao deletar item:', error);
    }
  };

  return (
    <div className='crud-app'>
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
              style={{ display: editItemId ? 'none' : 'inline' }}
              className="add"
            >
              Cadastrar
            </button>
            <button
              type="submit"
              onClick={() => handleButtonClick('uptBtn')}
              className="add"
              id="update-button"
              style={{ display: editItemId ? 'inline' : 'none' }}
            >
              Update
            </button>
            <button
              type="button"
              className="add"
              id="cancel-edit-button"
              style={{ display: editItemId ? 'inline' : 'none' }}
              onClick={cancelEdit}
            >
              Cancelar Edição
            </button>
        </div>

        <div className="input-grid">
        <input
          id="crudInputNome"
          type="text"
          name="nome"
          placeholder="Nome..."
          value={formValues.nome}
          onChange={handleInputChange}
          />
        <div style={{position: 'relative'}}>
          <input
            id="crudInputCpf"
            type="text"
            name="cpf"
            placeholder="CPF..."
            value={formValues.cpf}
            onChange={handleInputChange}
            />
          {!cpfValido && <span style={{ 
            color: '#b10000',     
            zIndex: '1',
            position: 'absolute',
            top: '50px',
            left: '14px',
            fontSize: '12px',
          }}>CPF inválido. Por favor, corrija o CPF.</span>}
        </div>
          {formValues.telefoneinput.map((value, index) => (
            <div key={index} className='conjun'>
              <SelectView 
                chave={index} 
                name={`ddiinput[${index}]`} 
                handleDDIChange={(novoDDI) => handleDDIChange(index, novoDDI)}
              />
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
      <div className="cruds">
        <ul className="crud-list">
          {cruds.map(({NOME, CPF, created_at, ID}, index) => (  
            <li className="li" key={index}> 
              <span className="crud-text">{NOME}</span>
              <span className="crud-text">{CPF}</span>
              <span className='crud-text'></span>
              <span className="crud-text">Data de Criação: {format(parseISO(created_at), 'dd/MM/yyyy HH:mm')}</span>
              <span className="span-button" onClick={() => handleDelete(ID)}><FontAwesomeIcon icon={faTrash} /></span>
              <span className="span-button" onClick={() => handleEdit(ID)}><FontAwesomeIcon icon={faEdit} /></span>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </div>
  )
}

export default App
