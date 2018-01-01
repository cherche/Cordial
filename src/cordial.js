import { getRandomVal } from './probability.js'

export default function Cordial (categories = []) {
  // The CordialInstance can also be instantiated with an array of
  // categories passed in as the first argument
  const CordialInstance = {
    categories,
    // This means that you can actually add your own types. Fun
    patternTypes: {
      equals: (input, match) => input === match,
      includes: (input, match) => input.includes(match),
      startsWith: (input, match) => input.startsWith(match),
      endsWith: (input, match) => input.endsWith(match),
      regex: (input, match) => input.match(match).length > 0
    }
  }

  CordialInstance.checkPatterns = function checkPatterns (patterns, input) {
    // Check `matches` differently depending on what the `type` is
    const checker = CordialInstance.patternTypes[patterns.type]

    // Iterate over the matches, and return as soon as a valid match is found
    for (const match of patterns.matches) {
      const isMatch = checker(input, match)

      if (isMatch) return true
    }
  }

  CordialInstance.processTemplates = function processTemplates (templates, input) {
    const { responses, trails, type } = templates

    let response

    if (type === 'static') {
      response = getRandomVal(responses)
    } else {
      response = responses(input)
    }

    const trail = (trails && trails.length > 0) ? getRandomVal(trails) : ''

    return response + trail
  }

  CordialInstance.tell = function tell (input) {
    for (const category of CordialInstance.categories) {
      const { patterns, templates } = category

      if (CordialInstance.checkPatterns(patterns, input)) {
        const template = CordialInstance.processTemplates(templates, input)

        return template
      }
    }

    // Default value
    return null
  }

  return CordialInstance
}
