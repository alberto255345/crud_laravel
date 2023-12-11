import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CrudForm from './components/CrudForm.jsx';
import CrudList from './components/CrudList.jsx';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [cruds, setcruds] = useState([]);
  const [shownumeros, setShownumeros] = useState(1);
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
  }, []); 

  const definecruds = (cruds) => {
    setcruds(cruds);
  }

  return (
    <div className='crud-app'>
      <CrudForm
        cruds={cruds}
        setCruds={definecruds}
        shownumeros={shownumeros}
        setShownumeros={setShownumeros}
        editItemId={editItemId}
        setEditItemId={setEditItemId}
        formValues={formValues}
        setFormValues={setFormValues}
      />

      <CrudList
        cruds={cruds}
        setcruds={setcruds}
        editItemId={editItemId}
        setEditItemId={setEditItemId}
        formValues={formValues}
        setFormValues={setFormValues}
        setShownumeros={setShownumeros}
      />

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
