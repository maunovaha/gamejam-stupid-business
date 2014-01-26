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

		this.meetings = 2;
		this.meetingTimer = 300;
		this.stateCurrent = "normal";

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
	Manager.prototype.meet = function() {

		if(this.meetings > 0) {
	      this.stateCurrent = "meeting";
	      this.meetings--;
	    }

	};

	/**
	 *
	 *
	 */
	Manager.prototype.update = function() {

	};

	return Manager;

});