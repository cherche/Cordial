function Cordial () {
  const cordial = (input) => {
    const parsed = cordial.parse(input)
    let match = false
    let composed

    const keys = Object.keys(cordial.categories)
    const categories = keys.map(key => cordial.categories[key])
    categories.forEach(({ pattern, template, post, type }) => {
      console.log(post)
      const pattArray = Array.isArray(pattern)
        ? pattern
        : [pattern]

      for (const value of pattArray) {
        if (typeof pattArray === 'string') {
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
          match = !!parsed.match(pattArray)
        }

        if (match) {
          composed = template

          return
        }
      }
    })

    composed = match ? composed : cordial.fallback()

    while (!(
      typeof composed === 'string' ||
      Cordial.isElement(composed)
    )) {
      if (Array.isArray(composed)) {
        composed = Cordial.getRandomValue(composed)
      } else if (typeof composed === 'function') {
        composed = composed(parsed)
      }
    }

    if (typeof composed === 'string' && post && post.length > 0) {
      composed += Cordial.getRandomValue(post)
    }

    return composed
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

Cordial.getRandomValue = (thing) => {
  const index = Math.floor(Math.random() * thing.length)

  if (typeof thing === 'string') {
    return thing.charAt(index)
  } else if (Array.isArray(thing)) {
    return thing[index]
  }
}
