const puppeteer = require('puppeteer')
const path = require('path')
const hostname = 'leetcode.com'
const titleSelector = 'div[data-cy=question-title]'
const descriptionSelector = 'div.content__u3I1.question-content__JfgR'
const executablePath = (process.__nexe ? path.join(__dirname, '../puppeteer/linux-856583/chrome-linux/chrome') : puppeteer.executablePath())
// const executablePath =
//   process.env.PUPPETEER_EXECUTABLE_PATH ||
//   (process.pkg
//     ? path.join(
//         path.dirname(process.execPath),
//         'puppeteer',
//         ...puppeteer
//           .executablePath()
//           .split(path.sep)
//           .slice(6), // /snapshot/project/node_modules/puppeteer/.local-chromium
//       )
//     : puppeteer.executablePath());
// const languageSelector = {
//   js: 'lang-select-JavaScript',
//   'c++': 'lang-select-C\+\+',
//   java: 'lang-select-Java',
//   python: 'lang-select-Python',
//   python3: 'lang-select-Python3',
//   c: 'lang-select-C',
//   'c#': 'lang-select-C\#',
//   ruby: 'lang-select-Ruby'
// }

async function handle (url, info) {
  // const language = info.options.language
  // const browser = await puppeteer.launch({ headless: false })
  const browser = await puppeteer.launch({ executablePath })
  const page = await browser.newPage()
  await page.goto(url)
  // await page.click('div.ant-select-selection')
  // await page.click('li[data-cy=' + languageSelector[language] + ']')
  const titleEle = await page.$(titleSelector)
  const titleHtml = '<h1>' + await page.evaluate(ele => ele.innerHTML, titleEle) + '</h1>'
  const descriptionEle = await page.$(descriptionSelector)
  const descriptionHtml = await page.evaluate(ele => ele.innerHTML, descriptionEle)
  await browser.close()
  const html = titleHtml + '\n' + descriptionHtml
  return html
}

module.exports = { hostname, handle }
