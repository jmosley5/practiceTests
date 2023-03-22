import selectors from '../../cypress/support/checklistSelectors.js'

beforeEach(() => {
  cy.login(Cypress.env('email'), Cypress.env('password')) 
  cy.navigateToChecklists()
})

describe('Checklist Workflow', () => {

  it('Create a Checklist', () => {
    cy.get('[data-testid="project__checklists-tab"] > :nth-child(2)').contains('(0)').should('be.visible')
    cy.get('[data-testid="project__checklists__create-checklist-button"]').click()
    cy.get('[data-testid="project__checklists__create-dropdown-new"]').click()
    cy.get(selectors.modal.modalOption).contains('New Checklist').should('be.visible')
    cy.get('#taskListName').type('Become a Ghostbuster')
    cy.get(selectors.checklist.createChecklistButton).contains('Create Checklist').click()
    cy.get('[data-testid="project__checklists__checklist-card"] > h3').contains('Become a Ghostbuster').should('be.visible')
  })

  it('Add a task to the Checklist', () => {
    cy.get('[data-testid="project__checklists__checklist-card"] > h3').contains('Become a Ghostbuster').click()
    cy.get(selectors.tasks.createTask).first().click()
    // Unchecking the "Photos Required" checkbox gives me the ability to delete this task without a photo being present
    cy.get('[for="photosRequired"]').click({force: true})
    cy.get('[placeholder="Untitled Task"]').type('Hunt for Ghosts')
    // Toggling the "Hide Completed" toggle gives me the ability to click away from the task and to test if completed tasks are hidden in the following test
    cy.get(selectors.checklist.hideCompletedToggle).click({force: true})
    cy.get('[placeholder="Untitled Task"]').contains('Hunt for Ghosts').should('be.visible')
  })

  it('Complete a task on the Checklist', () => {
    cy.get('[data-testid="project__checklists__checklist-card"] > h3').contains('Become a Ghostbuster').click()
    cy.get(selectors.tasks.completeTaskCheck).first().click()
    cy.get(selectors.checklist.hideCompletedToggle).click({force: true})
    cy.get('.task-container').should('not.exist')
    cy.get(selectors.checklist.hideCompletedToggle).click({force: true})
    cy.get('[placeholder="Untitled Task"]').contains('Hunt for Ghosts').should('be.visible')
  })

  it('Delete a task', () => {
    cy.get('[data-testid="project__checklists__checklist-card"] > h3').contains('Become a Ghostbuster').click()
    cy.get('.task-container').within(() => {
      cy.get('[data-testid="project__item__more-menu-trigger"]').click()
      cy.get(selectors.tasks.deleteTask).click()
    })
    cy.get(selectors.modal.modalOption).contains('Delete Task').should('be.visible')
    cy.get('[data-testid="confirmation-modal__accept"]').click()
    cy.get(selectors.tasks.addTasksText).contains('Add some tasks to get started.').should('be.visible')
    
  })

  it('Delete the checklist', () => {
    cy.get('[data-testid="project__checklists__checklist-card"] > h3').contains('Become a Ghostbuster').click()
    cy.get('[data-testid="project__item__more-menu-trigger"]').click()
    cy.get(selectors.checklist.deleteList).contains('Delete List').click({force: true})
    cy.get(selectors.modal.modalOption).contains('Delete List').should('be.visible')
    cy.get(selectors.checklist.yesDeleteButton).click() 
    cy.url().should('include', '/todos')
  })
})