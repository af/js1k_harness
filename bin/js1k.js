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
   .description('Build and compress the current entry js file')
   .action(js1k.build);

cli.command('size')
   .description('Output this size of the current entry js (in bytes)')
   .action(js1k.size);

cli.command('rules')
   .description('Open the js1k rules page')
   .action(js1k.launchRules);

cli.command('submit')
   .description('Open the js1k submission page')
   .action(js1k.launchSubmit);

cli.parse(process.argv);
