
const transform = (markdown, { url }) => {
  return markdown + '\n\n [Source](' + url + ')'
}

module.exports = { transform }
