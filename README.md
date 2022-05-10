<h1 align="center">
  <a href="https://github.com/jdmauthe/leet.md">
    <!-- Please provide path to your logo here -->
    <img src="assets/images/logo.png" alt="Logo" height="200">
  </a>
</h1>

<div align="center">
Leet.md is a <b>CLI</b> made to create markdown files of coding problem descriptions. It was created to make it simple to create <b>offline copies</b> of coding problem
that exist on online platforms.
  <br />
  <br />
  <a href="https://github.com/jdmauthe/leet.md/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
  ·
  <a href="https://github.com/jdmauthe/leet.md/issues/new?assignees=&labels=enhancement&template=02_FEATURE_REQUEST.md&title=feat%3A+">Request a Feature</a>
  .
  <a href="https://github.com/jdmauthe/leet.md/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+">Ask a Question</a>
</div>

<div align="center">
<br />

[![Project license](https://img.shields.io/github/license/jdmauthe/leet.md?style=flat-square)](LICENSE)

[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/jdmauthe/leet.md/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![code with love by jdmauthe](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-jdmauthe-ff1414.svg?style=flat-square)](https://github.com/jdmauthe)

</div>

<details open="open">
<summary>Table of Contents</summary>

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Options](#options)
- [Configuration](#configuration)
  - [Quick Start](#quick-start)
  - [Default Config](#default-config)
  - [Example Config](#example-config)
  - [Settings](#settings)
- [Support](#support)
- [Security](#security)
- [License](#license)

</details>

---

## Features

- Create markdown files of coding problems descriptions
- Support of different online coding problem [platforms](src/hostnames/HOSTNAMES.md):
  - [Leetcode.com](https://leetcode.com/)
- Support of [transformers](src/transformers/TRANSFORMERS.md) to modify the markdown before being written
  - Add source link to bottom of the file
  - Upload images to Cloudinary
- Customization through `config.json`

## Getting Started

### Prerequisites

- Node.js 12.0.0+
- npm

### Installation

Leet.md can be installed globally via npm:

```bash
npm install leet.md -g
```

## Usage

To create markdown files of coding problems, use the `leetmd` command:

```bash
leetmd [URL]
```

### Options

The leetmd command supports the following options:

| Options             | Description                                  |
| ------------------- | -------------------------------------------- |
| -V, --version       | output the version number                    |
| -f, --file \[name\] | name for the file being written              |
| --overwrite         | allow existing file to be overwritten        |
| --no-overwrite      | do not allow existing file to be overwritten |
| -h                  | display the help for command                 |

**These options will override corresponding settings in config.json**

## Configuration

You can configure Leet.md by creating a `config.json` file in the root of the project. You can
customize different [settings](#settings) to tailor to your needs. Any setting omitted from the `config.json` will
fallback to their default values.

### Quick Start

To create a `config.json` file with the default setting, you can copy the `default.json` file.

#### Linux (bash)

```bash
cp default.json config.json
```

#### Windows (cmd)

```cmd
copy default.json config.json
```

### Default Config

The default settings can be found in `default.json`

```json
{
  "overwrite": false,
  "file": "README.md",
  "hostnames": {
    "leetcode": {}
  },
  "transformers": {}
}
```

### Example Config

```json
{
  "overwrite": true,
  "file": "Problem.md",
  "transformers": {
    "source": {}
  }
}
```

### Settings

| Setting                                          | Description                                              | Type      | Default            |
| ------------------------------------------------ | -------------------------------------------------------- | --------- | ------------------ |
| overwrite                                        | overwrite file if it already exists                      | `boolean` | `false`            |
| file                                             | name for the file being written                          | `string`  | `README.md`        |
| [hostnames](src/hostnames/HOSTNAMES.md)          | list of hostnames to enable and their configurations     | `object`  | `{ leetcode: {} }` |
| [transformers](src/transformers/TRANSFORMERS.md) | list of transformers to apply to markdown before writing | `object`  | `{}`               |

## Support

Reach out to the maintainer at one of the following places:

- [GitHub issues](https://github.com/jdmauthe/leet.md/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+)
- Contact options listed on [this GitHub profile](https://github.com/jdmauthe)

## Security

Leet.md follows good practices of security, but 100% security cannot be assured.
Leet.md is provided **"as is"** without any **warranty**. Use at your own risk.

_For more information and to report security issues, please refer to our [security documentation](SECURITY.md)._

## License

This project is licensed under the **MIT license**.

See [LICENSE](LICENSE) for more information.
