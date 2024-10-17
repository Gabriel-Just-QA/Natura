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
    

it('Remover produto do mini card', () => {
    cy.consultorVideo()
    cy.maquiagem()    
    cy.get('.card.default').then(($cards) => {
        const numProdutos = $cards.length;
        const maxProdutos = Math.min(numProdutos, 5)
        for (let i = 0; i < maxProdutos; i++) {
          cy.get('.card.default').eq(i).find('button').contains('Adicionar').click();
                if (i < maxProdutos - 1) {
            cy.get('button[aria-label="Close Drawer"]').click();
          }
        }
      })
      cy.get('.drawer-content').should('be.visible');
      cy.get('.item-list .item').then(($list) => {
        const initialLength = $list.length;
        for (let index = 0; index < initialLength; index++) {
          cy.get('.item-list .item').eq(0).then(($item) => {
            cy.wrap($item).find('.remove-item button').click().then(() => {
              cy.wrap($item).should('not.exist');
           cy.get('.item-list .item').should('have.length', initialLength - (index + 1));
            });
          });
        }
      });
cy.contains('Você ainda não possui pedidos na sua sacola',{ timeout: 10000 }).should('exist')
});

it('Remover produto da Sacola', () => {
    cy.consultorVideo()
    cy.maquiagem()    
    cy.get('.card.default').then(($cards) => {
        const numProdutos = $cards.length;
        const maxProdutos = Math.min(numProdutos, 5)
        for (let i = 0; i < maxProdutos; i++) {
          cy.get('.card.default').eq(i).find('button').contains('Adicionar').click();
            cy.get('button[aria-label="Close Drawer"]').click();
          }
        })
        cy.contains('Sacola').click()
    cy.get('.checkout-title').should('exist')
    cy.get('tbody .product-table-body-row')
        cy.get('tbody .product-table-body-row').then(($rows) => {
        $rows.each((index, row) => {
          cy.wrap(row).find('.product-table-action button').click();
        });
      });
      cy.contains('Você ainda não possui pedidos na sua sacola',{ timeout: 10000 }).should('exist')
      });



      it.only('fazer cadastro', () => {
        cy.faker().then((faker) => {

        cy.generateRandomNumber(3).then((numeroAleatorio) => {
            cy.generateRandomName().then((nomeGerado) => {
                cy.gerarSenhaAleatoria().then((novaSenha) => {
                    cy.generateDate().then((dataGerada) => {
              let nome = 'gabriel ' + nomeGerado;
            let email = 'gabriel'+ nomeGerado +'@tuamaeaquelaursa.com'
            let telefone = `999${numeroAleatorio}${numeroAleatorio}00`;
            let cpf = faker.br.cpf()
            let senha = novaSenha
            let data = dataGerada
            cy.consultorVideo()
            cy.clicarEmCadastro()
            cy.fazerCadastro(nome,email, cpf, telefone,data, senha)

            
        })      
        })
        })
        })
        })


      });




      it('Cupom primeira compra', () => {
        cy.consultorVideo()
        cy.clicarEmLogin()
        cy.fazerLogin(dados.email, senhaAtual)
        cy.pesquisarProduto('kaiak')
        cy.comprarBusca()
        cy.irCheckout()

        cy.get('.checkout-order-resume-information-row.total span').last().invoke('text').then((valorTotal) => {
            // Remover caracteres indesejados
            const valorLimpo = valorTotal.replace('R$ ', '').replace(',', '.');
            const valorTotalOriginal = parseFloat(valorLimpo); // Valor total original em número
    
            // Aplicar o cupom de desconto
            cy.get('.accordion-button.checkout').click();
            cy.get('#input-coupon').should('be.visible').type('PRIMEIRA COMPRA');
            cy.contains('Aplicar Cupom').click();
    
            // Capturar o valor total após o desconto
            cy.get('.checkout-order-resume-information-row.total span').last().invoke('text').then((valorDesconto) => {
                const valorLimpoDesconto = valorDesconto.replace('R$ ', '').replace(',', '.');
                const valorTotalComDesconto = parseFloat(valorLimpoDesconto); // Valor total após desconto
    
                // Calcular a diferença de valor
                const diferencaValor = valorTotalOriginal - valorTotalComDesconto;
                cy.log(`A diferença de valor é: R$ ${diferencaValor.toFixed(2)}`);
    
                // Calcular a porcentagem de desconto
                const percentualDesconto = (diferencaValor / valorTotalOriginal) * 100;
                cy.log(`A porcentagem de desconto é: ${percentualDesconto.toFixed(2)}%`);
    
                // Verificar se o valor com desconto é menor que o total
                expect(valorTotalComDesconto).to.be.lessThan(valorTotalOriginal);
    
                // Verificar se o desconto é de pelo menos X%
                const descontoEsperado = 10; // Porcentagem de desconto esperada
                expect(percentualDesconto).to.be.gte(descontoEsperado);
            })
          });
        });


    })