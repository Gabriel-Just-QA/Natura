describe('Fluxo Completo', () => {  

    function removeMask(value) {
      return value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    }

    let senhaAtual , nome, email, telefone, cpf, senha, dataNascimento, cep, numero , complemento, referencia, apelido, cardNumber, cardDate, cvv , nomeCompra
    let fixture = true



      before(() => {
        
        if(fixture){
          cy.fixture('dadosCadastro').then((data) => {
            // Pega o objeto no índice 0, que é o último cadastro salvo
            if (Array.isArray(data) && data.length > 0) {
              const ultimoCadastro = data[0]; // Objeto mais recente (index 0)
              
              // Mapeia as variáveis com os dados do objeto
              nome = ultimoCadastro.nome;
              email = ultimoCadastro.email;
              nomeCompra = ultimoCadastro.nomeCompra
              telefone = ultimoCadastro.telefone;
              cpf = ultimoCadastro.cpf;
              senhaAtual = ultimoCadastro.senha;
              dataNascimento = ultimoCadastro.dataNascimento;
              cep = ultimoCadastro.cep;
              numero = ultimoCadastro.numero;
              complemento = ultimoCadastro.complemento;
              referencia = ultimoCadastro.referencia;
              apelido = ultimoCadastro.apelido;
              cardNumber = ultimoCadastro.cardNumber
              cardDate = ultimoCadastro.cardDate
              cvv = ultimoCadastro.cvv
            
            } else {
              cy.log('Nenhum dado encontrado no arquivo fixture.');
            }
          });
        } else {

          cy.log('faz cadastro novo');

  cy.faker().then((faker) => {
            cy.generateRandomNumber(3).then((numeroAleatorio) => {
                cy.generateRandomName().then((nomeGerado) => {
                    cy.gerarSenhaAleatoria().then((senhaGerada) => {
                        cy.generateDate().then((dataGerada) => {

            nome = 'gabriel ' + nomeGerado;
            nomeCompra = 'gabriel ' + nomeGerado;
            email = 'gabriel'+ nomeGerado +'@tuamaeaquelaursa.com'
            telefone = `999${numeroAleatorio}${numeroAleatorio}00`;
            cpf = faker.br.cpf()
            senha = senhaGerada
            senhaAtual = senha
            dataNascimento = dataGerada
            cep = `99010-090`; 
            numero = `${numeroAleatorio * 200 + 100}`;
            complemento = `${numeroAleatorio}`;
            referencia = `Casa ${numeroAleatorio}`;
            apelido = `testeApelido${numeroAleatorio}`;
            telefone = `999${numeroAleatorio}${numeroAleatorio}00`;
            cardNumber = "5448280000000007",
            cardDate= "0130",
            cvv = "123"
            })      
            })
            })
            })
            })
        }
      })    
    
      beforeEach(() => {  
        cy.viewport(1280, 720); // Largura de 1280px e altura de 720p

        Cypress.on('uncaught:exception', (err, runnable) => {
          return false; 
        })
      });



    it('Carregando Dados', () => {
        cy.log(fixture)
      if(!fixture){
        cy.log('Cadastra dados no json')
            const dadosCadastro = {
            nome: nome,
            nomeCompra: nomeCompra,
            email: email,
            telefone: telefone,
            cpf: cpf,
            senha: senha,
            dataNascimento: dataNascimento,
            cep: cep,
            numero: numero,
            complemento: complemento,
            referencia: referencia,
            apelido: apelido,
            cardNumber: cardNumber,
            cardDate: cardDate,
            cvv: cvv
          };
        cy.salvarDadosCadastro(dadosCadastro);
      }
        cy.log('nome: ', nome);
        cy.log('email: ', email);
        cy.log('telefone: ', telefone);
        cy.log('cpf: ', cpf);
        cy.log('senhaAtual: ', senhaAtual);
        cy.log('Data de Nascimento: ', dataNascimento);
        cy.log('cep: ', cep);
        cy.log('numero: ', numero);
        cy.log('complemento: ', complemento);
        cy.log('referencia: ', referencia);
        cy.log('apelido: ', apelido); 
        cy.log( 'numero:',cardNumber,'dataCartão:', cardDate,'cvv', cvv)
    })

        

    it('Cupom primeira compra', () => {
      // trocar variavel
          if (fixture) {
        cy.visit('/')
        cy.clicarEmLogin()
        cy.fazerLogin(email, senhaAtual)
        cy.pesquisarProduto('kaiak')
        cy.comprarBusca()
        cy.irCheckout()
      
        cy.get('.checkout-order-resume-information > :nth-child(4) > :nth-child(2)').last().invoke('text').then((valorTotal) => {
            // Remover caracteres indesejados
            const valorLimpo = valorTotal.replace('R$ ', '').replace(',', '.');
            const valorTotalOriginal = parseFloat(valorLimpo); // Valor total original em número
      
            // Aplicar o cupom de desconto
            cy.get('.accordion-button.checkout').click();
            cy.get('#input-coupon').should('be.visible').type('PRIMEIRACOMPRA');
            cy.contains('Aplicar Cupom').click();
            cy.contains('Cupom aplicado!').should('exist')
            // Capturar o valor total após o desconto
            cy.wait(2000)
            cy.get('.checkout-order-resume-information > :nth-child(4) > :nth-child(2)').last().invoke('text').then((valorDesconto) => {
                const valorLimpoDesconto = valorDesconto.replace('R$ ', '').replace(',', '.');
                const valorTotalComDesconto = parseFloat(valorLimpoDesconto); // Valor total após desconto
                cy.log(valorTotalComDesconto)
                cy.log(valorTotalOriginal)

                expect(valorTotalComDesconto).to.be.lessThan(valorTotalOriginal);
      
                cy.pagPix()
                cy.checkout()


            })
          });
      } else {
        cy.log("não é o primeiro Cadastro")
      }
          })

})
