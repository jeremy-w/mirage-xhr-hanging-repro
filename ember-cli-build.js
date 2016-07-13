var EmberApp = require('ember-cli/lib/broccoli/ember-app');

/* global require, module */
module.exports = function(defaults) {
    var app = new EmberApp(defaults, {
        emberCLIDeploy: {
          shouldActivate: false
        },
    });

    return app.toTree();
};
