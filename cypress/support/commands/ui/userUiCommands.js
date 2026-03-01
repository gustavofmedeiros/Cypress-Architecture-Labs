/*
 Comandos de UI voltados para ações de usuário.
 Objetivo: centralizar fluxos de tela (como login) para reduzir repetição nos testes.
*/

/*
  Faz login via UI para reaproveitar nos testes.
  Recebe um objeto user com userName e password.
  Centraliza o fluxo de preenchimento e envio, evitando repetição nos testes.
  Asserções ficam a cargo dos casos de teste conforme contexto específico.
*/
Cypress.Commands.add('login', (user) => {
  cy.get('[id=userName]').type(user.userName)
  cy.get('[id=password]').type(user.password)
  cy.get('[id=login]').click()
})
