define(['coderFactory'], function(CoderFactory) {

	/**
	 *
	 *
	 */
	var EntityFactory = function() {

		// All factories
		this.factories = {
			'coder': new CoderFactory(),
			'cleaner': null,
			'manager': null,
			'cook': null
		};

	};

	/**
	 *
	 *
	 */
	EntityFactory.prototype.getFactory = function(name) {

		return this.factories[name];

	};

	return EntityFactory;

});