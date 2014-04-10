// app/modules/common/views/ExampleView.js

define([
    "marionette",
    "app/modules/common/Mediator",
    "hbs!app/modules/common/templates/example-tpl"
], function( Marionette, Mediator, tpl ) {


    return Marionette.Layout.extend({

        template:   tpl,
        className:  "l-example example",

        regions: {
            navRegion:  "#some-region"
        }

    });

});

