var fs = require('fs');
var http = require('http');
var path = require('path');

var open = require('open');
var uglify = require('uglify-js');

var BOILERPLATE_PATH = path.join(__dirname, '..', 'boilerplate.js');
var SHIM_PATH = path.join(__dirname, '..', 'shim.html');


function minify(input) {
    input = '(function(){' + input + '}());';   // Add an IIFE wrapper to ensure top-level variables get renamed
    var result = uglify.minify(input, {fromString: true});
    return result.code.slice(12,-5);    // Remove the IIFE wrapper to save bytes
}

exports.initProject = function(outputFilename) {
    outputFilename = outputFilename || 'js1k_entry.js';
    var exists = fs.existsSync(outputFilename);
    var boilerplate = fs.readFileSync(BOILERPLATE_PATH, 'utf8');

    if (exists) {
        console.error(outputFilename, 'already exists!');
    } else {
        fs.writeFileSync(outputFilename, boilerplate);
        console.log('New js1k boilerplate created in', outputFilename);
    }
};

// Startup a web server that serves the js1k shim with the
// specified entry javascript loaded in.
//
// This reloads the entry for every request, so the server doesn't need to
// be restarted when you make changes to your entry.
exports.serve = function(pathToEntryJs) {
    var shimHtml = fs.readFileSync(SHIM_PATH, 'utf8');
    var entryPath = path.join(process.cwd(), pathToEntryJs);

    var server = http.createServer(function(req, res) {
        var entry = fs.readFileSync(entryPath, 'utf8');
        var minifiedCode = minify(entry);
        var output = shimHtml.replace('/* SUBMISSION */', minifiedCode)
                             .replace('<!--size-->', 'Minified size: ' + minifiedCode.length + 'B');
        console.log('GET', req.url, '[js size:', minifiedCode.length + 'B]');
        res.end(output);
    });
    console.log('* Serving js1k shim with', pathToEntryJs, 'loaded in at http://localhost:3001/');
    server.listen(3001);
};

exports.build = function(pathToEntryJs) {
    var entryPath = path.join(process.cwd(), pathToEntryJs);
    var code = fs.readFileSync(entryPath, 'utf8');
    console.log(minify(code));
};

exports.launchRules = function(env) {
    open('http://js1k.com/2013-spring/rules');
};

exports.launchSubmit = function(env) {
    open('http://js1k.com/2013-spring/submit');
};
