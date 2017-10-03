# dev_module
set paths in settings.json file and start watching for changes
# HOW TO START
1) cd dev_module
2) run 'npm i'
3) config 'settings.json' file
4) for every project make 'git pull && npm i'
in different terminals make:
5) run 'grunt watcher:trd3'
6) run 'grunt watcher:fcl'
7) run 'grunt watcher:cafe-chart'

# HOW TO USE
grunt watcher:`name`
(grunt watcher:trd3, grunt watcher:fcl, grunt watcher:cafe-chart)

# Legend:
{
    name: String // task name
    root: String // root repo 
    dest: String // destination for file copy
    watch: Array // array of files to watch 
    sourcemap {
        dir: String // sourcemap location
        cmd: String // command to generate sourcemap into 'dir'
        files: Array // files to copy into 'dest' from 'sourcemap.dir'
    }
}

