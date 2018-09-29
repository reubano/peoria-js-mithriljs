exports.config =
  # See http://brunch.io/docs/config for docs.
  plugins:
    eslint:
      pattern: /^app\/.*\.js$/

    babel:
      presets: ['latest', 'react']

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^(?!app)/
