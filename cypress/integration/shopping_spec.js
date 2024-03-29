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

const {
	PAYMENT_TYPE_TITLE,
	PAYMENT_TYPE_CARD_OPTION,
	PAYMENT_TYPE_CARD_VISA_OPTION,
	PAYMENT_TYPE_CARD_MASTERCARD_OPTION,
	PAYMENT_TYPE_CARD_AMEX_OPTION,
	PAYMENT_TYPE_PAYPAL_OPTION,
	PAYMENT_ORDER_DATA_TITLE,
	PAYMENT_ORDER_INVOICE_ADDRESS,
	PAYMENT_ORDER_DELIVERY_ADDRESS,
	PAYMENT_ORDER_SHIPPING_TYPE,
	PAYMENT_ORDER_PAYMENT_TYPE,
	PAYMENT_CHANGE_SHOPPING_CART,
	PAYMENT_CHANGE_INVOICE_ADDRESS,
	PAYMENT_CHANGE_DELIVERY_ADDRESS,
	PAYMENT_CHANGE_SHIPPING,
	PAYMENT_CHANGE_PAYMENT_METHOD,
	PAYMENT_ACCEPT_CONDITIONS_CHECKBOX,
} = require("../selectors/shopping_payment");

const {
	INVOICE_ADDRESS_TITLE_TEXT,
	PAYMENT_TYPE_TITLE_TEXT,
	PAYMENT_ORDER_DATA_TITLE_TEXT,
	DEFAULT_DELIVERY_TEXT,
	PAYPAL_PAYMENT_TYPE_TEXT,
} = require("../support/constants");

const customer = require("../fixtures/customer_mock_data.json");

/*
 * Tests focused on testing the shopping workflow,
 * from the homepage to the last checkout page before enacting payment.
 */
