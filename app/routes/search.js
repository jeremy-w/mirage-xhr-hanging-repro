import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  needs: ['application'],
  model() {
    var counter = 0;
    function wait() {
      return new Ember.RSVP.Promise(function(resolve /*, reject*/) {
        var i = counter++;
        console.log(i, 'model: will fetch "/" via XHR');
        Ember.$.ajax('/').done(() => {
          console.log(i, '"/" XHR done() invoked; will resolve promise');
          resolve([]);
        });
      });
    }

    console.log('### route:search: starting model fetch');
    const result =
        wait(0.5)
        .then((fetch) => {
          console.log('### route:search: fetch 1 promise resolved:', fetch);
          return wait(1).then(fetch2 => {
            console.log('### route:search: fetch2 promise resolved:', fetch2); return fetch2;
          }).then(fetch2 => {
            const model = {
              fetch,
              fetch2,
            };
            console.log('### route:search: loading complete: resolved model:', model);
            return model;
          });
        });
    return result;
  },
});
