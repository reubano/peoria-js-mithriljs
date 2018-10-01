exports.config =
  # See http://brunch.io/docs/config for docs.
  plugins:
    eslint:
      pattern: /^app\/.*\.js$/

    babel:
      presets: ['latest']

  npm:
    styles:
      'todomvc-app-css': ['index.css']

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^(?!app)/

    stylesheets:
      joinTo:
        'stylesheets/vendor.css': /^(?!app)/
