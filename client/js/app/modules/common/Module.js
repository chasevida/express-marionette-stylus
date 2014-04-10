// app/common/Module.js

define([
    "app/Application",
    "app/Mediator",
    "app/modules/common/Api"
], function( App, Mediator, API ) {


    App.module( "CommonModule", function( CommonModule, App, Backbone, Marionette, $, _ ) {

        CommonModule.startWithParent = false;

        CommonModule.onStart = function() {
            console.log("Start: Common Module");
        };

        CommonModule.onStop = function() {
            console.log("Stop: Common Module");
        };

        Mediator.vent.on("show:common", function() {
            API.show();
        });

    });

    return App.CommonModule;

});

