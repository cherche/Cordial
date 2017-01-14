function Cordial() {
  function cordial(input) {
    const parsed = cordial.parse(input)

    let category,
      match = false,
      finalTemplate

    for (const key of Object.keys(cordial.categories)) {
      category = cordial.categories[key]

      for (let {pattern, template, post, type} of category) {
        for (const value of pattern) {
          if (typeof pattern === 'string') {
            switch (type) {
            case 'startsWith':
            case 'endsWith':
              match = parsed[type](value)
              break
            default:
            // case 'isEqualTo':
              match = parsed === value
            }
          } else {
            match = !!parsed.match(pattern)
          }

          if (match) {
            finalTemplate = template

            while (!(
              typeof finalTemplate === 'string' ||
              Cordial.isElement(finalTemplate)
            )) {
              if (Array.isArray(finalTemplate)) {
                finalTemplate = Cordial.getRandomValue(finalTemplate)
              } else if (typeof finalTemplate === 'function') {
                finalTemplate = finalTemplate(parsed)
              }
            }

            if (typeof finalTemplate === 'string' && post && post.length > 0) {
              finalTemplate += Cordial.getRandomValue(post)
            }

            return finalTemplate
          }
        }
      }
    }

    return cordial.fallback()
  }

  cordial.categories = {}

  cordial.parse = input => input
    .toLowerCase()
    .replace(/(\?|!|,|"|')+|^(\.|\s)+|(\.|\s)+$/g, '')
    .replace(/\s+/g, ' ')

  cordial.fallback = () => null

  return cordial
}

Cordial.isElement = obj =>
    typeof HTMLElement === 'object' ? obj instanceof HTMLElement :
    obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'

Cordial.getRandomValue = arr => arr[Math.floor(Math.random() * arr.length)]
