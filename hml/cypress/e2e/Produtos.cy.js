describe('Testes De Produtos', () => {  

    function removeMask(value) {
      return value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    }
    let dados;
    let senhaAtual

      before(() => {
        cy.fixture('dados-usuario').then((data) => {
          dados = data;
          senhaAtual = dados.senha
    
        });
      });
    
    
      beforeEach(() => {  
        Cypress.on('uncaught:exception', (err, runnable) => {
          return false; 
        })
      });
    

it.only('Realizar compra pelo Cartão PDP', () => {
    cy.consultorVideo()
    cy.clicarEmLogin()
    cy.fazerLogin(dados.email, senhaAtual)
    cy.perfumaria()
    cy.primeiroProduto()
    cy.adicionarProduto()
    cy.irCheckout()
    cy.pagCartão(dados.cardNumber, dados.cardDate, dados.cvv, dados.nome, dados.cpf, 2)
    cy.checkout()
});

it('Realizar compra pelo Boleto PDP', () => {
  cy.consultorVideo()
  cy.clicarEmLogin()
  cy.fazerLogin(dados.email, senhaAtual)
  cy.perfumaria()
  cy.primeiroProduto()
  cy.adicionarProduto()
  cy.irCheckout()
  cy.pagBoleto()
  cy.checkout()
});

it('Realizar compra pelo Pix PDP', () => {
  cy.consultorVideo()
  cy.clicarEmLogin()
  cy.fazerLogin(dados.email, senhaAtual)
  cy.perfumaria()
  cy.primeiroProduto()
  cy.adicionarProduto()
  cy.irCheckout()
  cy.pagPix()
  cy.checkout()
});

it('Comprar pela busca', () => {
  cy.consultorVideo()
  cy.clicarEmLogin()
  cy.fazerLogin(dados.email, senhaAtual)
  cy.pesquisarProduto('kaiak')
  cy.comprarBusca()
  cy.irCheckout()
  cy.pagPix()
  cy.checkout()

});

it('Comprar PLP', () => {
  cy.consultorVideo()
  cy.clicarEmLogin()
  cy.fazerLogin(dados.email, senhaAtual)
  cy.clicarPesquisar('kaiak')
  cy.adicionarProduto()
  cy.irCheckout()
  cy.pagPix()
  cy.checkout()
});

it('Favoritar PDP', () => {
  cy.consultorVideo()
  cy.clicarEmLogin()
  cy.fazerLogin(dados.email, senhaAtual)
  cy.perfumaria()
  cy.primeiroProduto()
  cy.favoritarPDP()
  cy.get('.Toastify__toast-body', { timeout: 80000 }).should('be.visible')
});

it('Favoritar PLP', () => {
  cy.consultorVideo()
  cy.clicarEmLogin()
  cy.fazerLogin(dados.email, senhaAtual)
  cy.clicarPesquisar('baton')
  cy.get('button[aria-label="button-favorite"]').eq(0).click();
});

// rever
it('Verifica Notificação', () => {
  cy.consultorVideo()
  cy.clicarEmLogin()
  cy.fazerLogin(dados.email, senhaAtual)
  cy.pesquisarProduto('kaiak')
  cy.comprarBusca()
  cy.irCheckout()
  cy.pagPix()
  cy.checkout()
  cy.get('.profile-order-detail-title').invoke('text').then((numeroCheckout) => {
    let numeroPedido = removeMask(numeroCheckout)
    cy.log(numeroCheckout)
    cy.clicarEmMeuPerfil()
    cy.contains('Notificações').click()
    cy.contains('Minhas notificações', { timeout: 40000 }).should('exist')
    cy.wait(10000)
    cy.get('div.card-notification-container').first().click();
    cy.contains(numeroCheckout).should('exist')
  });
});

it('Ordenação A-Z', () => {
  cy.consultorVideo('juanito') 
  cy.perfumaria()
  cy.ordenarAZ()
});

it('Ordenação Z-A', () => {
  cy.consultorVideo('juanito') 
  cy.perfumaria()
  cy.ordenarZA()
});

it('Ordenação 1-2', () => {
  cy.consultorVideo('juanito') 
  cy.perfumaria()
  cy.ordenar12()
});

it('Ordenação 2-1', () => {
  cy.consultorVideo('juanito') 
  cy.perfumaria()
  cy.ordenar21()
});


// it('teste', () => {
//   let a = "Pedido #4030340043"
//   let b = removeMask(a)  
//   cy.log(b)
// });


});

