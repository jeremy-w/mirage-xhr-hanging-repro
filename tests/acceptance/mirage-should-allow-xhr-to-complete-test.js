import { test } from 'qunit';
import moduleForAcceptance from 'mirage-freezes/tests/helpers/module-for-acceptance';
import Ember from 'ember';
import Pretender from 'pretender';

moduleForAcceptance('Acceptance | Mirage should allow XHR to complete', {
  beforeEach() {
    this.pretender = new Pretender();
    var counter = 0;
    this.pretender.get('/', function() {
      var value = ++counter;
      console.log('mirage: intercepted XHR GET for "/": returning response forthwith');
      return [200, {'Content-Type': 'text/plain'}, 'Mirage Response #' + value + ' Appears'];
    });
    console.log('lo, a new test begins');
  },

  afterEach() {
    console.log('and so the test finishes');
    this.pretender.shutdown();
  }
});

test('visit /', function(assert) {
  console.log('start of test: visit /');
  visit('/').then(() => console.log('visited /'));
  andThen(() => {
     console.log('visit /: current route name is:', currentRouteName());
    assert.equal(currentRouteName(), 'search', 'should have reached search route and not still be loading');
    console.log('end of test: visit /');
  });
});

 test('visit / again', function(assert) {
   console.log('start of test: visit / again');
   visit('/').then(() => console.log('visited / again'));
   andThen(() => {
     console.log('visit / again: current route name is:', currentRouteName());
     assert.equal(currentRouteName(), 'search', 'should have reached search route and not still be loading');
     console.log('end of test: visit / again');
   });
 });
