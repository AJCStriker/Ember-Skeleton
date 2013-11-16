module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                src: ['dist/compile/js/handlebars-1.0.0.js','dist/compile/js/ember-1.1.2.js','dist/compile/js/*.js'],
                dest: 'dist/final/public/js/<%= pkg.version %>.min.js'
            }
        },
        coffee: {
            compile: {
                files: {
                    'dist/compile/js/output.js': 'src/**/*.coffee'
                }
            }
        },
        watch: {
            coffee: {
              files: 'src/**/*.coffee',
                tasks: ['buildall'],
                options: {
                    livereload: {
                        port: 9000
                    }
                }
            },
            js: {
                files: 'dist/compile/*.js',
                tasks: ['buildall'],
                options: {
                    livereload: {
                        port: 9000
                    }
                }
            },

            css: {
                files: 'src/**/*.styl',
                tasks: ['buildall'],
                options: {
                    liverload: {
                        port: 9000
                    }
                }
            }


        },
        stylus: {
            compile: {
                options: {
                    compress: "true",
                    urlfunc: 'embedurl'
                },
                files: {
                    'dist/final/public/css/theme.css': ['src/**/*.styl'] // compile and concat into single file
                }
            }
        },
        copy: {
            first: {
                expand: "true",
                cwd: 'src/view/',
                src: '**',
                dest: 'dist/compile/html'
            },

            second: {
                expand: "true",
                cwd: 'dist/compile/html',
                src: '**',
                dest: 'dist/final/public/'
            },

            libraries: {
                expand: "true",
                cwd: 'src/libs/',
                src: '**',
                dest: 'dist/compile/js/'
            }
        },
        clean: {
            dist: ["dist/final/css", "dist/final/js", "dist/final/public"],
            build: ["dist/compile"]
        },

        replace: {
            main: {
                src: ['dist/compile/html/*.html'],
                overwrite: true,
                replacements: [{
                    from: "{PROJECT_JAVASCRIPT}",
                    to: "<%= pkg.version %>.min.js"
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.registerTask('default', 'buildall');
    grunt.registerTask('buildall', ['clean:dist', 'clean:build','copy:first','replace','copy:second','coffee',"copy:libraries",'uglify', 'stylus', 'clean:build'])
}