/*
  user-register.api.cy.js: cadastro de usuário via API no Bookstore.  
  Valida endpoint POST /Account/v1/User com dados válidos.
*/

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
})