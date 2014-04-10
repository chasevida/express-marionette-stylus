
define(function(require) {

	var App 		= require("app/Application"),
		Backbone 	= require("backbone"),
		Marionette 	= require("marionette"),
		Mediator 	= require("app/Mediator");


	describe( "App", function() {

		beforeEach(function() {
			Backbone.history.started = null;
			Backbone.history.stop();
		});

		it( "should be a marionette application", function() {
			expect( App ).to.exist;
			expect( App ).to.be.an.instanceof( Marionette.Application );
		});

		it( "should have an 'app' region", function() {
			expect( App.appRegion ).to.exist;
		});

		describe( "extend marionette base application", function() {

			it( "should navigate browser history", function() {
				expect( App.navigate ).to.exist;
				expect( App.navigate ).to.be.a("function");

				var historySpy = sinon.spy( Backbone.history, "navigate");
				var opts = { trigger: false };
				App.navigate( "home", opts );

				expect( historySpy ).to.have.been.calledOnce;
				expect( historySpy ).to.have.been.calledWith("home", opts);

				Backbone.history.navigate.restore();
			});

			it( "should get current route", function() {
				expect( App.getCurrentRoute ).to.exist;
				expect( App.getCurrentRoute ).to.be.a("function");
				Backbone.history.fragment = "login";
				expect( App.getCurrentRoute() ).to.equal("login");
				Backbone.history.fragment = null;
			});
		});

		describe( "start sub app", function() {

			beforeEach(function() {
				App.currentApp = null;
				this.mockModule = {
					start: function( opts ) {},
					stop: function() {}
				};
			});

			it( "shoud exist", function() {
				expect( App.startSubApp ).to.exist;
				expect( App.startSubApp ).to.be.a("function");
			});

			it( "should start new current module", function() {
				var 	opts 	= { id: 1234, name: "TestModule" },
					spy 	= sinon.spy(this.mockModule, "start"),
					stub 	= sinon.stub(App, "module").returns(this.mockModule);

				expect( spy.called ).to.be.false;
				expect( stub.called ).to.be.false;
				expect( App.currentApp ).to.be.a("null");

				App.startSubApp("TestModule", opts);
				expect( App.currentApp ).to.equal( this.mockModule );
				expect( spy ).to.have.been.calledOnce;
				expect( spy ).to.have.been.calledWith( opts );

				expect( stub ).to.have.been.calledOnce;
				expect( stub ).to.have.been.calledWith("TestModule");
			});

			it( "should stop current module", function() {
				App.currentApp = this.mockModule;
				var spy = sinon.spy(App.currentApp, "stop");
				expect( spy.called ).to.be.false;

				App.startSubApp("TestModule");

				expect( spy ).to.have.been.calledOnce;
			});
		});

			
		describe( "on initialize", function() {

			it( "should have 'initialize:after' handler", function() {
				expect( App.onInitializeAfter ).to.exist;
				expect( App.onInitializeAfter ).to.be.a("function");
			});

			it( "should load requirejs modules", sinon.test(function() {
				var stub = sinon.stub(App, "onInitializeAfter");
				App.on("initialize:after", stub);
				expect(stub.called).to.be.false;

				App.trigger("initialize:after");

				expect( stub.calledOnce ).to.be.true;
				expect( stub.callCount ).to.equal(1);

				App.onInitializeAfter.restore();
			}));

			it( "should start backbone history", function(done) {
				var spy = sinon.spy(Backbone.history, "start");
				expect( spy.called ).to.be.false;

				App.onInitializeAfter(function() {
					expect( Backbone.history ).to.exist;
					expect( spy ).to.have.been.calledOnce;

					Backbone.history.start.restore();
					done();
				});
			});

			it( "should trigger 'app:initialize:start' event", function(done) {
			      var spy = sinon.spy();
			      sinon.spy(Backbone.history, "start");
				Mediator.vent.on("app:initialize:start", spy);
				expect( spy.called ).to.be.false;

				App.onInitializeAfter(function() {
					expect( spy.calledOnce ).to.be.true;
					expect( spy.callCount ).to.equal(1);

					Backbone.history.start.restore();
					done();
				});
			});
		});

	});

});