;(function (di, al) {
	'use strict';

	function Cordial() {
		function dial(raw) {
			// This should actually be parsed using the regexes from Fuchsia.
			var formatted = raw,
				i,
				match,
				response;

			for (i = 0; i < dial.triggers.length; i++) {
				if (dial.triggers[i].type === 'startsWith') {
					match = formatted.startsWith(dial.triggers[i].text);
				} else {
					match = formatted === dial.triggers[i].text;
				}

				if (match) {
					break;
				}
			}

			if (match) {
				response = dial.triggers[i].response;

				while (response !== 'string') {
					if (Array.isArray(response)) {
						response = response[Math.floor(Math.random() * response.length)];
					} else if (typeof response === 'function') {
						response = response();
					} else {
						return response;
					}
				}
			} else {
				return null;
			}
		}

		dial.triggers = [];

		dial.extend = function (text, response, type) {
			if (!Array.isArray(text)) {
				for (var i = 0; i < text.length; i++) {
					this.triggers.push({
						'text': text[i],
						'response': response,
						'type': type
					});
				}
			} else {
				this.triggers.push({
					'text': text,
					'response': response,
					'type': type
				});
			}
		};

		return dial;
	}

	di[al] = Cordial;
})(window, 'Cordial');
