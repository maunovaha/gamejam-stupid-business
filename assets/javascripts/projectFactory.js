define(function() {

	/**
	 *
	 *
	 */
	var ProjectFactory = function() {

		//console.log("ProjectFactory created...");

		this.companies = [
			"Crand Grew",
			"SoftFingers",
			"MicroManagementSoft",
			"G-Buy",
			"Banana",
			"DimSung",
			"KabobHut",
			"PeopleCars",
			"Major Motors",
			"Chill -Oil",
			"Digital Arts",
			"That JamGame Company",
			"Howling Rain"
		];

		this.adjectives = [
			"Leading",
			"Unique",
			"Platform exclusive",
			"Innovative",
			"Real-Time",
			"Flexible",
			"Cutting edge",
			"World class",
			"Revolutionary",
			"Sustainable",
			"Robust",
			"User friendly",
			"Extraordinary",
			"Mission critical",
			"Seamless",
			"Iconic",
			"Enterprise class",
			"Magical",
			"Cross-Platform",
			"Space-age",
			"Client-Centric",
			"Next-Gen",
			"Never been done",
			"Solution-Driven"
		];

		this.projects = [
			"Massively Multiplayer Online Game",
			"Freemium Game",
			"Candy Battlefield Crush of Duty Saga -EdgeScrolls 15 Game",
			"Presentation solution",
			"Documentation software",
			"Communication software",
			"Operating System",
			"Test system",
			"Database",
			"Accounting solution",
			"Customer tracking software",
			"Website",
			"Online marketplace",
			"Gamification Solution",
			"Augmented Virtual Reality solution",
			"FATKING",
			"Failing with girls"
		];

	};

	/**
	 *
	 *
	 */
	ProjectFactory.prototype.getProject = function() {

		var company = Math.floor(Math.random() * ((this.companies.length-1) - 0 + 1)) + 0,
			adjective = Math.floor(Math.random() * ((this.adjectives.length-1) - 0 + 1)) + 0,
			project = Math.floor(Math.random() * ((this.projects.length-1) - 0 + 1)) + 0;

		return  this.adjectives[adjective] + " " + this.projects[project] + " (" + this.companies[company] + ")";

	};

	return ProjectFactory;

});
