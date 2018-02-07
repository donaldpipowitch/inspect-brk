# `inspect-brk` 🔎

> A small helper to make debugging Node more convenient.

As you may know [Node has great debugging capabilities](https://nodejs.org/en/docs/guides/debugging-getting-started/) if you use it together with a powerful [inspector client](https://nodejs.org/en/docs/inspector/#inspector-tools-clients). You have several options how to do that exactly, but I prefer to just use the `--inspect-brk` flag when I run my script Node. It is passed directly to the Node binary.

Sometimes the call to the Node binary can be a little obfuscated however. This is probably most common if you use some command line tool. Look at this small project:

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

How do you debug your `build` step which uses `webpack`? The webpack docs [recommend to use `--inspect-brk`](https://webpack.js.org/contribute/debugging/) which is what I'd recommend as well. But how do you inster `--inspect-brk` here? You basically need write down the path to the `webpack` binary like this:

```json
{
  "name": "cool-example",
  "version": "0.1.0",
  "scripts": {
    "build": "webpack --config webpack.build.js",
    "debug:build": "node --inspect-brk node_modules/.bin/webpack --config webpack.build.js"
  },
  "devDependencies": {
    "webpack": "^3.10.0"
  }
}
```

This works, but IMHO this way has two problems:

1. The path can be quite brittle. It slightly depends on your package manager (npm, yarn, pnpm and so on), its specific version and some of its features (e.g. if you use yarn workspaces or not).
2. You maybe need to duplicate all lot of params and options. In this case it is just `--config webpack.build.js`, but it could be a lot more.

Of course you could rewrite the path just when you need it, but this can be cumbersome as well, if you need to do it a lot.

That's why I created `inspect-brk`. It turns your example from above into this:

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

You call `inspect-brk` and pass the name of the script you want to debug (in this case `build`) and than you pass one or more binary names which you want to inspect (in this case just `webpack`).

I 