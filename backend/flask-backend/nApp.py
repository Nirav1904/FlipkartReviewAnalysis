import socketio

sio = socketio.Server()

@sio.event
def connect(sid , ):
    pass

@sio.event
def disconnect():
    pass