var fs = require('fs');
var walk = require('walkdir');
var mkdirp = require('mkdirp');

//get dust mobile; fallback to linkedin version
try {
   var dust = require('dust');
} catch (err) {
   var dust = require('dustjs-linkedin');
}

//ensure path arg is provided
if (!process.argv[2]) {
    console.error('Please provide a path to your dust views');
    return;
}


var version = "0_0_1";
var view_path = process.argv[2];


try {
    stats = fs.lstatSync(view_path);

    if (!stats.isDirectory()) {
        console.error('Please provide a valid path to your dust views');
        return;
    }
}
catch (e) {
    console.error('Please provide a valid path to your dust views');
    return;
}

//version number should be in the following format - 0_0_0
if (process.argv[3]) version = process.argv[3].replace(/\./g,'_').replace(/\-/g,'_');

//compile views to the following folder - path/compiled_0_0_0
var compiled_folder = view_path + "/compiled_" + version + "/";

mkdirp(compiled_folder, function (err) {
    if (err) console.error(err);
    else console.log('Created folder : ' + compiled_folder);
});

//walk through all files in path provided
walk.sync(view_path, function(filepath, stat) {
    if (stat.isDirectory() || filepath.indexOf("compiled") != -1) return;

    fs.readFile(filepath, 'ascii', function (err, data) {
        if (err) console.error(err);
        var path_parts = filepath.split("/");
        var file_to_create = path_parts[0] + "\\compiled_" + version;
        path_parts.splice(0, 1);

        for (folder in path_parts) {
            if (path_parts[folder].indexOf("html") == -1 && path_parts[folder].indexOf("dust") == -1) {
                file_to_create = file_to_create + "\\" + path_parts[folder];

                mkdirp(file_to_create, function (err) {
                    if (err) console.error(err);
                    console.log('Created folder : ' + file_to_create);
                });
            }
        }

        var filename = filepath.split("/").reverse()[0].replace(".html", "").replace(".dust", "");
        file_to_create = file_to_create + "\\" + filename + "_"  + version + ".js";

        //compile to dust
        var compiled = dust.compile(data, filename);

        fs.writeFile(file_to_create, compiled, function (err) {
            if (err) console.error(err);
            console.log('Dust view compiled: ' + file_to_create);
        });
    });
});