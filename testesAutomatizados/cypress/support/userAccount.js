Cypress.Commands.add('fazerCadastro', ( nome,email, cpf, telefone , data,senha,) => {
  cy.get('#register-name').type(nome);
  cy.get('#register-email').type(email);
  cy.get('#register-cpf').type(cpf);
  cy.get('#register-cellphone').type(telefone);
  cy.get('#register-birthdate').type(data);
  cy.get('#others').check()
  cy.get('#register-password').type(senha);
  cy.get('#register-repeat-password').type(senha)
  cy.get('#checkAdult').check({ force: true });
});


Cypress.Commands.add('fazerLogin', ( email, senha) => {

  cy.get('input[placeholder="insira seu e-mail ou CPF"]').type(email)
  cy.get('input[placeholder="Digite sua senha"]').type(senha)
  cy.contains('button', 'Entrar').click();

  cy.contains('Ver meu perfil', {timeout: 60000}).should('exist')

  cy.log("Login Feito com sucesso")
  });


  Cypress.Commands.add('logoutDireto', () => {

    cy.contains('Sair').click({ force: true });
    cy.contains('Ver meu perfil').should('not.exist')
  });

Cypress.Commands.add('logoutDoPerfil', () => {

    cy.clicarEmMeuPerfil()
    cy.contains('#gtmSidemenu-list-item-text', 'Sair').click();
    cy.get('.profile-data-title').should('not.exist')
  });


  Cypress.Commands.add('editarEndereço', (cep,numero, complemento, referencia, apelido, nome, telefone) => {
    cy.wait(4000)
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
              cy.contains(/Dados atualizados com sucesso|Endereço salvo com sucesso/).should('exist');
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
              cy.contains('Dados atualizados com sucesso', { timeout: 10000 }).should('be.visible')
              
            })