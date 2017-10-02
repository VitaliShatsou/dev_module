
var settingsPath = './settings.json';
const fs = require('fs-extra');
const settingsArr = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
const exec = require('child_process').exec;

module.exports = function(grunt) {
    grunt.registerTask('paste', function (index) {
        const settings = settingsArr[index];
        const { dest, sourcemap } = settings;
        sourcemap.files.forEach(file => {
            const dirFile = sourcemap.dir + "/" + file;
            const destFile = dest + file;
            console.log(dirFile, destFile);
            copyFile(dirFile, destFile);
        });
    })

    grunt.registerTask('gen', function (index) {
        const settings = settingsArr[index];
        const { root, sourcemap } = settings;
        const { cmd } = sourcemap;
        const done = this.async();
        console.log('cd ' + root + ' && ' + cmd);
        if (root && cmd) {
            exec('cd ' + root + ' && ' + cmd, function (error, stdout, stderr) {
                if(error) {
                    console.log(error, stderr);
                } else {
                    console.log('succ');
                }
                done();
            });
        } else {done();}
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('watcher', function (name) {
        const index = settingsArr.map(settings => settings.name).indexOf(name);
        const files = settingsArr[index].watch;
        grunt.config.set('watch', {
            files,
            tasks: ['gen:' + index + '', 'paste:' + index + ''],
        });
        grunt.task.run('gen:' + index + '')
        grunt.task.run('paste:' + index + '')
        grunt.task.run('watch');
    });

    // Project configuration.
    grunt.initConfig({}); 
  

};

function copyFile(src, dest) {
    fs.copySync(src, dest);
}   