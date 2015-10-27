define(function() {

	/**
	 *
	 *
	 */
	var Sprite = function(options) {

		//console.log("Sprite created...");

		this.type = options.type;
	  this.x = options.x;
	  this.y = options.y;
    this.width = 64;
    this.height = 48;

	};

	return Sprite;

});
