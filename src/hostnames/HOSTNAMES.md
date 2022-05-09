# Hostname
## About
To create a markdown of the coding problem description from a URL,
a hostname handler needs to be created for the online platform. The handler
is responsible for getting the correct information using the URL and turning
it into a markdown format. Leet.md will call the correct handler based on
the hostname of the URL.

### Available Hostnames
| Name | Description |
|------|-------------|
|[Leetcode](leetcode/LEETCODE.md)| A platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.

## Configuration
Hostnames can be enabled by adding them to the `hostnames` object in `config.json`.
The following `config.json` would enable the [Leetcode](leetcode/LEETCODE.md) hostname:

```json
{
  "hostnames": {
    "leetcode": {}
  }
}
```

Each key inside the `hostname` object represent a hostname and it's config.
If a hostname does not require a config, then the value of the key will be `{}`.

## Creating Transformers

All files relating to your hostname handler should be kept in a folder located in the hostnames folder: `src/hostnames`.
The hostname handler should meet the following requirements:
- [ ] The hostname handler exports the hostname as a `string` [variable](#hostname-variable)
- [ ] The hostname handler exports a [function](#handle-function) to get the coding problem description and return it in markdown format
- [ ] The folder contains a [README](#foldernamemd)
- [ ] The `module.exports` is in the [correct format](#export)

### `hostname` variable

The hostname should be exported as a `string`:

```javascript
const hostname = 'hostname.com';
```

### `handle` function
A hostname handler is a module that exports the following function:

```js
async function handle(info) {

}
```

#### Parameters

##### `info`

`info` is an `object` that has the following fields:

| field | description | type |
|-------|-------------|------|
| `url` | URL of the coding problem | `string` |
| `config` | the configuration of Leet.md | `object` |

You can get your hostname config through `info.config.hostnames['FOLDERNAME']`, replacing
`FOLDERNAME` with the name of the folder that your hostname resides in.

#### Returns
The function should return coding problem description in markdown format as a `string`.
### `FOLDERNAME.md`
Your folder should include a README file named `FOLDERNAME.md`,
where `FOLDERNAME` is replaced with the name of your folder

The README should include the following information if applicable:
- [ ] Description of the platform
- [ ] How to setup the hostname handler
- [ ] The functionality of individual settings in the hostname config

### Export
The export of the module should match the following:

```javascript
module.exports = {hostname, handle};
```
