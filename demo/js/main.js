import Friend from './friend.js'

const $input = document.getElementById('input')
const $conversation = document.getElementById('conversation')

$input.addEventListener('keydown', (event) => {
  if (event.code !== 'Enter') { return }

  event.preventDefault()

  const $you = { speaker: 'you' }
  const $friend = { speaker: 'friend' }

  ;[$you, $friend].forEach((message) => {
    const speaker = message.speaker
    const el = message.element = document.createElement('p')
    el.className = `conversation ${speaker}`
    el.textContent =
      `${speaker}: ${speaker === 'you' ? $input.value : Friend($input.value)}`

    $conversation.appendChild(el)
  })

  $input.value = ''
})
