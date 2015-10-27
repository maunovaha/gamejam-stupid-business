define(['manager'], function(Manager) {

	/**
	 *
	 *
	 */
	var ManagerFactory = function(gameplay, tileFactory) {

    this.gameplay = gameplay;
    this.tileFactory = tileFactory;
    this.maxManagers = 3;

	};

	/**
	 *
	 *
	 */
	ManagerFactory.prototype.addEntity = function() {

    var result = {
      error: null,
      entity: null
    };

    // Check if enough cash
    if(this.gameplay.money - this.gameplay.costs["manager"] >= 0) {

        // Check if room available in this floor
        if(this.hasRoom("manager")) {

          var slot = this.getFreeSlot();

          // Buy it..
          this.gameplay.money -= this.gameplay.costs["manager"];

          // todo: calculate next free position???
          this.gameplay.floors[this.gameplay.currentFloor]["manager"][slot.x + "," + slot.y] = new Manager({
            type: "manager",
            x: slot.x,
            y: slot.y,
            sprite: this.tileFactory.getSprite("sitting", "manager"),
            tileFactory: this.tileFactory
          });

          result.entity = this.gameplay.floors[this.gameplay.currentFloor]["manager"][slot.x + "," + slot.y];

          return result;

        }

        result.error = "No manager slots available - change floor!";

        return result;

    }

    result.error = "Not enough money for FATASS manager!";

    return result;

	};

  /**
   *
   *
   */
  ManagerFactory.prototype.hasRoom = function() {

    return Object.keys(this.gameplay.floors[this.gameplay.currentFloor]["manager"]).length < this.maxManagers;

  };

  /**
   *
   *
   */
  ManagerFactory.prototype.getFreeSlot = function() {

    var isComplete = false;

    do {

      var x = Math.floor(Math.random() * (2 - 0 + 1)) + 0,
          y = 0;

      if(typeof this.gameplay.floors[this.gameplay.currentFloor]["manager"][x + "," + y] === "undefined")
        isComplete = true;

    } while(isComplete === false);

    return {
      x: x,
      y: y
    };

  };

	return ManagerFactory;

});
