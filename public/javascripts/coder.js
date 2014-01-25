define(['entity'], function(Entity) {

	/**
	 *
	 *
	 */
	var Coder = function(options) {
		Entity.call(this, options);

		console.log("Coder created...");

	};

	Coder.prototype = Object.create(Entity.prototype);

	return Coder;

});