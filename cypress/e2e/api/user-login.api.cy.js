/*
  user-login.api.cy.js: Cenários de autenticação via API no módulo Bookstore (DemoQA).
  Endpoint utilizado: POST /Account/v1/GenerateToken
  Escopo:
    - Validar emissão de token JWT para usuário válido.
  - Garantir que a API não emite token para credenciais inválidas, como senha incorreta ou usuário inexistente.
  - Verificar que a resposta da API inclui status e mensagens adequadas para cada cenário.
*/

import users from '../../fixtures/users.json'

describe('Login via API - Bookstore', () => {

  /*
  Valida que um usuário com credenciais válidas consegue autenticar via API,
    gerando um token JWT e retornando metadados como status e data de expiração do token.
*/
  it('deve autenticar usuário válido via API', () => {
    const user = users.validUser

    cy.loginUserApi(user).then((response) => {

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('token').and.be.a('string').and.not.be.empty
      expect(response.body).to.have.property('expires')
      expect(response.body.status).to.not.be.undefined
      expect(response.body.result).to.not.be.undefined
    })
  })

  /*
  Garante que a API rejeita autenticação quando a senha está incorreta.
  Rejeitar autenticação aqui significa retornar status de negócio "Failed"
    e não emitir token jwt (token nulo), além de expor uma mensagem de erro adequada.
*/
  it('Deve regeitar autenticação de usuário com senha incorreta', () => {
    const user = users.validUserWrongPassword

    cy.loginUserApi(user).then((response) => {
      expect(response.status).to.equal(200)

      expect(response.body.status).to.equal('Failed')
      expect(response.body.token).to.be.null  
      expect(response.body.result).to.contain('failed')
    })
  })

  /*
  Garante que a API rejeita autenticação quando o usuário não existe.
  Na API do Bookstore, isso se reflete em status "Failed", token jwt nulo
    e mensagem "User authorization failed." no campo result.
*/
  it('Deve regeitar autenticação de usuário inexistente', () => {
    const user = users.nonExistingUser
    cy.loginUserApi(user).then((response) => {
      
      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('Failed')
      expect(response.body.token).to.be.null
      expect(response.body.result).to.contain('User authorization failed')

    })


  })
})

