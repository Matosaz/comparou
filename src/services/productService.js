// services/productService.js

import axios from "axios";
export async function searchHotels(cityCode) {
  try {
    const response = await axios.get('http://localhost:4000/api/hotels', {
      params: { cityCode }
    });
    // processa response.data conforme já faz
    return response.data.data.map(item => ({
      title: item.hotel.name,
      price: parseFloat(item.offers?.[0]?.price?.total || 0),
      store: item.hotel.chainCode || "Hotel",
      link: `https://www.google.com/search?q=${encodeURIComponent(item.hotel.name)}+hotel`,
      thumbnail: item.hotel.media?.[0]?.uri || 'https://via.placeholder.com/380x150'
    }));
  } catch (error) {
    console.error("Erro ao buscar hotéis:", error.message);
    return [];
  }
}
