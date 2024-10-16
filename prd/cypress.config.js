const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 20000,
    baseUrl: 'https://sales-mgmt-cb-mfe-composer-akamai.prd.naturacloud.com/',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      mochaFile: 'cypress/reports/json/results.[hash].json', // Especifica onde os arquivos JSON serão salvos
      reportDir: 'cypress/reports/html', // Onde os relatórios HTML serão armazenados
      overwrite: true, // Se deve sobrescrever relatórios existentes
      html: true, // Gera relatórios HTML
      json: true, // Gera arquivos JSON
      reportPageTitle: 'Relatório de Testes Cypress', // Título da página do relatório HTML
      inline: true, // Inclui CSS e JS inline
      charts: true, // Habilita gráficos
    video: true,
  },
}
});
