/**
 * Gets the config
 * @return {Object} config
 */
function getConfig() {
  const config = getDefaults();
  try {
    Object.assign(config, require('../../config.json'));
  } catch (err) {}

  return config;
}

/**
 * Gets the default config
 * @return {Object} default config
 */
function getDefaults() {
  return {
    overwrite: false,
    file: 'README.md',
    platforms: {
      leetcode: {},
    },
    transformers: {},
  };
}

module.exports = getConfig();
