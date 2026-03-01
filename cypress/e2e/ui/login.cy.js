/*
  Login.cy.js: Cenários de autenticação com sucesso e falha  no módulo Bookstore para o site DemoQA.
*/

describe('Login - Bookstore', () => {

  // Pré-condições: carrega usuários da fixture e garante que cada teste inicia na página de login.
  beforeEach(function () {
    cy.fixture('users').then((users) => {
      this.users = users
    })
    cy.visit(Cypress.env('uiBaseUrl') + '/login')

  })

  // Cenário de sucesso: login com credenciais válidas deve direcionar para a área logada.  
  it('deve logar com usuário válido', function () {
    const user = this.users.validUser

    cy.login(user)
    cy.get('#userName-value')
      .should('be.visible')
      .and('have.text', user.userName)
    cy.get('#submit')
      .should('be.visible')
      .and('have.text', "Logout")
  })

  // Cenário de falha: senha incorreta deve exibir mensagem de erro e não mostrar área logada.
  it('deve exibir mensagem de erro para senha incorreta', function () {
    const user = this.users.validUserWrongPassword
    cy.login(user)
    cy.get('#name')
      .should('be.visible')
      .and('have.text', "Invalid username or password!")

    cy.get('#submit').should('not.exist')
    cy.get('#userName-value').should('not.exist')
  })

  /* Cenário de falha: usuário inexistente também não deve autenticar.
     Mantido para evidenciar que a aplicação usa a mesma mensagem genérica
     para usuário inexistente e senha incorreta, e para garantir que,
     mesmo assim, o usuário não é autenticado (sem nome de usuário e sem botão de logout).
      */
  it('deve exibir mensagem de erro para usuário inexistente', function () {
    const user = this.users.nonExistingUser
    cy.login(user)
    cy.get('#name')
      .should('be.visible')
      .and('have.text', 'Invalid username or password!')

    cy.get('#submit').should('not.exist')
    cy.get('#userName-value').should('not.exist')
  })

})
