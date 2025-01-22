Cypress.Commands.add('clicarEmLogin', () => {
  cy.get('div.modal-login-status-buttons > button.btn_container.container__contained')
  .contains('fazer login').click({ force: true })
});

Cypress.Commands.add('clicarEmMeuPerfil', () => {
  cy.get('.modal-login-status-profile-btn')
  .contains('ver meu perfil')
  .click({ force: true });

});

Cypress.Commands.add('clicarEmCadastro', () => {
  cy.get('div.modal-login-status-buttons > button.btn_container.container__outlined')
  .contains('cadastrar')
.click({ force: true })
  cy.contains('cadastrar');

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
