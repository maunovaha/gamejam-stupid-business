define(function() {

	/**
	 *
	 *
	 */
	var Sprite = function(options) {

		console.log("Sprite created...");

		this.type = options.type;
	    this.x = options.x;
	    this.y = options.y;

	};

	return Sprite;

});