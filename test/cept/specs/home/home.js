

var expect = require('chai').expect;
var host = "http://localhost:8080";


describe("home", function() {

    it("should have an app region", function(done) {

        browser
              .url( host )
              .pause(500)
              .getAttribute("#app-region", "id", function(err, attr) {
                  expect( attr ).to.equal("app-region");
              })
        .end(done);

    });

});

