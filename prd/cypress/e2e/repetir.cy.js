describe('Repetir Pagamento', () => {  

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
        Cypress.on('uncaught:exception', (err, runnable) => {
          return false; 
        })
      });







    it('Carregando Dados', () => {
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

context('Repetir Pagamento', () => {
  it('Realizar compra pelo Boleto PDP', () => {
    cy.visit('/')
    cy.clicarEmLogin()
    cy.fazerLogin(email, senhaAtual)
    cy.perfumaria()
    cy.primeiroProduto()
    cy.adicionarProduto()
    cy.irCheckout()
    cy.pagBoleto()
    cy.checkout()
  });
  
  it('Realizar compra pelo Pix PDP', () => {
    cy.visit('/')
    cy.clicarEmLogin()
    cy.fazerLogin(email, senhaAtual)
    cy.perfumaria()
    cy.primeiroProduto()
    cy.adicionarProduto()
    cy.irCheckout()
    cy.pagPix()
    cy.checkout()
  });



  it('Comprar pela busca', () => {
    cy.visit('/')
    cy.clicarEmLogin()
    cy.fazerLogin(email, senhaAtual)
    cy.pesquisarProduto('kaiak')
    cy.comprarBusca()
    cy.irCheckout()
    cy.pagPix()
    cy.checkout()
  
  });
  
  it('Comprar PLP', () => {
    cy.visit('/')
    cy.clicarEmLogin()
    cy.fazerLogin(email, senhaAtual)
    cy.clicarPesquisar('kaiak')
    cy.adicionarProduto()
    cy.irCheckout()
    cy.pagPix()
    cy.checkout()
  });

    

});

})

