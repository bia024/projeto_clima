# Projeto Clima: Previsão do Tempo Dinâmica

Uma aplicação web robusta para consulta de dados climáticos em tempo real, construída em **JavaScript Vanilla** e orientada a uma arquitetura escalável **(TRACI)**. 
A arquitetura adere a princípios focados na manipulação limpa do DOM, injeção de classes dinâmicas dependentes (`day` / `night`) baseada em dados meteorológicos, e é chancelada sob uma bateria de automações no Jest.

## 🚀 Tecnologias Integradas

O ecossistema dispensa bibliotecas pesadas de interface visual (como React ou Vue) para entregar uma experiência "Glassmorphism" 100% pura:

* **HTML5 Semântico:** Markup com regras W3C estruturado para transições dinâmicas via IDs injetados no Fetch.
* **CSS3 Nativo:** Layout minimalista flutuante reagente, que ajusta luminosidade das páginas globalmente dependendo da detecção `is_day`.
* **JavaScript ES6+:** Requisições `fetch` baseadas em `Async/Await`, com todo o sistema blindado via Tratamento Customizado de Erros TRACI e documentação estrutural limpa no padrão oficial **JSDoc**.
* **Jest (Node.js Test Environment):** Testes críticos sem desperdício de Carga de API utilizando módulos `.mockResolvedValueOnce()` encarregados do Unit Testing.

## ⚙️ Principais Funcionalidades

- **Consultas Globais Instantâneas:** Inserção do usuário converte qualquer local silenciosamente com a base em uma API Geocoding no backend.
- **Transição Temporal Integrada:** Detecção automática de fuso e sol (A interface abraça visualmente a paleta fria na ausência de luz de acordo com as informações globais).
- **Dicionário Embutido da OMC:** Todas as 30 chaves numéricas repassadas em formato *weathercode* geradas em resumos visuais (Da "Garoa" limpa e legível a ícones compatíveis via *Weather Icons* CDN).

## 📦 Serviços Consumidos da Área Externa (Open-Meteo)

1. **[Geocoding API](https://open-meteo.com/en/docs/geocoding-api):** Transforma `name={São Paulo}` nos vetores numéricos de `{latitude}, {longitude}`.
2. **[Forecast API](https://open-meteo.com/):** Entrega a temperatura térmica bruta e a string condicional.

## 🩺 Manuseio de Testes Unitários

O projeto está englobado sob os testes da **Jest**.
A bateria atual da suíte assegura comportamentos em casos limites e extremos com 100% de sucesso sem que o app sequer precise renderizar o ambiente HTML para a avaliação algorítmica:

- Inserções válidas em sucessão
- Erros de Validação Nativa
- Lapping do Rate Limit Tolerância (Extremo)
- Deserção Inesperada de Parse/Offline Local (Extremo)

### 💻 Executando Localmente na Sua Máquina

Para testar ou inspecionar todas as respostas mapeadas e formatadas pelos retornos:
1. Extraia o `projeto_clima` para seu diretório na máquina real.
2. Configure as dependências (Test Runner):
   ```bash
   npm install
   ```
3. Chame a suíte autônoma e espere pelo feedback globalizado:
   ```bash
   npm run test
   ```

## 📜 Docstrings Mapeadas (JSDoc)

Cada ponto primário de integração ou mutação das interfaces do DOM (ex: o `fetchWeather` bruto e exportável) é acompanhado pela docstring oficial descrevendo parâmetros `@param`, exceções assíncronas (`@throws`) e tutoriais rápidos `@example`.

## 🎓 Autoria

Desenvolvido por **Bianca Caetano** — Engenharia de Software.
[Conecte-se comigo no LinkedIn](https://www.linkedin.com/in/bia-caetano).

## 📄 Licenças Assinadas

Sob termos da prestigiada [Licença MIT](LICENSE.md), é possível inspecionar ou derivar os códigos do portfólio para outras naturezas de estudo de API e testes Jest.
