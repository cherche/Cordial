;(function () {
	'use strict';

	// http://stackoverflow.com/a/384380
	function isElement(obj) {
		return (
			typeof HTMLElement === 'object' ? obj instanceof HTMLElement :
			obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
		);
	};

	function module() {
		this.triggers = [];
		this.enabled = true;
	}

	module.prototype.extend = function (text, response, type) {
		if (!Array.isArray(text) && typeof text !== 'string') {
			return;
		}

		this.triggers.push({
			'text': text,
			'response': response,
			'type': type
		});
	};

	module.prototype.toggle = function () {
		this.enabled = !this.enabled;
	};

	window.Cordial = function () {
		function Cordial(raw) {
			if (!raw) {
				return null;
			}

			var parsed = Cordial.parse(raw),
				key,
				mod,
				i,
				j,
				match,
				response;

			for (key in Cordial.modules) {
				mod = Cordial.modules[key];
				if (mod.enabled) {
					for (i = 0; i < mod.triggers.length; i++) {
						mod.triggers[i].text =
							(typeof mod.triggers[i].text === 'string')
							? [mod.triggers[i].text]
							: mod.triggers[i].text;

						mod.triggers[i].type =
							mod.triggers[i].type || 'startsWith';

						for (j = 0; j < mod.triggers[i].text.length; j++) {
							if (mod.triggers[i].type === 'startsWith') {
								match = (parsed + ' ').startsWith(mod.triggers[i].text[j]);
							} else {
								match = parsed === mod.triggers[i].text[j];
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
						break;
					}
				}
			}

			if (match) {
				response = mod.triggers[i].response;

				while (Array.isArray(response) || typeof response === 'function') {
					if (Array.isArray(response)) {
						response = response[Math.floor(Math.random() * response.length)];
					} else if (typeof response === 'function') {
						response = response();
					}
				}

				if (typeof response === 'string' || isElement(response)) {
					return response;
				} else {
					throw new TypeError('Responses must always return a string or HTMLElement.');
				}
			} else {
				return null;
			}
		}

		Cordial.modules = {
			core: new module()
		};

		Cordial.addModule = function (name) {
			this.modules[name] = new module();
		}

		Cordial.parse = function (raw) {
			return raw
				.toLowerCase()
				.replace(/(\?|!|,|"|')+/g, '')
				.replace(/^\s+|(\.|\s)+$/g, '')
				.replace(/\s+/g, ' ');
		};

		// We can't just do Cordial.extend = Cordial.modules.core.extend
		// because it tries to access Cordial>triggers instead of
		// Cordial.modules.core.triggers.
		Cordial.extend = function (text, response, type) {
			Cordial.modules.core.extend(text, response, type);
		};

		return Cordial;
	};

	Cordial.isElement = isElement;
})();
