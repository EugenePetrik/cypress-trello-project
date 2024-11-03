/// <reference types="cypress" />

describe('Chai Assertions', () => {
  it('Check that of all cards in first list', () => {
    cy.task('setupDb');

    cy.visit('/');

    cy.request({
      method: 'POST',
      url: '/api/boards',
      body: {
        name: 'Shopping',
      },
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq('Shopping');

      const boardId = response.body.id;

      cy.visit(`/board/${boardId}`);
    });

    cy.addList('Groceries');

    const firstTask = 'Milk';
    const secondTask = 'Bread';
    const thirdTask = 'Juice';

    cy.addTask(firstTask);
    cy.addTask(secondTask);
    cy.addTask(thirdTask);

    cy.dataCy('task').should(task => {
      expect(task).to.have.length(3);
      expect(task[0]).to.contain.text(firstTask);
      expect(task[1]).to.contain.text(secondTask);
      expect(task[2]).to.contain.text(thirdTask);
    });
  });
});
