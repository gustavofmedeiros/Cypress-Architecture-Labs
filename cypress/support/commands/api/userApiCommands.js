/*
 Comandos de API para usuário (ex: criar usuário).
 Objetivo: tornar os testes mais rápidos e estáveis evitando passos desnecessários na UI.
*/

/*
  Cria um usuário via API para reaproveitar nos testes.
  Recebe um objeto user com os dados necessários para o cadastro.
  Dados obrigatórios: userName e password.
*/
Cypress.Commands.add('createUserApi', (user) => {
  const bodyRequest = {
    userName: user.userName,
    password: user.password,
  };

  /*
  Faz a requisição POST para o endpoint de criação de usuário.
  O comando só executa a ação e retorna o response.
  Asserções ficam nos testes que usam este comando, para manter o fluxo de validação concentrado nas specs.
  O objetivo é permitir flexibilidade nos testes, onde cada um pode validar o que for relevante para seu contexto específico.
*/

  return cy.request(
    'POST',
    Cypress.env('apiBaseUrl') + '/Account/v1/User',
    bodyRequest
  );
});

/*
  Comando para autenticar um usuário via API e obter o token de acesso.
  Recebe um objeto user com os dados necessários para autenticação.
  Dados obrigatórios: userName, password.  
  */
 Cypress.Commands.add ('loginUserApi', (user) => {
  const bodyRequest = {
    userName: user.userName,
    password: user.password,
  };

return cy.request(
  'POST',
  Cypress.env('apiBaseUrl') + '/Account/v1/GenerateToken',
  bodyRequest
);
})