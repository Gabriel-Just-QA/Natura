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



    context('Testes de Cadastro Login e Logof', () => {

    it('Fazer Cadastro', () => {
      if (fixture){
        cy.log('não faz cadastro')
      } else {
        cy.log('faz Cadastro')
        cy.consultorVideo()
        cy.clicarEmCadastro()
        cy.fazerCadastro(nome,email, cpf, telefone,dataNascimento, senha)
        cy.contains('Criar conta').click()
        cy.contains('Cadastro realizado com sucesso').should('exist')
      }
    });

    

    it('Fazer Login com dados validos', () => {
      cy.consultorVideo()
      cy.clicarEmLogin()
      cy.fazerLogin(email, senhaAtual)
    }) 
  
    it('Fazer Logout Diretamente', () => {
      cy.consultorVideo()
      cy.clicarEmLogin()
      cy.fazerLogin(email, senhaAtual)
      cy.logoutDireto()
      cy.wait(3000)
    });
  
    it('Fazer Logout pelo Perfil', () => {
      cy.consultorVideo()
      cy.clicarEmLogin()
      cy.fazerLogin(email, senhaAtual)
      cy.logoutDoPerfil()
      cy.wait(3000)
    });

  })



  context('Teste de Edição de dados', () => {
    
    it('Cadastrar Primeiro endereço', () => {
      if (!fixture) {
        cy.consultorVideo()
        cy.clicarEmLogin()
        cy.fazerLogin(email, senhaAtual)
        cy.clicarEmMeuPerfil()
        cy.contains('Meus endereços').click()
        cy.contains('Adicionar endereço').should('exist').click()
        cy.editarEndereço(cep, numero, complemento, referencia, apelido, nome, telefone);
      } else {
        cy.log("Não é o primeiro cadastro!")
      }
  });

      it('Editar Endereço Cadastrado', () => {
      
        cy.consultorVideo()
        cy.clicarEmLogin()
        cy.fazerLogin(email, senhaAtual)
        cy.clicarEmMeuPerfil()
        cy.contains('Meus endereços').click()
        cy.get('.card-address-container').should('be.visible').first().click()
        cy.contains('Editar endereço').should('exist')

      cy.generateRandomNumber(3).then((numeroAleatorio) => {
        cy.generateRandomName().then((nomeGeradoNovo) => {
        let cepNovo = `99010-090`; 
        let numeroNovo = `${numeroAleatorio * 55 }`;
        let complementoNovo = `${numeroAleatorio}`;
        let referenciaNovo = `Casa ${numeroAleatorio}`;
        let apelidoNovo = `testeApelido${numeroAleatorio}`;
        let nomeCompraNovo = 'gabriel ' + nomeGeradoNovo;
        let telefoneNovo = `999${numeroAleatorio}${numeroAleatorio}00`;
      
        cy.editarEndereço(cepNovo, numeroNovo, complementoNovo, referenciaNovo, apelidoNovo, nomeCompraNovo, telefoneNovo);

        cy.updateFirstFixtureObjectKey('dadosCadastro','cep',cepNovo)
        cy.updateFirstFixtureObjectKey('dadosCadastro','numero',numeroNovo)
        cy.updateFirstFixtureObjectKey('dadosCadastro','complemento',complementoNovo)
        cy.updateFirstFixtureObjectKey('dadosCadastro','referencia',referenciaNovo)
        cy.updateFirstFixtureObjectKey('dadosCadastro','apelido',apelidoNovo)
        cy.updateFirstFixtureObjectKey('dadosCadastro','nomeCompra',nomeCompraNovo)
        cy.updateFirstFixtureObjectKey('dadosCadastro','telefone',telefoneNovo)

        cep = cepNovo
        numero = numeroNovo
        complemento = complementoNovo
        referencia = referenciaNovo
        apelido = apelidoNovo
        nomeCompra = nomeCompraNovo
        telefone = telefoneNovo
        })


        
      });
      
        })

        it('Mudar Senha', () => {
          cy.updateFirstFixtureObjectKey('dadosCadastro','bkpSenha',senhaAtual)

          cy.gerarSenhaAleatoria().then((novaSenha) => {
            cy.consultorVideo()
            cy.clicarEmLogin()
            cy.fazerLogin(email, senhaAtual)
            cy.clicarEmMeuPerfil()
            cy.contains('Mudar senha').click()
            cy.get('#password').type(senhaAtual)
            cy.get('#newPassword').type(novaSenha)
            cy.get('#confirmPassword').type(novaSenha)
            cy.contains('Salvar alterações').should('be.enabled').click()
            cy.updateFirstFixtureObjectKey('dadosCadastro','senha',novaSenha)

            
            senhaAtual = novaSenha
        
          });
          cy.contains('Faça seu login').should('be.visible')
        
        });


      it('Editar dados pessoais', () => {
        cy.consultorVideo()
        cy.clicarEmLogin()
        cy.fazerLogin(email, senhaAtual)
        cy.clicarEmMeuPerfil()
        cy.generateRandomNumber(3).then((numeroAleatorio) => {
          cy.generateRandomName().then((nomeGerado) => {
            cy.generateDate().then((dataGerada) => {
            let nomeEdit = 'gabriel ' + nomeGerado;
            let dataEdit = dataGerada
            let telefoneEdit = `999${numeroAleatorio}${numeroAleatorio}00`;
    
            cy.editarDadosPessoais(nomeEdit, dataEdit, telefoneEdit)

            cy.updateFirstFixtureObjectKey('dadosCadastro','nome',nomeEdit)
            cy.updateFirstFixtureObjectKey('dadosCadastro','dataNascimento',dataEdit)
            cy.updateFirstFixtureObjectKey('dadosCadastro','telefone',telefoneEdit)
    
            nome = nomeEdit
            dataNascimento = dataEdit
            telefone = telefoneEdit
          });
            })
          })
      });
});

