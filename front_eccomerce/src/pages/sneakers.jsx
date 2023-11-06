import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SneakersService from '../services/sneakers_service';

function Sneakers() {
    
  const [sneakers, setSneakers] = useState([]);

  const getApi = async () => {
    const snkrAPI = new SneakersService().getAllSneakers();
    setSneakers(snkrAPI.sneakers);
  }

  useEffect(() => {getApi()}, []);

  const addInTheCar = (idSneaker, urlSneaker) => {
    const data = { idSneaker: idSneaker, urlSneaker: urlSneaker }; // Include urlSneaker in the data
    axios
      .post("http://localhost:5500/crudphp/cadastrar.php", data )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
      console.log(idSneaker)

      window.location = "/carrinho"
}

  const airJordans = sneakers.filter((sneaker) => sneaker.brand_name === 'Air Jordan');

  return (
    <div className='container'>
        {airJordans.map((airJordan) => 
        <div key={airJordan.id} className='divSneakers'>
            <img className='airJordanImg' src={airJordan.main_picture_url} alt="sneaker"/>
            <p className='sneakerName'>{airJordan.brand_name}</p>
            <p className='adicionarCarrinho' name="idSneaker" onClick={() => addInTheCar(airJordan.id, airJordan.main_picture_url)}>Adicionar ao carrinho</p>
            <Link to={`/detalhes/${airJordan.id}`} className='adicionarCarrinho'>Detalhes</Link>
        </div>)}
    </div>
  )
}

export default Sneakers;