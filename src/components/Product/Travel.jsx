// pages/Travel.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Travel.css'; // pode reutilizar o CSS existente
import { searchHotels } from '../../services/productService';

const TravelCard = ({ title, price, store, link, imageUrl }) => (
  <div className="product-card">
    <div className="product-card-content">
      <div className="image-card">
        <img src={imageUrl} alt={title} />
      </div>
      <h4 className="product-card-title">{title}</h4>
      <p className="product-card-price">R$ {price?.toFixed(2)}</p>
      <p className="product-card-store">{store}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button className="product-card-button">Ver Hotel</button>
      </a>
    </div>
  </div>
);

const Travel = () => {
  const location = useLocation();
const cityCode = new URLSearchParams(location.search).get('cityCode');

  const [hotels, setHotels] = useState([]);
  const [bestHotel, setBestHotel] = useState(null);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (cityCode) {
    setLoading(true);
    searchHotels(cityCode).then((res) => {
      if (res.length > 0) {
        const sorted = [...res].sort((a, b) => a.price - b.price);
        setBestHotel(sorted[0]);
        setHotels(sorted.slice(1));
      } else {
        setHotels([]);
        setBestHotel(null);
      }
      setLoading(false);
    });
  }
}, [cityCode]);

  return (
    <div className="product-container">
      <h1 className="product-title">Resultados para Hotéis</h1>

      {cityCode ? (
        <h3 className="product-subtitle">Cidade pesquisada: <span>{cityCode}</span></h3>
      ) : (
        <h3 className="product-subtitle">Nenhum destino informado.</h3>
      )}

      {loading ? (
        <p>🔄 Buscando hotéis...</p>
      ) : (
        <>
          {bestHotel && (
            <div className="best-product">
              <h3>🔥 Melhor Preço</h3>
              <TravelCard {...bestHotel} />
            </div>
          )}

          <div className="products-result">
            <h3>Outras opções</h3>
            <div className="product-list">
              {hotels.map((h, i) => <TravelCard key={i} {...h} />)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Travel;
