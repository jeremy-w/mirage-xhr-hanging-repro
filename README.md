This is a demo app for the ember-cli-mirage issue
[mirage not working for mocking ember ajax calls](https://github.com/samselikoff/ember-cli-mirage/issues/635).
It has been created by reducing an app exhibiting the problem down to a far smaller example case that still exhibits the problem.

## UPDATE: Issue Resolved
- The issue I was seeing with Mirage in the app this was minimized from was due
  to an older Pretender version still being pulled in by Bower. Running
  `ember g ember-cli-mirage` and then `bower install` and picking the new
  versions for any resolutions fixed the issue.
- The issue I was seeing in my minimization case was due to the return values of
  my factories. In both the Mirage (`master`)and raw PretenderJS branches
  (`drop-mirage-for-pretender`), the return value was tripping an exception,
  which interrupted the XHR state machine. This exception was silently swallowed
  somewhere in the stack (jQuery's stuff?), which made it appear the same as the
  other issue symptomatically. Trapping on `debugger` in the handler, then
  flipping on "stop on exceptions" and "yes really all of them even caught ones"
  allowed to discover the error that should have been shown and adjust the
  responses, at which point the tests passed.

## Expected Behavior
With Mirage disabled (set `MIRAGE_ENABLED_FOR_TESTING` to `false` in config/environment.js), the test console logs look like:

```
lo, a new test begins
start of test: visit /
### route:search: starting model fetch
0 model: will fetch "/" via XHR
0 "/" XHR done() invoked; will resolve promise
### route:search: fetch 1 promise resolved: Array [  ]
1 model: will fetch "/" via XHR
1 "/" XHR done() invoked; will resolve promise
### route:search: fetch2 promise resolved: Array [  ]
### route:search: loading complete: resolved model: Object { fetch: Array[0], fetch2: Array[0] }
visited /
visit /: current route name is: search
end of test: visit /
and so the test finishes
lo, a new test begins
start of test: visit / again
### route:search: starting model fetch
0 model: will fetch "/" via XHR
0 "/" XHR done() invoked; will resolve promise
### route:search: fetch 1 promise resolved: Array [  ]
1 model: will fetch "/" via XHR
1 "/" XHR done() invoked; will resolve promise
### route:search: fetch2 promise resolved: Array [  ]
### route:search: loading complete: resolved model: Object { fetch: Array[0], fetch2: Array[0] }
visited / again
visit / again: current route name is: search
end of test: visit / again
and so the test finishes
```

## Actual Behavior
But with Mirage enabled (the default state of this repo), the test logs look like:

```
lo, a new test beginstests.js:5:7
start of test: visit /tests.js:14:5
### route:search: starting model fetch
0 model: will fetch "/" via XHR
mirage: intercepted XHR GET for "/": returning response forthwith
and so the test finishes
lo, a new test begins
start of test: visit / again
### route:search: starting model fetch
0 model: will fetch "/" via XHR
mirage: intercepted XHR GET for "/": returning response forthwith
and so the test finishes
```

And eventually, the test times out, and the next test begins, but it takes a very long time.

Note how the "XHR done() invoked" logs never happen; this is the key symptom of this breakage.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
*  Change into the new directory
* `npm install`
* `bower install`

## Ember Addons
All the libraries you loaded with `npm install` - [Ember Addons](/Ember_Addons/README.md)


## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Internationalization

We are using the [`ember-intl`](https://github.com/jasonmit/ember-intl) add-on for internationalization support.

Instead of hard-coding text in your component templates, you should put it in the translations file, found at `/translations/en-us.yaml`.
This file is currently organized by template.
Once you have added the translation, you should use the `{{t 'some.i18n.key'}}` helper in your template in place of the static text.

[`See the ember-intl documentation for more details.`](https://github.com/jasonmit/ember-intl)

## JSON API
This application uses the [JSON API](http://jsonapi.org) standard.