context('Testes de Cupom de primeira compra', () => {

  it('Cupom primeira compra', () => {
    // trocar variavel
        if (!fixture) {
      cy.consultorVideo()
      cy.clicarEmLogin()
      cy.fazerLogin(email, senhaAtual)
      cy.pesquisarProduto('kaiak')
      cy.comprarBusca()
      cy.irCheckout()
    
      cy.get('.checkout-order-resume-information-row.total span').last().invoke('text').then((valorTotal) => {
          // Remover caracteres indesejados
          const valorLimpo = valorTotal.replace('R$ ', '').replace(',', '.');
          const valorTotalOriginal = parseFloat(valorLimpo); // Valor total original em número
    
          // Aplicar o cupom de desconto
          cy.get('.accordion-button.checkout').click();
          cy.get('#input-coupon').should('be.visible').type('PRIMEIRACOMPRA');
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
    } else {
      cy.log("não é o primeiro Cadastro")
    }
        });
})

context('Teste com diferentes formas de Pagamento', () => {

      
  it('Realizar compra pelo Cartão PDP', () => {
      cy.consultorVideo()
      cy.clicarEmLogin()
      cy.fazerLogin(email, senhaAtual)
      cy.perfumaria()
      cy.primeiroProduto()
      cy.adicionarProduto()
      cy.irCheckout()
      cy.pagCartão(cardNumber, cardDate, cvv, nome,cpf, 2)
      cy.checkout()
  });
  
  it('Realizar compra pelo Boleto PDP', () => {
    cy.consultorVideo()
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
    cy.consultorVideo()
    cy.clicarEmLogin()
    cy.fazerLogin(email, senhaAtual)
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
      cy.fazerLogin(email, senhaAtual)
      cy.pesquisarProduto('kaiak')
      cy.comprarBusca()
      cy.irCheckout()
      cy.pagPix()
      cy.checkout()
    
    });
    
    it('Comprar PLP', () => {
      cy.consultorVideo()
      cy.clicarEmLogin()
      cy.fazerLogin(email, senhaAtual)
      cy.clicarPesquisar('kaiak')
      cy.adicionarProduto()
      cy.irCheckout()
      cy.pagPix()
      cy.checkout()
    });
});

context('Testes Remoção de itens', () => {

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


})

context('Testes da funcionalidade de Favoritos', () => {
  it('Favoritar PDP', () => {
      cy.consultorVideo()
      cy.clicarEmLogin()
      cy.fazerLogin(email, senhaAtual)
      cy.perfumaria()
      cy.primeiroProduto()
      cy.favoritarPDP()
      cy.get('.Toastify__toast-body', { timeout: 80000 }).should('be.visible')
    });
    
    it('Favoritar PLP', () => {
      cy.consultorVideo()
      cy.clicarEmLogin()
      cy.fazerLogin(email, senhaAtual)
      cy.clicarPesquisar('baton')
      cy.get('button[aria-label="button-favorite"]').eq(0).click();
    });
});

context('Testes Gerais de Validação', () => {
// rever
it('Verifica Notificação', () => {
cy.consultorVideo()
cy.clicarEmLogin()
cy.fazerLogin(email, senhaAtual)
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










})
