const { exec } = require('child_process');

const commands = [
  { command: 'npx cypress run --spec "cypress/e2e/fluxoCompleto.cy.js"', name: 'Executar Cypress' },
  { command: 'node automação/convertToPDF.js', name: 'Converter para PDF' },
  { command: 'node automação/sendReport.js', name: 'Enviar Relatório' }
];

const executeCommand = (command, name) => {
  return new Promise((resolve) => {
    const process = exec(command);

    console.log(`Executando: ${name}...`);

    process.stdout.on('data', (data) => {
      console.log(`${name} output: ${data}`);
    });

    process.stderr.on('data', (data) => {
      console.error(`${name} erro: ${data}`);
    });

    process.on('close', (code) => {
      if (code === 0) {
        console.log(`${name} executado com sucesso!`);
      } else {
        console.error(`${name} falhou com código ${code}`);
      }
      resolve();
    });
  });
};

const runCommands = async () => {
  for (const { command, name } of commands) {
    await executeCommand(command, name);
  }
  console.log('Todos os comandos foram executados.');
};

runCommands();
