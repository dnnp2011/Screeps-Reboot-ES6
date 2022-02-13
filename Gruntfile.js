/* eslint-disable */
module.exports = function(grunt) {
    const options = (require('./screeps.json'))["grunt"];

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options,
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.{js,wasm}'],
                        flatten: true
                    }
                ]
            }
        }
    });
};
