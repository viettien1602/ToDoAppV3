import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Order e2e test', () => {
  const orderPageUrl = '/order';
  const orderPageUrlPattern = new RegExp('/order(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/orders+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/orders').as('postEntityRequest');
    cy.intercept('DELETE', '/api/orders/*').as('deleteEntityRequest');
  });

  it('should load Orders', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('order');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Order').should('exist');
    cy.url().should('match', orderPageUrlPattern);
  });

  it('should load details Order page', function () {
    cy.visit(orderPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('order');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderPageUrlPattern);
  });

  it('should load create Order page', () => {
    cy.visit(orderPageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Order');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderPageUrlPattern);
  });

  it('should load edit Order page', function () {
    cy.visit(orderPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('Order');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderPageUrlPattern);
  });

  it('should create an instance of Order', () => {
    cy.visit(orderPageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Order');

    cy.get(`[data-cy="dateTime"]`).type('2023-01-24T22:48').should('have.value', '2023-01-24T22:48');

    cy.get(`[data-cy="totalPrice"]`).type('38737').should('have.value', '38737');

    cy.get(`[data-cy="deliveryAddress"]`).type('Credit back-end').should('have.value', 'Credit back-end');

    cy.get(`[data-cy="note"]`).type('solutions Borders user-centric').should('have.value', 'solutions Borders user-centric');

    cy.get(`[data-cy="status"]`).should('not.be.checked');
    cy.get(`[data-cy="status"]`).click().should('be.checked');

    cy.setFieldSelectToLastOfEntity('user');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderPageUrlPattern);
  });

  it('should delete last instance of Order', function () {
    cy.intercept('GET', '/api/orders/*').as('dialogDeleteRequest');
    cy.visit(orderPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('order').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', orderPageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
