describe("Delivery Fee Calculator App", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000");
    });

    it("front page can be opened", function() {
        cy.contains("Delivery Fee Calculator");
        cy.contains("Calculate Delivery Price");
    });

    it("the initial delivery fee is 0€", function() {
        cy.contains("Delivery Price: 0 €");
    });

    it("user can calculate delivery fee", function() {
        cy.get("#cart-value").type("10");
        cy.get("#delivery-distance").type("1234");
        cy.get("#amount-of-items").type("3");

        cy.get("#calculate-btn").click();
        cy.get("#result").should("not.contain", "Delivery Price: 0 €");
    });
});

export {};