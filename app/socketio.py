from flask_socketio import SocketIO, emit
import os
from .models import db
socketio = SocketIO()

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'https://noflake.onrender.com',
        'http://noflake.onrender.com'
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)
