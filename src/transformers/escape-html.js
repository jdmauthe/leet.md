const { escape, unescape } = require('html-escaper')

const transform = (markdown) => {
  markdown = escape(markdown)
  const codeRe = /`(.*?)`/g
  const transformed = markdown.replace(codeRe, (match) => unescape(match))
  return transformed
}

module.exports = { transform }
