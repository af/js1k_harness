#!/usr/bin/env node

var cli = require('commander');
var js1k = require('../lib');

cli.version(require('../package').version);

cli.command('rules')
   .description('Open the js1k rules page')
   .action(js1k.launchRules);

cli.command('submit')
   .description('Open the js1k submission page')
   .action(js1k.launchSubmit);

cli.parse(process.argv);
