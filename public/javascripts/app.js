define(['game'], function(Game) {

	/**
	 *
	 *
	 */
	var App = function() {};

	/**
	 * Inits application based on url, which relates to game state
	 * - /
	 * - /game
	 * - /credits
	 * - etc..
	 *
	 */
	App.prototype.init = function() {

		if(document.URL.indexOf("game") !== -1) {

			var game = new Game();
			game.init();

			return;

		}

		return console.log("App init index view..");

	};

	return App;

});