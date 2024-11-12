describe('Fluxo Completo', () => {
  
    let senhaAtual, nome, email, telefone, cpf, senha, bkpSenha , dataNascimento, cep, numero, complemento, referencia, apelido, cardNumber, cardDate, cvv, nomeCompra;
  
    // Se usa os dados de uma conta já criada ou cria uma nova conta, faz o fluxo inteiro com cadastro (true ou false)
    let cadastro = true;
  
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
    
    
    it.only('Carregando Dados', function () {
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
      
      context('Testes de Cadastro Login e Logof', () => {
      
        it('Fazer Cadastro', function () {
          if (!cadastro) {
            this.skip();
            cy.log('não faz cadastro');
            return
          } else {
            cy.log('faz Cadastro');
            cy.visit(URL_BASE);
            cy.clicarEmCadastro();
            cy.fazerCadastro(nome, email, cpf, telefone, dataNascimento, senha);
            cy.contains('Criar conta').click();
            cy.contains('Cadastro realizado com sucesso').should('exist');
          }
        });
      
        it('Fazer Login com dados validos', function () {
          cy.visit(URL_BASE);
          cy.clicarEmLogin();
          cy.fazerLogin(email, senhaAtual);
        });
      
        it('Fazer Logout Diretamente', function () {
          cy.visit(URL_BASE);
          cy.clicarEmLogin();
          cy.fazerLogin(email, senhaAtual);
          cy.logoutDireto();
          cy.wait(3000);
        });
      
        it('Fazer Logout pelo Perfil', function () {
          cy.visit(URL_BASE);
          cy.clicarEmLogin();
          cy.fazerLogin(email, senhaAtual);
          cy.logoutDoPerfil();
          cy.wait(3000);
        });
      });
      
      context('Teste de Edição de dados', () => {
        
        it('Cadastrar Primeiro endereço', function () {
          if (cadastro) {
            cy.visit(URL_BASE);
            cy.clicarEmLogin();
            cy.fazerLogin(email, senhaAtual);
            cy.clicarEmMeuPerfil();
            cy.contains('Meus endereços').click();
            cy.contains('Adicionar endereço').should('exist').click();
            cy.editarEndereço(cep, numero, complemento, referencia, apelido, nome, telefone);
          } else {
            this.skip();
            cy.log("Não é o primeiro cadastro!");
            return
          }
        });
      
        it('Editar Endereço Cadastrado', function () {
          cy.visit(URL_BASE);
          cy.clicarEmLogin();
          cy.fazerLogin(email, senhaAtual);
          cy.clicarEmMeuPerfil();
          cy.contains('Meus endereços').click();
          cy.get('.card-address-container').should('be.visible').first().click();
          cy.contains('Editar endereço').should('exist');
          cy.generateRandomNumber(3).then((numeroAleatorio) => {
            cy.generateRandomName().then((nomeGeradoNovo) => {
              let cepNovo = `99010-090`;
              let numeroNovo = `${numeroAleatorio * 55}`;
              let complementoNovo = `${numeroAleatorio}`;
              let referenciaNovo = `Casa ${numeroAleatorio}`;
              let apelidoNovo = `testeApelido${numeroAleatorio}`;
              let nomeCompraNovo = `gabriel ${nomeGeradoNovo}`;
              let telefoneNovo = `999${numeroAleatorio}${numeroAleatorio}00`;
      
              cy.editarEndereço(cepNovo, numeroNovo, complementoNovo, referenciaNovo, apelidoNovo, nomeCompraNovo, telefoneNovo);
      
              cy.updateFirstFixtureObjectKey(fixtureFile, 'cep', cepNovo);
              cy.updateFirstFixtureObjectKey(fixtureFile, 'numero', numeroNovo);
              cy.updateFirstFixtureObjectKey(fixtureFile, 'complemento', complementoNovo);
              cy.updateFirstFixtureObjectKey(fixtureFile, 'referencia', referenciaNovo);
              cy.updateFirstFixtureObjectKey(fixtureFile, 'apelido', apelidoNovo);
              cy.updateFirstFixtureObjectKey(fixtureFile, 'nomeCompra', nomeCompraNovo);
              cy.updateFirstFixtureObjectKey(fixtureFile, 'telefone', telefoneNovo);
      
              cep = cepNovo;
              numero = numeroNovo;
              complemento = complementoNovo;
              referencia = referenciaNovo;
              apelido = apelidoNovo;
              nomeCompra = nomeCompraNovo;
              telefone = telefoneNovo;
            });
          });
        });
      
        it('Mudar Senha', function () {
          cy.updateFirstFixtureObjectKey(fixtureFile, 'bkpSenha', senhaAtual);
          cy.gerarSenhaAleatoria().then((novaSenha) => {
            cy.visit(URL_BASE);
            cy.clicarEmLogin();
            cy.fazerLogin(email, senhaAtual);
            cy.clicarEmMeuPerfil();
            cy.contains('Mudar senha').click();
            cy.get('#password').type(senhaAtual);
            cy.get('#newPassword').type(novaSenha);
            cy.get('#confirmPassword').type(novaSenha);
            cy.contains('Salvar alterações').should('be.enabled').click();
            cy.updateFirstFixtureObjectKey(fixtureFile, 'senha', novaSenha);
            senhaAtual = novaSenha;
          });
          cy.contains('Faça seu login').should('be.visible');
        });
      
        it('Editar dados pessoais', function () {
          cy.visit(URL_BASE);
          cy.clicarEmLogin();
          cy.fazerLogin(email, senhaAtual);
          cy.clicarEmMeuPerfil();
          cy.generateRandomNumber(3).then((numeroAleatorio) => {
            cy.generateRandomName().then((nomeGerado) => {
              cy.generateDate().then((dataGerada) => {
                let nomeEdit = `gabriel ${nomeGerado}`;
                let dataEdit = dataGerada;
                let telefoneEdit = `999${numeroAleatorio}${numeroAleatorio}00`;
      
                cy.editarDadosPessoais(nomeEdit, dataEdit, telefoneEdit);
      
                cy.updateFirstFixtureObjectKey(fixtureFile, 'nome', nomeEdit);
                cy.updateFirstFixtureObjectKey(fixtureFile, 'dataNascimento', dataEdit);
                cy.updateFirstFixtureObjectKey(fixtureFile, 'telefone', telefoneEdit);
      
                nome = nomeEdit;
                dataNascimento = dataEdit;
                telefone = telefoneEdit;
              });
            });
          });
        });
      });
      
      context('Testes de Cupom de primeira compra', () => {
        it('Cupom primeira compra', function () {
          if (cadastro) {
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
      });
      
      context('Teste com diferentes formas de Pagamento', () => {
        it('Realizar compra pelo Cartão PDP', function () {
          cy.visit(URL_BASE);
          cy.clicarEmLogin();
          cy.fazerLogin(email, senhaAtual);
          cy.perfumaria();
          cy.primeiroProduto();
          cy.adicionarProduto();
          cy.irCheckout();
          cy.pagCartão(cardNumber, cardDate, cvv, nome, cpf, 2);
          cy.checkout();
        });
      
        it('Realizar compra pelo Boleto PDP', function () {
          cy.visit(URL_BASE);
          cy.clicarEmLogin();
          cy.fazerLogin(email, senhaAtual);
          cy.perfumaria();
          cy.primeiroProduto();
          cy.adicionarProduto();
          cy.irCheckout();
          cy.pagBoleto();
          cy.checkout();
        });
      
        it('Realizar compra pelo Pix PDP', function () {
          cy.visit(URL_BASE);
          cy.clicarEmLogin();
          cy.fazerLogin(email, senhaAtual);
          cy.perfumaria();
          cy.primeiroProduto();
          cy.adicionarProduto();
          cy.irCheckout();
          cy.pagPix();
          cy.checkout();
        });
      });

      context('Teste com diferentes Paginas de produtos', () => { 
        it('Comprar pela busca', function () {
          cy.visit(URL_BASE)
          cy.clicarEmLogin()
          cy.fazerLogin(email, senhaAtual)
          cy.pesquisarProduto('kaiak')
          cy.wait(5000)
      
          cy.comprarBusca()
          cy.irCheckout()
          cy.pagPix()
          cy.checkout()
        });
        
        it('Comprar PLP', function () {
          cy.visit(URL_BASE)
          cy.clicarEmLogin()
          cy.fazerLogin(email, senhaAtual)
          cy.clicarPesquisar('kaiak')
          cy.contains('Adicionar').click()
          cy.contains('Produto adicionado a sacola com sucesso!').should('exist')
          cy.contains('Ver minha sacola').click({ force: true })
          cy.get('h1.checkout-title').contains('Sacola').should('be.visible')
          cy.irCheckout()
          cy.pagPix()
          cy.checkout()
        });
      });
      
      context('Testes Remoção de itens', () => {
        it('Remover produto do mini card', function () {
          cy.visit(URL_BASE)
          cy.perfumaria()    
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
          cy.contains('Você ainda não possui pedidos na sua sacola', { timeout: 60000 }).should('exist')
        });
      
        it('Remover produto da Sacola', function () {
          cy.visit(URL_BASE)
          cy.perfumaria()    
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
          cy.contains('Você ainda não possui pedidos na sua sacola', { timeout: 60000 }).should('exist')
        });
      });
      
      context('Testes da funcionalidade de Favoritos', () => {
        it('Favoritar PDP', function () {
          cy.visit(URL_BASE)
          cy.clicarEmLogin()
          cy.fazerLogin(email, senhaAtual)
          cy.perfumaria()
          cy.primeiroProduto()
          cy.favoritarPDP()
          cy.get('.Toastify__toast-body', { timeout: 80000 }).should('be.visible')
        });
      
        it('Favoritar PLP', function () {
          cy.visit(URL_BASE)
          cy.clicarEmLogin()
          cy.fazerLogin(email, senhaAtual)
          cy.clicarPesquisar('baton')
          cy.get('button[aria-label="button-favorite"]').eq(0).click();
        });
      });
      
      context('Testes Gerais de Validação', () => {
        it('Verifica Notificação', function () {
          cy.visit(URL_BASE)
          cy.clicarEmLogin()
          cy.fazerLogin(email, senhaAtual)
          cy.pesquisarProduto('kaiak')
          cy.wait(5000)
      
          cy.comprarBusca()
          cy.irCheckout()
          cy.pagPix()
          cy.checkout()
          cy.get('.profile-order-detail-title').invoke('text').then((numeroCheckout) => {
            cy.log(numeroCheckout)
            cy.clicarEmMeuPerfil()
            cy.contains('Notificações').click()
            cy.contains('Minhas notificações', { timeout: 40000 }).should('exist')
            cy.get('div.card-notification-container').first().click();
            cy.contains(numeroCheckout).should('exist')
          });
        });
      });
      
      context('Testes de ordenação', () => {
        it('Ordenação A-Z', function () {
          cy.visit(URL_BASE)
          cy.corpoEBanho()
          cy.ordenarAZ()
        });
      
        it('Ordenação Z-A', function () {
          cy.visit(URL_BASE)
          cy.corpoEBanho()
          cy.ordenarZA()
        });
      
        it('Ordenação 1-2', function () {
          cy.visit(URL_BASE)
          cy.corpoEBanho()
          cy.ordenar12()
        });
      
        it('Ordenação 2-1', function () {
          cy.visit(URL_BASE)
          cy.corpoEBanho()
          cy.ordenar21()
        });
      });
    });