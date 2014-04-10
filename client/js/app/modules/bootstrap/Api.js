// app/bootstrap/Api.js

define([
    "app/Mediator"
], function( Mediator ) {


    return {

        bootstrap: function() {
            this.pre();
            this.start();
        },

        pre: function() {
            console.log("BootstrapModule:vent:pre");
            Mediator.vent.trigger("bootstrap:pre");
        },

        start: function() {
            console.log("BootstrapModule:vent:start");
            Mediator.vent.trigger("bootstrap:start");
        },

        finish: function() {
            console.log("BootstrapModule:vent:finish");
            Mediator.vent.trigger("bootstrap:finish");
        },

        post: function() {
            console.log("BootstrapModule:vent:post");
            Mediator.vent.trigger("bootstrap:post");
        }

    };

});

