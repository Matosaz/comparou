import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:5173'
}));app.use(express.json());

const AMADEUS_API = "https://test.api.amadeus.com";
const CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
const CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;

let accessToken = null;

// 🔹 Função para obter o token
async function getAccessToken() {
  if (accessToken) return accessToken;

  const res = await axios.post(`${AMADEUS_API}/v1/security/oauth2/token`, new URLSearchParams({
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  }));

  accessToken = res.data.access_token;
  return accessToken;
}

// 🔹 Rota para buscar hotéis por cidade
app.get("/api/hotels", async (req, res) => {
  try {
    const { cityCode } = req.query;
    if (!cityCode) return res.status(400).json({ error: "cityCode é obrigatório" });

    const token = await getAccessToken();

    // 1️⃣ Buscar hotéis na cidade
    const hotelsResponse = await axios.get(
      `${AMADEUS_API}/v1/reference-data/locations/hotels/by-city`,
      {
        params: { cityCode },
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const hotelIds = hotelsResponse.data.data
      .map(h => h.hotelId)
      .slice(0, 5) // pega só os 5 primeiros para não estourar a requisição
      .join(",");

    if (!hotelIds) return res.status(404).json({ error: "Nenhum hotel encontrado" });

    // 2️⃣ Buscar ofertas desses hotéis
    const offersResponse = await axios.get(
      `${AMADEUS_API}/v3/shopping/hotel-offers`,
      {
        params: { hotelIds },
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    res.json(offersResponse.data);

  } catch (err) {
    console.error("Erro na API Amadeus:", err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao buscar hotéis" });
  }
});

app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));
