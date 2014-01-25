define(['reqanim', 'grid', 'zepto', 'entityFactory', 'tileFactory', 'moment'],
  function(AnimationFrame, Grid, $, EntityFactory, TileFactory, moment) {

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
      // Prices
      coderPrice: $('#coder').find('.price'),
      cleanerPrice: $('#cleaner').find('.price'),
      managerPrice: $('#manager').find('.price'),
      cookPrice: $('#cook').find('.price'),
      buyFloorPrice: $('#buy-floor').find('.price'),
      // Person area of selections
      person: $('#person'),
      // Canvases
      canvas: $('#drawable-canvas')
    };

    // Gameplay related settings
    this.gameplay = {
      money: 30000,
      time: new Date(1970,01,01).getMilliseconds(),
      project: "No project randomized..",
      costs: {
        coder: 5000,
        cleaner: 2500,
        manager: 25000,
        cook: 3500,
        buyFloor: 150000
      }
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

    // Updating DOM before waiting rest to be loaded...
    this.ui.coderPrice.text(this.gameplay.costs.coder);
    this.ui.cleanerPrice.text(this.gameplay.costs.cleaner);
    this.ui.managerPrice.text(this.gameplay.costs.manager);
    this.ui.cookPrice.text(this.gameplay.costs.cook);
    this.ui.buyFloorPrice.text(this.gameplay.costs.buyFloor);
    this.refreshUI();

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

    this.refreshUI();

	};

	/**
	 *
	 *
	 */
	Game.prototype.update = function(dt) {

    this.gameplay.time += 10000;

	};

  /**
   * Method for updating UI element states
   *
   */
  Game.prototype.refreshUI = function() {

    this.ui.money.text(this.gameplay.money);
    this.ui.time.text(moment(new Date(this.gameplay.time)).format('MMMM Do YYYY, h:mm:ss a'));
    this.ui.project.text(this.gameplay.project);

  };

	Game.prototype.testGrid = function() {

		var kentta = new Grid( { size: 5 });
		kentta.testGrid();
	};

	return Game;

});
