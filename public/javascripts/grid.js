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

			for (var j= 0; j < 5; j++) {
				this.board[i][j] = 0;
			}
		}
		console.log( this.board );


	};

	// add the entity to the first free place
	Grid.prototype.addEntity = function( ) {
		console.log( "alussa" );
		console.log(this.board);
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				//console.log( this.board[i][j] );
				if( this.board[i][j] == 0) {
					this.board[i][j] = 1; 
					console.log( "FFF");
					return;
				}
			}
		}
		// console.log( this.board );

	};

	// deletes the last element
	Grid.prototype.delEntity = function( options ) {
		for (var i = 4; i >= 0; i--) {
			for (var j= 4; j >= 0; j--) {
				if( this.board[i][j] == 1) 
				{
					console.log( "poistetaan");
					this.board[i][j] = 0;
				}
			}
		}
	};

	// for dev purp - prints the elements
	Grid.prototype.printBoard = function( options ) {
		for (var i = 0; i < 5; i++) {
			console.log( this.board[i] );

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