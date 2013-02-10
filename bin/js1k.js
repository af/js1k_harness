#!/usr/bin/env node

var cli = require('commander');
var js1k = require('../lib');


cli.version(require('../package').version);

cli.command('init')
   .description('Begin a new js1k entry')
   .usage('<filename>')
   .action(function(fileName) {
       if (typeof fileName !== 'string') fileName = 'js1k_entry.js';
       js1k.initProject(fileName);
   });

cli.command('serve')
   .usage('<filename>')
   .description('Start a web server for the shim html and minified js')
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

cli.parse(process.argv);
