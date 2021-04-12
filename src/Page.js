const Document = require('./Document');

class Page extends Document {
  constructor() {
    super();
    this.stylesheets = [];
  }

  /**
   * ADD STYLESHEET
   * ----------
   * @param {string} path - any url to a valid css document, could be a local
   * document (e.g. './dist/css/index.css'), or a remote resource (e.g. 'example.com/styles.css').
   * 
   * The Add Stylesheet function attaches a stylesheet to a given page.
   */
  async addStylesheet(path) {
    try {
      await this.page.addStyleTag({ path });
      this.stylesheets.push(path);
    }
    catch (err) {
      console.error(err);
    }
  }

  /**
   * GET STYLE
   * ----------
   * @param {string} selector - any valid css selector.
   * @returns the 'style' properties of the selected element.
   */
  async getStyle(selector, print = false) {
    try {
      const style = await this.page.evaluate(selector => {
        const el = document.querySelector(selector);
        const styles = getComputedStyle(el);
        const elementStyles = {};
        [...styles].forEach(item => {
          elementStyles[item] = styles.getPropertyValue(item);
        });
        return elementStyles;
      }, selector);

      if (print) console.log(style);
      return style;
    }
    catch (err) {
      console.error(err);
    }
  }

  /**
   * GET STYLE PROP
   * ----------
   * @param {string} selector - any valid css selector.
   * @param {string|string[]} prop - either a single css property, or an array of css properties
   * @param {boolean} print - determines whether or not the function will log it's return value to the console.
   * 
   * Get the value of certain style properties for the given element.
   * If `prop` is a single string, just that property value will be returned. If `prop` is an array,
   * an object of entries `[prop]: value` will be returned.
   * 
   */
  async getStyleProp(selector, prop, print = false) {
    try {
      const elementStyles = await this.getStyle(selector);
      if (Array.isArray(prop)) {
        const filteredStyles = {};
        prop.forEach(p => {
          if (!Object.prototype.hasOwnProperty.call(elementStyles, p)) throw new Error(`property ${p} does not exist on element: ${selector}`);
          filteredStyles[p] = elementStyles[p];
        });
        if (print) console.log(filteredStyles);
        return filteredStyles;
      } else {
        if (print) console.log(elementStyles[prop]);
        return elementStyles[prop];
      }
    }
    catch (err) {
      console.error(err);
    }
  }
}

module.exports = Page;
