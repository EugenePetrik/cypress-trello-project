/// <reference types="cypress" />

import { userBuild } from '../support/generateData';

describe('Cookies', () => {
  const { email, password } = userBuild();

  before(() => {
    cy.task('setupDb');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Cookies', () => {
    cy.signUpAs(email, password);
    cy.dataCy('login-message').should('have.text', 'User is logged in');
    cy.reload();
    cy.getCookie('trello_token').should('exist');
  });
});
