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

		//possible states for coder - not in use atm
		this.states = {
			normal: true,
			sleeping: true,
			hungry: true,
			toilet: true,
      talking: false
	  };

    this.frames = {
      normal: 0,
      sleeping: 6,
      talking: 7,
      toilet: 8,
      hungry: 9
    };

    this.stateCurrent = "normal";
    this.frameCurrent = 0; // Animation frame

	};

	Coder.prototype = Object.create(Entity.prototype);

  Coder.prototype.slap = function() {

    if(this.stateCurrent === "sleeping") {
      this.stateCurrent = "normal";
    }

  };

  Coder.prototype.feed = function() {

    if(this.stateCurrent === "hungry") {
      this.stateCurrent = "normal";
    }

  };

	Coder.prototype.draw = function(ctx) {

		ctx.drawImage(
			this.tileFactory.images.sitting,
			(this.sprite.x * this.sprite.width) + (this.frames[this.stateCurrent] + this.frameCurrent) * this.sprite.width,
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

		if(this.stateCurrent === "normal") {

			var n = Math.floor(Math.random() * (10000 - 0 + 1) + 0);

			if (n>9980) {
				x = Math.floor(Math.random() * (5 - 0 + 1) + 0);
				switch (x) {
					case 0: {
						this.stateCurrent = "hungry";
						console.log("Hungry");
						break;
					}
					case 1: {
						this.stateCurrent = "toilet";
						console.log("Toilet");
						break;
					}
					case 2: {
						this.stateCurrent = "talking";
						console.log("Talking");
						break;
					}
					default: {
						this.stateCurrent = "sleeping";
						console.log("Sleeping");
						break;
					}
				}
			}

      if(this.stateCurrent === "normal") {

        var changeFrame = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

        if(changeFrame === 0) {

          this.frameCurrent = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

        }

      } else {
        this.frameCurrent = 0;
      }

		}

	};


	/**
	 *
	 *
	 */
	Coder.prototype.onClick = function(x, y) {

    //

		console.log("Coder x: " + x + " y: " + y);

	};

	return Coder;

});
