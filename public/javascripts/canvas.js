define(['zepto'], function($) {

	var Canvas = function(gameplay) {

		console.log("Canvas..");

		this.gameplay = gameplay;
		this.dom = $('#drawable-canvas');
		this.ctx = this.dom[0].getContext('2d');

		this.width = 640;
		this.height = 480;

	};

	Canvas.prototype.clear = function() {

		this.ctx.clearRect(0, 0, this.width, this.height);

	};

	Canvas.prototype.draw = function() {

		// Clearing it all
		this.clear();

		// Draw all entities (current floor only)
	    for(var type in this.gameplay.floors[this.gameplay.currentFloor]) {
	      for(var key in this.gameplay.floors[this.gameplay.currentFloor][type]) {

	         this.gameplay.floors[this.gameplay.currentFloor][type][key].draw(this.ctx);

	      }
	    }

	};

	Canvas.prototype.update = function() {

		// Update all entities
	    for(var floor in this.gameplay.floors) {
        for(var type in this.gameplay.floors[floor]) {
          for(var key in this.gameplay.floors[floor][type]) {

            if(typeof this.gameplay.floors[this.gameplay.currentFloor][type][key] !== "undefined") {
              this.gameplay.floors[this.gameplay.currentFloor][type][key].update();
            }

          }
        }
	    }
	};

	return Canvas;

});
