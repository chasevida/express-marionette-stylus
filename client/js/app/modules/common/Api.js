// app/modules/common/Api.js

define([
    "app/Application",
    "app/Mediator"
], function( App, Mediator ) {


    return {

        show: function() {
            require(["app/modules/common/factories/ExampleViewFactory"], function( ViewFactory ) {
                App.startSubApp("CommonModule");
                App.appRegion.show( ViewFactory.getView() );
            });
        }

    };

});

