window.Cordial = function () {
	'use strict';

	function Cordial(raw) {
		var parsed = Cordial.parse(raw),
			i = 0,
			j = 0,
			match,
			response;

		for (; i < Cordial.triggers.length; i++) {
			for (; j < Cordial.triggers[i].text.length; j++) {
				if (Cordial.triggers[i].type === 'startsWith') {
					match = (parsed + ' ').startsWith(Cordial.triggers[i].text[j]);
				} else {
					match = parsed === Cordial.triggers[i].text[j];
				}

				if (match) {
					break;
				}
			}

			if (match) {
				break;
			}
		}

		if (match) {
			response = Cordial.triggers[i].response;

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

	Cordial.triggers = [];

	Cordial.extend = function (text, response, type) {
		if (!Array.isArray(text) && typeof text !== 'string') {
			return;
		}

		if (typeof text === 'string') {
			text = [text];
		}

		this.triggers.push({
			'text': text,
			'response': response,
			'type': type
		});
	};

	Cordial.parse = function (raw) {
		return raw
			.toLowerCase()
			.replace(/(\?|!|,|"|')+/g, '')
			.replace(/^\s+|(\.|\s)+$/g, '')
			.replace(/\s\s+/g, ' ');
	};

	return Cordial;
};
