/*
  Comandos de UI voltados para ações de registro.
  Objetivo: centralizar o preenchimento e envio do formulário de cadastro.
*/

/*
  Preenche o formulário de registro e clica em Register.
  Recebe um objeto user com firstName, lastName, userName e password.
  Asserções ficam a cargo dos casos de teste conforme contexto específico.
*/
Cypress.Commands.add('registerUser', (user) => {
  cy.get('#firstname').type(user.firstName)
  cy.get('#lastname').type(user.lastName)
  cy.get('#userName').type(user.userName)
  cy.get('#password').type(user.password)
  cy.get('#register').click()
})
