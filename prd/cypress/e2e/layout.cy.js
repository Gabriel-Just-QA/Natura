describe('teste de layout', () => {  


  it('teste de layout', () => {


  cy.consultorVideo()

  cy.get('.actions-menu-profile-content > .ActionsMenuListButton')
  .should('have.css', 'width', '75px')
  .and('have.css', 'height', '28px')
  .and('have.css', 'padding', '0px')
  .and('have.css', 'gap', '10px')
  .and('have.css', 'opacity', '1')
  .and('have.css', 'color', 'rgb(0, 0, 0)')
  .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
  .and('have.css', 'font-size', '16px');







  cy.get('.h-hero-content') // Substitua com o seletor do elemento desejado
  .then(($el) => {
    const elementStyle = window.getComputedStyle($el[0]); // Pega os estilos computados do elemento

    // Lista de propriedades CSS que você deseja verificar
    const cssProperties = ['width', 'height', 'padding', 'gap', 'opacity', 'color', 'background-color', 'font-size'];

    // Itera pelas propriedades e loga seus valores
    cssProperties.forEach(property => {
      const value = elementStyle.getPropertyValue(property);
      cy.log(`${property}: ${value}`);
      console.log(`Primeiro ${property}: ${value}`);
    });
  });




});

})
