var fs = require('fs');
var http = require('http');
var path = require('path');
var open = require('open');


exports.initProject = function(outputFilename) {
    outputFilename = outputFilename || 'js1k_entry.js';
    var exists = fs.existsSync(outputFilename);
    var ENTRY_BOILERPLATE = fs.readFileSync('boilerplate.js', 'utf8');

    if (exists) {
        console.error(outputFilename, 'already exists!');
    } else {
        fs.writeFileSync(outputFilename, ENTRY_BOILERPLATE);
        console.log('New js1k boilerplate created in', outputFilename);
    }
};

// Startup a web server that serves the js1k shim with the
// specified entry javascript loaded in.
//
// This reloads the entry for every request, so the server doesn't need to
// be restarted when you make changes to your entry.
exports.serve = function(pathToEntryJs) {
    var SHIM = fs.readFileSync('shim.html', 'utf8');
    var entryPath = path.join(process.cwd(), pathToEntryJs);

    var server = http.createServer(function(req, res) {
        var entry = fs.readFileSync(entryPath, 'utf8');
        var output = SHIM.replace('/* SUBMISSION */', entry);
        res.end(output);
    });
    console.log('Serving js1k shim with', pathToEntryJs, 'loaded in at http://localhost:3001/');
    server.listen(3001);
};

exports.build = function(env) {
    console.log('not implemented yet');
};

exports.size = function(env) {
    console.log('not implemented yet');
};

exports.launchRules = function(env) {
    open('http://js1k.com/2013-spring/rules');
};

exports.launchSubmit = function(env) {
    open('http://js1k.com/2013-spring/submit');
};
