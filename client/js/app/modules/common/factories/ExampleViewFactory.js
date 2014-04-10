// app/modules/common/views/ExampleViewFactory.js

define([
    "app/modules/common/views/ExampleView"
], function( View ) {


    return {

        getView: function() {
            return new View();
        }

    };

});

