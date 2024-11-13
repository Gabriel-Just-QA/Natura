# Automação de Testes E2E com Cypress

## Descrição do Projeto

Este repositório contém um projeto de automação de testes end-to-end (E2E) utilizando o **Cypress**. O objetivo é garantir a qualidade e a funcionalidade de uma aplicação web através da execução de testes automatizados, geração de relatórios em PDF e envio desses relatórios por e-mail. O projeto é projetado para ser facilmente configurável e extensível, permitindo que os desenvolvedores integrem testes em suas rotinas de desenvolvimento.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Execução dos Testes](#execução-dos-testes)
- [Seleção de Ambiente](#seleção-de-ambiente)
- [Funcionalidades](#funcionalidades)
- [Contribuições](#contribuições)
- [Licença](#licença)
- [Contato](#contato)

## Tecnologias Utilizadas

- **Cypress**: Framework de testes E2E para aplicações web.
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **NPM**: Gerenciador de pacotes do Node.js.
- **JavaScript**: Linguagem de programação utilizada para escrever os testes e scripts auxiliares.

## Pré-requisitos

Antes de começar, você precisa ter os seguintes itens instalados em sua máquina:

- **Node.js**: O Cypress requer o Node.js. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).
- **NPM**: O npm é o gerenciador de pacotes do Node.js e vem instalado junto com ele.

## Instalação

Siga os passos abaixo para configurar o projeto em sua máquina:

1. **Clone o repositório**:

   ```
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências**:

   Execute o seguinte comando para instalar o Cypress e outras dependências necessárias:

   ```
   npm install
   ```

3. **Abra o Cypress**:

   Após a instalação, você pode abrir o Cypress com o seguinte comando:

   ```
   npx cypress open
   ```

   Isso abrirá a interface gráfica do Cypress, onde você poderá ver e executar os testes.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:
/cypress
  /fixtures         # Arquivos JSON de dados de teste
  /integration      # Testes E2E
  /plugins          # Plugins do Cypress
  /support          # Comandos customizados e configurações globais
/automação
  convertToPDF.js   # Script para converter relatório em PDF
  sendReport.js      # Script para enviar o relatório por e-mail
cypress.json        # Configurações do Cypress
package.json        # Dependências do projeto
index.js            # Script principal para execução dos 



## Execução dos Testes

Para executar os testes e gerar relatórios, utilize o seguinte comando:

```
node index.js
```

### Detalhes do Script

O script `index.js` é responsável por:

- Executar os testes do Cypress.
- Converter o relatório gerado em PDF.
- Enviar o relatório por e-mail.

O fluxo de execução é controlado através de um array de comandos que são executados sequencialmente. Cada comando é executado em um processo separado, e a saída é capturada e exibida no console.

## Seleção de Ambiente

O projeto permite a seleção entre dois ambientes: Produção e HML. A escolha do ambiente é feita através da variável `ambiente` no `index.js`.

```javascript
let cadastro = true; // Flag para determinar se os testes de cadastro serão executados

// Escolha do ambiente: True para Produção, False para HML
const ambiente = false;

const URL_BASE = ambiente 
  ? 'https://social.prd.naturacloud.com/?consultoria=camilagarciapulido' 
  : 'https://sales-mgmt-cb-mfe-composer-akamai.hml.naturacloud.com/?consultoria=consultorahmlteste';

const fixtureFile = ambiente ? 'cadastroPRD' : 'cadastroHML';

URL_BASE: Define a URL base para a aplicação que será testada, dependendo do ambiente selecionado.
fixtureFile: Define qual arquivo de fixture será utilizado nos testes, permitindo que os testes sejam adaptados para os dados do ambiente específico.





## Funcionalidades

- **Execução Automatizada de Testes**: O Cypress executa os testes de forma automatizada, garantindo que todos os fluxos de usuário sejam verificados sem intervenção manual.
  
- **Geração de Relatórios em PDF**: Após a execução dos testes, um relatório é gerado e convertido em formato PDF, facilitando a visualização e o compartilhamento dos resultados.

- **Envio de Relatórios por E-mail**: O sistema é capaz de enviar os relatórios gerados por e-mail, permitindo que as partes interessadas recebam atualizações sobre o status dos testes de forma rápida e eficiente.

- **Seleção de Ambientes**: O projeto permite a fácil troca entre ambientes de teste (Produção e HML), tornando-o flexível e adaptável a diferentes cenários de teste.

- **Logs Detalhados**: Durante a execução, o console exibe logs detalhados sobre a execução dos comandos, incluindo saídas e erros, facilitando a identificação de problemas.





## Contribuições

Contribuições são bem-vindas! Se você deseja contribuir com este projeto, siga as etapas abaixo:

1. Fork o repositório.
2. Crie uma nova branch (`git checkout -b feature/nome-da-sua-feature`).
3. Faça suas alterações e commit (`git commit -m 'Adiciona nova funcionalidade'`).
4. Push para a branch (`git push origin feature/nome-da-sua-feature`).
5. Abra um Pull Request.




## Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

- **Nome**: Seu Nome
- **E-mail**: seuemail@example.com
- **GitHub**: [seu-usuario](https://github.com/seu-usuario)

---

