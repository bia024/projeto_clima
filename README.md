# Projeto Clima: Previsão do Tempo

Este projeto consiste em uma aplicação web de previsão do tempo desenvolvida em JavaScript puro (Vanilla JS), HTML5 e CSS3. Criada com o objetivo de demonstrar a construção de interfaces responsivas de alta qualidade visual e o consumo eficiente de APIs externas.

## Tecnologias Utilizadas

* HTML5 (Estrutura e semântica)
* CSS3 (Estilização avançada, Glassmorphism, animações e responsividade)
* JavaScript Puro (ES6+, Fetch API, Async/Await, manipulação do DOM)

## Funcionalidades

* Interface limpa, moderna e totalmente responsiva.
* Busca dinâmica de clima a partir de qualquer cidade.
* Feedbacks visuais e tratamento de status (estados de carregamento).
* Tratamento e prevenção de erros no lado do cliente.
* Apresentação das informações básicas do clima:
  * Temperatura atual (Celsius)
  * Velocidade dos ventos (km/h)

## Consumo de API Externa

Este projeto utiliza o ecosistema do serviço gratuito Open-Meteo para os dados em tempo real, consistindo de uma arquitetura baseada em dois endpoints principais:
1. Geocoding API: Responsável por localizar e converter a cidade digitada em coordenadas exatas (latitude e longitude).
2. Forecast API: Realiza a validação climática utilizando as coordenadas extraídas no passo anterior, priorizando os dados do tempo atual e imediato da região.

## Autora

Desenvolvido por Bianca Caetano (Estudante de Engenharia de Software).
LinkedIn: https://www.linkedin.com/in/bia-caetano

## Licença

Este projeto encontra-se respaldado e disponibilizado de forma aberta prevê a Licença MIT. Para mais informações, consulte o arquivo LICENSE.md neste repositório.
