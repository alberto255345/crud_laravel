import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cpf } from 'cpf-cnpj-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectView from './selectview.jsx';

const CrudForm = ({ cruds, setCruds, shownumeros, setShownumeros, editItemId, setEditItemId, formValues, setFormValues  }) => {
    const [cpfValido, setCpfValido] = useState(true);
    const [submitButton, setSubmitButton] = useState(null);
    const apiUrl = import.meta.env.APP_URL || 'http://localhost:8000/usuarios';
    

    // Função para especificar qual butão foi clicado
    const handleButtonClick = (buttonId) => {
        setSubmitButton(buttonId);
    };

    // Função para incrementar a quantidade de inputs
    const incrementInputs = () => {
        setShownumeros(shownumeros + 1);
        setFormValues({
            ...formValues,
            telefoneinput: [...formValues.telefoneinput, ''],
            ddiinput: [...formValues.ddiinput, '']
        });
    };

    // Função para decrementar a quantidade de inputs
    const decrementInputs = () => {
        if (shownumeros > 1) {
            setShownumeros(shownumeros - 1);
            setFormValues({
                ...formValues,
                telefoneinput: formValues.telefoneinput.slice(0, -1),
                ddiinput: formValues.ddiinput.slice(0, -1)
            });
        }
    };

    // Função para formatar o telefone e salvar no form
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

    // Função para atualizar os valores de Nome e CPF quando o valor é alterado
    const handleInputChange = (event) => {
        if (event.target.name === 'cpf') {
            // Remove qualquer caractere não numérico
            const numeroApenas = event.target.value.replace(/\D/g, '');
            event.target.value = numeroApenas;
            // Validar o CPF e atualizar o estado cpfValido
            const valido = cpf.isValid(numeroApenas);
            setCpfValido(valido);
            if (valido) {
                event.target.value = cpf.format(numeroApenas);
            }
        }
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    };

    // Função para atualizar os valores dos inputs de telefone e ddi quando o valor do índice é alterado
    const handleDDIChange = (index, value) => {
        const newDDIInput = [...formValues.ddiinput];
        newDDIInput[index] = value;
        setFormValues({
            ...formValues,
            ddiinput: newDDIInput
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
                return digits;
            }
        } catch (error) {
            console.error('Erro ao formatar o número de telefone:', error);
            return numero; // Retorna o número original em caso de erro
        }
    };

    // Função de submeter as alterações do formulário ao Backend, tanto atualização quanto incrementação de dados
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verifica se submitButton é igual a addBtn, se for igual continue se não for encerre
        if (submitButton !== 'addBtn' && submitButton !== 'uptBtn') {
            return;
        }

        // se sumbitButton for igual a uptBtn, irá deletar os dados
        if (submitButton === 'uptBtn') {
            try {
                const response_delete = await axios.delete(`${apiUrl}/usuarios/${editItemId}`);
                setCruds((prevcruds) => prevcruds.filter(crud => crud.ID !== editItemId));
            } catch (error) {
                console.error('Erro ao deletar', error);
                toast.error('Erro ao atualizar o item.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
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
        if (!cpfValido) {
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
            const response = await axios.post(`${apiUrl}/usuarios`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data && response.data.errors) {
                const errorMessage = response.data.errors.cpf[0] || 'Erro desconhecido';
                setErrorPopup(errorMessage);
            }

            // Atualize o estado 'cruds' com os dados recebidos da API
            setCruds((prevcruds) => [...prevcruds, response.data]);

            // Limpar os campos do formulário
            setFormValues({
                nome: '',
                cpf: '',
                telefoneinput: [''],
                ddiinput: ['']
            });

            setEditItemId(null);
            const mensagem = editItemId ? 'Item atualizado com sucesso!' : 'Item adicionado com sucesso!';
            toast.success(mensagem, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            // Lógica de tratamento de erro
            console.error('Erro ao enviar requisição:', error);
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
        setShownumeros(1);
        handleButtonClick(null); // Oculta todos os botões
    };

    return (
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
                Acrescentar Telefone
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
                Remover Telefone
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
        {editItemId && <input type="hidden" name="id" value={editItemId} />}
            {formValues.telefoneinput.map((value, index) => (
            <div key={index} className='conjun'>
                <SelectView 
                chave={index} 
                select={formValues.ddiinput[index]}
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
    );
}

export default CrudForm;
