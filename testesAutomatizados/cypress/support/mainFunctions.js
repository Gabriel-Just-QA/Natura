// Seleção de produtos

Cypress.Commands.add('primeiroProduto', () => {

    cy.get('.h-categoryResults__results .card').last().click()
    cy.wait(4999)
    cy.get('.product-detail-banner-container').should('be.visible')
  
  });


  Cypress.Commands.add('adicionarProduto', () => {
    cy.contains('Adicionar').click()
    cy.contains('Produto adicionado a sacola com sucesso!').should('exist')
    cy.contains('Ver minha sacola').click({force: true})
    cy.get('h1.checkout-title').contains('Sacola').should('be.visible')
  });




  Cypress.Commands.add('pesquisarProduto', (produto) => {
    cy.get('.ContainerLogin > .SearchContainer > .InputSearch').clear().type(produto); 
  
  });


  Cypress.Commands.add('comprarBusca', () => {
    cy.get('.header-desktop-search-result .product-card-miniature').eq(0).find('button.action-button.primary').click({force: true});
    cy.get('.Toastify__toast-body').should('be.visible')
    cy.contains('Ver minha sacola').click({force: true})
    cy.get('h1.checkout-title').contains('Sacola').should('be.visible')
  });
  
  Cypress.Commands.add('clicarPesquisar', (produto) => {
    cy.pesquisarProduto(produto)
    cy.wait(2000)
    cy.contains('button','Ver tudo').should('be.enabled').click()
    cy.url().should('include', '/search');
    cy.contains(`Você buscou por "${produto}"`).should('be.visible');
  
  });



  

Cypress.Commands.add('irCheckout', () => {
    cy.contains('Comprar agora').click()
  });
  
  Cypress.Commands.add('pagPix', () => {
    cy.contains('Pix').click();
  
  });
  
  Cypress.Commands.add('pagCartão', (cartao,data,cvv,nome,cpf,parcelas) => {
    cy.contains('Cartão de crédito').click();
    cy.get('#credit-card-number').click().clear().type(cartao);
    cy.get('#expiration-date').click().clear().type(data);
    cy.get('#cvv').click().clear().type(cvv);
    cy.get('#credit-card-name').click().clear().type(nome);
    cy.get('#cpf').click().clear().type(cpf);
    cy.get('#input-split').select(parcelas);
  
  
  });
  Cypress.Commands.add('pagBoleto', () => {
    cy.contains('Boleto').click();
  
  });
  Cypress.Commands.add('checkout', () => {
    cy.get('input[type="radio"][name="Normal"]',{ timeout: 40000 }).should('be.visible').then($radio => {
      if (!$radio.is(':checked')) {
        cy.wrap($radio).click();
      }
    });

    cy.contains('button','Finalizar compra').should('be.enabled').click()
    cy.get('.profile-order-detail-content', { timeout: 100000 }).should('be.visible');
  });
  

  Cypress.Commands.add('favoritarPDP', () => {
    cy.get('.product-info-share-buttons > :nth-child(1)').should('be.visible').click()
  
  })