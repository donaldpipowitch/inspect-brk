# `inspect-brk` 🔎

> A small helper to make debugging Node more convenient.

## Install

```bash
$ yarn add -D inspect-brk
```

or

```bash
$ npm install --save-dev inspect-brk
```

## Usage

Say you have a project like this one and you want to debug `$ yarn build`:

```json
{
  "name": "cool-example",
  "version": "0.1.0",
  "scripts": {
    "build": "webpack --config webpack.build.js"
  },
  "devDependencies": {
    "webpack": "^3.10.0"
  }
}
```

You would just write this and run `$ yarn debug:build`:

```json
{
  "name": "cool-example",
  "version": "0.1.0",
  "scripts": {
    "build": "webpack --config webpack.build.js",
    "debug:build": "inspect-brk build webpack"
  },
  "devDependencies": {
    "inspect-brk": "^0.1.0",
    "webpack": "^3.10.0"
  }
}
```

This basically turns `"webpack --config webpack.build.js"` into `"node --inspect-brk path/to/node_modules/.bin/webpack --config webpack.build.js"`. You don't need to worry about the concrete path and the params you use. 💕

You can also have a look into this [example](https://github.com/donaldpipowitch/inspect-brk/tree/master/packages/example-webpack-plugin).