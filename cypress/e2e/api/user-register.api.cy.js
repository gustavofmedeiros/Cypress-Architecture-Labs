/*
  user-register.api.cy.js: cenários de cadastro de usuário via API no Bookstore.

  Escopo:
  - Registrar usuário novo com dados válidos via POST /Account/v1/User.
  - Garantir que a API não permite cadastro de usuário com userName duplicado.
  - Exercitar regras de senha no backend, cobrindo diferentes violações (tamanho mínimo,
*/

import users from '../../fixtures/users.json'

describe('API User Registration - DemoQA Book Store', () => {

  /*
  Registra usuário novo via POST /Account/v1/User.
  
  Este teste gera userName único com timestamp para evitar duplicidade na massa de dados.
  O comando customizado createUserApi é responsável pela requisição, 
  enquanto o cenário de teste valida apenas status e resposta da API.
*/
  it('deve registrar um novo usuário com dados válidos', () => {
    const user = {
      userName: 'usuarioteste' + Date.now(),
      password: 'Teste@1357'
    }

    cy.createUserApi(user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('userID');
      expect(response.body).to.have.property('username', user.userName);
    });
  })
  /*
    Valida que a API não permite cadastro de usuário com userName já existente.
    O cenário utiliza o usuário válido da fixture, que já existe na base de dados do Bookstore por ser previamente cadastrado.
  */

  it('não deve cadastrar usuário duplicado', () => {
    const user = users.validUser;

    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: user,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(406);
      expect(response.body.code).to.eq('1204');
      expect(response.body.message).to.eq('User exists!');
    });
  })

  /*
    Valida que a API rejeita cadastro com senha menor que oito caracteres.
    O teste usa o usuário inválido da fixture que viola apenas a regra de tamanho.
  */
  it('não deve cadastrar usuário com senha menor que oito caracteres', () => {
    const user = users.invalidPasswordTooShort;

    cy.createUserApi(user).then((response) => {
      cy.log(`Status: ${response.status}`);
      cy.log(`Body: ${JSON.stringify(response.body)}`);

      expect(response.status).to.eq(400);
      expect(response.body.code).to.eq('1300');
      expect(response.body.message).to.contain('Passwords must have at least one non alphanumeric character');
    });
  });

  /*
    Valida que a API rejeita cadastro com senha sem dígito.
    O teste usa o usuário inválido da fixture que viola apenas a regra de dígito de 0 a 9.
  */
  it('não deve cadastrar usuário com senha sem dígito', () => {
    const user = users.invalidPasswordNoDigit;

    cy.createUserApi(user).then((response) => {
      cy.log(`Status: ${response.status}`);
      cy.log(`Body: ${JSON.stringify(response.body)}`);

      expect(response.status).to.eq(400);
      expect(response.body.code).to.eq('1300');
      expect(response.body.message).to.contain('Passwords must have at least one non alphanumeric character');
    });
  });

  /*
    Valida que a API rejeita cadastro com senha sem caractere especial.
    O teste usa o usuário inválido da fixture que viola apenas a regra de caractere especial.
  */
  it('não deve cadastrar usuário com senha sem caractere especial', () => {
    const user = users.invalidPasswordNoSpecial;

    cy.createUserApi(user).then((response) => {
      cy.log(`Status: ${response.status}`);
      cy.log(`Body: ${JSON.stringify(response.body)}`);

      expect(response.status).to.eq(400);
      expect(response.body.code).to.eq('1300');
      expect(response.body.message).to.contain('Passwords must have at least one non alphanumeric character');
    });
  });

  /*
    Valida que a API rejeita cadastro com senha sem letra maiúscula.
    O teste usa o usuário inválido da fixture que viola apenas a regra de letra maiúscula.
  */
  it('não deve cadastrar usuário com senha sem letra maiúscula', () => {
    const user = users.invalidPasswordNoUppercase;

    cy.createUserApi(user).then((response) => {
      cy.log(`Status: ${response.status}`);
      cy.log(`Body: ${JSON.stringify(response.body)}`);

      expect(response.status).to.eq(400);
      expect(response.body.code).to.eq('1300');
      expect(response.body.message).to.contain('Passwords must have at least one non alphanumeric character');
    });
  });


})