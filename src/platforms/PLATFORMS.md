# Platforms

## About

To create a markdown of the coding problem description from a URL,
a platform handler needs to be created for the online platform. The handler
is responsible for getting the correct information using the URL and turning
it into a markdown format. Leet.md will call the correct handler based on
the domain of the URL.

### Available Platforms

| Name                             | Description                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [Leetcode](leetcode/LEETCODE.md) | A platform to help you enhance your skills, expand your knowledge and prepare for technical interviews. |

## Configuration

Platforms can be enabled by adding them to the `platforms` object in `config.json`.
The following `config.json` would enable the [Leetcode](leetcode/LEETCODE.md) platform:

```json
{
  "platforms": {
    "leetcode": {}
  }
}
```

Each key inside the `platform` object represent a platform and it's config.
If a platform does not require a config, then the value of the key will be `{}`.

## Creating Platform Handlers

All files relating to your platform handler should be kept in a folder located in the platforms folder: `src/platforms`.
The platform handler should meet the following requirements:

- [ ] The platform handler exports the domain of the platform as a `string` [variable](#domain-variable)
- [ ] The platform handler exports a [function](#handle-function) to get the coding problem description and return it in markdown format
- [ ] The folder contains a [README](#foldernamemd)
- [ ] The `module.exports` is in the [correct format](#export)

### `domain` variable

The domain of the platform should be exported as a `string`:

```javascript
const domain = "platform.com";
```

### `handle` function

A platform handler is a module that exports the following function:

```js
async function handle(info) {}
```

#### Parameters

##### `info`

`info` is an `object` that has the following properties:

| Property | Description                  | Type     |
| -------- | ---------------------------- | -------- |
| `url`    | URL of the coding problem    | `string` |
| `config` | the configuration of Leet.md | `object` |

You can get your platform config through `info.config.platforms['FOLDERNAME']`, replacing
`FOLDERNAME` with the name of the folder that your platform resides in.

#### Returns

The function should return coding problem description in markdown format as a `string`.

### `FOLDERNAME.md`

Your folder should include a README file named `FOLDERNAME.md`,
where `FOLDERNAME` is replaced with the name of your folder

The README should include the following information if applicable:

- [ ] Description of the platform
- [ ] How to setup the platform handler
- [ ] The functionality of individual settings in the platform config

### Export

The export of the module should match the following:

```javascript
module.exports = { domain, handle };
```
