describe('Testes De regressão PRD', () => {  

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

    context('Testes de Login e LogOut', () => {

        it('Fazer Login com dados validos', () => {
            cy.consultorVideo()
            cy.clicarEmLogin()
            cy.fazerLogin(dados.email, senhaAtual)

          }) 
        
          it('Fazer Logout Diretamente', () => {
            cy.consultorVideo()
            cy.clicarEmLogin()
            cy.fazerLogin(dados.email, senhaAtual)
            cy.logoutDireto()
            cy.wait(3000)
          });
        
          it('Fazer Logout pelo Perfil', () => {
            cy.consultorVideo()
            cy.clicarEmLogin()
            cy.fazerLogin(dados.email, senhaAtual)
            cy.logoutDoPerfil()
            cy.wait(3000)
          });

    });

    context('Teste de Edição de dados', () => {

        it('Mudar Senha', () => {
            cy.updateFixture('dados-usuario', 'bkpSenha', senhaAtual)
            cy.gerarSenhaAleatoria().then((novaSenha) => {
              cy.consultorVideo()
              cy.clicarEmLogin()
              cy.fazerLogin(dados.email, senhaAtual)
              cy.clicarEmMeuPerfil()
              cy.contains('Mudar senha').click()
              cy.get('#password').type(senhaAtual)
              cy.get('#newPassword').type(novaSenha)
              cy.get('#confirmPassword').type(novaSenha)
              cy.contains('Salvar alterações').should('be.enabled').click()
              cy.updateFixture('dados-usuario', 'senha', novaSenha)
              senhaAtual = novaSenha
          
            });
            cy.contains('Faça seu login').should('be.visible')
          
          });
          
          
          it('Editar Endereço Cadastrado', () => {

            cy.fixture('dados-usuario').then((data) => {
              dados = data;
            });
          
            cy.consultorVideo()
            cy.clicarEmLogin()
            cy.fazerLogin(dados.email, senhaAtual)
            cy.clicarEmMeuPerfil()
            cy.contains('Meus endereços').click()
            cy.get('.card-address-container').should('be.visible').first().click()
            cy.generateRandomNumber(3).then((numeroAleatorio) => {
            });
            cy.contains('Editar endereço').should('exist')
            cy.wait(3000)
          
          //   let cep = "99010-090"
          //   let numero = "666" 
          //   let complemento = "66666"
          //   let referencia = "TesteCasa"
          //   let apelido = "testeApelido"
          //   let nome = "gabriel Teste"
          //   let telefone = "88888888888"
            
          // cy.editarEndereço(cep,numero, complemento, referencia, apelido, nome, telefone)
          cy.generateRandomNumber(3).then((numeroAleatorio) => {
            cy.generateRandomName().then((nomeGerado) => {
              let nome = 'gabriel ' + nomeGerado;
          
            // Definindo dados dinâmicos
            let cep = `99010-090`; // Exemplo de CEP dinâmico
            let numero = `${numeroAleatorio * 200 + 100}`; // Exemplo de número dinâmico
            let complemento = `${numeroAleatorio}`;
            let referencia = `Casa ${numeroAleatorio}`;
            let apelido = `testeApelido${numeroAleatorio}`;
            let telefone = `999${numeroAleatorio}${numeroAleatorio}00`; // Telefone dinâmico
          
            // Chamando a função para editar o endereço com dados dinâmicos
            cy.editarEndereço(cep, numero, complemento, referencia, apelido, nome, telefone);
            cy.wait(4000)
            cy.get('.card-address-container').should('be.visible').first().click(); // Reabrindo o card do endereço editado
              
            // Validação dos dados preenchidos
            cy.get('#cep').should('have.value', cep);
            cy.get('#address2').should('have.value', numero);
            cy.get('#address3').should('have.value', complemento);
            cy.get('#addressReference').should('have.value', referencia);
            cy.get('#alias').should('have.value', apelido);
            cy.get('#receiveName').should('have.value', nome);
            cy.get('#phoneNumber') // Seleciona o campo com o ID 'phoneNumber'
            .then(($input) => {
              const maskedValue = $input.val(); // Obtém o valor atual do input com máscara
              const actualValue = removeMask(maskedValue); // Remove a máscara do valor atual
          
              // Verifica se o valor atual (sem máscara) é igual ao esperado
              expect(actualValue).to.equal(telefone); // Asserção com o valor sem máscara
            });
            
            })
          });
          
            })
          it('Editar dados pessoais', () => {
          
            cy.consultorVideo()
            cy.clicarEmLogin()
            cy.fazerLogin(dados.email, senhaAtual)
            cy.clicarEmMeuPerfil()
            cy.generateRandomNumber(3).then((numeroAleatorio) => {
              cy.generateRandomName().then((nomeGerado) => {
                cy.generateDate().then((dataGerada) => {
                let nome = 'gabriel ' + nomeGerado;
                let data = dataGerada
                let telefone = `999${numeroAleatorio}${numeroAleatorio}00`;
          
                cy.editarDadosPessoais(nome, data, telefone)
          
                })
              })
            });
          
          
          });
    });

    context('Teste com diferentes formas de Pagamento', () => {

      
        it('Realizar compra pelo Cartão PDP', () => {
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
    });

    context('Teste com diferentes Paginas de produtos', () => {
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
    });
    context('Testes da funcionalidade de Favoritos', () => {
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
    });

    context('Testes Gerais de Validação', () => {
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
    });

    context('Testes de ordenação', () => {
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
    });

});