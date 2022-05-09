# Cloudinary
## About
Cloudinary is a cloud-based service that provides images and video management.
This transformer searches the markdown for all image URLs and uploads the images to your Cloudinary account.
After uploading, the transformer will update the image URLs to the images on Cloudinary.

**There is a limit on how much you can upload depending on your account plan.**
For more information, read about the different [cloudinary plans](https://cloudinary.com/pricing).

## Setup
To enable the Cloudinary transformer, add the following to the `transformers` object in `config.json`:

```json
"cloudinary": {
  "cloud_name": "",
  "api_key": "",
  "api_secret": ""
}
```

You will need to replace the empty strings with the appropriate information from cloudinary.
**The transformer will not work without completing these settings.**

Your `cloud name`, `API key`, and `API secret` can be found on the [dashboard](https://cloudinary.com/console/).
For more information on setting up an account and finding the necessary information, read the [official documentation](https://cloudinary.com/documentation/how_to_integrate_cloudinary#1_create_and_set_up_your_account).

### Settings

| Setting | Description | Type | Default | Required |
|---------|-------------|------|---------|----------|
| `folder` | folder to upload in cloudinary | `string` | `""` | NO |
| `cloud_name` | name of your cloudinary cloud  | `string` | `""` | YES |
| `api_key` | api key for cloudinary account | `string` | `""` | YES |
| `api_secret` | api secret for cloudinary account | `string` | `""` | YES |

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
