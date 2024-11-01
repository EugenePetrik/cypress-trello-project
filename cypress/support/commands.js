/* eslint-disable cypress/no-unnecessary-waiting */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
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

Cypress.Commands.add('dataCy', value => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('createBoard', boardName => {
  cy.intercept({
    method: 'POST',
    url: '/api/boards',
  }).as('createBoard');

  cy.dataCy('create-board').click();
  cy.dataCy('new-board-input').type(boardName);
  cy.dataCy('new-board-create').click();
  cy.wait(100);

  cy.wait('@createBoard');
});

Cypress.Commands.add('removeBoard', () => {
  cy.dataCy('board-options').click();
  cy.dataCy('delete-board').click();
});

Cypress.Commands.add('addList', listName => {
  cy.intercept({
    method: 'POST',
    url: '/api/lists',
  }).as('createList');

  cy.dataCy('add-list').click();
  cy.dataCy('add-list-input').type(listName);
  cy.dataCy('save').click();
  cy.wait(100);

  cy.wait('@createList');
});

Cypress.Commands.add('addTask', taskName => {
  cy.intercept({
    method: 'POST',
    url: '/api/tasks',
  }).as('createTask');

  cy.dataCy('new-task').click();
  cy.dataCy('task-input').type(taskName);
  cy.dataCy('add-task').click();
  cy.wait(100);

  cy.wait('@createTask');
});

Cypress.Commands.add('signUpAs', (email, password) => {
  cy.intercept({
    method: 'POST',
    url: '/signup',
  }).as('createUser');

  cy.dataCy('login-menu').click();
  cy.dataCy('login-module-sign-up-link').click();
  cy.dataCy('sign-up-module-title').should(
    'have.text',
    'Sign up to create a free account',
  );
  cy.dataCy('signup-email').type(email);
  cy.dataCy('signup-password').type(password);
  cy.dataCy('signup').click();

  cy.wait('@createUser');
});

Cypress.Commands.add('loginAs', (email, password) => {
  cy.intercept({
    method: 'POST',
    url: '/login',
  }).as('loginUser');

  cy.dataCy('login-menu').click();
  cy.dataCy('login-module-title').should('have.text', 'Log in to your account');
  cy.dataCy('login-email').type(email);
  cy.dataCy('login-password').type(password);
  cy.dataCy('login').click();

  cy.wait('@loginUser');
});
