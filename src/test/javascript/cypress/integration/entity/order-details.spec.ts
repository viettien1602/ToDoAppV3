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

describe('OrderDetails e2e test', () => {
  const orderDetailsPageUrl = '/order-details';
  const orderDetailsPageUrlPattern = new RegExp('/order-details(\\?.*)?$');
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
    cy.intercept('GET', '/api/order-details+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/order-details').as('postEntityRequest');
    cy.intercept('DELETE', '/api/order-details/*').as('deleteEntityRequest');
  });

  it('should load OrderDetails', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('order-details');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OrderDetails').should('exist');
    cy.url().should('match', orderDetailsPageUrlPattern);
  });

  it('should load details OrderDetails page', function () {
    cy.visit(orderDetailsPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('orderDetails');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderDetailsPageUrlPattern);
  });

  it('should load create OrderDetails page', () => {
    cy.visit(orderDetailsPageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('OrderDetails');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderDetailsPageUrlPattern);
  });

  it('should load edit OrderDetails page', function () {
    cy.visit(orderDetailsPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('OrderDetails');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderDetailsPageUrlPattern);
  });

  it('should create an instance of OrderDetails', () => {
    cy.visit(orderDetailsPageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('OrderDetails');

    cy.get(`[data-cy="quantity"]`).type('41105').should('have.value', '41105');

    cy.get(`[data-cy="price"]`).type('21247').should('have.value', '21247');

    cy.get(`[data-cy="status"]`).select('REFUNDED');

    cy.setFieldSelectToLastOfEntity('product');

    cy.setFieldSelectToLastOfEntity('order');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', orderDetailsPageUrlPattern);
  });

  it('should delete last instance of OrderDetails', function () {
    cy.intercept('GET', '/api/order-details/*').as('dialogDeleteRequest');
    cy.visit(orderDetailsPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('orderDetails').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', orderDetailsPageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
