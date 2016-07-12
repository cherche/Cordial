;(function () {
	'use strict';

	// http://stackoverflow.com/a/384380
	function isElement(obj) {
		return (
			typeof HTMLElement === 'object' ? obj instanceof HTMLElement :
			obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
		);
	};

	function Module() {
		this.triggers = [];
		this.enabled = true;
	}

	Module.prototype.install = function (triggers) {
		if (!Array.isArray(triggers)) {
			throw new TypeError('(Module) The triggers variable must be an array.');
		}

		if (this.triggers === []) {
			this.triggers = triggers;
		} else {
			for (var i = 0; i < triggers.length; i++) {
				this.triggers.push(triggers[i]);
			}
		}

		return this;
	};

	Module.prototype.extend = function (text, response, type, post) {
		if (!Array.isArray(text) && typeof text !== 'string') {
			return;
		}

		this.triggers.push({
			'text': text,
			'response': response,
			'type': type,
			'post': post
		});

		return this;
	};

	Module.prototype.toggle = function () {
		this.enabled = !this.enabled;

		return this;
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
						// Post-processing of modules
						mod.triggers[i].text =
							(typeof mod.triggers[i].text === 'string')
							? [mod.triggers[i].text]
							: mod.triggers[i].text;

						mod.triggers[i].type =
							mod.triggers[i].type || 'startsWith';

						mod.triggers[i].post =
							(typeof mod.triggers[i].post !== 'string')
							? ''
							: mod.triggers[i].post;

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

				if (typeof response === 'string') {
					response += mod.triggers[i].post.charAt(Math.floor(Math.random() * mod.triggers[i].post.length));
				} else if (!isElement(response)) {
					throw new TypeError('(Cordial) Responses must always return a string or HTMLElement.');
				}

				return response;
			} else {
				return null;
			}
		}

		Cordial.modules = {
			core: new Module()
		};

		Cordial.createModule = function (name) {
			/* Not being used currently because the maker should be responsible for clashing in names.
			if (~name.indexOf('$')) {
				throw new RangeError('(Cordial) Module names cannot contain a "$".');
			}

			var suffix = 0,
				rootName = name;

			while (this.modules[name]) {
				name = rootName + '$' + suffix.toString(16);
				suffix++;
			}
			*/
			return this.modules[name] = new Module();
		};

		Cordial.parse = function (raw) {
			return raw
				.toLowerCase()
				.replace(/(\?|!|,|"|')+/g, '')
				.replace(/^\s+|(\.|\s)+$/g, '')
				.replace(/\s+/g, ' ');
		};

		// We can't just do Cordial.extend = Cordial.modules.core.extend
		// because it tries to access Cordial.triggers instead of
		// Cordial.modules.core.triggers
		Cordial.extend = function (text, response, type, post) {
			Cordial.modules.core.extend(text, response, type, post);
		};

		return Cordial;
	};

	Cordial.isElement = isElement;
})();
