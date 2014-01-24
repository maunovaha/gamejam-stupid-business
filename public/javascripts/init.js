define(['zepto', 'app'], function($, App) {

	/**
	 * Init - Works as inner wrapper to start a game when DOM finishes loading
	 *
	 */
	var init = function() {
		$(function(){
			var app = new App();
		});
	};

	init();

});