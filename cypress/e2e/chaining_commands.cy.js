/// <reference types="cypress" />

import { boardBuilder, listBuilder, taskBuilder } from '../support/generateData';

describe('Chaining commands', () => {
  const { boardName } = boardBuilder();
  const { listName } = listBuilder();
  const { taskName } = taskBuilder();

  let boardId = null;

  before(() => {
    cy.task('setupDb');

    cy.visit('/');
    cy.createBoard(boardName);
    cy.url().then(url => {
      boardId = url.match(/(\d+)$/)[0];
    });
  });

  beforeEach(() => {
    cy.visit(`/board/${boardId}`);
    cy.addList(listName);
  });

  it('Chaining commands', () => {
    const firstTask = `${taskName} #1`;
    const secondTask = `${taskName} #2`;

    cy.addTask(firstTask);
    cy.addTask(secondTask);

    cy.dataCy('tasks-list')
      .find('[data-cy=task]')
      .then(task => {
        cy.wrap(task).should('have.length', 2);
        cy.wrap(task).eq(0).find('[data-cy=task-title]').should('have.text', firstTask);
        cy.wrap(task).eq(1).find('[data-cy=task-title]').should('have.text', secondTask);
      });
  });
});
