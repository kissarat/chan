ui.dialog.style.removeProperty('display')

const rooms = {}

socket.on('connect', function () {
  ui.messages.innerHTML = ''
  if (!rooms[room]) {
    rooms[room] = {room, id, n: 0}
  }
  socket.emit('room', rooms[room])
})

function addMessage({from, text, n}) {
  rooms[room].n = n
  const div = document.createElement('div')
  const isMe = from === id
  div.classList.add(isMe ? 'me' : 'other')
  div.innerHTML = text
  ui.messages.appendChild(div)
  div.scrollIntoView(false)
  if (isMe) {
    ui.textarea.value = ''
  }
}

socket.on('message', function (o) {
  if (o instanceof Array) {
    ui.messages.innerHTML = ''
    o.forEach(addMessage)
  }
  else {
    addMessage(o)
  }
})

ui.textarea.addEventListener('keydown', function (e) {
  if ('Enter' === e.key) {
    send()
    e.preventDefault()
  }
})
