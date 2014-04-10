
define(function(require) {

	var Mediator = require("app/Mediator");
	var Wreqr = require("backbone.wreqr");

	describe( "Mediator", function() {

		it( "should exist", function() {
			expect( Mediator ).to.exist;
		});

		it( "should have a commands instance", function() {
			expect( Mediator.commands ).to.be.an.instanceof( Wreqr.Commands );
		});

		it( "should have a request response instance", function() {
			expect( Mediator.reqres ).to.be.an.instanceof( Wreqr.RequestResponse );
		});

		it( "should have a event aggregator instance", function() {
			expect( Mediator.vent ).to.be.an.instanceof( Wreqr.EventAggregator );
		});

	});

});