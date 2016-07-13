var EmberApp = require('ember-cli/lib/broccoli/ember-app');

// Disabling appears to prevent export of the `pretender` module, so tests just don't run.
const PRETENDER_ENABLED = true;

/* global require, module */
module.exports = function(defaults) {
    var app = new EmberApp(defaults, {
        emberCLIDeploy: {
          shouldActivate: false
        },
        pretender: {
          enabled: PRETENDER_ENABLED,
        },
    });

    return app.toTree();
};
