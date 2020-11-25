# @21epub/float-panel

> React Float panel

[![NPM](https://img.shields.io/npm/v/@21epub/float-panel.svg)](https://www.npmjs.com/package/@21epub/float-panel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://img.shields.io/travis/com/21epub/float-panel)](https://travis-ci.com/github/21epub/float-panel) [![Codecov](https://img.shields.io/codecov/c/github/21epub/float-panel)](https://codecov.io/gh/21epub/float-panel)

## Intro

This is a component for react.

## Feature

- [x] Easy-to-use
- [x] Typescript Support

## Install

```bash
npm install --save @21epub/float-panel
```

## Usage

```tsx
import React, { Component } from 'react'

import MyComponent from '@21epub/float-panel'
import '@21epub/float-panel/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

For Details: See Example

## Developing and running on localhost

First install dependencies and then install peerDeps for parcel dev:

```sh
npm install
npm run install-peers
```

To run Example in hot module reloading mode:

```sh
npm start
```

To create a parcel example production build:

```sh
npm run build-prod
```

To create a bundle library module build:

```sh
npm run build
```

## Running

Open the file `dist/index.html` in your browser

## Testing

To run unit tests:

```sh
npm test
```

## License

MIT © [21epub](https://github.com/21epub)
