export default function() {
}

/*
You can optionally export a config that is only loaded during tests
*/
export function testConfig() {
  var counter = 0;
  this.get('/', function() {
    var value = ++counter;
    console.log('mirage: intercepted XHR GET for "/": returning response forthwith');
    return {'resp': 'Mirage Response #' + value + ' Appears'};
  });
  this.urlPrefix = 'http://localhost:3000';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  this.passthrough();
}
