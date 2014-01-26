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

		//possible states for coder
		this.states = {
			normal: true,
			sleeping: false,
			hungry: false,
			toilet: false,
			talking: false
			};

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

	Coder.prototype.update = function() {

		if (this.states.normal) {

			var n = Math.floor(Math.random() * (10000 - 0 + 1));
			if (n>9980) {
				x = Math.floor(Math.random() * (5 - 0 + 1));
				switch (x) {
					case 0: {
						this.states.hungry = true;
						this.states.normal= false;
						console.log("Hungry");
						break;
					}
					case 1: {
						this.states.toilet = true;
						this.states.normal= false;
						console.log("Toilet");
						break;
					}
					case 2: {
						this.states.talking = true;
						this.states.normal= false;
						console.log("Talking");
						break;
					}
					default: {
						this.states.sleeping = true;
						this.states.normal= false;
						console.log("Sleeping");
						break;
					}
				}
			}

		}

	};


	/**
	 *
	 *
	 */
	Coder.prototype.onClick = function(x, y) {

		console.log("Coder x: " + x + " y: " + y);

	};

	return Coder;

});
