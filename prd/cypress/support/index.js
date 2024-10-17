import faker from 'faker-br';

// Adiciona o faker ao objeto global do Cypress
Cypress.Commands.add('faker', () => {
  return faker;
});