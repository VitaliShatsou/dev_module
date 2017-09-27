
var settingsPath = './settings.json';
var fs = require('fs-extra');
var settingsArr = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
var exec = require('child_process').exec;

module.exports = function(grunt) {
    grunt.registerTask('paste', function () {
        settingsArr.forEach((settings) => {
            const { dest, sourcemap } = settings;
            sourcemap.files.forEach(file => {
                const dirFile = sourcemap.dir + "/" + file;
                const destFile = dest + file;
                copyFile(dirFile, destFile);
            });
        }, this);
    })

    grunt.registerTask('gen', function () {
        settingsArr.forEach(settings => {
            const { root, sourcemap } = settings;
            const { cmd } = sourcemap;
            const done = this.async();
            exec('cd ' + root + ' && ' + cmd, function (error, stdout, stderr) {
                if(error) {
                    console.log(error, stderr);
                } else {
                    console.log('succ');
                }
                done();
            });
        });

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('watcher', function (index) {
        // console.log(grunt.task.run);
        const files = settingsArr[index].watch + '**/*.js';
        grunt.config.set('watch', {
            files: [files],
            tasks: ['gen', 'paste'],
        });
        grunt.task.run('watch');
    });

    // Project configuration.
    grunt.initConfig({}); 
  

};

function copyFile(src, dest) {
    fs.copySync(src, dest);
}   