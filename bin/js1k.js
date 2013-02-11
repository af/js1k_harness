#!/usr/bin/env node

var cli = require('commander');
var js1k = require('../lib');


cli.version(require('../package').version);

cli.command('init')
   .description('Create a new js1k boilerplate javascript file')
   .usage('<filename>')
   .action(function(fileName) {
       if (typeof fileName !== 'string') fileName = 'js1k_entry.js';
       js1k.initProject(fileName);
   });

cli.command('serve')
   .usage('<filename>')
   .description('Serve your minified js in the js1k shim (on port 3001)')
   .action(function(fileName) {
       if (typeof fileName !== 'string') fileName = 'js1k_entry.js';
       js1k.serve(fileName);
   });

cli.command('build')
   .usage('<filename>')
   .description('Outputs a minified version of your javascript, suitable for submission')
   .action(function(fileName) {
       if (typeof fileName !== 'string') fileName = 'js1k_entry.js';
       js1k.build(fileName);
   });

cli.command('rules')
   .description('Open the js1k rules page')
   .action(js1k.launchRules);

cli.command('submit')
   .description('Open the js1k submission page')
   .action(js1k.launchSubmit);

// If no subcommand is entered, output the help:
if (process.argv.length < 3) {
   cli.help();
} else {
   cli.parse(process.argv);
}
