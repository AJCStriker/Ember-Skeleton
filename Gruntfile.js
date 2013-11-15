module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                src: 'dist/compile/*.js',
                dest: 'dist/final/js/<%= pkg.version %>.min.js'
            }
        },
        coffee: {
            compile: {
                files: {
                    'dist/compile/output.js': 'src/**/*.coffee'
                }
            }
        },
        watch: {
            coffee: {
              files: 'src/**/*.coffee',
                tasks: ['coffee'],
                options: {
                    livereload: {
                        port: 9000
                    }
                }
            },
            js: {
                files: 'dist/compile/*.js',
                tasks: ['uglify'],
                options: {
                    livereload: {
                        port: 9000
                    }
                }
            },

            css: {
                files: 'src/**/*.styl',
                tasks: ['stylus'],
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
                    'dist/final/css/theme.css': ['src/**/*.styl'] // compile and concat into single file
                }
            }
        },
        copy: {
            main: {
                expand: "true",
                cwd: 'src/view/',
                src: '**',
                dest: 'dist/final/public/'
            }
        },
        clean: ["dist/final/css", "dist/final/js", "dist/final/public"]

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['clean','coffee','uglify', 'stylus', 'copy']);
}