const puppeteer = require('puppeteer');

class Document {
  constructor() {
    this.content = '';
    this.page = null;
    this.defaultConfig = {
      lang: 'en',
      title: 'Mirror Page',
    };
  }

  /**
   * RENDER
   * ----------
   * @param {object} config 
   * @param {string} html 
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
  async render(config = {}, html) {
    const DOM = html || this.template(config);
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(DOM);
      this.content = await page.content();
      this.page = page;
    }
    catch (err) {
      console.error(err);
    }
  }

  /**
   * TEMPLATE
   * ----------
   * @param {object} config - a set of options that could be applied to the html.
   * 
   * The template function returns a string of HTML that creates a basic document
   * that can then be interacted with. If no config is passed, the defaults defined
   * above will be used.
   * The config and defaultConfig objects are merged, so as many or as few of the
   * defaults can be overidden as required.
   * 
   */
  template(config = this.defaultConfig) {
    config = Object.assign(this.defaultConfig, config);
    return `
      <!doctype html>
      <html lang=${config.lang}>
        <head>
          <title>${config.title}</title>
        </head>

        <body>
          <h1>${config.title}</h1>
        </body>
      </html>
    `;
  }
}

module.exports = Document;