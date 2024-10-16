// Gerenciamento de Dados

Cypress.Commands.add('generateRandomName', (length = 5) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
});

Cypress.Commands.add('generateRandomNumber', (n) => {

  const randomNumber = Math.floor(Math.random() * (Math.pow(10, n) - Math.pow(10, n - 1))) + Math.pow(10, n - 1);
  
  return randomNumber.toString();
});

Cypress.Commands.add('generateDate', () => {
  // Gerar dia aleatório entre 01 e 31
  const day = Math.floor(Math.random() * 31) + 1;
  const formattedDay = day < 10 ? '0' + day : day.toString(); // Adiciona '0' se for menor que 10

  // Gerar mês aleatório entre 01 e 12
  const month = Math.floor(Math.random() * 12) + 1;
  const formattedMonth = month < 10 ? '0' + month : month.toString(); // Adiciona '0' se for menor que 10

  // Gerar ano aleatório entre 1980 e 2020
  const year = Math.floor(Math.random() * (2007 - 1980)) + 1980;

  // Combinar o resultado no formato DDMMYYYY
  const generatedDate = `${formattedDay}${formattedMonth}${year}`;
  
  return generatedDate;
});

Cypress.Commands.add('gerarSenhaAleatoria', () => {
  const caracteres = {
    maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    minusculas: 'abcdefghijklmnopqrstuvwxyz',
    numeros: '0123456789',
    especiais: '@#!%&*'
  };
  let senha = [
    caracteres.maiusculas[Math.floor(Math.random() * caracteres.maiusculas.length)],
    caracteres.minusculas[Math.floor(Math.random() * caracteres.minusculas.length)],
    caracteres.numeros[Math.floor(Math.random() * caracteres.numeros.length)],
    caracteres.especiais[Math.floor(Math.random() * caracteres.especiais.length)]
  ];
  const todos = caracteres.maiusculas + caracteres.minusculas + caracteres.numeros + caracteres.especiais;
  while (senha.length < 15) {
    senha.push(todos[Math.floor(Math.random() * todos.length)]);
  }
  return senha.sort(() => Math.random() - 0.5).join('');
});

// Funcionalidades Principais
            
  Cypress.Commands.add('selecionarConsultor', (consultor = "Juanito") => {

              cy.visit('/');
              cy.get('#inputSearchConsultant').type(consultor)
              cy.get('#consultantSearch').click()
              cy.get('#consultantContact').click()
              cy.log("Cosultor selecionado")
          })

Cypress.Commands.add('fecharVideo', () => {

          cy.get('.modal-video').then(($modal) => {
            if ($modal.is(':visible')) {
              // Se o modal estiver visível, clica no botão de fechar
              cy.get('button[data-testid="closeButton"]').click();
            }
          });
          })

Cypress.Commands.add('consultorVideo', (consultor) => {

            cy.selecionarConsultor(consultor)
            cy.fecharVideo()
          })


Cypress.Commands.add('clicarEmLogin', () => {

            cy.contains('Perfil').trigger('mouseover');
            cy.contains('button', 'Fazer login').click({ force: true });
          });

Cypress.Commands.add('clicarEmMeuPerfil', () => {

            cy.contains('Ver meu perfil').click({ force: true });
          });

          Cypress.Commands.add('clicarEmCadastro', () => {

            cy.contains('Perfil').trigger('mouseover');
            cy.contains('button', 'Cadastrar').click({ force: true });
          });

// clique em seção
Cypress.Commands.add('presentes', () => {
  cy.contains('presentes').click({ force: true })
  cy.url().should('include', '/presentes');
});

Cypress.Commands.add('perfumaria', () => {
  cy.contains('perfumaria').click({ force: true })
  cy.url().should('include', '/perfumaria');
});

Cypress.Commands.add('corpoEBanho', () => {
  cy.contains('corpo e banho').click({ force: true })
  cy.url().should('include', '/corpo-e-banho');
});

Cypress.Commands.add('cabelos', () => {
  cy.contains('cabelos').click({ force: true })
  cy.url().should('include', '/cabelos');
});

Cypress.Commands.add('maquiagem', () => {
  cy.contains('maquiagem').click({ force: true })
  cy.url().should('include', '/maquiagem');
});
// arrumar
Cypress.Commands.add('rosto', () => {
  cy.contains('#gtmNavigationItem', 'rosto').click({ force: true });
  cy.url().should('include', '/rosto');
});
Cypress.Commands.add('infantil', () => {
  cy.contains('infantil').click({ force: true })
  cy.url().should('include', '/infantil');
});
Cypress.Commands.add('homens', () => {
  cy.contains('homens').click({ force: true })
  cy.url().should('include', '/homens');
});
Cypress.Commands.add('marcas', () => {
  cy.contains('marcas').click({ force: true })
  cy.url().should('include', '/marcas');
});



