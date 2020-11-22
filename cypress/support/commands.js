const { WOMEN_OPTION } = require("../selectors/shopping_category");
const { LIST_1ST_ITEM } = require("../selectors/shopping_list_items");
const {
	ADD_TO_BASKET_BTN,
	GO_TO_SHOPPING_BASKET_BTN,
	CONTINUE_SHOPPING_BTN,
	PROCEED_FOOTER_OPTION,
	PROCEED_AS_GUEST_BTN,
	GUEST_EMAIL_FIELD,
} = require("../selectors/shopping_common");
const {
	INVOICE_ADDRESS_TITLE,
	SALUTATION_MS_BTN,
	FIRST_NAME_FIELD,
	LAST_NAME_FIELD,
	STREET_FIELD,
	NUMBER_FIELD,
	POST_CODE_FIELD,
	TOWN_CITY_FIELD,
	DOB_DAY_FIELD,
	DOB_MONTH_FIELD,
	DOB_YEAR_FIELD,
} = require("../selectors/shopping_address");
const { PAYMENT_TYPE_TITLE, PAYMENT_TYPE_PAYPAL_OPTION } = require("../selectors/shopping_payment");

const customer = require("../fixtures/customer_mock_data.json");

/*
 * Custom command to accept cookies on initial cookie prompt.
 */
Cypress.Commands.add("acceptCookies", () => {
	cy.get(".cp-inner").find(".btn").click();
});

/*
 * Custom command to add first item on the given
 * shopping section to the shopping cart.
 */
Cypress.Commands.add("addFirstItemToShoppingCart", (section) => {
	// select section inside the "Fashion and Beauty" category
	cy.get(section).click({ force: true });

	// select first listed item to buy
	cy.get(LIST_1ST_ITEM).click({ force: true });

	// assert options to buy item and click to buy
	cy.get(ADD_TO_BASKET_BTN, { timeout: 10000 }).should("be.visible").should("be.enabled").first().click();

	// assert options to go to basket or continue shopping
	// click to continue shopping
	cy.get(GO_TO_SHOPPING_BASKET_BTN).should("be.visible").should("be.enabled");
	cy.get(CONTINUE_SHOPPING_BTN).should("be.visible").should("be.enabled").click();
});

/*
 * Custom command to go to shopping basket after selecting
 * an item from the Women category to buy.
 */
Cypress.Commands.add("goToShoppingBasket", () => {
	// select "Women" inside the "Fashion and Beauty" category
	cy.get(WOMEN_OPTION).click({ force: true });

	// select first listed item to buy
	cy.get(LIST_1ST_ITEM).click({ force: true });

	// assert options to buy item and click to buy
	cy.get(ADD_TO_BASKET_BTN, { timeout: 10000 }).first().click();

	// assert options to go to basket or continue shopping
	cy.get(GO_TO_SHOPPING_BASKET_BTN).click();
});

/*
 * Custom command to go directly to the customer
 * checkout details as a guest.
 */
Cypress.Commands.add("goToCheckoutCustomerDetails", () => {
	cy.goToShoppingBasket();

	// continue to address and delivery
	cy.get(PROCEED_FOOTER_OPTION).click();

	// proceed as guest
	cy.get(GUEST_EMAIL_FIELD).type(customer.email);
	cy.get(PROCEED_AS_GUEST_BTN).click();
});

/*
 * Custom command to go directly to payment type
 * on the customer checkout journey.
 */
Cypress.Commands.add("goToPaymentType", () => {
	cy.goToCheckoutCustomerDetails();

	// confirm you reached the address details page
	cy.get(INVOICE_ADDRESS_TITLE, { timeout: 10000 }).should("contain.text", "Your invoice address");

	// select the 'Ms' option on the salutation radio buttons
	cy.get(SALUTATION_MS_BTN).click({ force: true });

	// fill the fields for the invoice address details
	cy.get(FIRST_NAME_FIELD).type(customer.first_name);
	cy.get(LAST_NAME_FIELD).type(customer.last_name);
	cy.get(STREET_FIELD).type(customer.street);
	cy.get(NUMBER_FIELD).type(customer.number);
	cy.get(POST_CODE_FIELD).type(customer.post_code);
	cy.get(TOWN_CITY_FIELD).type(customer.city);
	cy.get(DOB_DAY_FIELD).type(customer.dob_day);
	cy.get(DOB_MONTH_FIELD).type(customer.dob_month);
	cy.get(DOB_YEAR_FIELD).type(customer.dob_year);

	cy.get(PROCEED_FOOTER_OPTION).click();
});

/*
 * Custom Command to go directly to the
 * last payment page of the workflow.
 */
Cypress.Commands.add("goToFinalPaymentPage", () => {
	cy.goToPaymentType();

	// confirm you're in the payment type page
	cy.get(PAYMENT_TYPE_TITLE, { timeout: 10000 }).should("contain.text", "Your payment type");

	// select paypal option
	cy.get(PAYMENT_TYPE_PAYPAL_OPTION).click({ force: true });

	cy.get(PROCEED_FOOTER_OPTION).click();
});
