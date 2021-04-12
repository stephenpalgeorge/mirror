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
        // for each style in the `computed styles`, we get the property value
        // and create an entry by that same name in th elementStyles object:
        [...styles].forEach(item => {
          elementStyles[item] = styles.getPropertyValue(item);
        });
        return elementStyles;
      }, selector);

      // display the style object in the console if "print === true":
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
      // get the styles object for the given selector:
      const elementStyles = await this.getStyle(selector);
      // if an array has been passed in the `prop` param, iterate on it
      // and keep the values of every item in `prop` in a `filteredStyles` object:
      if (Array.isArray(prop)) {
        const filteredStyles = {};
        prop.forEach(p => {
          if (!Object.prototype.hasOwnProperty.call(elementStyles, p)) throw new Error(`property ${p} does not exist on element: ${selector}`);
          filteredStyles[p] = elementStyles[p];
        });
        // display the filteredStyles object in the console if print === true:
        if (print) console.log(filteredStyles);
        return filteredStyles;
      } else {
        if (print) console.log(elementStyles[prop]);
        // otherwise (i.e. `prop` param is a string representing a single css property) we
        // just access that individual key from the element styles.
        return elementStyles[prop];
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  /**
   * TEST
   * ----------
   * @param {string} name An identifier for the test, this is used in the console output to improve DX.
   * @param {string} selector Any valid CSS selector.
   * @param {object} values The expected styles that we are checking for. The object should be of entries: [css-property]: expected-value.
   * @param {object} options A configuration object. Available properties are "verbose: boolean".
   * 
   * Test function checks the styles of the selected element and compares them to the styles passed in the `values` param.
   * If there are any descrepancies, an error is thrown.
   * If the `verbose` option is passed as `true`, each individual css-property that is being checked will be printed to the console as it passes.
   * 
   */
  async test(name, selector, values, options = {}) {
    try {
      const styles = await this.getStyleProp(selector, Object.keys(values));
      // for every property that has been included in the `values` object, compare it 
      // to the same property in the element's styles object.
      Object.keys(values).forEach(key => {
        // if there's a mismatch, throw an error with some useful output.
        if (styles[key] !== values[key]) throw new Error(`Styles don't match. Expected '${key}: ${values[key]}' but got '${key}: ${styles[key]}'`);
        // if verbose === true, print each css prop as it passes.
        if (options.verbose) console.log(`"${name}": ${key}: ${values[key]} passed`);
      });
      console.log(`success "${name}": all tests passed`);
    }
    catch (err) {
      console.error(err);
    }
  }
}

module.exports = Page;
