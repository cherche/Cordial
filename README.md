# Cordial
The project that powers Fuchsia.

## Installation
Download the `cordial.js` file and drop it in wherever you wish.

Now, import it.

```javascript
import Cordial from '/path/to/cordial.js'
// OR
import Cordial from '/path/to/cordial'
```

Make sure in your HTML, your script tag has a `type` of `"module"`.

```html
<script type="module" src="/path/to/main.js"></script>
```

## Documentation
Create a `CordialInstance` object.

```javascript
const fuchsia = Cordial()
```

Now, you may set the `categories` property (an array of categories).

A category takes the following form:

```javascript
{
  patterns: {
    // An array of things to check for
    matches: [
      'hello',
      'hi'
    ],
    // The type property may be one of the following:
    // - 'equals'
    // - 'includes'
    // - 'startsWith'
    // - 'endsWith'
    // - 'regex'
    type: 'startsWith'
  },
  // If the input is a valid pattern, return the following
  templates: {
    // Either an array of things to respond with (static)
    // or a function whose return value will be the response (computed)
    responses: [
      'Hello',
      'Hi'
    ],
    // If the type is 'static', take a random value from the responses array
    // If the type is 'computed', pass in the input to the responses array
    type: 'static'
    // The trails property is optional
    // Take a random string from this array and append it to the response
    trails: [
      '.',
      '!'
    ],
  }
}
```

Now, push them into the `categories` array of your `CordialInstance`.

```javascript
const cake = { isGood: true }

fuchsia.categories.push({
  patterns: {
    matches: [
      'hello',
      'hi'
    ],
    type: 'startsWith'
  },
  templates: {
    responses: [
      'Hello',
      'Hi'
    ],
    type: 'static'
    trails: [
      '.',
      '!'
    ],
  }
},
{
  patterns: {
    matches: ['pizza'],
    type: 'includes'
  },
  templates: {
    responses: () => {
      if (cake.isGood) {
        return 'Did someone say "cake"?'
      }
    },
    type: 'computed'
  }
})
```

To test a string against your patterns, use the `.tell()` method of your `CordialInstance`.

```javascript
fuchsia.tell('Hello, friend.')
// One of the following:
// 'Hello.', 'Hello!', 'Hi.', 'Hi!'

fuchsia.tell('It turns out, my friend hates cake. He thinks it\'s as good as dirt.')
// 'Did someone say "cake"?'

fuchsia.tell('You\'ll be left speechless.') // Matches no patterns
// null
```
