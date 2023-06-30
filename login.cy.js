import loginPage from "../../pageObject/loginPage"
const inputan = require('../../fixtures/saucedemo/data.json')

describe('Login Scenario', () => {
  const LoginPage = new loginPage()
  beforeEach(() => {
        cy.visit('')
  })

  it('Success Login', () => {
    //cy.get(LoginPage.username).type('standard_user')
    cy.get(LoginPage.username).type(inputan.valid_user)
    //cy.get(LoginPage.passw).type('secret_sauce')
    cy.get(LoginPage.passw).type(inputan.valid_passw)
    cy.get(LoginPage.loginBtn).click()
    cy.wait(100)
    cy.get('.app_logo').should('be.visible')
    cy.get('.title').should('be.visible')
    //cy.url().should('include', '/inventory.html') // => true
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html') // => true
  })

  it('Failed Login', () => {
    //cy.get('#user-name').type('xxx_user')
    //LoginPage.inputUsername('salahuser')
    LoginPage.inputUsername(inputan.invalid_user)
    cy.get('[data-test="password"]').type('xxx_sauce')
    //LoginPage.inputUsername(inputan.invalid_passw)
    //cy.get('#login-button').click()
    LoginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain.text','Epic sadface: Username and password do not match any user in this service')
  })

  it('Failed Login - Locked User', () => {
    //cy.get('#user-name').type('locked_out_user')
    cy.loginCommands('#user-name', 'locked_out_user')
    //cy.get('[data-test="password"]').type('secret_sauce')
    cy.loginCommands('[data-test="password"]', 'secret_sauce')
    //cy.get('#login-button').click()
    cy.klikCommands(LoginPage.loginBtn)
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain.text','Epic sadface: Sorry, this user has been locked out.')
  })
})