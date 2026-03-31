const { fetchWeather } = require('../api.js');

describe('Suíte de Testes API Open-Meteo (fetchWeather)', () => {
    
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('1. Nome de cidade válido retorna dados meteorológicos e localidade estruturada', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                results: [{ latitude: -23.55, longitude: -46.63, name: 'São Paulo', country: 'Brasil' }]
            })
        });

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                current_weather: { temperature: 25.4, is_day: 1, weathercode: 0 }
            })
        });

        const data = await fetchWeather('São Paulo');

        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(data.name).toBe('São Paulo');
        expect(data.temperature).toBe(25.4);
        expect(data.weathercode).toBe(0);
    });

    test('2. Nome de cidade inexistente lança exceção validada e tratada', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ results: [] })
        });

        await expect(fetchWeather('Hogwarts')).rejects.toThrow('A cidade "Hogwarts" não foi encontrada.');
        expect(global.fetch).toHaveBeenCalledTimes(1); 
    });

    test('3. Entrada vazia retorna erro instantâneo de validação', async () => {
        await expect(fetchWeather('')).rejects.toThrow('A entrada de cidade não pode estar vazia.');
        expect(global.fetch).toHaveBeenCalledTimes(0);
    });

    test('4. Falha de servidor ou instabilidade HTTP da API (Status 500) gera resposta adequada', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false, 
            status: 500
        });

        await expect(fetchWeather('Campinas')).rejects.toThrow('Falha de rede: Erro na comunicação com o servidor');
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('5. Limite de requisições da API excedido (Rate Limit Tolerância)', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ results: [{ latitude: 51.5, longitude: -0.12, name: 'London' }] })
        });

        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 429 
        });

        await expect(fetchWeather('London')).rejects.toThrow('Falha de rede: Não foi possível obter os dados climáticos');
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    test('6. Conexão de rede lenta ou desconectada repassando exceção nativa do Timeout', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network offline or Failed to fetch'));

        await expect(fetchWeather('Paris')).rejects.toThrow('Network offline or Failed to fetch');
    });

    test('7. Mudança inesperada, JSON malformado ou corrompido quebrando o parse', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => { throw new Error('Invalid JSON format'); }
        });

        await expect(fetchWeather('Santiago')).rejects.toThrow('Invalid JSON format');
    });

});
