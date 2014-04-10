module.exports = function (grunt) {
	grunt.file.setBase(__dirname);

	// Load NPM Tasks
	grunt.loadNpmTasks("grunt-blanket-mocha");
    grunt.loadNpmTasks("grunt-bumpup");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-stylus");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-mocha");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-strip");
    grunt.loadNpmTasks("grunt-webdriver");

	/**
	 * Grunt Config
	 */
	grunt.initConfig({

        /**
         * Get package.json data
         */
        pkg: grunt.file.readJSON("package.json"),

        /**
         * Get config.json data
         */
        config: grunt.file.readJSON("config.json"),

        /**
         * Bumpup
         */
        bumpup: ["package.json", "bower.json"],

        /**
         * Directory variables
         */
        indir: 	"client",
        outdir: "public",


		/**
		 * Mocha Unit Tests & Blanket Coverage
		 */
		blanket_mocha: {
            all: ["test/unit/**/*.html"],
			options: {
				threshold: 90,
				run: false
			}
		},

        mocha: {
            unit: {
                src: ["test/unit/**/*.html"]
            }
        },

        webdriver: {
            options: {
                desiredCapabilities: {
                    browserName: "chrome"
                }
            },
            home: {
                tests: ["test/cept/specs/home/*.js"]
            }
        },

        /**
         * Clean directories/files
         */
        clean: {
            dist:     "<%= outdir %>/**/*"
        },

        /**
         * Copy settings
         */
        copy: {
            assets: {
                cwd: "<%= indir %>",
                expand: true,
                src: "img/**/*",
                dest: "<%= outdir %>"
            },
            scripts: {
                cwd: "<%= indir %>",
                expand: true,
                src: "js/**/*",
                dest: "<%= outdir %>"
            }
        },

        /**
         * RequireJS settings
         */
        requirejs: {

            compile: {
                options: {
                    baseUrl: "<%= indir %>/js",
                    mainConfigFile: "<%= indir %>/js/require.config.js",
                    name: "../vendor/almond/almond",
                    out: "<%= outdir %>/js/main.js",
                    findNestedDependencies: true,
                    include: "main",
                    wrap: true
                }
            }

        },

        stylus: {
            dev: {
                options: {
                    compress: false,
                    yuicompress: false,
                    dumpLineNumbers: "all"
                },

                files: {
                    "<%= outdir %>/css/style.css": "<%= indir %>/styles/style.styl"
                }
            },
            dist: {
                options: {
                    compress: true,
                    yuicompress: true,
                    report: "min"
                },

                files: {
                    "<%= outdir %>/css/style.css": "<%= indir %>/styles/style.styl"
                }
            }
        },

        /**
         * JS Hint settings
         */
        jshint: {
            dev: {
                src: [
                    "<%= indir %>/js/**/*.js"
                ],
                options: {
                    jshintrc: ".jshintrc",
                    ignores: [
                        "<%= indir %>/vendor/**/*.js"
                    ]
                }
            }
        },


        /**
         * Remove console.log and debug statements.
         */
        strip: {

            dist: {
                src: "<%= outdir %>/js/**/*.js",

                options: {
                    inline: true,
                    nodes : ["console.log", "debug"]
                }
            }

        },

        /**
         * Nodemon settings
         */
        nodemon: {
            dev: {
                options: {
                    args: [],
                    ignoredFiles: ["README.md", "node_modules/**"],
                    watchedExtensions: ["js"],
                    watchedFolders: ["server", "server/**"],
                    delayTime: 1,
                    env: {
                        NODE_ENV: "development",
                        PORT: "8080"
                    }
                }
            },
            dist: {
                options: {
                    args: [],
                    ignoredFiles: ["README.md", "node_modules/**"],
                    watchedExtensions: ["js"],
                    watchedFolders: ["server", "server/**"],
                    delayTime: 1,
                    env: {
                        NODE_ENV: "production",
                        PORT: "8080"
                    }
                }
            }
        },

        /**
         * Concurrent settings
         */
        concurrent: {
            dev: {
                tasks: ["nodemon:dev", "watch"],
                options: {
                    logConcurrentOutput: true
                }
            },
            dist: {
                tasks: ["nodemon:dist"],
                options: {
                    logConcurrentOutput: true
                }
            },
            test: {
                tasks: ["nodemon:dist", "webdriver"],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        /**
         * Watch settings
         */
        watch: {
            options: {
                livereload: true
            },
            assets: {
                files: "<%= indir %>/**/*.{css,png,jpg,gif}",
                tasks: ["copy:assets"]
            },
            style: {
                files: "<%= indir %>/styles/**/*",
                tasks: ["stylus:dev"]
            },
            scripts: {
                files: ["<%= indir %>/js/**/*.{js,html}"],
                tasks: ["jshint", "copy:scripts"]
            },
            views: {
                files: ["views/**/*"]
            }
        }

	});

	

	// Register Tasks

    grunt.registerTask("default", [
        "clean:dist",
        "jshint",
        "stylus:dev",
        "copy:assets",
        "copy:scripts",
        "concurrent:dev"
    ]);

    grunt.registerTask("build", [
        "clean:dist",
        "stylus:dist",
        "copy:assets",
        "requirejs:compile",
        "strip:dist"
    ]);

    grunt.registerTask("test", ["mocha:unit"]);

    grunt.registerTask("test:cov", ["blanket_mocha"]);

    grunt.registerTask("test:intg", ["build", "concurrent:test"]);

    grunt.registerTask("run:production", ["concurrent:dist"]);

};

