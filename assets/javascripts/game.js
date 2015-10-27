define(['grid', 'zepto', 'entityFactory', 'moment', 'canvas', 'projectFactory'],
  function(Grid, $, EntityFactory, moment, Canvas, ProjectFactory) {

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
  	this.clicksound = new Audio('assets/audio/click.ogg');
  	this.register = new Audio('assets/audio/register.ogg');
  	this.notifysound = new Audio('assets/audio/notify.ogg');
  	this.slapsound = new Audio('assets/audio/Slap.ogg');
	  this.keyboardsound = new Audio('assets/audio/keyboard.ogg');
	  this.playKeyboardsound = 0;

    // Projects..
    this.projectFactory = new ProjectFactory();

    // Gameplay related settings
    this.gameplay = {
      reallyLOSTED: false,
      money: 30000,
	  losecondition: -1500,
	  progress: 0,
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
      // Screens
      startScreen: $('#start-screen'),
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

      if(self.isRunning) {

        var type = $(this).attr('id');

        if(type !== "cook" || type !== "cleaner") {

          try {
            self.clicksound.play();
            self.clicksound.currentTime = 0;
          } catch(e) {}
          self.addEntity(type);

        }

      }

    });

    // Buttons..
    $(".action").click(function(e) {

      if(self.isRunning) {

        var type = $(this).attr('id');

        self.actionClick(type);

      }

    });


    // New floor..
    this.ui.buyFloor.click(function(e) {

      alert("Get early access from steam... seriously, gamejams?");

    });

    // Click canvas
    this.ui.canvas.click(function(e) {

      if(self.isRunning === false && self.gameplay.reallyLOSTED === false) {

        self.ui.startScreen.hide();
        self.isRunning = true;

      }

      if(self.isRunning) {

        var x = Math.floor((e.pageX-$(this).offset().left) / 64),
            y = Math.floor((e.pageY-$(this).offset().top) / 48);

        self.onClick(x, y);

      }

    });

  };

  Game.prototype.actionClick = function(type) {

    if(this.gameplay.selectedEntity != null) {

      var beforeState = this.gameplay.selectedEntity.stateCurrent;

      if(type === "slap") {

        this.gameplay.selectedEntity.slap();

        if(beforeState !== this.gameplay.selectedEntity.stateCurrent) {
          try {
          this.slapsound.play();
          this.slapsound.currentTime = 0;
          } catch(e) {}
        } else {
          try {
          this.clicksound.play();
          this.clicksound.currentTime = 0;
          } catch(e) {}
        }

      } else if(type === "feed") {

        this.gameplay.selectedEntity.feed();

        try {
        this.clicksound.play();
        this.clicksound.currentTime = 0;
        } catch(e) {}

      } else if(type === "toilet") {

        this.gameplay.selectedEntity.toilet();

        try{
        this.clicksound.play();
        this.clicksound.currentTime = 0;
        } catch(e) {}

      } else if(type === "meet") {

        // we select maximum of 5 people for meeting...
        var selections = [];

        // if at least one need meeting..
        for(var key in this.gameplay.floors[this.gameplay.currentFloor]["coder"]) {

          if(this.gameplay.floors[this.gameplay.currentFloor]["coder"][key].stateCurrent === "talking") {

            selections.push(this.gameplay.floors[this.gameplay.currentFloor]["coder"][key].x + "," + this.gameplay.floors[this.gameplay.currentFloor]["coder"][key].y);

          }

        }

        if(selections.length > 0) {

          if(this.gameplay.selectedEntity.meetings === 0) {
            this.notify("Manager says: My calendar is full for the rest of the year, no more meetings!");
          } else {

            this.gameplay.selectedEntity.meet();

            for(var yy = 0; yy < selections.length; yy++) {

              this.gameplay.floors[this.gameplay.currentFloor]["coder"][selections[yy]].meet();

            }

          }

        }


        try {
          this.clicksound.play();
          this.clicksound.currentTime = 0;
        } catch(e) {}

      } else if(type === "kick") {

        var xy = this.gameplay.selectedEntity.x + "," + this.gameplay.selectedEntity.y;

        this.gameplay.selectedEntity = null;

        delete this.gameplay.floors[this.gameplay.currentFloor]["manager"][xy];

        try{
        this.slapsound.play();
        this.slapsound.currentTime = 0;
        } catch(e) {}

        this.notify("Manager says: I didn't wan't to work for this company anyway!");

        this.clearSelections();

      }

      if(this.gameplay.selectedEntity != null && beforeState !== this.gameplay.selectedEntity.stateCurrent) {

         // if meeting started...
         if(this.gameplay.selectedEntity.type === "manager") {

          this.notify("Manager says: EVERYBODY, lets have a meeting, im lonely.");

         }

         this.clearSelections();
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

    var isFound = false;

    for(var type in this.gameplay.floors[this.gameplay.currentFloor]) {

      if(type === "coder") {

        // Converting to possible coder coordinates...
        var person = this.gameplay.floors[this.gameplay.currentFloor][type][(x-4) + "," + y];

        if(typeof person !== "undefined" && person.stateCurrent !== "walking") {
          this.selectEntity(this.gameplay.floors[this.gameplay.currentFloor][type][(x-4) + "," + y]);
          isFound = true;
          break;
        }

      } else if(type === "manager") {

        // Converting to possible manager coordinates...
        var manager = this.gameplay.floors[this.gameplay.currentFloor][type][x + "," + (y-9)];

        if(typeof manager !== "undefined") {
          this.selectEntity(this.gameplay.floors[this.gameplay.currentFloor][type][x + "," + (y-9)]);
          isFound = true;
          break;
        }

      }

    }

    if(isFound === false) {
      this.clearSelections();
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
    if(entity.type === "coder") {
      $('#person-' + entity.type).find('.person img').attr("src", "assets/images/" + entity.stateCurrent + ".png");
    }

    $('#person-' + entity.type).removeClass('hidden');
    this.gameplay.selectedEntity = entity;

  };

  /**
   * Called when UI selections needs to be toggled away.. (e.g. floor change)
   *
   */
  Game.prototype.clearSelections = function() {

    // Setting UI to default hidden state
    this.ui.personArea.addClass("hidden");

    if(this.gameplay.selectedEntity != null && this.gameplay.selectedEntity.type === "coder") {
      $('#person-coder').find('.person img').attr("src", "assets/images/normal.png");
    }

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

    try{
  	this.register.play();
    this.register.currentTime = 0;
    } catch(e) {}

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

    try{
  	this.notifysound.play();
    this.notifysound.currentTime = 0;
    } catch(e) {}
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

      // Game loop specifics
  		var now = 0,
  			  then = 0,
  			  sub = 0,
  			  dt = 0.0;

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

        }

        // request next frame
        window.requestAnimationFrame(loop);

  		};

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

          try{
  				this.play();
          this.currentTime = 0;
          } catch(e) {}
  			}, false);
  		}
      try{
  		  this.keyboardsound.play();
      } catch(e) {}

  	} else {
  		this.keyboardsound.pause();
  	}
	 // NO LONGER AT THIS POINT RELATED TO KEYBOARD SOUNDS
    if (this.gameplay.money <= this.gameplay.losecondition) {
      this.isRunning = false;
      this.gameplay.reallyLOSTED = true;
      this.notify("YOU LOSE! YOU'RE A FAILURE EVEN IN THIS STUPID BUSINESS!");
      this.keyboardsound.pause();
      return;
    } else if(Object.keys(this.gameplay.floors[this.gameplay.currentFloor]["coder"]).length === this.entityFactory.getFactory("coder").maxCoders) {
      this.isRunning = false;
      this.gameplay.reallyLOSTED = true;
      this.notify("CONGRATULATIONS!, You completed the demo game!");
      this.keyboardsound.pause();
      return;
    }

    // Update all entities
	this.canvas.update();

  this.playKeyboardsound = 0;

	this.gameplay.money -= Object.keys(this.gameplay.floors[this.gameplay.currentFloor]["coder"]).length;

  var howManyWorking = 0;

	// PLAYING KEYBOARD SOUNDS & UPDATING MONEY + PROGRESS
	for(var key in this.gameplay.floors[this.gameplay.currentFloor]["coder"]) {

    if (this.playKeyboardsound === 0 && this.gameplay.floors[this.gameplay.currentFloor]["coder"][key].stateCurrent === "normal")
    	this.playKeyboardsound = 1;

    if (this.gameplay.floors[this.gameplay.currentFloor]["coder"][key].stateCurrent === "normal"){
      howManyWorking++;
    }

	}
  this.gameplay.progress += howManyWorking;

  if (this.gameplay.progress >= 1200) {
    var reward = 750 * Object.keys(this.gameplay.floors[this.gameplay.currentFloor]["coder"]).length;
    if(reward >= 4000)
      reward = 4000;

    this.gameplay.project = this.projectFactory.getProject();
    this.gameplay.progress = 0;
    this.gameplay.money += reward;
    this.notify("Project Completed: gained " + reward + " money!");
  }
	// DONE PLAYING KEYBOARD SOUNDS & UPDATING MONEY + PROGRESS

  };

  /**
   * Method for updating UI element states
   *
   */
  Game.prototype.refreshUI = function() {

    this.ui.money.text(this.gameplay.money + "$");
    this.ui.time.text(moment(new Date(this.gameplay.time)).format('MMMM Do YYYY, h:mm:ss a'));
    this.ui.project.text(this.gameplay.project);

  };

	Game.prototype.testGrid = function() {

		var kentta = new Grid( { size: 5 });
		kentta.testGrid();
	};

	return Game;

});
