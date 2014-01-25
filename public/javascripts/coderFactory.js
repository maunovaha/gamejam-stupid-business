define(['coder'], function(Coder) {

	/**
	 *
	 *
	 */
	var CoderFactory = function(gameplay, tileFactory) {

    this.gameplay = gameplay;
    this.tileFactory = tileFactory;

    this.maxCoders = 36;

	};

	/**
	 *
	 *
	 */
	CoderFactory.prototype.addEntity = function() {

    var result = {
      error: null,
      entity: null
    };

    // Check if enough cash
    if(this.gameplay.money - this.gameplay.costs["coder"] >= 0) {

        // Check if room available in this floor
        if(this.hasRoom("coder")) {

          var slot = this.getFreeSlot();

          // Buy it..
          this.gameplay.money -= this.gameplay.costs["coder"];

          // todo: calculate next free position???
          this.gameplay.floors[this.gameplay.currentFloor]["coder"][slot.x + "," + slot.y] = new Coder({
            type: "coder",
            x: slot.x,
            y: slot.y,
            sprite: this.tileFactory.getSprite("sitting", "coder"),
            tileFactory: this.tileFactory
          });

          result.entity = this.gameplay.floors[this.gameplay.currentFloor]["coder"][slot.x + "," + slot.y];

          return result;

        }

        result.error = "No coder slots available - change floor!";

        return result;

    }

    result.error = "Not enough money!";

    return result;

	};

  /**
   *
   *
   */
  CoderFactory.prototype.hasRoom = function() {

    return Object.keys(this.gameplay.floors[this.gameplay.currentFloor]["coder"]).length < this.maxCoders;

  };

  /**
   *
   *
   */
  CoderFactory.prototype.getFreeSlot = function() {

    var isComplete = false;

    do {

      var x = Math.floor(Math.random() * (5 - 0 + 1)) + 0,
          y = Math.floor(Math.random() * (5 - 0 + 1)) + 0;

      if(typeof this.gameplay.floors[this.gameplay.currentFloor]["coder"][x + "," + y] === "undefined")
        isComplete = true;

    } while(isComplete === false);

    return {
      x: x,
      y: y
    };

  };

	return CoderFactory;

});
