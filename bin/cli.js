#! /usr/bin/env node

const {Command} = require('commander');
const {version, description} = require('../package.json');
const config = require('../src/utils/config');
const leetmd = require('../src/leetmd');

const program = new Command();

program
    .name('leetmd')
    .description(description)
    .version(version)
    .arguments('<url>')
    .option('-f, --file <name>', 'name for the file being written')
    .option('--overwrite', 'allow existing file to be overwritten')
    .option('--no-overwrite', 'do not allow existing file to be overwritten')
    .action((url) => {
      Object.assign(config, program.opts());
      leetmd(url, config);
    });

program.parse();
