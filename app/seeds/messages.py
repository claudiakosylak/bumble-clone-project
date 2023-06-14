from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

def seed_messages():
    messages = []
    message1 = Message(
        match_id = 1, user_id = 1, content = "Woahhhh these sockets are crazy"
    )
    messages.append(message1)
    message2 = Message(
        match_id = 1, user_id = 2, content = "Righttttt"
    )
    messages.append(message2)

    for message in messages:
        db.session.add(message)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
