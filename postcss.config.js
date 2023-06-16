module.exports = {
  plugins: [
    require('postcss-preset-env')({
      browsers: '> 1%, not dead',
    }),
    require('cssnano')({preset: 'default'})
  ],
};
