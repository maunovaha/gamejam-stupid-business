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

	var backgroundmusic = new Audio('someSound.ogg'); 
	if (typeof myAudio.loop == 'boolean')
	{
		backgroundmusic.loop = true;
	}
	else
	{
		backgroundmusic.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}

	backgroundmusic.play();
	
		if(document.URL.indexOf("game") !== -1) {

			var game = new Game();
			game.init();

			return;

		}

		return console.log("App init index view..");

	};

	return App;

});