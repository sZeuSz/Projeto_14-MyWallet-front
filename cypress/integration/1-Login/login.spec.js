/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Login", () => {

	it("should login failed and an alert message appears because email field is blank", () => {
		cy.visit("http://localhost:3000/");
		cy.wait(2000);
		cy.get("input[type=password").type("123456Aa1!");
		cy.get("button[type=submit").click();

		cy.contains('Email obrigatório').should('exist');
		cy.contains('Senha obrigatória').should('not.exist');
	});

	it("should login failed and an alert message appears because password field is blank", () => {
		cy.visit("http://localhost:3000/");
		cy.wait(2000);
		cy.get("input[type=email]").type("roseno@driven.com");
		cy.get("button[type=submit").click();
		cy.contains('Insira um email válido').should('not.exist');
		cy.contains('Senha obrigatória').should('exist');
	});
    
    
	it("should return status code 404 in Login request if user not exist", () => {
		// eslint-disable-next-line jest/valid-expect-in-promise
		cy.request({
		method: 'POST',
		url: 'http://localhost:4000/sign-in',
		body: {email:"arlindo@gmail.com",
    		   password: "1234567"},
		failOnStatusCode: false
		})
		.then(response => {
			// eslint-disable-next-line jest/valid-expect
			expect(response.status).to.equal(404);
		})
	});

	it("should return status code 200 in login request is successful.", () => {
		// eslint-disable-next-line jest/valid-expect-in-promise
		cy.request({
		method: 'POST',
		url: 'http://localhost:4000/mywallet/sign-in',
		body: {email:"ju@ju.com",
    		   password: "Kakaroto@99698854"},
		failOnStatusCode: true
		})
		.then(response => {
			// eslint-disable-next-line jest/valid-expect
			expect(response.status).to.equal(200);
		})
    });
    

    it("should return status code 200 in login request is successful and open transactions page", () => {
		// eslint-disable-next-line jest/valid-expect-in-promise
		cy.visit("http://localhost:3000/");
		cy.wait(2000);
        cy.get("input[type=email]").type("ju@ju.com");
        cy.get("input[type=password").type("Kakaroto@99698854");
		cy.get("button[type=submit").click();
		cy.contains('Insira um email válido').should('not.exist');
        cy.contains('Senha obrigatória').should('not.exist');
        cy.contains('Saldo').should('exist');
        cy.contains('Bem vindo(a) :D').should('exist');
	});

});