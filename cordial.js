;(function () {
	'use strict';

	function module() {
		this.triggers = [];
		this.enabled = true;
	}

	module.prototype.extend = function (text, response, type) {
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
				console.log(key);
				mod = Cordial.modules[key];
				if (mod.enabled) {
					console.log(mod.triggers.length);
					for (i = 0; i < mod.triggers.length; i++) {
						console.log(mod);
						console.log(mod.triggers);
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
				.replace(/\s\s+/g, ' ');
		};

		Cordial.extend = Cordial.modules.core.extend;

		return Cordial;
	};
})();
