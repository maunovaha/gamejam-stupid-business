

// Creates a Cube

define(function() {

	var Grid = function( options ) {

		//console.log( options );

		this.reserved = 0;
		this.size = options.size;
		this.board = new Array( this.size );
	};

	/**
	 *
	 *
	 */
	Grid.prototype.init = function() {

		//console.log("Grid init..");
		for (var i = 0; i < this.size; i++) {
			this.board[i] = new Array( this.size );

			for (var j= 0; j < this.size; j++) {
				this.board[i][j] = 0;
			}
		}


	};

	// add the entity to the first free place
	Grid.prototype.addEntity = function( ) {
		//console.log( "alussa" );
		//console.log(this.board);
		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {
				//console.log( this.board[i][j] );
				if( this.board[i][j] == 0) {
					this.board[i][j] = 1;
					console.log( "lisatty paikkaan (" +i +")(" + j +")");
					return;
				}
			}
		}
	}

	// add the entity to the random place
	Grid.prototype.createEntity = function( ) {
		//console.log( "alussa" );
		//console.log(this.board);
		var not_found = 1;
		var i = 0;
		var j = 0;

		if( this.boardFull() == 0) {
			//console.log("Board is full");
			return;
		}

		do {
			i = this.randomizePlace( );
			j = this.randomizePlace( );
			//console.log( i + " + " j );
			if( this.board[i][j] == 0 ) {
				this.board[i][j] = 1;
				//console.log( "lisatty paikkaan (" +i +")(" + j +")");
				return;
			}

		} while ( not_found == 1 );

	};

	// deletes the last element

	Grid.prototype.delEntity = function( options ) {
		for (var i = this.size- 1; i >= 0; i--) {
			for (var j= this.size - 1; j >= 0; j--) {
				if( this.board[i][j] == 1)
				{
					//console.log( "poistetaan");
					this.board[i][j] = 0;
				}
			}
		}
	};

	// for dev purp - prints the elements
	Grid.prototype.printBoard = function( options ) {
		for (var i = 0; i < this.size; i++) {
			//console.log( this.board[i] );

		}
	};

	// return 1 if empty
	Grid.prototype.boardFull = function( options ) {
		for (var i = 0; i < this.size; i++) {
			for (var j= 0; j < this.size; j++) {
				if( this.board[i][j] == 1)
				{
					return 0;
				}
			}
		}
		return 1;
	};


	// Random place
	Grid.prototype.randomizePlace = function() {

		var rand = Math.floor((Math.random()*this.size - 1)+1);
		return rand;
	};


	Grid.prototype.testGrid = function( ) {

		//var kentta = new Grid( { size: 5} );
		this.init();
		this.createEntity();
		this.printBoard();
		this.delEntity();
		this.printBoard();
		for( var i = 0; i < 10; i++) {
			console.log( this.randomizePlace() );
		}


	};


return Grid;

});
