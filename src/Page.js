const Document = require('./Document');

class Page extends Document {
  constructor() {
    super();
  }

  /**
   * ADD STYLESHEET
   * ----------
   * @param {String} path - any url to a valid css document, could be a local
   * document (e.g. './dist/css/index.css'), or a remote resource (e.g. 'example.com/styles.css').
   * 
   * The Add Stylesheet function attaches a stylesheet to a given page.
   */
  async addStylesheet(path) {

  }
}

module.exports = Page;