// Login logout

Cypress.Commands.add('fazerLogin', ( email, senha) => {

            cy.get('input[placeholder="insira seu e-mail ou CPF"]').type(email)
            cy.get('input[placeholder="Digite sua senha"]').type(senha)
            cy.contains('button', 'Entrar').click();

            cy.contains('Ver meu perfil', {timeout: 30000}).should('exist')

            cy.log("Login Feito com sucesso")
            cy.wait(3000)
            });

Cypress.Commands.add('logoutDireto', () => {

              cy.contains('Sair').click({ force: true });
              cy.wait(3000)
              cy.contains('Ver meu perfil').should('not.exist')
            });

Cypress.Commands.add('logoutDoPerfil', () => {

              cy.clicarEmMeuPerfil()
              cy.contains('#gtmSidemenu-list-item-text', 'Sair').click();
              cy.wait(3000)
              cy.get('.profile-data-title').should('not.exist')
            });


// Edição de Dados

Cypress.Commands.add('cadastrarEndereço', (cep,) => {
              cy.get('#cep').type(cep)
            });

Cypress.Commands.add('editarEndereço', (cep,numero, complemento, referencia, apelido, nome, telefone) => {
            cy.get('#cep').click().clear().type(cep);
            cy.get('#address2').click().clear().type(numero);
            cy.get('#address3').click().clear().type(complemento);
            cy.get('#addressReference').click().clear().type(referencia);
            cy.get('#alias').click().clear().type(apelido);
            cy.get('#receiveName').click().clear().type(nome);
            cy.get('#phoneNumber').click().clear().type(telefone);       
            cy.get('#checkMainAddress') // Seleciona o input checkbox
            .then(($checkbox) => {
              if (!$checkbox.is(':checked')) { // Verifica se a checkbox não está marcada
                cy.get('.checkmark').click(); // Clica no elemento span com a classe 'checkmark'
              }
              cy.contains('Salvar endereço').click()
            });
                    });

Cypress.Commands.add('editarDadosPessoais', (nome, data, telefone) => {
            cy.get('#name').click().clear().type(nome)
            cy.get('#birthdate').click().clear().type(data)
            cy.get('#phoneHome').click().clear().type(telefone)
            cy.get('#female').then(($female) => {
              if ($female.is(':checked')) {
                cy.get('#male').click(); // Se "female" estiver selecionado, clica em "male"
              } else {
                cy.get('#female').click(); // Se "female" não estiver selecionado, clica nele
              }
            });   
                    const checkboxIds = [
                      '#newsletter',
                      '#orderCellphoneUpdate',
                      '#optInWP',
                      '#newsletterSMS',
                      '#allowStoreCollectInfo'
                    ];
                    checkboxIds.forEach((id) => {
                      cy.get(id).then(($checkbox) => {
                        if ($checkbox.is(':checked')) {
                          cy.get(id).uncheck({ force: true }); // Desmarca, forçando a ação
                        } else {
                          cy.get(id).check({ force: true }); // Marca, forçando a ação
                        }
                      });
                    });
                    cy.contains('Salvar alterações').click()
            cy.get('.Toastify__toast-body', { timeout: 10000 }).should('be.visible')
            
          })

// Comprass
Cypress.Commands.add('primeiroProduto', () => {

  cy.get('.h-categoryResults__results .card').first().click()
  cy.get('.product-detail-banner-container').should('be.visible')

});
Cypress.Commands.add('adicionarProduto', () => {
  cy.contains('Adicionar').click()
  cy.get('.Toastify__toast-body').should('be.visible')
  cy.contains('Ver minha sacola').click()
  cy.get('h1.checkout-title').contains('Sacola').should('be.visible')
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
    cy.wait(2000)

  cy.contains('button','Finalizar compra').should('be.enabled').click()
  
  cy.get('.profile-order-detail-content', { timeout: 100000 }).should('be.visible');

});

Cypress.Commands.add('pesquisarProduto', (produto) => {
  cy.get('.ContainerLogin > .SearchContainer > .InputSearch').clear().type(produto); 

});

Cypress.Commands.add('comprarBusca', () => {
  cy.get('.header-desktop-search-result .product-card-miniature').first().find('button.action-button.primary').click();
  cy.get('.Toastify__toast-body').should('be.visible')
  cy.contains('Ver minha sacola').click()
  cy.get('h1.checkout-title').contains('Sacola').should('be.visible')
});

Cypress.Commands.add('clicarPesquisar', (produto) => {
  cy.pesquisarProduto(produto)
  cy.contains('button','Ver tudo').should('be.enabled').click()
});

Cypress.Commands.add('adicionalPLP', () => {

});


// favoritos
Cypress.Commands.add('favoritarPDP', () => {
  cy.get('.product-info-share-buttons > :nth-child(1)').should('be.visible').click()

})



