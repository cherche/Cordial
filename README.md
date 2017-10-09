# Cordial
The project that powers Fuchsia.

## Installation
Obtain your `cordial` directory through whatever means you wish (downloading, `git clone`, etc.).

Now just import it in your main script and you're set!

```javascript
import Cordial from './cordial/cordial.js'
```

Make sure in your HTML, your script has a `type` of `"module"`.

```html
<script type="module" src="js/main.js"></script>
```

## Usage

### `Cordial()`

Returns a `CordialInstance` object.

```javascript
var Friend = Cordial()
```

### `CordialInstance()`

The function (and therefore also object) that `Cordial()` returns. Pass a string to this function to get a response based on the patterns that you've set for your instance.

```javascript
Friend('Hello.')
```

### Patterns

Cordial uses many of the same names as elements of [AIML](http://www.alicebot.org/aiml.html). Unlike AIML, however, Cordial allows you to have a set of templates containing possible responses, and to have a set of patterns returning the same set of templates.

```javascript
// 'greeting' is the key representing a category
Friend.categories.greeting = {
  // This is a set of patterns that will have all
  // of its elements tested to match an input
  patterns: ['hello', 'hey', 'hi', 'greetings'],

  // This is a set of templates from which a random
  // template will be selected
  templates: ['Hello', 'Hey', 'Hi', 'Greetings'],

  // This is a string of characters from which a random
  // character will be selected and appended to the template
  // This is optional
  post: '.?!',

  // This is how Cordial will use the pattern to match an input
  type: 'startsWith'
}
```

### Template Reduction

By default, any template that is neither a string nor an element will be reduced to one.

If a template is a(n):
- array, a random element of it will be selected
- function, it will be executed with the first argument being the input

This will repeat until the template has been reduced to one of the two allowed return values.

```javascript
Friend.categories.almostEcho = {
  patterns: ['echo'],
  templates: [
    // Picks one of these functions from the array
    // Passes the parsed input into the function and takes
    // the returned value
    function loudly (input) { return input.toUpperCase() },
    function hissing (input) { return input
      .split('')
      .map((char) => {
        if (char === 's') {
          return char.repeat(3)
        } else {
          return char
        }
      })
      .join('')
    },
    function reversed (input) { return input.split('').reverse().join('') },
    function withALisp (input) { return input.split('s').join('th') },
    function onlyKnowingTheLetterQ (input) { return 'q'.repeat(input.length) }
  ],
  type: 'startsWith'
}
```

## Contributing
Since I lack time for testing, if you come across anything you would like added into Cordial, just [open up and issue](https://github.com/cherche/Cordial/issues/new) or add it yourself and [submit a pull request](https://github.com/cherche/Cordial/compare) if you really feel like it!
