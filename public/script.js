function uid() {
  const c = '012345678ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxy'
  return _.sample(c, 24).join('')
}

const chanRegex = /chan.(\w{24})/
const chanCookie = chanRegex.exec(document.cookie)
let id
if (chanCookie) {
  id = chanCookie[1]
}
else {
  id = uid()
  document.cookie = `chan=${id}; path=/; expires=` + new Date(2030, 1).toUTCString()
}
const chan = chanRegex.exec(location.pathname)

const ui = {
  dialog: '#dialog',
  messages: '#dialog > .messages',
  textarea: 'textarea',
  chan: '#chan-script'
}

const buttons = {
  createChat: function () {
    location.pathname = '/chan/' + uid()
  }
}

_.each(ui, function (selector, name) {
  ui[name] = document.querySelector(selector)
})

_.each(buttons, function (fn, name) {
  document.getElementById(name).addEventListener('click', fn)
})

let socket
let room
if (chan) {
  room = chan[1]
  document.body.classList.add('chat')
  socket = socketIO('/')
  ui.chan.setAttribute('src', '/chan.js')
}
