import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./carrinho.css"

function Carrinho() {
  const [sneakers, setSneakers] = useState([]);
  const [deletedSneakers, setDeletedSneakers] = useState([]); // Maintain a list of deleted sneakers

  const remover = async (idSneaker) => {
    try {
      console.log("antes DELETE request");
      await axios.delete(`http://localhost:5500/crudphp/excluir.php?idSneaker=${idSneaker}`);
      console.log("Depois DELETE request");
      getApi();
    } catch (error) {
      console.error(`Erro ao remover sneaker com idSneaker ${idSneaker}:`, error);
    }
  }

  const getApi = async () => {
    try {
      const response = await axios.get("http://localhost:5500/crudphp/cadastrar.php");
      // Filter out the deleted sneakers from the response
      const filteredSneakers = response.data.filter(sneaker => !deletedSneakers.includes(sneaker.idSneaker));
      setSneakers(filteredSneakers);
    } catch (error) {
      console.error("Erro ao buscar sneakers:", error);
    }
  }

  useEffect(() => {
    getApi();
  }, [deletedSneakers]); // Trigger getApi when deletedSneakers change

  return (
    <div className="carrinho-container">
      {sneakers.map((sneaker, index) => (
        <div key={index} className="divSneakers">
          <img src={sneaker.urlSneaker} alt="sneaker" className="airJordanImg" />
          <p className="sneakerName">{sneaker.brand_name}</p>
          <p className="adicionarCarrinho" onClick={() => remover(sneaker.idSneaker)}>remover</p>
        </div>
      ))}
    </div>
  );
}

export default Carrinho;
