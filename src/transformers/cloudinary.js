const download = require('download')
const fs = require('fs').promises

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret: ''
})

async function transform (markdown) {
  const imageRe = /!\[.*?\]\((.*?)\)|<img .*?src=['"](.*?)['"].*?>/g
  const urls = []
  const tempDir = '.tmp'
  await fs.mkdir(tempDir)
  for (const match of markdown.matchAll(imageRe)) {
    const imageUrl = match[1] || match[2]
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
    const tempFile = tempDir + '/' + fileName
    await fs.writeFile(tempFile, await download(imageUrl))
    const result = await cloudinary.uploader.upload(tempFile)
    await fs.rm(tempFile)
    urls.push(result.secure_url)
  }
  await fs.rmdir(tempDir)

  const getNextUrl = (function * () {
    yield * urls
  })()

  return markdown.replace(imageRe, (match, markImg, htmlImg) => {
    const oldUrl = markImg || htmlImg
    return match.replace(oldUrl, getNextUrl.next().value)
  })
}

module.exports = { transform }
