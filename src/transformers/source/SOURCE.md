# Source
## About

This transformer adds a link to the coding problem at the bottom of the markdown.
This can be helpful if you want to keep track of the source of the coding problem.

## Setup
To enable the source transformer, add the following to the `transformers` object in `config.json`:

```json
"source": {}
```

### Example config.json

```json
{
  "overwrite": false,
  "transformers": {
    "source": {},
    "cloudinary": {
      "folder": "",
      "cloud_name": "johndoe",
      "api_key": "12341234123",
      "api_secret": "iamasecret123"
    }
  }
}
```
