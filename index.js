'use strict';

var fs = require('fs'),
    program = require('commander'),
    co = require('co'),
    path = require('path');

program
    .version('0.1.0');

program
    .command('headdrop <target-dir>')
    .description('drop the file prefix head number')
    .action(function(targetDir){
        co(function *(){
            try{
                var targetDirctory = undefined;
                if(!path.isAbsolute(targetDir)){
                    targetDirctory = path.join(process.env.PWD, targetDir);
                }
            
                yield require('./src/headdrop')(targetDirctory);
            }catch(e){
                console.log('[headdrop] ', e.toString());
            }
        })
    });


program.parse(process.argv);