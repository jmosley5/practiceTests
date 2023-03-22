// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import selectors from '../../cypress/support/loginSelectors.js'
import { project } from '../../cypress/support/projectSelectors.js'

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://app.companycam.com/users/sign_in')
  cy.get('#user_email_address').type(email)
  cy.get('#user_password').type(password)
  cy.get(selectors.signInPage.signInButton).click()
})

Cypress.Commands.add('navigateToChecklists', () => {
  cy.get(project.projectTitle).click()
  cy.url().should('include', '/photos')
  cy.get(project.checklistTab).click()
  cy.url().should('include', '/todos')
  })

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })