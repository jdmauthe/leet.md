/**
 * Gets the config of Leet.md
 * @return {Object} config
 */
function getConfig() {
  const config = getConfigJSON();

  /* Convert list of hostnames into object for easier access */
  config.hostnames = config.hostnames.reduce((obj, hostname) => {
    obj[hostname.name] = hostname.config || {};
    return obj;
  }, {});

  /* Convert list of transformers into object for easier access */
  config.transformers = config.transformers.reduce((obj, transformer) => {
    obj[transformer.name] = transformer.config || {};
    return obj;
  }, {});

  return config;
}

/**
 * Reads config.json if it exists and creates a config
 * @return {object} Config created from defaults and config.json
 */
function getConfigJSON() {
  const configJSON = getDefaults();
  try {
    Object.assign(configJSON, require('../../config.json'));
  } catch {}
  return configJSON;
}

/**
 * Gets the default config
 * @return {Object} default config
 */
function getDefaults() {
  return {
    overwrite: false,
    file: 'README.md',
    hostnames: [
      {
        name: 'leetcode',
      },
    ],
    transformers: [],
  };
}

module.exports = {
  config: getConfig(),
  hostnameOrder: getConfigJSON().hostnames,
  transformerOrder: getConfigJSON().transformers,
};
