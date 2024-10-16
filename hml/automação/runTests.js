const { exec } = require('child_process');

const commands = [
  { command: 'npx cypress run --spec "cypress/e2e/e2e.cy.js"', name: 'Executar Cypress' },
  { command: 'node automação/convertToPDF.js', name: 'Converter para PDF' }, // caminho atualizado
  { command: 'node automação/sendReport.js', name: 'Enviar Relatório' } // caminho atualizado
];

const executeCommand = (command, name) => {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      console.log(`Resultado de ${name}:`);
      console.log(stdout);
      if (error) {
        console.error(`Erro ao executar ${name}:`, stderr || error.message);
      } else {
        console.log(`${name} executado com sucesso!`);
      }
      resolve(); // Resolve a promessa independentemente do resultado
    });
  });
};

// Função principal para executar os comandos sequencialmente
const runCommands = async () => {
  for (const { command, name } of commands) {
    await executeCommand(command, name);
  }
  console.log('Todos os comandos foram executados.');
};

// Iniciar a execução dos comandos
runCommands();
