'use strict';
var _ = require('lodash'),
    fs = require('fs-extra'),
    path = require('path'),
    mv = require('mv');

module.exports = function* (targetDir){
    if(!fs.pathExistsSync(targetDir)){
        throw new Error('not found target directory'); 
    }
    var list = fs.readdirSync(targetDir);
    
    for(var i=0, l=list.length; i<l; i++){
        var name = list[i].trim();
        var num_prefix = name.split(' ')[0];
        
        if(/^[0-9]+$/.test(parseInt(num_prefix)) && path.extname(name) == '.mp3'){
            var rename = name.split(num_prefix)[1].trim();
            var src = path.join(targetDir, name);
            var dest = path.join(targetDir, rename);

            yield moveFile(src, dest, {});
        }
    }

    
}

var moveFile = function (srcPath, destPath, option){
    return function(cb){
        mv(srcPath, destPath, option, function(err){
            if(err){cb(err);}
            cb();
        });
    }
}