import Cordial from './src/cordial.js'

const instance = Cordial()

const cake = { isGood: true }

instance.categories.push({
  patterns: {
    matches: [
      'hello',
      'hi'
    ],
    type: 'startsWith'
  },
  templates: {
    responses: [
      'Hello',
      'Hi'
    ],
    type: 'static',
    trails: [
      '.',
      '!'
    ]
  }
},
{
  patterns: {
    matches: ['cake'],
    type: 'includes'
  },
  templates: {
    responses: () => {
      if (cake.isGood) {
        return 'Did someone say "cake"?'
      }
    },
    type: 'computed'
  }
})

function test (input) {
  console.log(input, instance.tell(input))
}
window.test = test

test('I like cake a lot.')
test('hello, instance')
