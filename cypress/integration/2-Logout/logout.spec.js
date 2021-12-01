describe("Logout", () => {

    it("should login page if click on exit icon", () => {
        cy.visit("http://localhost:3000/");
		cy.wait(2000);
        cy.get("input[type=email]").type("ju@ju.com");
        cy.get("input[type=password").type("Kakaroto@99698854");
        cy.get("button[type=submit").click();
        cy.wait(1500);
        cy.get('h1 ~ svg').click();
        cy.url().should("eq", "http://localhost:3000/");
    })
})