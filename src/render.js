const puppeteer = require('puppeteer');
const template = require('./template');

/**
 * RENDER
 * ----------
 * @param {*} config 
 * @param {*} html 
 * 
 * The render function creates a page with some HTML contents.
 * If the `html` param has a value, it is preferred to the default
 * contents created by the `template` function.
 * If no `html` is passed, the template functions creates default page
 * contents using the config that has been passed in, which falls-back
 * to an empty object, meaning the default config (defined in `./render.js`)
 * will be used.
 * For the majority of use cases, the defaults are sufficient. You can
 * simply call `render()` and carry on.
 * 
 */
export default async function render(config = {}, html = null) {
  const DOM = html || template(config);
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await page.setContent(DOM);
    return content;
  }
  catch (err) {
    console.error(err);
  }
};
