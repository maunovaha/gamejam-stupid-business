define(['reqanim', 'grid', 'zepto', 'entityFactory', 'moment', 'canvas', 'projectFactory'],
  function(AnimationFrame, Grid, $, EntityFactory, moment, Canvas, ProjectFactory) {

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
  	this.clicksound = new Audio('audio/click.ogg');
  	this.register = new Audio('audio/register.ogg');
  	this.notifysound = new Audio('audio/notify.ogg');
  	this.slapsound = new Audio('audio/Slap.ogg');
	this.keyboardsound = new Audio('audio/keyboard.ogg');
	this.playKeyboardsound = 0;

    // Projects..
    this.projectFactory = new ProjectFactory();

    // Gameplay related settings
    this.gameplay = {
      money: 30000,
	  losecondition: -50000,
      time: new Date(1970,01,01).getMilliseconds(),
      project: this.projectFactory.getProject(),
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
      selectedEntity: null
    };

    // Entity factory
    this.entityFactory = new EntityFactory(this.gameplay);

    // Canvas
    this.canvas = new Canvas(this.gameplay);

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
      // Canvas
      canvas: $('#drawable-canvas'),
      // Prices
      coderPrice: $('#coder').find('.price'),
      cleanerPrice: $('#cleaner').find('.price'),
      managerPrice: $('#manager').find('.price'),
      cookPrice: $('#cook').find('.price'),
      buyFloorPrice: $('#buy-floor').find('.price'),
      // Person area of selections
      personArea: $('.person-area'),
      // Buttons
      slap: $('#slap'),
      toilet: $('#toilet'),
      feed: $('#feed')
    };

    /**
     * Binding click events
     *
     */

    // Professions..
    $(".profession").click(function(e) {

      var type = $(this).attr('id');
	    self.clicksound.currentTime = 0;
      self.clicksound.play();
      self.addEntity(type);

    });

    // Buttons..
    $(".action").click(function(e) {

      var type = $(this).attr('id');

      self.actionClick(type);

    });


    // New floor..
    this.ui.buyFloor.click(function(e) {

      alert("Buy new floor..");

    });

    // Click canvas
    this.ui.canvas.click(function(e) {

      var x = Math.floor((e.pageX-$(this).offset().left) / 64),
          y = Math.floor((e.pageY-$(this).offset().top) / 48);

      self.onClick(x, y);

    });

  };

  Game.prototype.actionClick = function(type) {

    if(this.gameplay.selectedEntity != null) {

      if(type === "slap") {

        this.gameplay.selectedEntity.slap();

        if(this.gameplay.selectedEntity.stateCurrent === "normal") {
          this.slapsound.currentTime = 0;
          this.slapsound.play();
        } else {
          this.clicksound.currentTime = 0;
          this.clicksound.play();
        }

      } else if(type === "feed") {

        this.gameplay.selectedEntity.feed();

        this.clicksound.currentTime = 0;
        this.clicksound.play();

      }

      return;

    }

    this.clearSelections();

  };

  /**
   * On canvas click...
   *
   */
  Game.prototype.onClick = function(x, y) {

    for(var type in this.gameplay.floors[this.gameplay.currentFloor]) {

      if(type === "coder") {

        // Converting to possible coder coordinates...
        x -= 4;

        if(typeof this.gameplay.floors[this.gameplay.currentFloor][type][x + "," + y] !== "undefined")
          this.selectEntity(this.gameplay.floors[this.gameplay.currentFloor][type][x + "," + y]);
        else
          this.clearSelections();

      }

    }

  };

  /**
   * Called when entity clicked on canvas
   *
   */
  Game.prototype.selectEntity = function(entity) {

    // If selected same again... just go away..
    if(this.gameplay.selectedEntity != null &&
      this.gameplay.selectedEntity.x === entity.x &&
      this.gameplay.selectedEntity.y === entity.y) {
      // Clear selections..
      this.clearSelections();
      return;
    }

    // Clear previous
    this.clearSelections();

    // Show correct view...
    $('#person-' + entity.type).find('.person img').attr("src", "/images/" + entity.stateCurrent + ".png");
    $('#person-' + entity.type).removeClass('hidden');

    this.gameplay.selectedEntity = entity;

  };

  /**
   * Called when UI selections needs to be toggled away.. (e.g. floor change)
   *
   */
  Game.prototype.clearSelections = function(entity) {

    // Setting UI to default hidden state
    this.ui.personArea.addClass("hidden");
    $('.person img').attr("src", "/images/normal.png");
    // todo add manager image..

    this.gameplay.selectedEntity = null;

  };

  /**
   *
   *
   */
  Game.prototype.addEntity = function(type) {

    var result = this.entityFactory.getFactory(type).addEntity();

    if(result.error) {

      this.notify(result.error);

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
  Game.prototype.notify = function(text) {
    $('#notification span').animate({
          opacity: 0
        }, 150, 'linear', function() {
          $(this).text(text).css({ opacity: 1 });
    });
  	this.notifysound.currentTime = 0;
  	this.notifysound.play();
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
    this.canvas.draw();

	};

	/**
	 *
	 *
	 */
	Game.prototype.update = function(dt) {

    this.gameplay.time += 10000;


	//RELATED TO KEYBOARDSOUNDS
	if (this.playKeyboardsound>0) {
		if (typeof this.keyboardsound.loop == 'boolean')
		{
			this.keyboardsound.loop = true;
		}
		else
		{
			this.keyboardsound.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
		}
		this.keyboardsound.play();
	} else {
		this.keyboardsound.pause();
	}
	// NO LONGER AT THIS POINT RELATED TO KEYBOARD SOUNDS

    // Update all entities
	this.canvas.update();
	
	// PLAYING KEYBOARD SOUNDS
	for(var type in this.gameplay.floors[this.gameplay.currentFloor]) {

	      if(type === "coder") {
		  
			

	        for(var key in this.gameplay.floors[this.gameplay.currentFloor][type]) {
			
	          if (this.gameplay.floors[this.gameplay.currentFloor][type][key].stateCurrent === "normal"){
				this.playKeyboardsound = 1;
				break;
			  } else {
			  this.playKeyboardsound = 0;
			  }

	      }
		   for(var key in this.gameplay.floors[this.gameplay.currentFloor][type]) {
				if (this.gameplay.floors[this.gameplay.currentFloor][type][key].stateCurrent === "normal"){
					this.gameplay.money += 5;
				}
			}
		  if (Object.keys(this.gameplay.floors[this.gameplay.currentFloor]["coder"]).length>0){
			this.gameplay.money -= (Object.keys(this.gameplay.floors[this.gameplay.currentFloor]["coder"]).length)*3;
			if (this.gameplay.money<this.gameplay.losecondition) {
				alert("YOU LOSE! YOU'RE A FAILURE EVEN IN THIS STUPID BUSINESS!");
			}
		  }
	      break;

	    }

		}
	};
	// DONE PLAYING KEYBOARD SOUNDS

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
