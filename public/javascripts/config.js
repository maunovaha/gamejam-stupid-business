require.config({
    baseUrl: 'javascripts',
    paths: {
        jquery:         'lib/jquery',
        zepto:          'lib/zepto',
        deferred: 	  	'lib/deferred',
        reqanim:        'lib/req-anim'
    },
    map: {
        '*': {
            'zepto': 'lib/zepto-custom'
        },
        'lib/zepto-custom': {
            'zepto': 'zepto'
        }
    },
    shim: {
    	// The shim config allows us to configure dependencies for
  		// scripts that do not call define() to register a module
    	deferred: {
            exports: 'Deferred'
        },
        zepto: {
            exports: 'Zepto'
        },
        reqanim: {
            exports: 'AnimationFrame'
        }
    }
});

/**
 * After defined scripts loaded, we can init the game!
 *
 */
define(function() {

	require(["init"]);

});