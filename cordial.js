function Cordial() {
	function c(input) {
		const parsed = c.parse(input);

		let category,
			match = false,
			finalTemplate;

		for (const key of Object.keys(c.categories)) {
			category = c.categories[key];

			for (let {pattern, template, post, type} of category) {
				for (const value of pattern) {
					switch (type) {
					case 'startsWith':
					case 'endsWith':
						match = parsed[type](value);
						break;
					case 'isEqualTo':
						match = parsed === value;
					}

					if (match) {
						finalTemplate = template;

						while (!(
							typeof finalTemplate === 'string' ||
							Cordial.isElement(finalTemplate)
						)) {
							if (Array.isArray(finalTemplate)) {
								finalTemplate = Cordial.getRandomValue(finalTemplate);
							} else if (typeof finalTemplate === 'function') {
								finalTemplate = finalTemplate(parsed);
							}
						}

						if (typeof finalTemplate === 'string') {
							finalTemplate += Cordial.getRandomValue(post);
						}

						return finalTemplate;
					}
				}
			}
		}
	}

	c.categories = {
		core: []
	};

	c.parse = x => x
		.toLowerCase()
		.replace(/(\?|!|,|"|')+|^(\.|\s)+|(\.|\s)+$/g, '')
		.replace(/\s+/g, ' ');

	c.fallback = () => null;

	return c;
}

Cordial.isElement = obj =>
		typeof HTMLElement === 'object' ? obj instanceof HTMLElement :
		obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';

Cordial.getRandomValue = arr => arr[Math.floor(Math.random() * arr.length)];
