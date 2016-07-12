# Cordial
The project that will power Fuchsia.

## Installation
Obtain your `cordial.js` file through whatever means you wish (downloading, `git clone`, etc.).

Now just link to it in your HTML file like so:

```html
<script src="cordial.js"></script>
```

## Usage
Cordial was created to be a build-your-own-personal-assistant script.

1.	Create your own instance of Cordial by assigning `Cordial()` to any variable.

	```javascript
	var personalAssistant = Cordial();
	```

2.	Now program all of your triggers and responses.

	Simply set use the `install()` method with an array formatted like so:

	```javascript
	personalAssistant.install([
		{
			'text': 'hello',
			'response': [
				'Hello',
				'Hi',
				'Greetings'
			],
			'type': 'startsWith',
			'post': '.?!'
		},
		{
			'text': [
				'what is the time',
				'give me the time'
			],
			'response': [
				'Time for you to get a watch!',
				function () {
					var now = new Date(),
						time,
						suffix;

					time = [now.getHours(), now.getMinutes()];

					suffix = (time[0] < 12) ? 'AM' : 'PM';

					time[0] = time[0] % 12;

					time[0] = (time[0]) ? time[0] : 12;

					return 'The time is ' + time.join(':') + ' ' + suffix + '.';
				}
			],
			'type': 'startsWith'
		}
	]);
	```


	* `'text'` can be a string or and array of strings.
	* `'response'` will be explained later but it can be an array, a function, a string, or an HTMLElement.
	* `'type'` is optional and is used to determine whether the `text` is checked if it `'startsWith'` or is `'equalTo'` the `parsed` input.
	* `'post'` is also optional and represents the punctuation to add after the response (if it's a string).

	`'response'` can become really intense when you combined the different methods. Passing an array will return a random value from the array. Passing a function will return what the function returns. Passing a string or and HTMLElement returns it. This process will repeat until a string or HTMLElement has been returned.

	```javascript
	personalAssistant.core.install([
		{
			'text': 'test',
			'response': [function () {
				return [
					[function () {
						return (Math.floor(Math.random() * 3) + 1).toString();
					}, document.createElement('div')],
					function () {
						return (Math.floor(Math.random() * 100) + 1).toString();
					}
				][Math.floor(Math.random() * 2)];
			}, [
				'response1',
				'response2',
				'response3'
			], 'response4'],
			'type': 'equalTo'
		}
	]);
	```

	I'm not even going to try to write that out. Just test it out and you'll understand (probably).

3. Say something to your personal assistant!

	```javascript
	personalAssistant('test');
	>> 'response2'

	personalAssistant('Hello!');
	>> null
	```

	### Optional Steps

4. Make a custom parsing engine.

	The `.parse()` method is necessary for allowing some ambiguity with the value passed to your personal assistant.

	The built-in parser works like so:
	```javascript
	function (raw) {
		return raw
			// Makes raw input lower-case.
			.toLowerCase()
			// Removes the following characters: ?!,"'
			.replace(/(\?|!|,|"|')+/g, '')
			// JavaScript .trim() method + removal of periods at end of input
			.replace(/^\s+|(\.|\s)+$/g, '')
			// Condenses whitespace into a single space
			.replace(/\s+/g, ' ');
	}
	```

	You can adjust this however you'd like and transform the raw input into `'...'` if you really wanted to. Here's a version that only affects the capitalization:

	```javascript
	personalAssistant.parse = function (raw) {
		return raw.toUpperCase();
	}
	```

5. If you had variables containing valid `trigger` arrays, you could also `install()` them.

	```javascript
	var jokes = [
		{
			'text': 'knock knock',
			'response': 'Who\'s there?'
		}
	];

	personalAssistant.install(jokes);
	```

6. You can also separate your `triggers` into modules to allow individual toggling of `triggers`.

	```javascript
	personalAssistant.createModule('jokes')
		.install('jokes')
		.toggle() // The 'jokes' module's triggers will be ignored.
		.toggle(); // The 'jokes' module's triggers will now be tested.
	```

	Alternatively, you can access modules from the `personalAssistant.modules` array.

## Contributing
Since I lack time for testing, if you come across anything you would like added into Cordial, just [open up and issue](https://github.com/Loquacious/Cordial/issues/new) or add it yourself and [submit a pull request](https://github.com/Loquacious/Cordial/compare) if you really feel like it!

## License
MIT.
