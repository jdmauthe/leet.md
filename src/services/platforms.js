/**
 * Handler for different platforms
 */
class PlatformService {
  /**
   * @param {Object} platforms
   */
  constructor(platforms) {
    this.registry = {};
    for (const platform of Object.keys(platforms)) {
      try {
        this.add(require(`../platforms/${platform}/${platform}`));
      } catch (err) {
        console.error(`error: failed to load handler for ${platform}`);
      }
    }
  }

  /**
   * Adds platform handler to registry
   * @param {Object} handler
   */
  add(handler) {
    this.registry[handler.domain] = handler.handle;
  }

  /**
   * Takes url and calls appropriate function to handle platform
   * @param {Object} info
   */
  async route(info) {
    const domain = new URL(info.url).hostname;
    if (this.registry[domain]) {
      return await this.registry[domain](info);
    }
  }
}

module.exports = PlatformService;
