/**
 * Handler for different hostnames of urls
 */
class TransformService {
  /**
   * @param {Object} transformers
   */
  constructor(transformers) {
    this.transformers = [];
    for (const transformer of Object.keys(transformers)) {
      try {
        this.add(require(`../transformers/${transformer}/${transformer}`));
      } catch (err) {
        console.error(`Failed to load the ${transformer} transformer`);
      }
    }
  }

  /**
   * adds transformer to list
   * @param {Object} transformer
   */
  add(transformer) {
    this.transformers.push(transformer.transform);
  }

  /**
   * Applies all transformers to markdown and returns transformed markdown
   * @param {String} markdown
   * @param {Object} info
   */
  async transform(markdown, info) {
    return this.transformers.reduce((markdown, transformer) =>
      transformer(markdown, info), markdown);
  }
}

module.exports = TransformService;
