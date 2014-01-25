define(['entity'], function(Entity) {

	/**
	 *
	 *
	 */
	var Coder = function(options) {
		Entity.call(this, options);

		console.log("Coder created...");

		// position from left & top
		this.left = 256;
		this.top = 0;

	};

	Coder.prototype = Object.create(Entity.prototype);

	Coder.prototype.draw = function(ctx) {

		ctx.drawImage(
			this.tileFactory.images.sitting, 
			this.sprite.x * this.sprite.width,
			this.sprite.y * this.sprite.height,
			this.sprite.width,
			this.sprite.height,
			this.left + this.x * this.sprite.width,
			this.top + this.y * this.sprite.height,
			this.sprite.width,
			this.sprite.height
		);

	};

	return Coder;

});