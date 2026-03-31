# Projeto Clima: Dashboard Metereológico Avançado 

Uma aplicação web robusta desenvolvida em **JavaScript Vanilla**, orientada a uma arquitetura escalável **(TRACI)** e preparada para o compliance global de mercado. Construída para consulta gráfica e rápida de dados da atmosfera em Tempo Real (Temperatura, Umidade, Vento e Precipitação). Todo o ecossistema é atestado por frameworks de automação de controle do Jest e rigidamente auditado sobre preceitos RGE de Segurança Corporativa.

## 🚀 Tecnologias Integradas
* **HTML5:** Marcação estrutural blindada contra SQLi e injetada nativamente com políticas em rodapé de LGPD/GDPR no Front.
* **CSS3 Nativo:** Layout minimalista flutuante acompanhando status automático de fuso-horários globais (*Glassmorphism Night / Light*).
* **JavaScript ES6+:** Requisições `fetch` assíncronas assinaladas e documentadas formalmente (`JSDoc`), formatando Strings e manipulando fluxos de URL.
* **Jest (Test Runner Node):** Automações rígidas de Unidade (*Unit Tests*), testando todos os módulos do Core (`fetchWeather()`) contra Erros Limites `500` da infraestrutura Open-Meteo, Parses malformados e conexões rurais lentas.

## 🛡️ Topologia Embutida de Segurança & Direitos (Compliance V2)
O projeto respeita absolutamente todas as regras globais e a documentação aprofundada pode ser lida em texto plano hospedada junto a raiz do repositório final:
1. **Atribuição:** Reconhecidamente creditada (via diretrizes flexíveis `SIL OFL 1.1`) a *Erik Flowers* pela biblioteca visual SVG W-Icons, e aos pesquisadores base do *Open-Meteo* pelos fluxos sem chaves. Encontre a listagem descritiva e justificada completa no documento atrelado [`NOTICE.md`](NOTICE.md).
2. **Auditoria Anti-Ataques e LGPD:** Tratamento contra Interceptações (*XSS*) utilizando o construtor isolante `encodeURIComponent` no lado local. Detalhes minuciosos de tráfego, mitigação (`CORS`) e proteção estanque `HTTPS` encontram-se no documento analítico [`SECURITY.md`](SECURITY.md).
3. **Open-Source Oficial:** Protegido corporativamente em português e inglês através da prestigiada [`LICENSE.md`](LICENSE.md).

## ⚙️ Principais Funcionalidades da UI Avançada (SDLC 5 e 6)
- **Câmera Dashboard Expandida:** Além de indicarmos a Temperatura global baseada em latitude, o aplicativo renderiza 3 sub-painéis precisos de tempo, entregando: Fração Térmica do Ar (Umidade %), Volumes de Garoa (mm) e Kilometragem dos Ventos (Km/h). Tudo via classes condicionadas dinamicamente.
- **Tratamento Fino Visual (TRACI Error):** O App não lança caixas brutas de `alerts()`, isolando o bloco de resposta visual central do CSS diretamente em textos controláveis legíveis de `"Localização não Encontrada"`.
- **Dicionário Embutido OMC:** Dicionário mapeando lógicas numéricas dos resumos (`Weather Codes`) traduzido automaticamente as classes do Browser baseadas na umidade lida e luz solar do país testado.
- **Buscas sem Rastreamento Sensível:** Todo o input submetido na navegação é descartado nativamente da Sessão RAM (`volatile status`) sem registros ocultos em bancos de Cache de máquina (`Local Storage`) em obediência primária da Lei de Acessibilidade Cívil e Respeito Ético a Usuários em Front-end.

### 💻 Como Testar Localmente As Regressões de Estabilidade (TDD)
O desenvolvedor interessado na malha analítica construída nos emuladores pode compilar todo o teste estrutural instanciando a biblioteca raiz (se o seu ambiente de rotinas Node estiver devidamente atualizado):
```bash
npm install
npm run test
```

## 🎓 Autoria
Desenvolvido inteiramente por **Bianca Caetano** — Formação em Engenharia de Software.
[Acompanhe o percurso completo no meu LinkedIn](https://www.linkedin.com/in/bia-caetano).
