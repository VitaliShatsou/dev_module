# dev_module
set paths in settings.json file and start watching for changes
# HOW TO START
1) cd dev_module
2) config 'settings.json' file
3) run 'grunt watcher:trd3'
4) run 'grunt watcher:fcl'
5) run 'grunt watcher:cafe-chart'


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

grunt watcher:`name`
(grunt watcher:trd3, grunt watcher:fcl, grunt watcher:cafe-chart)
