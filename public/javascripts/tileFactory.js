define(['sprite'], function(Sprite) {

	/**
	 *
	 *
	 */
	var TileFactory = function() {

		this.animationLength = 3; /* length of all animations */

		this.paths = {
			sitting: "/images/characters_sitting.png",
			standing: ""
		};
		
		this.tilesets = {
			sitting: {
				coder: {
					x: 0,
					y: 0
				}
			},
			standing: {
			}
		};

		this.sprites = {
			sitting: {},
			standing: {}
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
		this.img = new Image();
		this.img.onload = (function(self, callback) {
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

		this.img.onerror = (function(callback) {
			return function() {
				return callback("ERROR_FAILED_TO_LOAD_IMAGE");
			};
		})(callback);

		this.img.src = this.paths.sitting;

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