/// <reference types="cypress" />

import { boardBuilder } from '../support/generateData';

describe('Sending requests', () => {
  const { boardName: name } = boardBuilder();

  let boardId = null;

  before(() => {
    cy.task('setupDb');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  after(() => {
    cy.request({
      method: 'POST',
      url: '/api/reset',
    }).then(response => {
      expect(response.status).to.eq(204);
    });
  });

  it('Sending requests - POST', () => {
    cy.request({
      method: 'POST',
      url: '/api/boards',
      body: {
        name,
      },
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(name);
      boardId = response.body.id;
    });
  });

  it('testing board list', () => {
    cy.request({
      method: 'GET',
      url: '/api/boards',
      headers: {
        accept: 'application/json',
      },
    }).then(boards => {
      expect(boards.status).eq(200);
      expect(boards.body).to.have.length(1);
      expect(boards.body[0].id).to.be.a('number');
    });
  });

  it('response gets 201 status', () => {
    cy.request('POST', '/api/boards', {
      name: 'created via cy.request()',
    })
      .its('status')
      .should('eq', 201);
  });

  it('Sending requests - PATCH', () => {
    const boardName = `Board name - ${name}`;

    cy.request({
      method: 'PATCH',
      url: `/api/boards/${boardId}`,
      body: {
        name: boardName,
      },
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(boardName);
    });
  });

  it('Sending requests - DELETE', () => {
    cy.request({
      method: 'DELETE',
      url: `/api/boards/${boardId}`,
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eql({});
    });
  });
});
