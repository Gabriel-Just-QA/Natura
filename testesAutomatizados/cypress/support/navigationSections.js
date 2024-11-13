Cypress.Commands.add('clicarEmLogin', () => {

  cy.contains('Perfil').trigger('mouseover');
  cy.contains('button', 'Fazer login').click({ force: true });
});

Cypress.Commands.add('clicarEmMeuPerfil', () => {

  cy.contains('Ver meu perfil').click({ force: true });
});

Cypress.Commands.add('clicarEmCadastro', () => {

  cy.contains('Perfil').trigger('mouseover');
  cy.contains('button', 'Cadastrar').click({ force: true });
});


Cypress.Commands.add('presentes', () => {
  cy.contains('presentes').click({ force: true })
  cy.url().should('include', '/presentes');
});

Cypress.Commands.add('perfumaria', () => {
  cy.contains('perfumaria').click({ force: true })
  cy.url().should('include', '/perfumaria');
});

Cypress.Commands.add('corpoEBanho', () => {
  cy.contains('corpo e banho').click({ force: true })
  cy.url().should('include', '/corpo-e-banho');
});

Cypress.Commands.add('cabelos', () => {
  cy.contains('cabelos').click({ force: true })
  cy.url().should('include', '/cabelos');
});

Cypress.Commands.add('maquiagem', () => {
  cy.contains('maquiagem').click({ force: true })
  cy.url().should('include', '/maquiagem');
});
// arrumar
Cypress.Commands.add('rosto', () => {
  cy.contains('#gtmNavigationItem', 'rosto').click({ force: true });
  cy.url().should('include', '/rosto');
});
Cypress.Commands.add('infantil', () => {
  cy.contains('infantil').click({ force: true })
  cy.url().should('include', '/infantil');
});
Cypress.Commands.add('homens', () => {
  cy.contains('homens').click({ force: true })
  cy.url().should('include', '/homens');
});
Cypress.Commands.add('marcas', () => {
  cy.contains('marcas').click({ force: true })
  cy.url().should('include', '/marcas');
});
