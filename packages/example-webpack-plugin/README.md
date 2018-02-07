This example shows you how you can use `inspect-brk` e.g. for debugging a custom webpack plugin.

In this case I have written a plugin like this:

```js
class HelloWorldPlugin {
  apply(compiler) {
    compiler.plugin('emit', (compilation, done) => {
      console.log('Hello world!');
      debugger;
      done();
    });
  }
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/index.js'
  },
  plugins: [new HelloWorldPlugin()]
};
```

You can build this project with `$ yarn build`. To debug it you just call `$ yarn debug:build`.

Now you should see something like this in your terminal:

```bash
$ yarn debug:build
yarn run v1.3.w
$ inspect-brk build webpack
Debugger listening on ws://127.0.0.1:9229/2463a11b-3f9e-4e1f-ba1b-1073a59744e6
For help see https://nodejs.org/en/docs/inspector
```

You could now visit [`chrome://inspect/#devices`](chrome://inspect/#devices) in your Chrome for example and inspect this debugging target. You would press the _"Play"_ button (because the script is initially paused by using the `--inspect-brk` flag) and after that you'd hit the `debugger;` statement I placed inside the `"emit"` handler. Now you can do whatever you want at this breakpoint (e.g. having a look into the concrete values of the `compilation` object).
