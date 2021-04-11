const TurndownService = require('turndown')
const fs = require('fs').promises

const turndownService = new TurndownService()
turndownService.keep(['pre'])

const hostnameRegistry = {}
const transformersRegistry = []

async function handleUrl (urlString, info) {
  const hostname = new URL(urlString).hostname
  if (hostnameRegistry[hostname]) {
    const html = await hostnameRegistry[hostname](urlString, info)
    const markdown = turndownService.turndown(html)
    const transformedMarkdown = await transformersRegistry.reduce((markdown, transformer) => transformer(markdown, info), markdown, info)
    await fs.writeFile(info.options.file, transformedMarkdown)
  } else {
    console.log('No handler')
  }
}

const registerHostname = ({ hostname, handle }) => {
  hostnameRegistry[hostname] = handle
}

const registerTransformer = ({ transform }) => {
  transformersRegistry.push(transform)
}

registerHostname(require('./hostnames/leetcode'))
registerTransformer(require('./transformers/source'))
registerTransformer(require('./transformers/cloudinary'))

module.exports = handleUrl
