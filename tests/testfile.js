const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

chai.use(chaiHttp)



describe("log-in system", () => {
    describe("POST-request for log-in", () => {
        it("Should allow user to log in", (done) => {
            chai
            .request(app)
            .get("/login")
            .end((err, res) => {
                //Der testes for om fejl er nul
                expect(err).to.be.null;
                //Der testes for om en af de tre viste statuskoder returneres
                expect(res.status).equal(404 || 400 || 200);
                //Der testes for om den body der sendes til klienten er et objekt
                expect(res.body).to.be.an("object");

                done();
            });
        });
    });
});





