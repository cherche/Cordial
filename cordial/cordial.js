import { isElement, getRandomValue } from './utilities.js'

export default function Cordial () {
  function CordialInstance (input) {
    const parsed = CordialInstance.parse(input)

    let match = false
    let result

    const groups = Object.values(CordialInstance.groups)
    for (const category of groups) {

    for (let { patterns, templates, trails, type } of category) {
      console.log(category, trails)
      for (const pattern of patterns) {
        if (typeof pattern === 'string') {
          switch (type) {
          case 'startsWith':
            match = parsed.startsWith(pattern)
            break
          case 'endsWith':
            match = parsed.endsWith(pattern)
            break
          default:
          // case 'isEqualTo':
            match = parsed === pattern
          }
        } else {
          // In the case that the pattern is a regular expression
          match = !!parsed.match(pattern)
        }

        if (match) {
          result = templates

          // Iterate until template reduces to a single value of type:
          // - String
          // - Element

          while (!(
            typeof result === 'string' ||
            isElement(result)
          )) {
            if (Array.isArray(result)) {
              result = getRandomValue(result)
            } else if (typeof result === 'function') {
              result = result(parsed)
            }
          }

          if (typeof result === 'string' && trails && trails.length > 0) {
            result += getRandomValue(trails)
          }

          return result
        }
      }
    }

    }

    return CordialInstance.getDefaultValue()
  }

  CordialInstance.groups = {}

  CordialInstance.parse = input => input
    // Remove all punctuation
    .replace(/[\?!,"']+/g, '')
    // Remove leading and trailing whitespace
    .replace(/|^(\.|\s)+|(\.|\s)+$/g, '')
    // Condense any whitespace into a single space
    .replace(/\s+/g, ' ')
    .toLowerCase()

  CordialInstance.getDefaultValue = () => null

  return CordialInstance
}
