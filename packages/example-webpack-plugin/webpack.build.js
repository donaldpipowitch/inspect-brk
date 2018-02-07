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
