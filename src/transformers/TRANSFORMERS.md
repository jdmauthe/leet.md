# Transformers
## About
Transformers allow to perform modifications to the markdown before it is written.
Multiple transformers can be used on the markdown. This can be helpful to tailor the markdown to better fit your needs.

### Available Transformers
| Name | Description |
|------|-------------|
|[Source](source/SOURCE.md)| Add a link to the coding problem to the bottom of the markdown |
|[Cloudinary](cloudinary/CLOUDINARY.md)| Upload all images in the markdown to Cloudinary, and update the image URLs |

## Configuration
Transformers can be enabled by adding them to the `transformers` object in `config.json`.
The following `config.json` would enable the [source](source/SOURCE.md) and [Cloudinary](cloudinary/CLOUDINARY.md) transformers:

```json
{
  "transformers": {
    "source": {},
    "cloudinary": {
      "folder": "Coding Problems",
      "cloud_name": "mycloud",
      "api_key": "0110100001101001",
      "api_secret": "keepmeasecret101"
    }
  }
}
```

Each key inside the `transformers` object represent a transformer and it's config.
If a transformer does not require a config, then the value of the key will be `{}`.

## Creating Transformers

All files relating to your transformer should be kept in a folder located in the transformers folder: `src/transformers`.
The transformer should meet the following requirements:
- [ ] The transformer exports a [function](#transform-function) to transform the markdown
- [ ] The folder contains a [README](#foldernamemd)
- [ ] The `module.exports` is in the [correct format](#export)

### `transform` function
A transformer is a module that exports the following function:

```js
async function transform(markdown, info) {

}
```

#### Parameters
##### `markdown`
`markdown` is a `string` of the markdown of the coding problem description.

##### `info`

`info` is an `object` that has the following fields:

| field | description | type |
|-------|-------------|------|
| `url` | URL of the coding problem | `string` |
| `config` | the configuration of Leet.md | `object` |

You can get your transformer config through `info.config.transformers['FOLDERNAME']`, replacing
`FOLDERNAME` with the name of the folder that your transformer resides in.

#### Returns
The function should return the modified markdown as a `string`. This markdown will be passed down to other transformers
to further modify the markdown.

### `FOLDERNAME.md`
Your folder should include a README file named `FOLDERNAME.md`,
where `FOLDERNAME` is replaced with the name of your folder

The README should include the following information if applicable:
- [ ] What does the transformer do
- [ ] How to setup the transformer
- [ ] The functionality of individual settings in the transformer config

### Export
The export of the module should match the following:

```javascript
module.exports = {transform};
```
