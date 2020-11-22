/*
 * The copyright of this file belongs to Vanda Barata.
 * The file cannot be reproduced in whole or in part
 * without the prior permission of the owner.
 *
 * © 2020 Vanda Barata
 */

const { SHOPPING_CAROUSEL, WOMEN_OPTION, MEN_OPTION, CHILDREN_OPTION } = require("../selectors/shopping_category");
const {
	SHOPPING_CART_NUMBER_INDICATOR,
	PROCEED_FOOTER_OPTION,
	GUEST_EMAIL_FIELD,
	PROCEED_AS_GUEST_BTN,
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
	EMAIL_FIELD,
	DELIVERY_ADDRESS_OPTION,
	DELIVERY_SALUTATION_MR_BTN,
	DELIVERY_FIRST_NAME_FIELD,
	DELIVERY_LAST_NAME_FIELD,
	DELIVERY_STREET_FIELD,
	DELIVERY_NUMBER_FIELD,
	DELIVERY_POST_CODE_FIELD,
	DELIVERY_TOWN_CITY_FIELD,
} = require("../selectors/shopping_address");

const customer = require("../fixtures/customer_mock_data.json");

describe("Shopping Page Workflow", () => {
	beforeEach(() => {
		cy.visit("/");

		// accept cookies on cookies disclaimer
		cy.acceptCookies();

		// assert full categories carousel visibility to ensure the shopping options are present
		cy.get(SHOPPING_CAROUSEL, { timeout: 10000 }).should("be.visible");
	});

	it("should add items to shopping basket", () => {
		// choose first item inside the "Fashion and Beauty - Men" category
		cy.addFirstItemToShoppingCart(MEN_OPTION);

		cy.visit("/");

		// choose first item inside the "Fashion and Beauty - Women" category
		cy.addFirstItemToShoppingCart(WOMEN_OPTION);

		cy.visit("/");

		// choose first item inside the "Fashion and Beauty - Children" category
		cy.addFirstItemToShoppingCart(CHILDREN_OPTION);

		// assert shopping cart is showing indicator of 3 products
		cy.get(SHOPPING_CART_NUMBER_INDICATOR).should("be.visible").should("contain.text", "3");
	});

	it("should allow user to proceed as guest", () => {
		cy.goToShoppingBasket();

		// continue to address and delivery
		cy.get(PROCEED_FOOTER_OPTION).click();

		// proceed as guest
		cy.get(PROCEED_AS_GUEST_BTN).should("be.visible").should("be.disabled");
		cy.get(GUEST_EMAIL_FIELD).type(customer.email);
		cy.get(PROCEED_AS_GUEST_BTN).should("be.visible").should("be.enabled").click();

		// confirm you reached the address details page
		cy.get(INVOICE_ADDRESS_TITLE, { timeout: 10000 }).should("contain.text", "Your invoice address");
	});

	it("should show delivery address options", () => {
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

		// assert the email has been correctly already filled
		cy.get(EMAIL_FIELD)
			.invoke("val")
			.then((val) => {
				const field_email = val;
				expect(field_email).to.equal(customer.email);
			});

		// select the option for a different delivery address
		cy.get(DELIVERY_ADDRESS_OPTION).click();

		// select the 'Ms' option on the salutation radio buttons
		cy.get(DELIVERY_SALUTATION_MR_BTN).click({ force: true });

		// fill the fields for the delivery address details
		cy.get(DELIVERY_FIRST_NAME_FIELD).type(customer.first_name_alt);
		cy.get(DELIVERY_LAST_NAME_FIELD).type(customer.last_name_alt);
		cy.get(DELIVERY_STREET_FIELD).type(customer.street_alt);
		cy.get(DELIVERY_NUMBER_FIELD).type(customer.number_alt);
		cy.get(DELIVERY_POST_CODE_FIELD).type(customer.post_code);
		cy.get(DELIVERY_TOWN_CITY_FIELD).type(customer.city_alt);

		cy.get(PROCEED_FOOTER_OPTION).click();
	});
});
