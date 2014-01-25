define(['reqanim', 'grid'], function(AnimationFrame, Grid) {

	/**
	 *
	 *
	 */
	var Game = function() {};

	/**
	 *
	 *
	 */
	Game.prototype.init = function() {

		console.log("Game init..");

		console.log("Testing Grid functionality");

		this.testGrid();

		var isRunning = true,

			// FPS 30
			animFrame = new AnimationFrame(30),

			// Game loop specifics
			now = 0,
			then = 0,
			sub = 0,
			dt = 0.0,
			self = this;

		/**
		 * "The" loop
		 *
		 */
		var loop = function() {

			// delta time (now)
			now = Date.now();
			sub = now - then;
			dt = sub / 1000;

			// draw
			self.draw();

			// update
			self.update(dt);

			// delta time (then)
			then = now;

			// request next frame
			animFrame.request(loop);

		};

		// Start the loop
		loop();

	};

	/**
	 *
	 *
	 */
	Game.prototype.draw = function() {

	};

	/**
	 *
	 *
	 */
	Game.prototype.update = function(dt) {

	};

	Game.prototype.testGrid = function() {

		var kentta = new Grid( { size: 5 });
		kentta.testGrid();
	};

	return Game;

});