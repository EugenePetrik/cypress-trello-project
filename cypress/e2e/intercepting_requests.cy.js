/// <reference types="cypress" />

import { boardBuilder } from '../support/generateData';

describe('Intercepting network requests', () => {
  const { boardName } = boardBuilder();

  beforeEach(() => {
    cy.task('setupDb');

    cy.intercept({
      method: 'GET',
      url: '/api/boards',
    }).as('boardList');

    cy.intercept({
      method: 'POST',
      url: '/api/boards',
    }).as('createBoard');

    cy.visit('/');
    cy.createBoard(boardName);
  });

  it('Intercepting network requests - GET', () => {
    cy.visit('/');

    cy.wait('@boardList').its('response.statusCode').should('eq', 200);
    cy.dataCy('board-item').should('have.length', 1);
  });

  it('Intercepting network requests - POST', () => {
    cy.wait('@createBoard').then(board => {
      expect(board.response.statusCode).to.eq(201);
      expect(board.response.body.name).to.eq(boardName);
    });
  });

  it.skip('board has no lists', () => {
    cy.intercept('GET', '/api/lists?boardId=1').as('getLists');

    cy.visit('/board/1');

    cy.wait('@getLists');

    cy.dataCy('list').should('be.visible');
  });

  it.skip('deleting a list', () => {
    cy.intercept({
      method: 'DELETE',
      url: '/api/lists/*',
    }).as('deleteList');

    cy.visit('/board/1');

    cy.dataCy('list-options').click();
    cy.dataCy('delete-list').click();

    cy.wait('@deleteList').its('response.statusCode').should('eq', 200);
  });
});
