// app/modules/common/Mediator.js

define([
    "backbone.wreqr"
], function( Wreqr ) {


    return {
        commands:   new Wreqr.Commands(),
        vent:       new Wreqr.EventAggregator()
    };

});

