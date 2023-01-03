describe("Navigation", () => {
	describe("Static pages", () => {
		beforeEach(() => {
			cy.visit("http://localhost:3000/1a5650d626d3ed052041a8695cc3e99c/login/")
		})
		it("should navigate to the login page", () => {
			// Find an elelment containing "Forgot Password ?" text and click it
			cy.get(".justify-between > .text-sm").click()

			// The new url should include "/reset-password"
			cy.url().should("include", "/reset-password")

			// The new page should contain "Back to Login" text
			cy.findAllByText("Back to Login", { exact: true })
		})

		it("displays the form", () => {
			cy.get("form").should("be.visible")
		})

		it("accepts input in the email field", () => {
			const typedText = "test@example.com"
			cy.get("#email").type(typedText).should("have.value", typedText)
		})

		it("accepts input in the password field", () => {
			const typedText = "password"
			cy.get("#password").type(typedText).should("have.value", typedText)
		})

		it("submits the form when the submit button is clicked", () => {
			cy.get('button[type="submit"]').click()

			// add assertions to verify that the form submission is successful
		})
		it("should take screenshot of the loginpage", () => {
			// Wait until the page is displayed
			cy.findByRole("heading", {
				name: "Hello Again!"
			})

			cy.percySnapshot("Loginpage")
		})
		it("navigate from login to order success page", () => {
			// swell store email
			const email = ""
			// swell store password
			const password = ""
			const fName = "John"
			const lName = "Doe"
			const city = "NY"
			const company = "Google"
			const country = "UKA"
			const state = "Google"
			const address = "123 Main Street"
			const zip = "10305"
			const aprt = "No 5"
			const tel = "213-2423-355"
			cy.get("#email").type(email).should("have.value", email)
			cy.get("#password").type(password).should("have.value", password)
			cy.get('button[type="submit"]').click()
			cy.url().should("include", "/checkout")
			cy.get("[data-cy=Customer]").should("be.visible")
			cy.get('[name="firstname"]').type(fName).should("have.value", fName)
			cy.get('[name="lastname"]').type(lName).should("have.value", lName)
			cy.get('[placeholder="City"]').type(city).should("have.value", city)
			cy.get('[name="phonenumber"]').type(tel).should("have.value", tel)
			cy.get('[name="company"]').type(company).should("have.value", company)
			cy.get('[name="country"]').type(country).should("have.value", country)
			cy.get('[name="province"]').type(state).should("have.value", state)
			cy.get('[name="postal"]').type(zip).should("have.value", zip)
			cy.get('[name="address"]').type(address).should("have.value", address)
			cy.get('[name="apartment"]').type(aprt).should("have.value", aprt)
			cy.get('[name="continue-to-shipping"]').click()
			cy.get("[data-cy=Shipping]").should("be.visible")
			cy.get('[name="continue-to-payment"]').click()
			cy.get("[data-cy=Payment]").should("be.visible")
			cy.get('input[name="paymentMethod"][value="bankTransfer"]').click()
			cy.get('[name="paymentConfirmation"]').check().should("be.checked")
			cy.get('[name="complete-order"]').click()
			cy.get("[data-cy=Thanks]").should("be.visible")
		})
	})
})
