/**
 * Handler for different hostnames of urls
 */
class HostnameService {
  /**
   * @param {Object} hostnames
   */
  constructor(hostnames) {
    this.registry = {};
    for (const hostname of Object.keys(hostnames)) {
      try {
        const handler = require(`../hostnames/${hostname}/${hostname}`);
        this.registry[handler.hostname] = handler.handle;
      } catch (err) {
        console.error(`Failed to load handler for ${hostname}`);
      }
    }
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
