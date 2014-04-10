
require(["../../client/js/require.config"], function () {

	require.config({
		baseUrl: "../../client/js",
		paths: {
			"chai": "../vendor/chai/chai",
			"chai-backbone": "../vendor/chai-backbone/chai-backbone",
			"sinon": "../vendor/sinonjs/sinon",
			"sinon-chai": "../vendor/sinon-chai/lib/sinon-chai"
		}
	});

	require([
		"chai",
		"chai-backbone",
		"sinon-chai",
		"sinon"
	], function (chai, chaiBackbone, sinonChai) {
		chai.should();
		chai.use(chaiBackbone);
		chai.use(sinonChai);

		global.chai = chai;
		global.expect = chai.expect;

		mocha.setup("bdd");

		require([
			"jquery",
			"backbone",
			"specs.js"
		], function (jQuery, Backbone) {
			Backbone.$ = jQuery;
			mocha.run();
		});
	});

});