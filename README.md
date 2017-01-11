# Cordial
The project that powers Fuchsia.

## Installation
Obtain your `cordial.js` file through whatever means you wish (downloading, `git clone`, etc.).

Now just link to it in your HTML file like so:

```html
<script src="cordial.js"></script>
```

## Usage (*Outdated!*)
Throughout this documentation, `window.Cordial` will refer to the function used to create a version of `Cordial`. The two should not be .

### `window.Cordial()`
Returns a version of Cordial.

```javascript
var Fuchsia = Cordial();
```

### `Cordial()`
The function that `window.Cordial()` returns. Any text input should be put through this function.

```javascript
Fuchsia('Hello.');
```

#### `utilities`
A `Cordial` property. Contains the `parse()` and `isElement()` methods by default.

##### `parse(raw)`
A `utilities` method. Can be overwritten to change how inputs should be returned.

*raw*: String

##### `isElement(obj)`
A `utilities` method. Can be used to check if an object is an element.

*obj*: Object

#### `modules`
A `Cordial` property. Contains the `'core'` module by default.

#### `createModule(name)`
A `Cordial` method. Can be used to create a new module and add it to the `modules` property. Returns the module.

*name*: String

#### `install(triggers)`
A `Cordial` method. Can be used as a shorthand `Cordial.modules['core'].install()`.

*triggers*: Array, should contain triggers

#### `fallback()`
A `Cordial` method. Can be overwritten to change what is returned when no matches for a parsed input are found.

### `Module`
A constructor hidden from the global scope. Is used to create a new module.

#### `install(triggers)`
A method in `Module`'s prototype. Is used to install triggers.

*triggers*: Array, should contain triggers

### What is a "trigger"?
A trigger consists of two mandatory parts and two optional. These are: `text`, `response`, `post`, and `type`.

`text` can be a string, a regular expression, or an array that may contain any combination of them.
`response` can be a string, a function, or an array.
	- If a string or an HTMLElement, it will return that*
	- If a function, it evaluations the function with no arguments and returns that*
	- If an array, it picks a random element from it and returns that*
`post` must be an array or not defined at all.
`type` must be a string. If it's neither `'startsWith'` nor `'endsWith'`, it will default to checking the user input *exactly*. `type` won't affect anything if `text` is a regular expression.

\* The process will repeat until a string or HTMLElement is returned. This is to allow nesting and to ensure that a string or an HTMLElement is returned.
The following example will return a random element from the jagged array that's returned from a function.
```javascript
[{
	text: 'something',
	response: function () {
		return [
			[document.createElement('a')],
			['test', 'wow'],
			['hello', function () { return 'dog' }, 'world']
		]
	}
}, {
	// other trigger here
} /*
	maybe more triggers here
*/]
```

## Contributing
Since I lack time for testing, if you come across anything you would like added into Cordial, just [open up and issue](https://github.com/Loquacious/Cordial/issues/new) or add it yourself and [submit a pull request](https://github.com/Loquacious/Cordial/compare) if you really feel like it!

## License
MIT.
