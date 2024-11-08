describe('Complete Flow', () => {  

    function removeMask(value) {
        return value.replace(/\D/g, ''); // Remove non-digit characters
    }

    let currentPassword, name, email, phone, cpf, password, birthDate, zipCode, addressNumber, complement, reference, alias, cardNumber, cardDate, cvv, purchaseName;
    let fixture = true;

    before(() => {
        if (fixture) {
            cy.fixture('dadosCadastro').then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    const lastRegistration = data[0];
                    name = lastRegistration.nome;
                    email = lastRegistration.email;
                    purchaseName = lastRegistration.nomeCompra;
                    phone = lastRegistration.telefone;
                    cpf = lastRegistration.cpf;
                    currentPassword = lastRegistration.senha;
                    birthDate = lastRegistration.dataNascimento;
                    zipCode = lastRegistration.cep;
                    addressNumber = lastRegistration.numero;
                    complement = lastRegistration.complemento;
                    reference = lastRegistration.referencia;
                    alias = lastRegistration.apelido;
                    cardNumber = lastRegistration.cardNumber;
                    cardDate = lastRegistration.cardDate;
                    cvv = lastRegistration.cvv;
                } else {
                    cy.log('No data found in fixture file.');
                }
            });
        } else {
            cy.log('Creating new registration');
            cy.faker().then((faker) => {
                cy.generateRandomNumber(3).then((randomNumber) => {
                    cy.generateRandomName().then((generatedName) => {
                        cy.generateRandomPassword().then((generatedPassword) => {
                            cy.generateDate().then((generatedDate) => {
                                name = `gabriel ${generatedName}`;
                                purchaseName = `gabriel ${generatedName}`;
                                email = `gabriel${generatedName}@example.com`;
                                phone = `999${randomNumber}${randomNumber}00`;
                                cpf = faker.br.cpf();
                                password = generatedPassword;
                                currentPassword = password;
                                birthDate = generatedDate;
                                zipCode = `99010-090`;
                                addressNumber = `${randomNumber * 200 + 100}`;
                                complement = `${randomNumber}`;
                                reference = `House ${randomNumber}`;
                                alias = `testAlias${randomNumber}`;
                                cardNumber = "5448280000000007";
                                cardDate = "0130";
                                cvv = "123";
                            });
                        });
                    });
                });
            });
        }
    });

    beforeEach(() => {
        cy.viewport(1280, 720);
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    it('Load Data', () => {
        if (!fixture) {
            cy.log('Save registration data to JSON');
            const registrationData = {
                nome: name,
                nomeCompra: purchaseName,
                email: email,
                telefone: phone,
                cpf: cpf,
                senha: password,
                dataNascimento: birthDate,
                cep: zipCode,
                numero: addressNumber,
                complemento: complement,
                referencia: reference,
                apelido: alias,
                cardNumber: cardNumber,
                cardDate: cardDate,
                cvv: cvv
            };
            cy.saveRegistrationData(registrationData);
        }
        cy.log('name: ', name);
        cy.log('email: ', email);
        cy.log('phone: ', phone);
        cy.log('cpf: ', cpf);
        cy.log('currentPassword: ', currentPassword);
        cy.log('Birth Date: ', birthDate);
        cy.log('zipCode: ', zipCode);
        cy.log('addressNumber: ', addressNumber);
        cy.log('complement: ', complement);
        cy.log('reference: ', reference);
        cy.log('alias: ', alias);
        cy.log('cardNumber:', cardNumber, 'cardDate:', cardDate, 'cvv', cvv);
    });

    context('Registration, Login, and Logout Tests', () => {
        it('Login with valid data', () => {
            cy.visit('/');
            cy.clickOnLogin();
            cy.login(email, currentPassword);
        });

        it('Direct Logout', () => {
            cy.visit('/');
            cy.clickOnLogin();
            cy.login(email, currentPassword);
            cy.directLogout();
            cy.wait(3000);
        });

        it('Profile Logout', () => {
            cy.visit('/');
            cy.clickOnLogin();
            cy.login(email, currentPassword);
            cy.profileLogout();
            cy.wait(3000);
        });
    });

    context('Data Editing Tests', () => {
        it('Edit Registered Address', () => {
            cy.visit('/');
            cy.clickOnLogin();
            cy.login(email, currentPassword);
            cy.clickOnMyProfile();
            cy.contains('Meus endereços').click();
            cy.get('.card-address-container').should('be.visible').first().click();
            cy.contains('Editar endereço').should('exist');
            
            cy.generateRandomNumber(3).then((randomNumber) => {
                cy.generateRandomName().then((newGeneratedName) => {
                    let newZipCode = `99010-090`; 
                    let newAddressNumber = `${randomNumber * 55}`;
                    let newComplement = `${randomNumber}`;
                    let newReference = `House ${randomNumber}`;
                    let newAlias = `testAlias${randomNumber}`;
                    let newPurchaseName = `gabriel ${newGeneratedName}`;
                    let newPhone = `999${randomNumber}${randomNumber}00`;

                    cy.editAddress(newZipCode, newAddressNumber, newComplement, newReference, newAlias, newPurchaseName, newPhone);

                    cy.updateFirstFixtureObjectKey('dadosCadastro', 'cep', newZipCode);
                    cy.updateFirstFixtureObjectKey('dadosCadastro', 'numero', newAddressNumber);
                    cy.updateFirstFixtureObjectKey('dadosCadastro', 'complemento', newComplement);
                    cy.updateFirstFixtureObjectKey('dadosCadastro', 'referencia', newReference);
                    cy.updateFirstFixtureObjectKey('dadosCadastro', 'apelido', newAlias);
                    cy.updateFirstFixtureObjectKey('dadosCadastro', 'nomeCompra', newPurchaseName);
                    cy.updateFirstFixtureObjectKey('dadosCadastro', 'telefone', newPhone);

                    zipCode = newZipCode;
                    addressNumber = newAddressNumber;
                    complement = newComplement;
                    reference = newReference;
                    alias = newAlias;
                    purchaseName = newPurchaseName;
                    phone = newPhone;
                });
            });
        });

        it('Change Password', () => {
            cy.updateFirstFixtureObjectKey('dadosCadastro', 'bkpSenha', currentPassword);

            cy.generateRandomPassword().then((newPassword) => {
                cy.visit('/');
                cy.clickOnLogin();
                cy.login(email, currentPassword);
                cy.clickOnMyProfile();
                cy.contains('Mudar senha').click();
                cy.get('#password').type(currentPassword);
                cy.get('#newPassword').type(newPassword);
                cy.get('#confirmPassword').type(newPassword);
                cy.contains('Salvar alterações').should('be.enabled').click();
                cy.updateFirstFixtureObjectKey('dadosCadastro', 'senha', newPassword);

                currentPassword = newPassword;
            });
            cy.contains('Faça seu login').should('be.visible');
        });

        it('Edit Personal Data', () => {
            cy.visit('/');
            cy.clickOnLogin();
            cy.login(email, currentPassword);
            cy.clickOnMyProfile();
            cy.generateRandomNumber(3).then((randomNumber) => {
                cy.generateRandomName().then((generatedName) => {
                    cy.generateDate().then((generatedDate) => {
                        let editedName = `gabriel ${generatedName}`;
                        let editedDate = generatedDate;
                        let editedPhone = `999${randomNumber}${randomNumber}00`;

                        cy.editPersonalData(editedName, editedDate, editedPhone);

                        cy.updateFirstFixtureObjectKey('dadosCadastro', 'nome', editedName);
                        cy.updateFirstFixtureObjectKey('dadosCadastro', 'dataNascimento', editedDate);
                        cy.updateFirstFixtureObjectKey('dadosCadastro', 'telefone', editedPhone);

                        name = editedName;
                        birthDate = editedDate;
                        phone = editedPhone;
                    });
                });
            });
        });
    });

    context('Payment Tests', () => {
        it('Purchase via Card PDP', () => {
            cy.visit('/');
            cy.clickOnLogin();
            cy.login(email, currentPassword);
            cy.perfumery();
            cy.selectFirstProduct();
            cy.addProduct();
            cy.goToCheckout();
            cy.payWithCard(cardNumber, cardDate, cvv, name, cpf, 2);
            cy.completeCheckout();
        });

        it('Purchase via Boleto PDP', () => {
            cy.visit('/');
            cy.clickOnLogin();
            cy.login(email, currentPassword);
            cy.perfumery();
            cy.selectFirstProduct();
            cy.addProduct();
            cy.goToCheckout();
            cy.payWithBoleto();
            cy.completeCheckout();
        });

        it('Purchase via Pix PDP', () => {
            cy.visit('/');
            cy.clickOnLogin();
            cy.login(email, currentPassword);
            cy.perfumery();
            cy.selectFirstProduct();
            cy.addProduct();
            cy.goToCheckout();
            cy.payWithPix();
            cy.completeCheckout();
        });
    });

    context('Sorting Tests', () => {
        it('Sorting A-Z', () => {
            cy.visit('/');
            cy.bodyAndBath();
            cy.sortAZ();
        });

        it('Sorting Z-A', () => {
            cy.visit('/');
            cy.bodyAndBath();
            cy.sortZA();
        });

        it('Sorting 1-2', () => {
            cy.visit('/');
            cy.bodyAndBath();
            cy.sort12();
        });

        it('Sorting 2-1', () => {
            cy.visit('/');
            cy.bodyAndBath();
            cy.sort21();
        });
    });
});
