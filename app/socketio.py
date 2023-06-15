from flask_socketio import SocketIO, emit
import os
from .models import db, Message
socketio = SocketIO()

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'https://noflake.onrender.com',
        'http://noflake.onrender.com'
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)


# handle match messages
@socketio.on("chat")
def handle_chat(data):
    if data != "User connected!":
        message = Message(
            match_id = data['match_id'],
            user_id = data['user_id'],
            content = data['content']
        )
        db.session.add(message)
        db.session.commit()

    emit("chat", data, broadcast=True)

@socketio.on("delete_message")
def handle_delete(data):
    if data != "User connected!":
        message = Message.query.get(data["id"])
        db.session.delete(message)
        db.session.commit()

    emit("delete_message", data, broadcast=True)

@socketio.on("update")
def handle_update(data):
    if data != "User connected!":
        message = Message.query.get(data["id"])
        message.content = data["content"]
        db.session.commit()
