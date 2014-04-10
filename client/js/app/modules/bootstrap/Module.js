// app/bootstrap/Module.js

define([
    "app/Application",
    "app/Mediator",
    "app/modules/bootstrap/Api"
], function( App, Mediator, API ) {


    App.module( "BootstrapModule", function( BootstrapModule, App, Backbone, Marionette, $, _ ) {

        BootstrapModule.startWithParent = true;

        BootstrapModule.onStart = function() {
            console.log("Start: Bootstrap Module");
        };

        BootstrapModule.onStop = function() {
            console.log("Stop: Bootstrap Module");
        };

        App.vent.on("bootstrap:initialize", function() {
            App.vent.off("bootstrap:initialize");
            API.bootstrap();
        });

    });

    return App.BootstrapModule;

});

