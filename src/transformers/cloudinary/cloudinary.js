const cloudinary = require('cloudinary').v2;

/**
 * Takes markdown and uploads images to
 * cloudinary and updates the image urls
 * @param {String} markdown
 * @param {Object} info
 * @return {String} transformed markdown
 */
async function transform(markdown, info) {
  const config = info.config.transformers.cloudinary;
  if (!setupCloudinary(config)) {
    return;
  }

  const urls = [];
  const imageRe = /!\[.*?\]\((.*?)\)|<img .*?src=['"](.*?)['"].*?>/g;
  try {
    const uploads = [];
    for (const match of markdown.matchAll(imageRe)) {
      const imageUrl = match[1] || match[2];
      uploads.push(
          cloudinary.uploader.upload(imageUrl, {
            folder: config.folder,
          }),
      );
    }

    for (const response of await Promise.all(uploads)) {
      urls.push(response.secure_url);
    }
  } catch {
    console.error('error: failed to run cloudinary transformer');
  }

  const getNextUrl = (function* () {
    yield* urls;
  })();

  return markdown.replace(imageRe, (match, markImg, htmlImg) => {
    const oldUrl = markImg || htmlImg;
    return match.replace(oldUrl, getNextUrl.next().value);
  });
}

/**
 * @param {Object} config
 * @return {Boolean} if the config is valid
 */
function setupCloudinary(config) {
  const missing = [];
  if (config.cloud_name === undefined) {
    missing.push('cloud_name');
  }
  if (config.api_key === undefined) {
    missing.push('api_key');
  }
  if (config.api_secret === undefined) {
    missing.push('api_secret');
  }
  if (missing.length > 0) {
    console.error(
        `error: cloudinary transformer config is missing: ${missing.join(' ')}`,
    );
    return false;
  }

  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
  });

  return true;
}

module.exports = {transform};
