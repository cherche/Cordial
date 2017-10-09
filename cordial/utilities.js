export let isElement = obj =>
  typeof HTMLElement === 'object' ? obj instanceof HTMLElement :
  obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'

export let getRandomValue = arr => arr[Math.floor(Math.random() * arr.length)]
