define(['reqanim', 'grid', 'zepto'], function(AnimationFrame, Grid, $) {

	/**
	 *
	 *
	 */
	var Game = function() {

    // If game is running
    this.isRunning = false;

    // Ui elements
    this.ui = {
      // Overall
      money: $('#money'),
      time: $('#time p'),
      project: $('#project'),
      // Persons
      coder: $('#coder'),
      cleaner: $('#cleaner'),
      manager: $('#manager'),
      cook: $('#cook'),
      // Floor
      buyFloor: $('#buy-floor'),
      // Person area of selections
      person: $('#person'),
      // Canvases
      foreground: $('#foreground'),
      background: $('#background')
    };

    /**
     * Binding click events
     *
     */

    // Professions..
    $(".profession").click(function(e) {

      alert($(this).attr("id") + " clicked..");

    });

    // New floor..
    this.ui.buyFloor.click(function(e) {

      alert("Buy new floor..");

    });

  };

	/**
	 *
	 *
	 */
	Game.prototype.init = function() {

		console.log("Game init..");

		console.log("Testing Grid functionality");

		this.testGrid();

    // FPS 30
		var animFrame = new AnimationFrame(30),

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
    this.isRunning = true;

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
