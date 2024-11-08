

Cypress.Commands.add('generateRandomName', (length = 5) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
});

Cypress.Commands.add('generateRandomNumber', (n) => {

  const randomNumber = Math.floor(Math.random() * (Math.pow(10, n) - Math.pow(10, n - 1))) + Math.pow(10, n - 1);
  
  return randomNumber.toString();
});

Cypress.Commands.add('generateDate', () => {
  // Gerar dia aleatório entre 01 e 31
  const day = Math.floor(Math.random() * 31) + 1;
  const formattedDay = day < 10 ? '0' + day : day.toString(); // Adiciona '0' se for menor que 10

  // Gerar mês aleatório entre 01 e 12
  const month = Math.floor(Math.random() * 12) + 1;
  const formattedMonth = month < 10 ? '0' + month : month.toString(); // Adiciona '0' se for menor que 10

  // Gerar ano aleatório entre 1980 e 2020
  const year = Math.floor(Math.random() * (2007 - 1980)) + 1980;

  // Combinar o resultado no formato DDMMYYYY
  const generatedDate = `${formattedDay}${formattedMonth}${year}`;
  
  return generatedDate;
});

Cypress.Commands.add('gerarSenhaAleatoria', () => {
  const caracteres = {
    maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    minusculas: 'abcdefghijklmnopqrstuvwxyz',
    numeros: '0123456789',
    especiais: '@#!%&*'
  };
  let senha = [
    caracteres.maiusculas[Math.floor(Math.random() * caracteres.maiusculas.length)],
    caracteres.minusculas[Math.floor(Math.random() * caracteres.minusculas.length)],
    caracteres.numeros[Math.floor(Math.random() * caracteres.numeros.length)],
    caracteres.especiais[Math.floor(Math.random() * caracteres.especiais.length)]
  ];
  const todos = caracteres.maiusculas + caracteres.minusculas + caracteres.numeros + caracteres.especiais;
  while (senha.length < 15) {
    senha.push(todos[Math.floor(Math.random() * todos.length)]);
  }
  return senha.sort(() => Math.random() - 0.5).join('');
});

Cypress.Commands.add('updateFixture', (fixtureName, key, newData) => {
  cy.readFile(`cypress/fixtures/${fixtureName}.json`).then((data) => {
  data[key] = newData;
  cy.writeFile(`cypress/fixtures/${fixtureName}.json`, data);
  });
});


// Comando customizado para salvar dados de cadastro no JSON
Cypress.Commands.add('salvarDadosCadastro', (dadosCadastro) => {
const fixtureFile = 'cypress/fixtures/dadosCadastro.json';

// Lê o arquivo atual, e inicializa se necessário
cy.readFile(fixtureFile, { timeout: 10000 }).then((data) => {
// Verifica se o arquivo está vazio ou sem dados
if (!Array.isArray(data)) {
data = [];  // Inicializa como array vazio
}

// Apenas adiciona se houver dados válidos
if (dadosCadastro && Object.keys(dadosCadastro).length > 0) {
// Insere o novo cadastro no início do array
data.unshift(dadosCadastro);
}

// Escreve de volta ao arquivo
cy.writeFile(fixtureFile, data);
});
});


Cypress.Commands.add('updateFirstFixtureObjectKey', (fixtureName, key, newValue) => {
cy.readFile(`cypress/fixtures/${fixtureName}.json`).then((data) => {
// Verifica se o arquivo tem ao menos um objeto no array
if (Array.isArray(data) && data.length > 0) {
// Pega o primeiro objeto do array
let firstObject = data[0];

// Verifica se a chave existe no objeto
if (firstObject.hasOwnProperty(key)) {
// Atualiza o valor da chave
firstObject[key] = newValue;

// Atualiza o array com o objeto modificado
data[0] = firstObject;

// Sobrescreve o arquivo fixture com o novo dado
cy.writeFile(`cypress/fixtures/${fixtureName}.json`, data).then(() => {
cy.log(`A chave "${key}" foi atualizada para "${newValue}" no primeiro objeto.`);
});
} else {
cy.log(`A chave "${key}" não existe no primeiro objeto.`);
}
} else {
cy.log('O array na fixture está vazio ou não é um array.');
}
});
});
