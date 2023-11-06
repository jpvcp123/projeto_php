import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SneakersService from '../services/sneakers_service';

function DetalhesTenis() {
  const { id } = useParams();
  

  const [tennisDetails, setTennisDetails] = useState(null);

  useEffect(() => {
    const fetchTennisDetails = async () => {
      try {
        const snkrAPI = new SneakersService().getAllSneakers();
        const foundTennis = snkrAPI.sneakers.find((tenis) => tenis.id.toString() === id);
        setTennisDetails(foundTennis);
      } catch (error) {
        console.error('Erro ao buscar detalhes do tênis:', error);
      }
    };

    fetchTennisDetails();
  }, [id]);

  return (
    <div className='container'>
      {tennisDetails ? (
        <div key={tennisDetails.id} className='divSneakers'>
          <img className='airJordanImg' src={tennisDetails.main_picture_url} alt="sneaker" />
          <p className='sneakerDescription'>Marca: {tennisDetails.brand_name}</p>
          <p className='sneakerDescription'>Caixa: {tennisDetails.box_condition}</p>
          <p className='sneakerDescription'>Categoria: {tennisDetails.category}</p>
          <p className='sneakerDescription'>Designer: {tennisDetails.designer}</p>
        </div>
      ) : (
        <p>Tênis não encontrado</p>
      )}
    </div>
  );
}

export default DetalhesTenis;
