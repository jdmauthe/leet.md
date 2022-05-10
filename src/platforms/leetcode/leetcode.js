const puppeteer = require('puppeteer');
const domain = 'leetcode.com';
const titleSelector = 'div[data-cy=question-title]';
const descriptionSelector = 'div.content__u3I1.question-content__JfgR';

/**
 * Takes leetcode url and returns the problem description as html
 * @param {String} url
 * @return {String} html of leetcode problem description
 */
async function handle({url}) {
  let browser;
  let html = '';

  try {
    browser = await puppeteer.launch();

    const page = await browser.newPage();
    page.setDefaultTimeout(10000);
    await page.goto(url);
    await page.waitForSelector(titleSelector, {
      visible: true,
    });

    const titleEle = await page.$(titleSelector);
    const titleHtml =
      '<h1>' +
      (await page.evaluate((ele) => ele.innerHTML, titleEle)) +
      '</h1>';

    await page.waitForSelector(descriptionSelector, {
      visible: true,
    });
    const descriptionEle = await page.$(descriptionSelector);
    const descriptionHtml = await page.evaluate(
        (ele) => ele.innerHTML,
        descriptionEle,
    );

    await browser.close();
    html = titleHtml + '\n' + descriptionHtml;
  } catch (err) {
    if (browser !== undefined) {
      await browser.close();
    }
    console.error(`error: ${domain} handler failed to get html of ${url}`);
  }

  return html;
}

module.exports = {domain, handle};
