// app/modules/entities/collections/ExampleCollection.js

define([
    "backbone",
    "app/modules/entities/models/ExampleModel"
], function( Backbone, Model ) {


    return Backbone.Collection.extend({

        url:    "/examples",
        model:  Model

    });

});

