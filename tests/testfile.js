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
                expect(err).to.be.null;
                expect(res.status).equal(404 || 400 || 200);
                expect(res.body).to.be.an("object");

                done();
            });
        });
    });
});





