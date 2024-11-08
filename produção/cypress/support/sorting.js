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