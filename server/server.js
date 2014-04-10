
var express             = require("express"),
    http                = require("http"),
    path                = require("path"),
    pkg                 = require(path.join(__dirname, "../", "package.json")),
    config              = require(path.join(__dirname, "../", "config.json")),
    exphbs              = require('express-hbs')
    ;



/*
 * ------------------------------------------------
 * Create App and configure
 */

var app     = express(),
    port    = process.env.PORT || 8080,
    hbsopts = {
                extname: ".html",
                layoutsDir: path.join( __dirname, "../", "views/layouts" ),
                partialsDir: path.join( __dirname, "../", "views/partials" )
            }
    ;


/*
 * ------------------------------------------------
 * View engine
 */

app.engine(".html", exphbs.express3(hbsopts));
app.set('view engine', '.html');
app.set("views", path.join( __dirname, "../", "views" ));

/*
 * ------------------------------------------------
 * General middleware
 */

app.set("port", process.env.PORT || port );
app.set("pkg", pkg);

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, "../", "public" )));



/*
 * ------------------------------------------------
 * Basic Auth
 * ************************************************
 * NB: Remove this to go live
 */
//app.use( express.basicAuth( "username", "password" ) );



/*
 * ------------------------------------------------
 * Configure by environment
 */
app.configure("development", function() {
    app.set("config", config.development);
    app.use("/vendor", express.static(path.join(__dirname, "../", "client/vendor")) );
});

app.configure("staging", function() {
    app.set("config", config.staging);
});

app.configure("production", function() {
    app.set("config", config.production);
});



/*
 * ------------------------------------------------
 * Routes
 */
require(path.join(__dirname, "routes" ))(app);



/*
 * ------------------------------------------------
 * Create Server
 */
http.createServer(app).listen(app.get("port"), function(){
    console.log( "Express server listening on port " + app.get("port") );
    console.log( "Node Environment: " + app.get("env") );
});

process.on("SIGINT", function() {
    console.warn( "Express server listening on port " + app.get("port") + " exiting");
    process.exit(0);
});


