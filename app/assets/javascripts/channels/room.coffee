App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    #alert data['message']
    document.querySelector('#messages').insertAdjacentHTML('beforeend', data['message'])

  speak: (message) ->
    @perform 'speak', message: message


document.addEventListener('keypress', (event) -> 
  if event.target == document.querySelectorAll('[data-behavior~=room_speaker]')[0] && event.keyCode is 13 # return = send
    App.room.speak event.target.value
    event.target.value = ''
    event.preventDefault()
)