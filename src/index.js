const { Command } = require('commander')
const { version } = require('../package.json')
const handleUrl = require('./url-handler')

const program = new Command()

program
  .version(version)
  .arguments('<url>')
  .option('-l, --language <language>', 'programming language of challenge', 'js')
  .option('-f, --file <name>', 'Name for the file being written', 'README.md')
  .action((urlString) => {
    const info = {
      url: urlString,
      options: program.opts()
    }
    handleUrl(urlString, info)
  })

program.parse()
