define(function() {

	/**
	 *
	 *
	 */
	var Entity = function(options) {

		console.log("Entity created...");

		this.type = options.type;
	    this.x = options.x;
	    this.y = options.y;
	    this.sprite = options.sprite;

	};

	return Entity;

});