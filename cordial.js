;(function (di, al) {
	'use strict';

	function Cordial() {
		function dial(raw) {
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

				if (Array.isArray(response)) {
					response = response[Math.floor(Math.random() * response.length)];
				} else if (typeof response === 'function') {
					response = response();
				} else if (typeof response !== 'string') {
					response = null;
				}
			} else {
				response = null;
			}

			return response;
		}

		dial.triggers = [
			{
				'text': 'how are you',
				'response': ['ayy', 'lmao'],
				'type': 'equalTo'
			}
		];

		dial.extend = function (text, response, type) {
			this.triggers.push({
				'text': text,
				'response': response,
				'type': type
			});
		};

		return dial;
	}

	di[al] = Cordial;
})(window, 'Cordial');
