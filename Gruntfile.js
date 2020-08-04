module.exports = function(grunt) {
    const env = 'sim';
    const options = (require('./screeps'))[env];

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            // options,
            options: {
                username: 'dgp2011@gmail.com',
                password: '',
                branch: 'reboot-es6',
                ptr: false,
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.{js,wasm}'],
                        flatten: true,
                    },
                ],
            },
        },
    });
};
