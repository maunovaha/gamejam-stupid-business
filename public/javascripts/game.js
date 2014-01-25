define(['reqanim', 'grid', 'zepto', 'entityFactory', 'moment'],
  function(AnimationFrame, Grid, $, EntityFactory, moment) {

	/**
	 *
	 *
	 */
	var Game = function() {

    // self
    var self = this;

    // If game is running
    this.isRunning = false;

	// Sounds
	var click = new Audio('audio/click.ogg');
	this.register = new Audio('audio/register.ogg');

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
      },
      // our entities holder per office floors
      floors: {
        1: {
          coder: {
          },
          cleaner: {
          },
          manager: {
          },
          cook: {
          }
        }
      },
      // floor player is viewing
      currentFloor: 1,
      maxCoders: 36
    };

    // Entity factory
    this.entityFactory = new EntityFactory(this.gameplay);

    // Ui elements
    this.ui = {
      // Overall
      money: $('#money'),
      time: $('#time p'),
      project: $('#project'),
      notification: $('#notification'),
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

    /**
     * Binding click events
     *
     */

    // Professions..
    $(".profession").click(function(e) {

      var type = $(this).attr('id');
	  click.currentTime = 0;
      click.play();
      self.addEntity(type);

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
  Game.prototype.addEntity = function(type) {

    var result = this.entityFactory.getFactory(type).addEntity();

    if(result.error) {

      $('#notification span').animate({
        opacity: 0
      }, 150, 'linear', function() {
        $(this).text(result.error).css({ opacity: 1 });
      })

      return;

    }
	// Entity added, play sound!
	this.register.currentTime = 0;
	this.register.play();

  };

  /**
   *
   *
   */
  Game.prototype.removeEntity = function(type, entity) {
    /* */
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
    this.entityFactory.init(function(err) {

      if(err) return alert(err);

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

    // Draw entities only from currentFloor

	};

	/**
	 *
	 *
	 */
	Game.prototype.update = function(dt) {

    this.gameplay.time += 10000;

    // Update all entities

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
