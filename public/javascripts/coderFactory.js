define(['coder'], function(Coder) {

	/**
	 *
	 *
	 */
	var CoderFactory = function(gameplay, tileFactory) {

    this.gameplay = gameplay;
    this.tileFactory = tileFactory;

	};

	/**
	 *
	 *
	 */
	CoderFactory.prototype.addEntity = function() {

		console.log("CoderFactory addEntity called...");

    var result = {
      error: null,
      entity: null
    };

    // Check if enough cash
    if(this.gameplay.money - this.gameplay.costs["coder"] >= 0) {

        // Check if room available in this floor
        if(this.hasRoom("coder")) {

          console.log("has room..: " + this.gameplay.money);

          // Buy it..
          this.gameplay.money -= this.gameplay.costs["coder"];
		  
          //this.gameplay.floors[this.gameplay.currentFloor][type]["0,0"] = entity;

          console.log("has room..: " + this.gameplay.money);

          return result;

        }

        result.error = "No coder slots available - change floor!";

        return result;

    }

    result.error = "Not enough money!";

    /*
    return new Coder({
      type: "coder",
      x: 0,
      y: 0,
      sprite: this.tileFactory.getSprite("sitting", "coder")
    });*/

    return result;

	};

  /**
   *
   *
   */
  CoderFactory.prototype.hasRoom = function() {

    return Object.keys(this.gameplay.floors[this.gameplay.currentFloor]["coder"]).length < this.gameplay.maxCoders;

  };

	return CoderFactory;

});
