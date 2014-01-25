define(['reqanim', 'grid', 'zepto', 'entityFactory', 'tileFactory'],
  function(AnimationFrame, Grid, $, EntityFactory, TileFactory) {

	/**
	 *
	 *
	 */
	var Game = function() {

    // self
    var self = this;

    // If game is running
    this.isRunning = false;

    // Entity factory
    this.entityFactory = new EntityFactory();

    // Tile factory
    this.tileFactory = new TileFactory();

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
      canvas: $('#drawable-canvas')
    };

    /**
     * Binding click events
     *
     */

    // Professions..
    $(".profession").click(function(e) {

      alert($(this).attr("id") + " clicked..");

      self.entityFactory.getFactory($(this).attr('id')).addEntity();

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

    var self = this;

    // Init tile factory... block until finished
    this.tileFactory.init(function(err) {

      if(err) return alert("TileFactory.js failed to load, refresh page to try again.");

      // FPS 30
  		var animFrame = new AnimationFrame(30),

  			// Game loop specifics
  			now = 0,
  			then = 0,
  			sub = 0,
  			dt = 0.0;

      // console.log("Testing Grid functionality");

      // self.testGrid();

  		/**
  		 * "The" loop
  		 *
  		 */
  		var loop = function() {

        if(self.isRunning) {

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

        }

  		};

  		// Start the loop
      self.isRunning = true;

  		loop();

    });

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