describe("Shopping Page Workflow", () => {
	/*
	 * Goes to homepage, accepts cookies and confirms that
	 * the shopping categories are visible before starting each test.
	 */
	beforeEach(() => {
		cy.visit("/");

		// accept cookies on cookies disclaimer
		cy.acceptCookies();

		// assert full categories carousel visibility to ensure the shopping options are present
		cy.get(SHOPPING_CAROUSEL, { timeout: 10000 }).should("be.visible");
	});

	/*
	 * Adds items to shopping basket from 3 different shopping categories,
	 * and confirms they're shown in the shopping cart indicator.
	 */
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
		cy.get(SHOPPING_CART_NUMBER_INDICATOR).should("be.visible").should("have.text", "3");
	});

	/*
	 * Adds 1 item to shopping cart and confirms
	 * the user can proceed to checkout as a guest.
	 */
	it("should allow user to proceed as guest", () => {
		cy.goToShoppingBasket();

		// continue to address and delivery
		cy.get(PROCEED_FOOTER_OPTION).click();

		// proceed as guest
		cy.get(PROCEED_AS_GUEST_BTN).should("be.visible").should("be.disabled");
		cy.get(GUEST_EMAIL_FIELD).type(customer.email);
		cy.get(PROCEED_AS_GUEST_BTN).should("be.visible").should("be.enabled").click();

		// confirm you reached the address details page
		cy.get(INVOICE_ADDRESS_TITLE, { timeout: 10000 }).should("have.text", INVOICE_ADDRESS_TITLE_TEXT);
	});

	/*
	 * Adds 1 item to shopping cart, proceeds to checkout as guest,
	 * and confirms the user can fill in their delivery and invoice details,
	 * as well as being unable to proceed before filling in the mandatory fields.
	 */
	it("should show delivery address options", () => {
		cy.goToCheckoutCustomerDetails();

		// confirm you reached the address details page
		cy.get(INVOICE_ADDRESS_TITLE, { timeout: 10000 }).should("have.text", INVOICE_ADDRESS_TITLE_TEXT);

		// confirm the button to proceed is disabled prior to filling in the mandatory details
		cy.get(PROCEED_FOOTER_OPTION).should("be.disabled");

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

		// select the 'Mr' option on the salutation radio buttons
		cy.get(DELIVERY_SALUTATION_MR_BTN).click({ force: true });

		// fill the fields for the delivery address details
		cy.get(DELIVERY_FIRST_NAME_FIELD).type(customer.first_name_alt);
		cy.get(DELIVERY_LAST_NAME_FIELD).type(customer.last_name_alt);
		cy.get(DELIVERY_STREET_FIELD).type(customer.street_alt);
		cy.get(DELIVERY_NUMBER_FIELD).type(customer.number_alt);
		cy.get(DELIVERY_POST_CODE_FIELD).type(customer.post_code);
		cy.get(DELIVERY_TOWN_CITY_FIELD).type(customer.city_alt);

		cy.get(PROCEED_FOOTER_OPTION).should("be.enabled");
	});

	/*
	 * Adds 1 item to shopping cart, proceeds to checkout as a guest,
	 * fills in invoice details (and uses them for delivery),
	 * and confirms payment options available.
	 */
	it("should show all available payment types", () => {
		cy.goToPaymentType();

		// confirm you're in the payment type page
		cy.get(PAYMENT_TYPE_TITLE, { timeout: 10000 }).should("have.text", PAYMENT_TYPE_TITLE_TEXT);

		// select credit card and assert that VISA, Mastercard
		// and American Express options are present
		cy.get(PAYMENT_TYPE_CARD_OPTION).click({ force: true });
		cy.get(PAYMENT_TYPE_CARD_VISA_OPTION).should("be.visible");
		cy.get(PAYMENT_TYPE_CARD_MASTERCARD_OPTION).should("be.visible");
		cy.get(PAYMENT_TYPE_CARD_AMEX_OPTION).should("be.visible");

		// select paypal option
		cy.get(PAYMENT_TYPE_PAYPAL_OPTION).click({ force: true });

		cy.get(PROCEED_FOOTER_OPTION).should("be.enabled");
	});

	/*
	 * Adds 1 item to shopping cart, proceeds to checkout as a guest,
	 * fills in invoice details (and uses them for delivery),
	 * selects paypal as payment option, and confirms all the details
	 * shown on the checkout page before payment.
	 */
	it("should show Order Data page correctly", () => {
		cy.goToFinalPaymentPage();

		// confirm you're in the order data page
		cy.get(PAYMENT_ORDER_DATA_TITLE, { timeout: 10000 }).should("have.text", PAYMENT_ORDER_DATA_TITLE_TEXT);

		// the option to proceed should be disabled prior to checking
		// the checkbox for accepting terms and conditions
		cy.get(PROCEED_FOOTER_OPTION).should("be.disabled");

		// assert the values for the invoice address are correct
		cy.get(PAYMENT_ORDER_INVOICE_ADDRESS).should("contain.text", customer.honorific);
		cy.get(PAYMENT_ORDER_INVOICE_ADDRESS).should("contain.text", customer.first_name);
		cy.get(PAYMENT_ORDER_INVOICE_ADDRESS).should("contain.text", customer.last_name);
		cy.get(PAYMENT_ORDER_INVOICE_ADDRESS).should("contain.text", customer.street);
		cy.get(PAYMENT_ORDER_INVOICE_ADDRESS).should("contain.text", customer.number);
		cy.get(PAYMENT_ORDER_INVOICE_ADDRESS).should("contain.text", customer.post_code);
		cy.get(PAYMENT_ORDER_INVOICE_ADDRESS).should("contain.text", customer.city);
		cy.get(PAYMENT_ORDER_INVOICE_ADDRESS).should("contain.text", customer.country);
		cy.get(PAYMENT_ORDER_INVOICE_ADDRESS).should("contain.text", customer.email);

		// assert the values for the delivery address are correct
		cy.get(PAYMENT_ORDER_DELIVERY_ADDRESS).should("contain.text", customer.honorific);
		cy.get(PAYMENT_ORDER_DELIVERY_ADDRESS).should("contain.text", customer.first_name);
		cy.get(PAYMENT_ORDER_DELIVERY_ADDRESS).should("contain.text", customer.last_name);
		cy.get(PAYMENT_ORDER_DELIVERY_ADDRESS).should("contain.text", customer.street);
		cy.get(PAYMENT_ORDER_DELIVERY_ADDRESS).should("contain.text", customer.number);
		cy.get(PAYMENT_ORDER_DELIVERY_ADDRESS).should("contain.text", customer.post_code);
		cy.get(PAYMENT_ORDER_DELIVERY_ADDRESS).should("contain.text", customer.city);
		cy.get(PAYMENT_ORDER_DELIVERY_ADDRESS).should("contain.text", customer.country);

		// assert shipping type
		cy.get(PAYMENT_ORDER_SHIPPING_TYPE).should("contain.text", DEFAULT_DELIVERY_TEXT);

		// assert payment type
		cy.get(PAYMENT_ORDER_PAYMENT_TYPE).should("contain.text", PAYPAL_PAYMENT_TYPE_TEXT);

		// assert user has the option to change shopping cart
		cy.get(PAYMENT_CHANGE_SHOPPING_CART).should("be.visible");

		// assert all 4 detail steps have an option to be changed
		cy.get(PAYMENT_CHANGE_INVOICE_ADDRESS).should("be.visible");
		cy.get(PAYMENT_CHANGE_DELIVERY_ADDRESS).should("be.visible");
		cy.get(PAYMENT_CHANGE_SHIPPING).should("be.visible");
		cy.get(PAYMENT_CHANGE_PAYMENT_METHOD).should("be.visible");

		// check the "Accept terms and conditions" checkbox and
		// confirm it's now possible to proceed
		cy.get(PAYMENT_ACCEPT_CONDITIONS_CHECKBOX).click();
		cy.get(PROCEED_FOOTER_OPTION).should("be.enabled");
	});
});
