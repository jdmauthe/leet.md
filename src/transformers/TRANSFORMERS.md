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
Transformers can be enabled by adding them to the `transformers` array in `config.json`.
The following `config.json` would enable the [source](source/SOURCE.md) and [Cloudinary](cloudinary/CLOUDINARY.md) transformers:

```json
{
  "transformers": [
    {
      "name": "source"
    },
    {
      "name": "cloudinary",
      "config": {
        "folder": "Coding Problems",
        "cloud_name": "mycloud",
        "api_key": "0110100001101001",
        "api_secret": "keepmeasecret101"
      }
    }
  ]
}
```

Each object inside the `transformers` array represent a transformer. The transformer object
can have the following properties:

| Property | Description | Type |
|----------|-------------|------|
| `name` | The unique name of the transformer | `string`
| `config` | The config for the transformer | `object`

A transformer object **requires** the `name` property, as it is used to enable the
correct transformer. If a transformer does not require a config, the `config` property
can be omitted.

The order of transformations applied to the markdown will be the
**same order** as they are within the `transformers` array.

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

`info` is an `object` that has the following properties:

| Property | Description | Type |
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
