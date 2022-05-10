/**
 * Transforms markdown files using transformers added
 */
class TransformService {
  /**
   * @param {Array} transformers
   */
  constructor(transformers) {
    this.transformers = [];
    for (const transformer of transformers) {
      try {
        this.add(
            require(`../transformers/${transformer.name}/${transformer.name}`),
        );
      } catch (err) {
        console.error(`Failed to load the ${transformer.name} transformer`);
      }
    }
  }

  /**
   * Adds transformer to array
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
    return this.transformers.reduce(
        (markdown, transformer) => transformer(markdown, info),
        markdown,
    );
  }
}

module.exports = TransformService;