// ordenação 
// cy.get('.filter-button').eq(0).click()
// cy.get('button[type="submit"]').click()

// cy.get('#product-name-ascending').click();

// cy.get('#top-sellers').click();

// cy.get('#best-matches').click();



// 

// 

// cy.get('#discounts').click();
Cypress.Commands.add('ordenarAZ', () => {
  cy.get('.filter-button').eq(0).click();
  cy.get('#product-name-ascending').click();
  cy.get('button[type="submit"]').click();

  // Verifica se o botão "Mostrar mais" existe e clica se estiver presente
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Mostrar mais")').length > 0) {
      cy.contains('Mostrar mais').click();
      cy.contains('Mostrar mais').should('not.exist');
      cy.contains('Carregando mais produtos...', { timeout: 30000 }).should('not.exist');
    }
  });

  cy.checarOrdenacaoNomes();
});

Cypress.Commands.add('ordenarZA', () => {
  cy.get('.filter-button').eq(0).click();
  cy.get('#product-name-descending').click();
  cy.get('button[type="submit"]').click();

  // Verifica se o botão "Mostrar mais" existe e clica se estiver presente
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Mostrar mais")').length > 0) {
      cy.contains('Mostrar mais').click();
      cy.contains('Mostrar mais').should('not.exist');
      cy.contains('Carregando mais produtos...', { timeout: 30000 }).should('not.exist');
    }
  });

  cy.checarOrdenacaoNomes('dsc');
});

Cypress.Commands.add('ordenar12', () => {
  cy.get('.filter-button').eq(0).click();
  cy.get('#price-low-to-high').click();
  cy.get('button[type="submit"]').click();

  // Verifica se o botão "Mostrar mais" existe e clica se estiver presente
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Mostrar mais")').length > 0) {
      cy.contains('Mostrar mais').click();
      cy.contains('Mostrar mais').should('not.exist');
      cy.contains('Carregando mais produtos...', { timeout: 30000 }).should('not.exist');
    }
  });

  cy.checarOrdenacaoPrecos();
});

Cypress.Commands.add('ordenar21', () => {
  cy.get('.filter-button').eq(0).click();
  cy.get('#price-high-to-low').click();
  cy.get('button[type="submit"]').click();

  // Verifica se o botão "Mostrar mais" existe e clica se estiver presente
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Mostrar mais")').length > 0) {
      cy.contains('Mostrar mais').click();
      cy.contains('Mostrar mais').should('not.exist');
      cy.contains('Carregando mais produtos...', { timeout: 30000 }).should('not.exist');
    }
  });

  cy.checarOrdenacaoPrecos('dsc');
});


Cypress.Commands.add('pegarNomes', () => {
  return cy.get('.card-info-product-name').then(($nomes) => {
    const nomesArray = [];
    $nomes.each((index, nome) => {
      nomesArray.push(nome.innerText.trim()); // Pega o texto do nome
    });
    return nomesArray; // Retorna os nomes como array de strings
  });
});

// Função para checar a ordenação de nomes (A-Z ou Z-A)
Cypress.Commands.add('checarOrdenacaoNomes', (ordem = 'asc') => {
  cy.pegarNomes().then((nomesArray) => {
    const sortedNomes = ordem === 'asc'
      ? [...nomesArray].sort((a, b) => a.localeCompare(b))  // A-Z
      : [...nomesArray].sort((a, b) => b.localeCompare(a)); // Z-A

    expect(nomesArray).to.deep.equal(sortedNomes); // Verifica a ordenação
  });
});

// Função para pegar os preços da página
Cypress.Commands.add('pegarPrecos', () => {
  return cy.get('.card-info-new-price').then(($precos) => {
    const precosArray = [];
    $precos.each((index, preco) => {
      const precoLimpo = preco.innerText.replace('R$', '').trim();
      precosArray.push(parseFloat(precoLimpo)); // Converte para número
    });
    return precosArray; // Retorna os preços como números
  });
});

// Função para checar a ordenação de preços (ascendente ou descendente)
Cypress.Commands.add('checarOrdenacaoPrecos', (ordem = 'asc') => {
  cy.pegarPrecos().then((precosArray) => {
    const sortedPrecos = ordem === 'asc'
      ? [...precosArray].sort((a, b) => a - b)  // Menor para maior
      : [...precosArray].sort((a, b) => b - a); // Maior para menor

    expect(precosArray).to.deep.equal(sortedPrecos); // Verifica a ordenação
  });
});

// Comandos avançados

Cypress.Commands.add('updateFixture', (fixtureName, key, newData) => {
            cy.readFile(`cypress/fixtures/${fixtureName}.json`).then((data) => {
            data[key] = newData;
            cy.writeFile(`cypress/fixtures/${fixtureName}.json`, data);
            });
          });
          
