describe('Testes individuais', () => {
  
  let senhaAtual, nome, email, telefone, cpf, senha, bkpSenha , dataNascimento, cep, numero, complemento, referencia, apelido, cardNumber, cardDate, cvv, nomeCompra;

  // Se usa os dados de uma conta já criada ou cria uma nova conta, faz o fluxo inteiro com cadastro (true ou false)
  let cadastro = false;

  // Escolha do ambiente: True para Produção, False para HML
  const ambiente = false;

  const URL_BASE = ambiente ? 'https://social.prd.naturacloud.com/?consultoria=camilagarciapulido' : 'https://sales-mgmt-cb-mfe-composer-akamai.hml.naturacloud.com/?consultoria=consultorahmlteste';
  const fixtureFile = ambiente ? 'cadastroPRD' : 'cadastroHML';

  before(() => {
    if (!cadastro) {
      cy.fixture(fixtureFile).then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const ultimoCadastro = data[0];
          nome = ultimoCadastro.nome;
          email = ultimoCadastro.email;
          nomeCompra = ultimoCadastro.nomeCompra;
          telefone = ultimoCadastro.telefone;
          cpf = ultimoCadastro.cpf;
          senhaAtual = ultimoCadastro.senha;
          bkpSenha = ultimoCadastro.bkpSenha;
          dataNascimento = ultimoCadastro.dataNascimento;
          cep = ultimoCadastro.cep;
          numero = ultimoCadastro.numero;
          complemento = ultimoCadastro.complemento;
          referencia = ultimoCadastro.referencia;
          apelido = ultimoCadastro.apelido;
          cardNumber = ultimoCadastro.cardNumber;
          cardDate = ultimoCadastro.cardDate;
          cvv = ultimoCadastro.cvv;
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
                email = 'gabriel' + nomeGerado + '@tuamaeaquelaursa.com';
                telefone = `999${numeroAleatorio}${numeroAleatorio}00`;
                cpf = faker.br.cpf();
                senha = senhaGerada;
                senhaAtual = senha;
                dataNascimento = dataGerada;
                cep = `99010-090`;
                numero = `${numeroAleatorio * 200 + 100}`;
                complemento = `${numeroAleatorio}`;
                referencia = `Casa ${numeroAleatorio}`;
                apelido = `testeApelido${numeroAleatorio}`;
                cardNumber = '5448280000000007';
                cardDate = '0130';
                cvv = '123';
              });
            });
          });
        });
      });
    }
  });

  beforeEach(() => {
    cy.viewport(1280, 720); // Largura de 1280px e altura de 720p
    Cypress.on('uncaught:exception', (err, runnable) => false);
  });

  it('Carregando Dados', function () {
    if (cadastro) {
      cy.log('Cadastra dados no json');
      const dadosCadastro = {
        nome: nome,
        nomeCompra: nomeCompra,
        email: email,
        telefone: telefone,
        cpf: cpf,
        senha: senha,
        bkpSenha: senha,
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
      cy.salvarDadosCadastro(dadosCadastro,fixtureFile);
    }
    cy.log('nome: ', nome);
    cy.log('email: ', email);
    cy.log('telefone: ', telefone);
    cy.log('cpf: ', cpf);
    cy.log('senhaAtual: ', senhaAtual);
    cy.log('senhaBackupt: ', bkpSenha);
    cy.log('Data de Nascimento: ', dataNascimento);
    cy.log('cep: ', cep);
    cy.log('numero: ', numero);
    cy.log('complemento: ', complemento);
    cy.log('referencia: ', referencia);
    cy.log('apelido: ', apelido);
    cy.log('numero:', cardNumber, 'dataCartão:', cardDate, 'cvv', cvv);
  });

/// Coloque aqui os testes que vc deseja testar separadamente:


it('Cupom primeira compra', function () {
  if (!cadastro){
    cy.visit(URL_BASE);
    cy.clicarEmLogin();
    cy.fazerLogin(email, senhaAtual);
    cy.pesquisarProduto('kaiak');
    cy.comprarBusca();
    cy.irCheckout();
    cy.get('.checkout-order-resume-product-list > :nth-child(1)').should('be.visible')
    cy.get('.checkout-order-resume-information > :nth-child(4) > :nth-child(2)')
      .last()
      .invoke('text')
      .then((valorTotal) => {
        const valorLimpo = valorTotal.replace('R$ ', '').replace(',', '.');
        const valorTotalOriginal = parseFloat(valorLimpo);
        cy.get('.accordion-button.checkout').click();
        cy.get('#input-coupon').should('be.visible').type('PRIMEIRACOMPRA');
        cy.contains('Aplicar Cupom').click();
        cy.contains('Cupom aplicado!').should('exist');
        cy.wait(2000);
        cy.get('.checkout-order-resume-information > :nth-child(4) > :nth-child(2)')
          .last()
          .invoke('text')
          .then((valorDesconto) => {
            const valorLimpoDesconto = valorDesconto.replace('R$ ', '').replace(',', '.');
            const valorTotalComDesconto = parseFloat(valorLimpoDesconto);
            expect(valorTotalComDesconto).to.be.lessThan(valorTotalOriginal);
            cy.pagPix();
            cy.checkout();
          });
      });
  } else {
    this.skip();
    cy.log("não é o primeiro Cadastro");
    return
  }
});

    

})
