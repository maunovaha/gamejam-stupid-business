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

		if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
			var background = new Audio('audio/background.mp3');
		} else {
			var background = new Audio('audio/background.ogg');
		}
		if (typeof background.loop == 'boolean')
		{
			background.loop = true;
		}
		else
		{
			background.addEventListener('ended', function() {
        try {
		  this.currentTime = 0;
		  this.play();
        } catch(e) {
        } 
			}, false);
		}
		background.play();

		//if(document.URL.indexOf("game") !== -1) {

			var game = new Game();
			game.init();

			return;

		//}

		//return console.log("App init index view..");

	};

	return App;

});
