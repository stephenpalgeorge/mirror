const defaultConfig = {
  lang: 'en',
  title: 'Mirror Page',
};

/**
 * TEMPLATE
 * ----------
 * @param {Object} config - a set of options that could be applied to the html.
 * 
 * The template function returns a string of HTML that creates a basic document
 * that can then be interacted with. If no config is passed, the defaults defined
 * above will be used.
 * The config and defaultConfig objects are merged, so as many or as few of the
 * defaults can be overidden as required.
 * 
 */
export default function template(config = defaultConfig) {
  config = Object.assign(defaultConfig, config);

  return `
    <!doctype html>
    <html lang=${config.lang}>
      <head>
        <title>${config.title}</title>
      </head>

      <body></body>
    </html>
  `;
}