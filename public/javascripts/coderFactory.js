define(['coder'], function(Coder) {

	/**
	 *
	 *
	 */
	var CoderFactory = function(gameplay, tileFactory) {

    this.gameplay = gameplay;
    this.tileFactory = tileFactory;
	this.salary=0;
	this.productivity=0;
	this.totalSalary=0;

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
        ],
        meeting: [
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
            x: 2,
            y: 5
          },
          {
            x: 1,
            y: 5
          },
          {
            x: 1,
            y: 6
          },
          {
            x: 1,
            y: 7
          }
        ]
    };

	};

  /**
   *
   *
   */
  CoderFactory.prototype.getPaths = function(x, y) {

    var path = {
      toilet: [{
        x: x + 4,
        y: y
      }],
      meeting: [{
        x: x + 4,
        y: y
      }],
    };

    this.getStartPath(path.toilet, x, y);
    this.getStartPath(path.meeting, x, y);

    path.toilet.push.apply(path.toilet, this.paths.toilet);
    path.meeting.push.apply(path.meeting, this.paths.meeting);

    return path;

  };

  CoderFactory.prototype.getStartPath = function(path, x, y) {

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

		  
		  // ramdomize a salary and productivity based on that
		  this.salary = Math.floor(Math.random() * (118000 - 43000 + 1) + 43000);
		  this.totalSalary += parseFloat(this.salary);
		  this.productivity = (this.salary / 100000).toFixed(2);
		  
          // todo: calculate next free position???
          this.gameplay.floors[this.gameplay.currentFloor]["coder"][slot.x + "," + slot.y] = new Coder({
            type: "coder",
            x: slot.x,
            y: slot.y,
            sprite: this.tileFactory.getSprite("sitting", "coder"),
            tileFactory: this.tileFactory,
            paths: this.getPaths(slot.x, slot.y),
			salary: this.salary,
			productivity: this.productivity
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
