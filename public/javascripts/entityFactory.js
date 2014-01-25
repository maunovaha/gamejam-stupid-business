define(['tileFactory', 'coderFactory'], function(TileFactory, CoderFactory) {

	/**
	 *
	 *
	 */
	var EntityFactory = function(gameplay) {

    // Yeah..
    this.tileFactory = new TileFactory();

		// All factories
		this.factories = {
			coder: new CoderFactory(gameplay, this.tileFactory),
			cleaner: null,
			manager: null,
			cook: null,
      tileFactory: this.tileFactory
		};

	};

  /**
   *
   *
   */
  EntityFactory.prototype.init = function(callback) {

    this.tileFactory.init(function(err) {

      if(err) return callback("TileFactory.js failed to load, refresh page to try again.");

      return callback(null);

    });

  };

	/**
	 *
	 *
	 */
	EntityFactory.prototype.getFactory = function(type) {

		return this.factories[type];

	};

	return EntityFactory;

});
