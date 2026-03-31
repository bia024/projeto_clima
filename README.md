# Estação Climática em Tempo Real

Uma aplicação web orientada a serviços meteorológicos globais. O projeto permite a consulta instantânea de dados da atmosfera (como temperatura global, umidade relativa do ar, velocidade dos ventos e faixas de precipitação), integrando também um mapa de radar dinâmico via satélite livre para o acompanhamento ao vivo de frentes frias.

## 🚀 Tecnologias e Infraestrutura
* **HTML5 e CSS3:** Interface totalmente responsiva construída com medidas matemáticas relativas (`rem`, `vw`), garantindo leitura e estabilidade nativa desde mostradores de *Smartwatches* até monitores *Ultrawide*.
* **UX/UI Design:** Estilização baseada em paletas de alto contraste com temas adaptativos autônomos (Day/Night Mode fluidos ligados ao horário global do sol da região aferida), mimetizando a legibilidade focada em painéis de *Broadcasting Profissional*.
* **JavaScript ES6+:** Roteamento de dados operando a moderna Fetch API sob encapsulamentos assíncronos.
* **Jest:** Suíte de testes unitários Node.js cobrindo e documentando resiliência vital contra indisponibilidade de serviços HTTP de terceiros e *payloads* corrompidos na entrega.

## 🛡️ Auditoria e Transparência de Dados (Compliance)
- **Privacidade By-Design:** Zero armazenamento de tráfego, logs de localização ou injeção de *Local Storage*. As intenções de pesquisa operam de forma 100% volátil e decodificada unicamente na camada cliente.
- **Segurança Nativa:** Proteção direta contra intenções de *Cross-Site Scripting (XSS)* nos blocos de formulário empregando sanitizações limpas da string (`encodeURIComponent`). Todas as pontes de API impõem criptografia restrita de via única *TLS/HTTPS*.
- **Atribuições Autorais:** Cumprimento do licenciamento [SIL OFL 1.1](NOTICE.md) referente à tipografia do *Weather Icons* SVG e ao termo permissivo de gratuidade não-comercial de autoria pertencentes às fundações fornecedoras do *Open-Meteo* e *Windy*.

## ⚙️ Arquitetura Analítica
- **Radar Planar:** Um *iframe* visual embarcado e invisível aos travamentos de rede que recentraliza dinamicamente o mapa terrestre para a exata malha de Latitude e Longitude retornadas no primeiro `endpoint` de geocodificação da busca.
- **Métricas Criptografadas:** Tradução polida de mais de 30 condições meteorológicas brutas (WMO Interpretation Codes) processadas diretamente em Dicionários/Arrays da engine local (Acelerando o tempo de Payload dos servidores sem requerer tradução em nuvem).

### 💻 Instância e Testes Locais de Funcionalidade
Garanta estar rodando dentro de um repositório clonado no Terminal local com um framework Node ativo e realize os envios para visualizar o aval construtivo do Jest:
```bash
npm install
npm test
```

## 🎓 Engenharia e Autoria
Software documentado e construído por **Bianca Caetano** — Engenharia de Software.
[Acompanhe maiores descrições sistêmicas e os meus outros repositórios via LinkedIn](https://www.linkedin.com/in/bia-caetano).
