const { WOMEN_OPTION } = require("../selectors/shopping_category");
const { ADD_TO_BASKET_BTN, GO_TO_SHOPPING_BASKET_BTN } = require("../selectors/shopping_shared");
const { WOMEN_1ST_ITEM } = require("../selectors/shopping_women");

/*
 * Custom command to accept cookies on initial cookie prompt.
 */
Cypress.Commands.add("acceptCookies", () => {
	cy.get(".cp-inner").find(".btn").click();
});

/*
 * Custom command to go to shopping basket after selecting
 * an item from the Women category to buy.
 */
Cypress.Commands.add("goToShoppingBasket", () => {
	// select "Women" inside the "Fashion and Beauty" category
	cy.get(WOMEN_OPTION).click({ force: true });

	// select first listed item to buy
	cy.get(WOMEN_1ST_ITEM).click({ force: true });

	// assert options to buy item and click to buy
	cy.get(ADD_TO_BASKET_BTN, { timeout: 10000 }).click();

	// assert options to go to basket or continue shopping
	cy.get(GO_TO_SHOPPING_BASKET_BTN).click();
});
