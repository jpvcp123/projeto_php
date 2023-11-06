import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SneakersService from '../services/sneakers_service';
// import './PesquisarProdutos.css'; 

function PesquisarProdutos() {
  const [sneakers, setSneakers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSneakers, setFilteredSneakers] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const snkrAPI = new SneakersService().getAllSneakers();
      //   let i = 0
    //   for(i = 1; i<=10; i++){
    //     console.log(snkrAPI.data.sneakers.collection_slugs[0])
    //   }
      setSneakers(snkrAPI.sneakers);
    };
    getApi();
  }, []);

  useEffect(() => {
    // Filtre os tênis com base na pesquisa
    const filteredResults = sneakers.filter((sneaker) =>
    sneaker.collection_slugs.join('').toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSneakers(filteredResults);
  }, [searchQuery, sneakers]);

  const addInTheCar = (idSneaker) => {
    axios
      .post("http://localhost:5500/crudphp/cadastrar.php", { idSneaker })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    console.log(idSneaker);
  };

  return (
    <div className="pesquisar-produtos-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar tênis"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="sneakers-list">
      {filteredSneakers.map((sneaker) => (
  <div key={sneaker.id} className="divSneakers">
    <img className='airJordanImg' src={sneaker.main_picture_url} alt="sneaker" />
    <p className='sneakerName'>{sneaker.collection_slugs[0]}</p>
    <p className='adicionarCarrinho' onClick={() => addInTheCar(sneaker.id)}>Adicionar ao carrinho</p>
  </div>
))}
      </div>
    </div>
  );
}

export default PesquisarProdutos;

