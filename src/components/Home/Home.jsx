import React, {useState} from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
const Home = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim() !== "") {
            // Redireciona para a página Product e envia o termo como parâmetro (opcional)
navigate(`/travel?cityCode=${encodeURIComponent(query)}`);
        }
    };
    return (
        <div className='container'>
            <div className='Home-txt'>
                <h1 className='home-title'>Compare os preços de tudo que imaginar</h1>
                <h4 className='home-subtitle'>
                    Reunimos informações atualizadas de diversos sites e plataformas confiáveis para que você possa comparar preços, qualidade e condições de pagamento em um único lugar. Simplifique sua busca, economize tempo e dinheiro escolhendo a opção ideal para o seu orçamento e necessidades. 
                </h4>

            </div>
            <div className='search-section'>
                <input type="text"
                value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }}
                    }
                    placeholder='Digite o nome do produto'
                    className='search-bar' />
                <SearchIcon className='search-icon' sx={{ color: "#E94C88", }} />
                <button className='search-button' onClick={handleSearch}> Pesquisar</button>
            </div>
        </div>
    )
}

export default Home
