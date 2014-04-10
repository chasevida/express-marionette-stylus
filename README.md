#Express Marionette Stylus

A quick start node application that makes use of Express, Marionette, Handlebars and Stylus. It also makes extensive use of Grunt, Mocha, Chai and Requirejs.

### Installation
The recommended way to get a working copy of this project is to clone the repository.

	$ git clone git://github.com/chasevida/express-marionette-stylus
	$ cd express-marionette-stylus
	$ npm install
	$ bower install
	$ grunt

The last three commands are used to import all project dependencies and run the application on [http://localhost:8080](http://localhost:8080)

### Global Dependencies
This project relies heavily on several technologies. Please make sure you have an up to date version of the below:

* [Node.js & NPM](http://nodejs.org/)
* [Bower](https://github.com/bower/bower)
* [Grunt](http://gruntjs.com/)

### Stack
This project makes heavy use of JavaScript, HTML and CSS. The main front-end application framework is Marionette built on top of Backbone.js and includes several extension libraries. The templating engine used is Handlebars and it is all pulled togther using RequireJS for module loading. The server side uses Express.js and uses Handlebars as the main templating engine. At a glance:

*	[Node](http://nodejs.org/)
*	[Express.js](http://expressjs.com/)
*	[RequireJS](http://requirejs.org/)
*	[Underscore](http://underscorejs.org/)
*	[Backbone.js](http://backbonejs.org/)
*	[Marionette](http://marionettejs.com/)
*	[Handlebars](http://handlebarsjs.com/)

### Grunt Tasks
If your not familar with [Grunt](http://gruntjs.com/) please check it out as this project makes heavy use of it. All grunt tasks can be found at the bottom of the `gruntfile.js`. Some of the main tasks are as follows:

	$ grunt					- runs the app on http://localhost:8080/
	$ grunt build			- builds a web version in the public directory
	
	$ grunt test			- runs all mocha test files
	$ grunt test:intg		- runs integration tests using webdriver
	

### Working with the project
The default grunt task sets up a development server on port 8080 and watches for source code changes in the `client` and `views` directories. Changes to `client/js` javascript files are linted and then copied to the public directory verbatim.

The grunt build tasks runs the javascript code form `client/js` via the requirejs/almond optimiser. All output code is placed in the `public/js` folder.

Please note the `public` directories are periodically cleaned during grunt tasks. DO NOT put source code or artwork in this directory as it will be permanently overwritten/deleted.

### Project layout
*	`client` contains the client source code (.js, .less, .jpg, .png, .gif)
*	`public` is the web root directory where files are served over http. All content in this directory should be generated via the grunt build scripts.
*	`server` contains code to generate the nodejs/express development server.
*	`test` contains all source code tests
*	`views` contains the handlebar templates that are served as html

### Configuration
There is a config.json file that contains settings for each environment, such as the google analytics tracking code id and the base path to static assets. The assetPath setting is best set to '' (nothing) for development but can be used to serve static files from a CDN or other remote host in staging/production environments.

### Google Analytics
If you want to test google analytics locally, it's best to use 127.0.0.1 (or another resolvable hostname/ip) over localhost, otherwise tracking events will not be sent (hostname mismatch). Likewise, the dev analytics account needs to be set to the same hostname.

### Deploy
Currently this project has the bones to be deployed to the Windows Azure platform. Azure can deploy using services hooks from github or other similar services. The deploy configuration can be found in `deploy.sh`. This will install npm & bower packages as well as the grunt-cli. Finally it runs the grunt task `$ grunt build`.

### Thanks
Thanks to Ben/at0g who's [original](https://github.com/at0g/bens-boilerplate) boiler project this is forked from.




