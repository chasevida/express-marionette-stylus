// app/modules/entities/models/ExampleModel.js

define([
    "backbone",
    "backbone.validation"
], function( Backbone ) {

    var ExampleModel = Backbone.Model.extend({

        urlRoot: "/examples",

        defaults: {
            firstName:      null
        },

        validation: {

            firstName: {
                required:   true,
                msg:        "First name is required"
            }

        }

    });

    _.extend(ExampleModel.prototype, Backbone.Validation.mixin);

    return ExampleModel;

});

