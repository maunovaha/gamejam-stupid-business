define(['entity'], function(Entity) {

	/**
	 *
	 *
	 */
	var Manager = function(options) {
		Entity.call(this, options);

		console.log("Manager created...");

		// position from left & top
		this.left = 0;
		this.top = 432;

		this.meetings = 5;
		this.meetingTimer = 300;

	};

	Manager.prototype = Object.create(Entity.prototype);

	/**
	 *
	 *
	 */
	Manager.prototype.draw = function(ctx) {

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

	/**
	 *
	 *
	 */
	Manager.prototype.update = function() {

		// end meeting..? timer?

	};

	return Manager;

});