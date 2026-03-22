/*
  register-user.ui.cy.js: cenários de cadastro de usuário via UI no Bookstore.

  Escopo:
  - Validar campos obrigatórios ao tentar registrar sem dados.
  - Validar bloqueio do reCAPTCHA ao tentar registrar sem verificação.
*/

import { generateTestPassword } from '../../support/utils/password'
import { generateUser } from '../../support/utils/generateUser'

describe('UI User Registration - DemoQA Book Store', () => {

  /*
    Monta objeto de usuário completo para o formulário de registro.
    Usa dados aleatórios e senha válida para isolar o bloqueio do reCAPTCHA.
  */
  function buildUser() {
    const user = generateUser()

    return {
      ...user,
      password: generateTestPassword()
    }
  }

  // Pré-condições: garante que cada teste inicia na página de registro.
  beforeEach(() => {
    cy.visit(Cypress.env('uiBaseUrl') + '/register')
  })

  /* Cenário: tentar registrar sem preencher os campos obrigatórios deve destacar visualmente os campos em erro. */
  it('deve destacar os campos obrigatórios ao tentar registrar sem preencher dados.', () => {
    cy.get('#firstname').should('be.visible')
    cy.get('#lastname').should('be.visible')
    cy.get('#userName').should('be.visible')
    cy.get('#password').should('be.visible')

    cy.get('#register').click()

    cy.get('#firstname')
      .should('have.class', 'is-invalid')
    cy.get('#lastname')
      .should('have.class', 'is-invalid')
    cy.get('#userName')
      .should('have.class', 'is-invalid')
    cy.get('#password')
      .should('have.class', 'is-invalid')
  })

  /*
    Valida que o reCAPTCHA bloqueia o registro quando não é verificado.
    A mensagem é genérica e deve aparecer após clicar em Register.
  */
  it('deve exibir mensagem de reCAPTCHA ao tentar registrar sem verificação', () => {
    const user = buildUser()

    cy.registerUser(user)

    cy.get('#name')
      .should('be.visible')
      .and('contain', 'Please verify')
  })

})
