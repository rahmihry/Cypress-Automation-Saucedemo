class loginPage{
    username = '#user-name'
    passw = '[data-test="password"]'
    loginBtn = '#login-button'

    inputUsername(user){
        //cy.get(this.username).should('be.visible').type(user)
        cy.loginCommands(this.username, user)
    }

    clickLogin(){
        cy.get(this.loginBtn).click()
    }

    verifyHeader(){
        cy.get(this.header).should('be.visible')
    }
}
export default loginPage