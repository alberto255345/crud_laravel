import React, { useState, useEffect } from 'react';
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const CrudList = ({ cruds, setcruds, editItemId, setEditItemId, formValues, setFormValues, setShownumeros, toast }) => {
    // Este useEffect será chamado apenas quando 'cruds' mudar
    useEffect(() => {
    }, [cruds]); 

    // Função para deletar o item selecionado, passando o ID como parâmetro.
    const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8000/usuarios/${id}`);
    
          setcruds((prevcruds) => prevcruds.filter(crud => crud.ID !== id));
    
          // Lógica adicional se necessário
          toast.warn('Item excluído com sucesso.', {
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
          console.error('Erro ao deletar item:', error);
        }
      };

      // Função para preencher os campos do formulário ao editar
      const handleEdit = async (id) => {
        const itemToEdit = cruds.find((item) => item.ID === id);
        // se o item não for encontrado, retorna
        if (!itemToEdit) {
          return;
        }
        // telefoneinput será consultado pelo o axios e retornar um array, se ele for vazio tem que ser um array vazio
        const telefoneinputArray = await axios.get(`http://localhost:8000/telefone/${itemToEdit.ID}`);
        if (telefoneinputArray.data === '') {
          telefoneinputArray.data = [];
        }
        // pegar a quantidade de telefones do item a ser editado, para preencher o campo de quantidade de telefones do formulário
        const quantidadeTelefones = telefoneinputArray.data.length;
        setShownumeros(quantidadeTelefones)
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
      };
  
    return (
        <div className="cruds">
        <ul className="crud-list">
          {cruds.map(({NOME, CPF, created_at, ID, TELEFONE}, index) => (  
            <li className="li" key={index}> 
              <span className="crud-text" style={{width: '15%'}}>{NOME}</span>
              <span className="crud-text">{CPF}</span>
              <span className='crud-text'>{TELEFONE}</span>
              <span className="crud-text">Data de Criação: {format(parseISO(created_at), 'dd/MM/yyyy HH:mm')}</span>
              {editItemId != ID ?  <span className="span-button" onClick={() => handleDelete(ID)}><FontAwesomeIcon icon={faTrash} /></span> : ''}
              <span className="span-button" onClick={() => handleEdit(ID)}><FontAwesomeIcon icon={faEdit} /></span>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default CrudList;
