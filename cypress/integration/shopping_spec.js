/// <reference types="cypress" />

/*
 * The copyright of this file belongs to Vanda Barata.
 * The file cannot be reproduced in whole or in part
 * without the prior permission of the owner.
 *
 * © 2020 Vanda Barata
 */

const { WOMEN_OPTION } = require("../selectors/shopping_category");
const { WOMEN_1ST_ITEM } = require("../selectors/shopping_women");
const {
	ADD_TO_BASKET_BTN,
	GO_TO_SHOPPING_BASKET_BTN,
	CONTINUE_SHOPPING_BTN,
	SHOPPING_CART_NUMBER_INDICATOR,
	PROCEED_FROM_SHOPPING_CART,
	GUEST_EMAIL_FIELD,
	PROCEED_AS_GUEST_BTN,
	INVOICE_ADDRESS_TITLE,
} = require("../selectors/shopping_shared");

const customer = require("../fixtures/customer_mock_data.json");

describe("Shopping Page Workflow", () => {
	beforeEach(() => {
		cy.visit("/");

		// accept cookies on cookies disclaimer
		cy.acceptCookies();

		// assert full caroussel visibility to ensure the shopping options are present
		cy.get(".page-home > :nth-child(3) > :nth-child(2)", { timeout: 10000 }).should("be.visible");
	});

	it("should add an item to shopping basket", () => {
		// select "Women" inside the "Fashion and Beauty" category
		cy.get(WOMEN_OPTION).click({ force: true });

		// select first listed item to buy
		cy.get(WOMEN_1ST_ITEM).click({ force: true });

		// assert options to buy item and click to buy
		cy.get(ADD_TO_BASKET_BTN, { timeout: 10000 }).should("be.visible").should("be.enabled").click();

		// assert options to go to basket or continue shopping
		cy.get(GO_TO_SHOPPING_BASKET_BTN).should("be.visible").should("be.enabled");
		cy.get(CONTINUE_SHOPPING_BTN).should("be.visible").should("be.enabled").click();

		// assert shopping cart is showing indicator of 1 product
		cy.get(SHOPPING_CART_NUMBER_INDICATOR).should("be.visible").should("contain.text", "1");
	});

	it("should allow user to proceed as guest", () => {
		cy.goToShoppingBasket();

		// continue to address and delivery
		cy.get(PROCEED_FROM_SHOPPING_CART).click();

		// proceed as guest
		cy.get(PROCEED_AS_GUEST_BTN).should("be.visible").should("be.disabled");
		cy.get(GUEST_EMAIL_FIELD).type(customer.email);
		cy.get(PROCEED_AS_GUEST_BTN).should("be.visible").should("be.enabled").click();

		// confirm you reached the address details page
		cy.get(INVOICE_ADDRESS_TITLE, { timeout: 10000 }).should("contain.text", "Your invoice address");
	});
});
