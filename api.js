document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    
    // Elementos da interface
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error-message');
    const resultEl = document.getElementById('weather-result');
    
    // Elementos de exibição de dados
    const resultCity = document.getElementById('result-city');
    const resultTemp = document.getElementById('result-temp');
    const resultWind = document.getElementById('result-wind');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const city = cityInput.value.trim();
        if (!city) return;

        // Reset UI
        hideAll();
        showElement(loadingEl);
        searchBtn.disabled = true;

        try {
            // 1. Fetch de coordenadas via Open-Meteo Geocoding API
            // Utilizando o encodeURIComponent para evitar problemas com caracteres exóticos (ex: acentos e espaços)
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`);
            
            if (!geoRes.ok) {
                throw new Error('Erro na comunicação com a API de localização.');
            }
            
            const geoData = await geoRes.json();
            
            if (!geoData.results || geoData.results.length === 0) {
                throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
            }

            const { latitude, longitude, name, admin1, country } = geoData.results[0];

            // 2. Fetch do clima nas coordenadas obtidas acima
            // API de previsão (Open-Meteo) com "current_weather=true" ativado
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            
            if (!weatherRes.ok) {
                throw new Error('Erro ao buscar os dados do clima.');
            }

            const weatherData = await weatherRes.json();
            const current = weatherData.current_weather;

            // Formatação do nome (Ex: "São Paulo, SP" ou "Paris, France")
            const locationStr = admin1 ? `${name}, ${admin1}` : `${name}, ${country}`;
            
            // Atualiza a visualização (DOM)
            resultCity.textContent = locationStr;
            // Arredonda a temperatura para evitar centavos de grau desnecessário
            resultTemp.textContent = Math.round(current.temperature);
            resultWind.textContent = `${current.windspeed} km/h`;

            hideAll();
            showElement(resultEl);
        } catch (error) {
            hideAll();
            showError(error.message);
        } finally {
            searchBtn.disabled = false;
        }
    });

    // Funções auxiliares (Helpers)
    function hideAll() {
        loadingEl.classList.add('hidden');
        errorEl.classList.add('hidden');
        resultEl.classList.add('hidden');
    }

    function showElement(el) {
        el.classList.remove('hidden');
    }

    function showError(msg) {
        errorEl.textContent = msg;
        showElement(errorEl);
    }
});
