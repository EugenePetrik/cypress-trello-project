/// <reference types="cypress" />

import { boardBuilder } from '../support/generateData';

describe('Mocking responses', () => {
  const { boardName } = boardBuilder();

  beforeEach(() => {
    cy.task('setupDb');
  });

  it('Mocking responses #1', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/boards',
      },
      {
        body: [],
      },
    ).as('boardList');

    cy.visit('/');
    cy.wait('@boardList');
    cy.dataCy('board-item').should('have.length', 0);
  });

  it('Mocking responses #2', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/boards',
      },
      {
        fixture: 'threeBoards',
      },
    ).as('boardList');

    cy.visit('/');
    cy.wait('@boardList');
    cy.dataCy('board-item').should('have.length', 3);
  });

  it('Mocking responses #3', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/boards',
      },
      {
        forceNetworkError: true,
      },
    ).as('createBoard');

    cy.visit('/');
    cy.createBoard(boardName);
    cy.dataCy('error-message')
      .should('be.visible')
      .and('have.text', 'There was an error creating board');
  });

  it('Mocking responses #4', () => {
    cy.visit('/');
    cy.createBoard(boardName);

    cy.intercept(
      {
        method: 'GET',
        url: '/api/boards',
      },
      req => {
        req.reply(res => {
          res.body[0].starred = true;
          return res;
        });
      },
    ).as('boardList');

    cy.visit('/');
    cy.wait('@boardList');
    cy.dataCy('my-starred-boards')
      .eq(0)
      .find('[data-cy=board_item]')
      .should('have.length', 1);
  });

  it('loads a list of boards from fixture', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/boards',
      },
      {
        fixture: 'twoBoards.json',
      },
    ).as('boardList');

    cy.visit('/');
  });

  it('shows an error message when creating a board', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/boards',
      },
      {
        statusCode: 500,
      },
    ).as('boardCreate');

    cy.visit('/');

    cy.dataCy('create-board').click();
    cy.dataCy('new-board-input').type('garden project{enter}');
    cy.dataCy('error-message').should('be.visible');
  });
});
