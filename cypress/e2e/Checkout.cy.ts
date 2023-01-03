describe("Checkout page", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/1a5650d626d3ed052041a8695cc3e99c/checkout/")
		cy.on("uncaught:exception", (err, runnable, promise) => {
			// returning false here prevents Cypress from
			// failing the test
			if (promise) {
				return false
			}
		})
	})
	it("displays the correct title and description", () => {
		cy.title().should("eq", "The Hardware Store | Checkout")
		cy.get('meta[name="description"]').should("have.attr", "content", "Checkout page")
	})

	it("displays the logo", () => {
		cy.get('img[alt="logo"]').should("have.css", "display", "block").should("be.visible")
	})

	it("displays the checkout status bar", () => {
		cy.get(".progress").should("be.visible")
	})
	it("displays the summary for desktop view", () => {
		cy.viewport(1200, 768).get("[data-cy=Summary]").should("exist").should("be.visible")
	})

	it("displays the summary for mobile view", () => {
		cy.viewport(375, 667)
		cy.get("[data-cy=MobileSummary]").should("exist").should("be.visible")
	})
	it("displays the correct stage of the checkout process", () => {
		cy.window()
			.its("store")
			.invoke("getState")
			.then((state) => {
				const stage = state.checkout.stage
				switch (stage) {
					case "customer":
						cy.get("[data-cy=Customer]").should("be.visible")
						break
					case "shipping":
						cy.get("[data-cy=Shipping]").should("be.visible")
						break
					case "payment":
						cy.get("[data-cy=Payment]").should("be.visible")
						break
					case "thanks":
						cy.get("[data-cy=Thanks]").should("be.visible")
						break
					default:
						throw new Error(`Unexpected stage: ${stage}`)
				}
			})
	})
})
