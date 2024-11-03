/// <reference types="cypress" />

import { userBuild } from '../support/generateData';

describe('Authentication', () => {
  const { email, password } = userBuild();

  before(() => {
    cy.task('setupDb');

    cy.request({
      method: 'POST',
      url: '/signup',
      body: {
        email,
        password,
      },
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.accessToken).to.be.a('string');
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Log in as a user', () => {
    cy.loginAs(email, password);

    cy.document().its('cookie').should('contain', 'trello_token');
  });

  it('Logs out logged in user', () => {
    cy.loginAs(email, password);

    cy.dataCy('logged-user').click();
    cy.dataCy('logged-user').contains('Log out').click();

    cy.dataCy('login-menu').should('contain.text', 'Log in');
  });
});
