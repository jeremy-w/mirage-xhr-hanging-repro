import Ember from 'ember';

export default Ember.Controller.extend({
  intl: Ember.inject.service(),
  session: Ember.inject.service(),
  layout: Ember.inject.service('device/layout'),
});
