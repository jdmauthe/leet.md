/**
 * Handler for different hostnames of urls
 */
class HostnameService {
  /**
   * @param {Object} hostnames
   */
  constructor(hostnames) {
    this.registry = {};
    for (const hostname of hostnames) {
      try {
        this.add(require(`../hostnames/${hostname.name}/${hostname.name}`));
      } catch (err) {
        console.error(`Failed to load handler for ${hostname.name}`);
      }
    }
  }

  /**
   * Adds hostname handler to registry
   * @param {Object} handler
   */
  add(handler) {
    this.registry[handler.hostname] = handler.handle;
  }

  /**
   * Takes url and calls appropiate function to handle hostname
   * @param {Object} info
   */
  async route(info) {
    const hostname = new URL(info.url).hostname;
    if (this.registry[hostname]) {
      return await this.registry[hostname](info);
    }
  }
}

module.exports = HostnameService;
