# Cordial
The project that will power Fuchsia.

## Installation
Obtain your `cordial.js` file through whatever means you wish (downloading, `git clone`, etc.).

Now just link to it in your HTML file like so:

```html
<script src="cordial.js"></script>
```

## Usage
Cordial was basically made as a build-your-own-personal-assistant script.

There are three steps to using Cordial:

1.	Create your own instance of Cordial by assigning `Cordial()` to any variable.

	```javascript
	var personalAssistant = Cordial();
	```

2.	Now program all of your triggers and responses with the `.extend()` method.

	* `text` can be a string or and array of strings.
	* `response` will be explained later but it can be an array, a function, or a string.
	* `type` is optional and is used to determine whether the `text` is checked if it `'startsWith'` or is `'equalTo'` the user's `input`.

	```javascript
	personalAssistant.extend(text, response [, type]);
	```

	`response` can become really intense when you combined the different methods. Passing an array will return a random string from the array. Passing a function will return what the function returns. Passing a string returns that string.

	If you wish to, you arrays can contain functions which will be random selected and run. Your functions can contain arrays that contain functions that can return random functions based on a PRNG which can each separately return either an array, a string, or another function which returns an array with other strings. That means nothing to you but this example will help:

	```javascript
	personalAssistant.extend('test', [function () {
		return [
			[function () {
				return (Math.floor(Math.random() * 3) + 1).toString();
			}, 'response'],
			function () {
				return (Math.floor(Math.random() * 100) + 1).toString();
			}
		][Math.floor(Math.random() * 2)];
	}, [
		'response1',
		'response2',
		'response3'
	], 'response4']);
	```

	I'm not even going to try to write that out. Just test it out and you'll understand (probably).

3. Say something to your personal assistant!

	```javascript
	personalAssistant('test');
	>> 'response2'

	personalAssistant('Hello!');
	>> null
	```

## Contributing
Since I lack time for testing, if you come across anything you would like added into Cordial, just [open up and issue](https://github.com/Loquacious/Cordial/issues/new) or add it yourself and [submit a pull request](https://github.com/Loquacious/Cordial/compare) if you really feel like it!

## License
MIT.
