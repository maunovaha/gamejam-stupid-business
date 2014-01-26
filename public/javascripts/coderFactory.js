define(['coder'], function(Coder) {

	/**
	 *
	 *
	 */
	var CoderFactory = function(gameplay, tileFactory) {

    this.gameplay = gameplay;
    this.tileFactory = tileFactory;

    this.maxCoders = 36;

    // Base path for toilet
    this.paths = {
      toilet: [
          {
            x: 8,
            y: 6
          },
          {
            x: 7,
            y: 6
          },
          {
            x: 6,
            y: 6
          },
          {
            x: 5,
            y: 6
          },
          {
            x: 4,
            y: 6
          },
          {
            x: 3,
            y: 6
          },
          {
            x: 3,
            y: 5
          },
          {
            x: 3,
            y: 4
          },
          {
            x: 3,
            y: 3
          },
          {
            x: 3,
            y: 2
          },
          {
            x: 3,
            y: 1
          },
          {
            x: 2,
            y: 1
          },
          {
            x: 1,
            y: 1
          },
          {
            x: 1,
            y: 2
          },
          {
            x: 1,
            y: 3
          }
        ]
    };

	};

  /**
   *
   *
   */
  CoderFactory.prototype.getPath = function(x, y) {

    var path = [{
      x: x + 4,
      y: y
    }];

    // As many to side as needed
    var howManySide = 5 - x,
        lastX = 0;

    if(howManySide > 0) {

       for(var z = x; z < howManySide+x; z++) {
          path.push({ x: z + 4, y: y });
          lastX = z;
       }

      for(var u = y; u < 6; u++) {
        path.push({ x: lastX + 4, y: y++ });
      };

    } else {

      var xNow = (x + 4) - 1,
          yNow = 5 - y;

      for(var o = y; o < yNow+y; o++) {
        path.push({ x: xNow, y: o });
      }

    }

    path.push.apply(path, this.paths.toilet);

    return path;

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
            tileFactory: this.tileFactory,
            path: this.getPath(slot.x, slot.y)
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
