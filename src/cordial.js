import { getRandomVal } from './probability.js'

function Cordial (categories = []) {
  const CordialInstance = { categories }

  CordialInstance.getTemplates = function getTemplates (input) {
    for (const category of CordialInstance.categories) {
      const { patterns, templates } = category

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

        if (isMatch) return templates
      }
    }

    // Default value
    return null
  }

  CordialInstance.reduceTemplates = function reduceTemplates (templates, input) {
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
    const templates = CordialInstance.getTemplates(input)

    return CordialInstance.reduceTemplates(templates, input)
  }

  return CordialInstance
}

export default Cordial
