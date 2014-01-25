// Playing field

define(function() {

	var Grid = function( options ) {

		//console.log("im called");
		this.board = new Array(5);
		this.reserved = 0;
	};

	/**
	 *
	 *
	 */
	Grid.prototype.init = function() {

			//console.log("Grid init..");
		for (var i = 0; i < 5; i++) {
			this.board[i] = new Array(5);
		}

	};

	// place reserved
	Grid.prototype.addEntity = function( options ) {
		//console.log( this.board );
		this.board.push( 1 );

	};

	// place reserved deleted
	Grid.prototype.delEntity = function( options ) {
		for (var i = 0; i < 5; i++) {
			for (var j= 0; j < 5; j++) {
				this.board[i][j] = 0;
			}
		}
	};

	// For testing purposes

	Grid.prototype.draw = function( type, w, h, totalW, totalH){
    
	    var $this = this;
	    this.type = type || 'blocks';// blocks, diamonds, hexagons
	    this.blockW = w || 25;
	    this.blockH = h || 25;
	    this.container;
	        $('#grid').empty();
	  
	    this.container = document.createElement('div');
	    this.container.style.position = 'absolute';
	    this.container.style.width = '100%';
	    this.container.style.height = '100%';
	    this.container.id = 'gridContainer';
	        
	  
	    var c = document.createElement("canvas");
	        c.width  = totalW;
	        c.height = totalH;
	        
	    var totalW = totalW || $(document).width();
	    var totalH = totalH || $(document).height();
	};


return Grid;
});