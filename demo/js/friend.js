import Cordial from '../../cordial/cordial.js'

const Friend = Cordial()

Friend.getDefaultValue = () => 'Sorry, I don\'t have a programmed response to that.'

Friend.groups.greetings = [{
  patterns: ['hello', 'hey', 'hi', 'greetings'],
  templates: ['Hello', 'Hey', 'Hi', 'Greetings'],
  trails: '.?!',
  type: 'startsWith'
}]

Friend.groups.almostEcho = [{
  patterns: ['echo'],
  templates: [
    function loudly (input) { return input.toUpperCase() },
    function hissing (input) { return input
      .split('')
      .map((char) => {
        if (char === 's') {
          return char.repeat(3)
        } else {
          return char
        }
      })
      .join('')
    },
    function reversed (input) { return input.split('').reverse().join('') },
    function withALisp (input) { return input.split('s').join('th') },
    function onlyKnowingTheLetterQ (input) { return 'q'.repeat(input.length) }
  ],
  type: 'startsWith'
}]

export default Friend
