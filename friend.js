import Cordial from './cordial/cordial.js'

const Friend = Cordial()

Friend.categories.greeting = {
  patterns: ['hello', 'hey', 'hi', 'greetings'],
  templates: ['Hello', 'Hey', 'Hi', 'Greetings'],
  post: '.?!',
  type: 'startsWith'
}

Friend.categories.almostEcho = {
  patterns: ['echo'],
  templates: [
    function loudly (input) { return input.toUpperCase() },
    function hissingly (input) { return input
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
    function reversedly (input) { return input.split('').reverse().join('') },
    function withalisp_ly (input) { return input.split('s').join('th') },
    function onlyknowingtheletterq_ly (input) { return 'q'.repeat(input.length) }
  ],
  type: 'startsWith'
}

export default Friend
