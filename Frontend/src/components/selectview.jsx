import React, { useEffect, useState } from 'react';
import axios from 'axios';

function selectview() {
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pais');
        setPaises(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos países:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <select>
        {paises.map(pais => (
          <option key={pais.ID} value={pais.ID}>
            {pais.NOME_PAIS}
          </option>
        ))}
      </select>
    </>
  );
}

export default selectview;
