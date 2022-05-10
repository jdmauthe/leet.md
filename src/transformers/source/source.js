const transform = (markdown, {url}) => {
  return markdown + `\n\n[Source](${url})\n`;
};

module.exports = {transform};
