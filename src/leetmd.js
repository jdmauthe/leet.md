const TurndownService = require('turndown');
const fs = require('fs').promises;
const constants = require('fs').constants;
const PlatformService = require('./services/platforms');
const TransformService = require('./services/transformers');

const turndownService = new TurndownService();
turndownService.keep(['pre']);

/**
 * Create markdown file containing the description of coding
 * challenge of the given url.
 * @param {String} url
 * @param {Object} config
 */
async function leetmd(url, config) {
  const isFileExist = await fileExist(config.file);
  if (!config.overwrite && isFileExist) {
    console.error(
        `${config.file} already exists` +
        ', use --allow-overwrite to overwrite the file',
    );
    return;
  }

  const info = {url, config};
  const platformService = new PlatformService(config.platforms);
  const html = await platformService.route(info);
  if (html === undefined) {
    console.error('Unable to find handler for URL');
    return;
  }

  let markdown = turndownService.turndown(html);

  const transformService = new TransformService(config.transformers);
  markdown = await transformService.transform(markdown, info);

  try {
    await writeMarkdown(config.file, markdown, config.overwrite);
  } catch (err) {
    console.error(`Failed to write ${config.file}`);
  }
}

/**
 * Checks if the file exists
 * @param {String} file
 */
async function fileExist(file) {
  try {
    await fs.access(file, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Write given markdown to file
 * @param {String} file
 * @param {String} markdown
 * @param {String} overwrite
 */
async function writeMarkdown(file, markdown, overwrite = false) {
  const flag = overwrite ? 'w' : 'wx';
  return fs.writeFile(file, markdown, {flag});
}

module.exports = leetmd;
