// app/Application.js

define([
	"marionette",
	"app/Mediator"
], function ( Marionette, Mediator ) {


    var App = new Marionette.Application();

    App.addRegions({
        appRegion: "#app-region"
    });

    App.navigate = function(route, options) {
        Backbone.history.navigate(route, options || {});
    };

    App.getCurrentRoute = function() {
        return Backbone.history.fragment;
    };

    App.startSubApp = function(appName, options) {
        var currentApp = appName ? App.module(appName) : null;
        if ( App.currentApp === currentApp ) { return; }

        if ( App.currentApp ) {
            App.currentApp.stop();
        }

        App.currentApp = currentApp;

        if ( currentApp ) {
            currentApp.start( options );
        }
    };

    App.onInitializeAfter = function(next) {
        console.log("Application has started");

        if( Backbone.history ) {
            require([
                "app/modules/bootstrap/Module",
                "app/modules/common/Module"
            ], function() {

                Backbone.history.start({ pushState: true });
                Mediator.vent.trigger("bootstrap:initialize");
                Mediator.vent.trigger("show:common");
                if ( next ) next();
            });
        }
    };

    return App;

});

