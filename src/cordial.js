import { getRandomVal } from './probability.js'

export default function Cordial (categories = []) {
  // The CordialInstance can also be instantiated with an array of
  // categories passed in as the first argument
  const CordialInstance = { categories }

  CordialInstance.checkPatterns = function checkPatterns (patterns, input) {
    let checker

    // Check `matches` differently depending on what the `type` is
    switch (patterns.type) {
      case 'equals':
        checker = match => input === match
        break
      case 'includes':
        checker = match => input.includes(match)
        break
      case 'startsWith':
        checker = match => input.startsWith(match)
        break
      case 'endsWith':
        checker = match => input.endsWith(match)
        break
      case 'regex':
        checker = match => input.match(match).length > 0
    }

    // Iterate over the matches, and return as soon as a valid match is found
    for (const match of patterns.matches) {
      const isMatch = checker(match)

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
