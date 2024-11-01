// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Get an element with data-cy attribute
     *
     * @example
     * cy.dataCy('locator')
     */
    dataCy();

    /**
     * Creates a new board via UI
     *
     * @example
     * cy.createBoard('board name')
     */
    createBoard();

    /**
     * Removes a board via UI
     *
     * @example
     * cy.removeBoard()
     */
    removeBoard();

    /**
     * Adds a new list via UI
     *
     * @example
     * cy.addList('list name')
     */
    addList();

    /**
     * Adds a new task via UI
     *
     * @example
     * cy.addTask('task name')
     */
    addTask();

    /**
     * Signs up a new task via UI
     *
     * @example
     * cy.signUpAs('email', 'password')
     */
    signUpAs();

    /**
     * Logs in a user via UI
     *
     * @example
     * cy.loginAs('email', 'password')
     */
    loginAs();
  }
}
