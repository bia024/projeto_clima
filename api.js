/**
 * @fileoverview Integração principal de consumo das APIs Geocoding e Forecast da Open-Meteo.
 * Fornece métodos para captação robusta de dados climáticos e conversão visual sem dependências pesadas.
 */

if (typeof document !== 'undefined') {
document.addEventListener('DOMContentLoaded', () => {
    const searchCard = document.getElementById('search-card');
    const resultCard = document.getElementById('result-card');
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const homeBtn = document.getElementById('home-btn');
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error-message');
    const resultCity = document.getElementById('result-city');
    const resultTemp = document.getElementById('result-temp');
    const resultDesc = document.getElementById('result-desc');
    const resultDate = document.getElementById('result-date');
    const weatherIcon = document.getElementById('weather-icon');
    const resultHumidity = document.getElementById('result-humidity');
    const resultWind = document.getElementById('result-wind');
    const resultPrecip = document.getElementById('result-precip');

    const weatherMapping = {
        0: { desc: "Céu limpo", dayIcon: "wi-day-sunny", nightIcon: "wi-night-clear" },
        1: { desc: "Quase limpo", dayIcon: "wi-day-cloudy", nightIcon: "wi-night-alt-cloudy" },
        2: { desc: "Parcialmente nublado", dayIcon: "wi-day-cloudy", nightIcon: "wi-night-alt-cloudy" },
        3: { desc: "Nublado", dayIcon: "wi-cloudy", nightIcon: "wi-cloudy" },
        45: { desc: "Névoa", dayIcon: "wi-day-fog", nightIcon: "wi-night-fog" },
        48: { desc: "Névoa congelante", dayIcon: "wi-day-fog", nightIcon: "wi-night-fog" },
        51: { desc: "Chuvisco leve", dayIcon: "wi-day-showers", nightIcon: "wi-night-alt-showers" },
        53: { desc: "Chuvisco moderado", dayIcon: "wi-day-showers", nightIcon: "wi-night-alt-showers" },
        55: { desc: "Chuvisco denso", dayIcon: "wi-day-showers", nightIcon: "wi-night-alt-showers" },
        56: { desc: "Chuvisco congelante leve", dayIcon: "wi-day-sleet", nightIcon: "wi-night-alt-sleet" },
        57: { desc: "Chuvisco congelante intenso", dayIcon: "wi-day-sleet", nightIcon: "wi-night-alt-sleet" },
        61: { desc: "Chuva leve", dayIcon: "wi-day-rain", nightIcon: "wi-night-alt-rain" },
        63: { desc: "Chuva moderada", dayIcon: "wi-day-rain", nightIcon: "wi-night-alt-rain" },
        65: { desc: "Chuva forte", dayIcon: "wi-day-rain", nightIcon: "wi-night-alt-rain" },
        66: { desc: "Chuva congelante leve", dayIcon: "wi-day-rain-mix", nightIcon: "wi-night-alt-rain-mix" },
        67: { desc: "Chuva congelante forte", dayIcon: "wi-day-rain-mix", nightIcon: "wi-night-alt-rain-mix" },
        71: { desc: "Neve leve", dayIcon: "wi-day-snow", nightIcon: "wi-night-alt-snow" },
        73: { desc: "Neve moderada", dayIcon: "wi-day-snow", nightIcon: "wi-night-alt-snow" },
        75: { desc: "Neve forte", dayIcon: "wi-day-snow", nightIcon: "wi-night-alt-snow" },
        77: { desc: "Granizo de neve", dayIcon: "wi-day-hail", nightIcon: "wi-night-alt-hail" },
        80: { desc: "Pancadas de chuva leves", dayIcon: "wi-day-showers", nightIcon: "wi-night-alt-showers" },
        81: { desc: "Pancadas de chuva moderadas", dayIcon: "wi-day-showers", nightIcon: "wi-night-alt-showers" },
        82: { desc: "Pancadas violentas", dayIcon: "wi-day-showers", nightIcon: "wi-night-alt-showers" },
        85: { desc: "Pancadas de neve leves", dayIcon: "wi-day-snow", nightIcon: "wi-night-alt-snow" },
        86: { desc: "Pancadas de neve fortes", dayIcon: "wi-day-snow", nightIcon: "wi-night-alt-snow" },
        95: { desc: "Tempestade", dayIcon: "wi-day-thunderstorm", nightIcon: "wi-night-alt-thunderstorm" },
        96: { desc: "Tempestade com granizo leve", dayIcon: "wi-day-snow-thunderstorm", nightIcon: "wi-night-alt-snow-thunderstorm" },
        99: { desc: "Tempestade c/ granizo forte", dayIcon: "wi-day-snow-thunderstorm", nightIcon: "wi-night-alt-snow-thunderstorm" }
    };
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const city = cityInput.value.trim();
        if (!city) return;

        hideElement(errorEl);
        showElement(loadingEl);
        searchBtn.disabled = true;

        try {
            const weatherObj = await fetchWeather(city);
            updateInterface(weatherObj, weatherObj.name, weatherObj.admin1, weatherObj.country);
            hideElement(searchCard);
            showElement(resultCard);
        } catch (error) {
            showError(error.message);
        } finally {
            hideElement(loadingEl);
            searchBtn.disabled = false;
        }
    });

    homeBtn.addEventListener('click', () => {
        hideElement(resultCard);
        showElement(searchCard);
        cityInput.value = '';
        cityInput.focus();
    });
    
    /**
     * @function updateInterface
     * @description Injeta atributos baseando-se no corpo da resposta limpa da API. Modifica o Document Object Model e suas classes Night Themes.
     * @param {Object} current - Bloco retornado contendo as características do clima (Variáveis Avançadas).
     * @param {string} name - Base do nome regional da cidade requisitada no Input.
     * @param {string} admin1 - Região/Estado/Federação (quando contido na Geocoding via Open-Meteo).
     * @param {string} country - País do respectivo endpoint (Ex: Brasil).
     */
    function updateInterface(current, name, admin1, country) {
        const locationStr = admin1 ? `${name}, ${admin1}` : `${name}, ${country}`;
        resultCity.textContent = locationStr;
        
        resultTemp.textContent = Math.round(current.temperature);

        if (resultHumidity) resultHumidity.textContent = current.humidity;
        if (resultWind) resultWind.textContent = current.windspeed;
        if (resultPrecip) resultPrecip.textContent = current.precipitation;
        
        const radarMap = document.getElementById('radar-map');
        if (radarMap && current.latitude && current.longitude) {
            radarMap.src = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=5&overlay=radar&product=radar&level=surface&lat=${current.latitude}&lon=${current.longitude}`;
        }
        
        const mappedData = weatherMapping[current.weathercode] || { desc: "Desconhecido", dayIcon: "wi-na", nightIcon: "wi-na" };
        resultDesc.textContent = mappedData.desc;
        
        weatherIcon.className = "wi"; 
        
        if (current.is_day === 1) {
            weatherIcon.classList.add(mappedData.dayIcon);
            document.body.className = 'day'; 
        } else {
            weatherIcon.classList.add(mappedData.nightIcon);
            document.body.className = 'night'; 
        }
        
        resultDate.textContent = formatCurrentDate();
    }

    /**
     * @function formatCurrentDate
     * @description Formata a rotina do new Date num display String polido por extensos utilizando o Intl.DateTimeFormat (PT-BR).
     * @returns {string} String do tempo atual nativo da janela. Exemplo: "sexta-feira, 25 de outubro de 2029"
     */
    function formatCurrentDate() {
        return new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date());
    }

    function hideElement(el) { el.classList.add('hidden'); }
    function showElement(el) { el.classList.remove('hidden'); }

    function showError(msg) {
        if (msg.includes('|')) {
            const parts = msg.split('|');
            errorEl.innerHTML = `<strong style="display:block;margin-bottom:6px;font-size:1.05em;">${parts[0]}</strong><p style="font-size:0.9em;">${parts[1]}</p>`;
        } else {
            errorEl.textContent = msg;
        }
        showElement(errorEl);
    }
});
}

/**
 * @async
 * @function fetchWeather
 * @description Realiza requisições HTTP seguidas em cascata. Converte parâmetros numéricos (Latitude/Longitude da Geocoding API) para buscar simultaneamente um resultado confiável da Forecast Open-Meteo (Agora com Vento, Umidade e Precipitação extraídos).
 * @param {string} city - Identificador de lugar inserido na barra de input do form submetido.
 * @returns {Promise<Object>} Promessa resolvida com mapeamento das mesclagens absolutas { current_weather, humidity, precipitation, nome_da_cidade, admin_estado, nome_pais }.
 * @throws {Error} Retorna e isola falhas assíncronas em casos críticos estrtuturais: Vazio da caixa (vazias, Null), não alcance da cidade via Results Index, e HTTP-Drops de servidor.
 * 
 * @example
 * const metereologia = await fetchWeather('Tóquio');
 * console.log(`O tempo em ${metereologia.name} é de: ${metereologia.temperature}°C e a umidade é ${metereologia.humidity}%`);
 */
async function fetchWeather(city) {
    if (!city || city.trim() === '') {
        throw new Error("A entrada de cidade não pode estar vazia.");
    }

    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`);
    
    if (!geoRes.ok) throw new Error('Falha de rede: Erro na comunicação com o servidor (Geocoding).');
    
    const geoData = await geoRes.json();
    
    if (!geoData.results || geoData.results.length === 0) {
        throw new Error('Localidade não encontrada|Não conseguimos encontrar a busca requerida. Tente novamente.');
    }

    const { latitude, longitude, name, admin1, country } = geoData.results[0];

    // Alteração na Query da API para trazer Métricas Extra solicitadas na Opção 4
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&current=relative_humidity_2m,precipitation`);
    
    if (!weatherRes.ok) throw new Error('Falha de rede: Não foi possível obter os dados climáticos detalhados.');

    const weatherData = await weatherRes.json();
    
    return {
        ...weatherData.current_weather,
        latitude,
        longitude,
        humidity: weatherData.current?.relative_humidity_2m ?? 0,
        precipitation: weatherData.current?.precipitation ?? 0,
        name,
        admin1,
        country
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchWeather };
}
