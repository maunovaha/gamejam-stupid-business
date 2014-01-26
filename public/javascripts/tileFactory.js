define(['sprite'], function(Sprite) {

	/**
	 *
	 *
	 */
	var TileFactory = function() {

		this.animationLength = 3; /* length of all animations */

		this.paths = {
			sitting: "/images/SB-spritesheet_new.png",
			standing: ""
		};

		this.tilesets = {
			sitting: {
				coder: {
					x: 0,
					y: 0
				},
        manager: {
          x: 0,
          y: 1
        }
			},
			standing: {
			}
		};

		this.sprites = {
			sitting: {},
			standing: {}
		};

    this.images = {
      sitting: null,
      standing: null
    };

	};

	/**
	 *
	 *
	 */
	TileFactory.prototype.init = function(callback) {

		/**
		 * Initializing sitting sprites... ugly, but works
		 *
		 */
		this.images.sitting = new Image();
		this.images.sitting.onload = (function(self, callback) {
			return function() {

				for(var key in self.tilesets.sitting) {

					self.sprites.sitting[key] = new Sprite({
						type: key,
						x: self.tilesets.sitting[key].x,
						y: self.tilesets.sitting[key].y
					});

				}

		    return callback(null);

			};

		})(this, callback);

		this.images.sitting.onerror = (function(callback) {
			return function() {
				return callback("ERROR_FAILED_TO_LOAD_IMAGE");
			};
		})(callback);

		this.images.sitting.src = this.paths.sitting;

	};

	/**
	 *
	 *
	 */
	TileFactory.prototype.getSprite = function(gesture, type) {
		return this.sprites[gesture][type];
	};

	return TileFactory;

});
