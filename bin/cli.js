#! /usr/bin/env node

const {Command} = require('commander');
const {version, description} = require('../package.json');
const config = require('../src/utils/config');
const leetmd = require('../src/leetmd');

const program = new Command();

program
    .description(description)
    .version(version)
    .arguments('<url>')
    .option('-f, --file <name>', 'Name for the file being written')
    .option('--overwrite', 'Allow existing file to be overwritten')
    .option('--no-overwrite', 'Do not allow existing file to be overwritten')
    .action((url) => {
      Object.assign(config, program.opts());
      leetmd(url, config);
    });

program.parse();
