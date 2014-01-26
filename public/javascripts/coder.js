define(['entity'], function(Entity) {

	/**
	 *
	 *
	 */
	var Coder = function(options) {
		Entity.call(this, options);

		//console.log("Coder created...");

		// position from left & top
		this.left = 256;
		this.top = 0;

    this.frames = {
      normal: 0,
      sleeping: 6,
      talking: 7,
      toilet: 8,
      hungry: 9,
      walking: 3,
      meeting: 3
    };

    this.paths = options.paths;
    this.stateCurrent = "normal";
    this.frameCurrent = 0; // Animation frame
    this.pathCurrent = 0;
    this.pathForward = true;

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

  Coder.prototype.toilet = function() {

    if(this.stateCurrent === "toilet") {
      this.stateCurrent = "walking";
      this.pathForward = true;

      var spotNow = this.paths["toilet"][this.pathCurrent];

      this.x = spotNow.x;
      this.y = spotNow.y;

      this.pathCurrent = 1;
    }

  };


  Coder.prototype.meet = function() {

    if(this.stateCurrent !== "walking") {

      this.stateCurrent = "meeting";
      //console.log("setting to meeting!");
      this.pathForward = true;

      var spotNow = this.paths["meeting"][this.pathCurrent];

      this.x = spotNow.x;
      this.y = spotNow.y;

      this.pathCurrent = 1;

      this.timer = 0;

    }

  };

	Coder.prototype.draw = function(ctx) {

		ctx.drawImage(
			this.tileFactory.images.sitting,
			(this.sprite.x * this.sprite.width) + (this.frames[this.stateCurrent] + this.frameCurrent) * this.sprite.width,
			this.sprite.y * this.sprite.height,
			this.sprite.width,
			this.sprite.height,
			this.getLeft() + this.x * this.sprite.width,
			this.getTop() + this.y * this.sprite.height,
			this.sprite.width,
			this.sprite.height
		);

	};

  Coder.prototype.getLeft = function() {

    if(this.stateCurrent !== "walking" && this.stateCurrent !== "meeting")
      return this.left;

    return 0;

  };

  Coder.prototype.getTop = function() {

    if(this.stateCurrent !== "walking" && this.stateCurrent !== "meeting")
      return this.top;

    return 0;

  };

	Coder.prototype.update = function() {

		if(this.stateCurrent === "normal") {

			var n = Math.floor(Math.random() * (10000 - 0 + 1) + 0);

			if (n>9980) {
				x = Math.floor(Math.random() * (5 - 0 + 1) + 0);
				switch (x) {
					case 0: {
						this.stateCurrent = "hungry";
						//console.log("Hungry");
						break;
					}
					case 1: {
						this.stateCurrent = "toilet";
						//console.log("Toilet");
						break;
					}
					case 2: {
						this.stateCurrent = "talking";
						//console.log("Talking");
						break;
					}
					default: {
						this.stateCurrent = "sleeping";
						//console.log("Sleeping");
						break;
					}
				}
			}

      if(this.stateCurrent === "normal") {

        var changeFrame = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

        if(changeFrame === 0) {

          this.frameCurrent = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

        }

      } else {
        this.frameCurrent = 0;
      }

		} else if(this.stateCurrent === "walking") {

      var walkOrNot = Math.floor(Math.random() * (7 - 0 + 1)) + 0;

      if(walkOrNot === 7) {

        var currentPath = this.paths["toilet"][this.pathCurrent];

        this.x = currentPath.x;
        this.y = currentPath.y;

        if(this.pathForward === true) {
          if(this.pathCurrent < this.paths["toilet"].length - 1) {
            this.pathCurrent++;
          } else {
            this.pathForward = false;
          }

        } else if(this.pathForward === false) {

          if(this.pathCurrent > 0) {
            this.pathCurrent--;
          } else {
            // finished moving
            this.stateCurrent = "normal";
            this.x -= 4;
          }

        }

      }

      // then walk.. correct path to end.. and back?
      var changeFrameW = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

      if(changeFrameW === 0) {

        this.frameCurrent = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

      }

    } else if(this.stateCurrent === "meeting") {

      if(this.timer < 0) {

        var walkOrNot = Math.floor(Math.random() * (7 - 0 + 1)) + 0;

        if(walkOrNot === 7) {

          var currentPath = this.paths["meeting"][this.pathCurrent];

          this.x = currentPath.x;
          this.y = currentPath.y;

          if(this.pathForward === true) {
            if(this.pathCurrent < this.paths["meeting"].length - 1) {
              this.pathCurrent++;
            } else {
              this.pathForward = false;
              this.timer = Math.floor(Math.random() * (5000 - 0 + 1)) + 2000;
            }

          } else if(this.pathForward === false) {

            if(this.pathCurrent > 0) {
              this.pathCurrent--;
            } else {
              // finished moving
              this.stateCurrent = "normal";
              this.x -= 4;
            }

          }

        }

        // then walk.. correct path to end.. and back?
        var changeFrameW = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

        if(changeFrameW === 0) {

          this.frameCurrent = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

        }

      } else {
        this.timer -= 50;
      }

    }

	};

	return Coder;

});
