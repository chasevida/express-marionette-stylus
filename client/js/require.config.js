// require.config.js

requirejs.config({

    baseUrl: "/js",

    paths: {
        "backbone":             "../vendor/backbone/backbone",
        "backbone.babysitter":  "../vendor/backbone.babysitter/lib/amd/backbone.babysitter",
        "backbone.hammer":      "../vendor/backbone.hammer/backbone.hammer",
        "backbone.picky":       "../vendor/backbone.picky/src/backbone.picky",
        "backbone.syphon":      "../vendor/backbone.syphon/lib/amd/backbone.syphon.min",
        "backbone.validation":  "../vendor/backbone-validation/dist/backbone-validation-amd-min",
        "backbone.wreqr":       "../vendor/backbone.wreqr/lib/amd/backbone.wreqr",
        "CSSPlugin":            "../vendor/gsap/src/minified/plugins/CSSPlugin.min",
        "domReady":             "../vendor/requirejs-domready/domReady",
        "EasePack":             "../vendor/gsap/src/minified/easing/EasePack.min",
        "hammerjs":             "../vendor/hammerjs/hammer",
        "hammer-jquery":        "../vendor/jquery-hammerjs/jquery.hammer",
        "Handlebars":           "../vendor/handlebars/handlebars",
        "hbs":                  "../vendor/requirejs-handlebars/hbars",
        "jquery":               "../vendor/jquery/jquery.min",
        "json2":                "../vendor/json2/json2",
        "marionette":           "../vendor/backbone.marionette/lib/core/amd/backbone.marionette.min",
        "text":                 "../vendor/requirejs-text/text",
        "TweenLite":            "../vendor/gsap/src/minified/TweenLite.min",
        "underscore":           "../vendor/underscore-amd/underscore-min"
    },

    shim: {
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        "backbone.babysitter": {
            deps: ["backbone"]
        },
        "backbone.hammer": {
            deps: ["hammerjs", "hammer-jquery", "backbone"]
        },
        "backbone.picky": {
            deps: ["backbone"]
        },
        "backbone.syphon": {
            deps: ["backbone"]
        },
        "backbone.validation": {
            deps: ["backbone"]
        },
        "underscore": {
            exports: "underscore"
        },
        "backbone.wreqr": {
            deps: ["backbone"]
        },
        "hammerjs": {
            deps: ["jquery"],
            exports: "Hammer"
        },
        "hammer-jquery": {
            deps: ["hammerjs", "jquery"]
        },
        "Handlebars": {
            exports: "Handlebars",
            init: function() {
                this.Handlebars = Handlebars;
                return this.Handlebars;
            }
        },
        "marionette": {
            exports: "Marionette"
        },
        "TweenLite": {
            deps: ["CSSPlugin", "EasePack"],
            exports: "TweenLite"
        }
    }

});

