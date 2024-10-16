
describe('Testes De Login e Perfil', () => {  

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


  it.only('Fazer Login com dados validos', () => {
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
  cy.get('.card-address-container').should('be.visible').click()
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
  cy.get('.card-address-container').should('be.visible').click(); // Reabrindo o card do endereço editado
    
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

// it('teste', () => {
//   cy.generateRandomNumber(3).then((numeroAleatorio) => {
//     cy.generateRandomName().then((nomeGerado) => {
//       cy.generateDate().then((dataGerada) => {
//       let nome = 'gabriel ' + nomeGerado;
//       let numero = numeroAleatorio
//       let data = dataGerada
//       cy.log(nome)
//       cy.log(numero)

//       cy.log(data)

//     })
//     })
//   });
      
// });

})


// it('Fazer cadastro ', () => {
//   cy.visit('https://sales-mgmt-cb-mfe-composer-akamai.prd.naturacloud.com/?consultoria=jhsropero1')
//   cy.wait(2000); 
//   cy.get('[data-testid="closeButton"] > .jsx-6f3a2d9e2e311ac8').click()


//   cy.get('#gtmActionsMenuList > div > div > div.jsx-1681f388cd853621.modal-login-status-content > div > button.jsx-50b7ee36f9fe1d46.btn_container.container__outlined').click({ force: true })
//   cy.wait(2000); 

//   cy.get('#register-name').type(dados.nome);
//   cy.get('#register-email').type(dados.email);
//   cy.get('#register-cpf').type(dados.cpf);
//   cy.get('#register-cellphone').type("99999999999");
//   cy.get('#register-birthdate').type("10102000");
//   cy.get('#register-password').type(dados.senha);
//   cy.get('#register-repeat-password').type(dados.senha)
//   cy.get('[style="margin-bottom: 20px;"] > .custom-checkbox-base > .checkmark').click()
//   cy.get('#gtmNewAccount').click();
//   cy.get('body').should('contain', 'Cadastro realizado com sucesso');
// });
