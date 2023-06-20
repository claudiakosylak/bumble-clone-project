from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

conversation1 = [
    ["Person A", "Hi there! I noticed your profile and couldn't resist saying hello. How's your day going?"],
    ["Person B", "Hey! Thanks for reaching out. My day's been pretty good so far. How about yours?"],
    ["Person A", "I'm glad to hear that! Mine has been busy but good. So, what caught your attention in my profile?"],
    ["Person B", "Well, your sense of humor definitely stood out! Your 'about' section had me laughing. What about you? What drew you to my profile?"],
    ["Person A", "Haha, I'm glad I could make you laugh! Your photos and genuine smile caught my eye. Plus, your adventurous spirit seemed intriguing. Any exciting plans coming up?"],
    ["Person B", "Thanks for the compliment! I'm actually planning a hiking trip next weekend. Can't wait to explore the great outdoors. How about you? Any adventures on your agenda?"],
    ["Person A", "That sounds amazing! I'm more of a beach person, so I have a beach getaway planned. Sun, sand, and relaxation—can't wait! Have you been to any exciting destinations recently?"],
    ["Person B", "Oh, I love the beach too! As for recent trips, I visited a charming coastal town last month. It was so peaceful and picturesque. What's your favorite thing about beach vacations?"],
    ["Person A", "The sound of the waves crashing, the feeling of sand between my toes, and watching the stunning sunsets. It's pure bliss. Do you have any favorite beach activities?"],
    ["Person B", "Definitely! I enjoy swimming, building sandcastles (yes, I'm a kid at heart), and long walks along the shore. It's so soothing. By the way, do you have any hobbies or interests you're passionate about?"],
    ["Person A", "I love photography, capturing moments that make me smile. I also enjoy cooking and experimenting with new recipes. How about you? What are your hobbies outside of hiking?"],
    ["Person B", "That's awesome! Besides hiking, I'm into painting. It's my way of expressing creativity. I also enjoy playing the guitar and writing songs. So, do you have a favorite type of cuisine?"],
    ["Person A", "That's impressive! As for cuisine, I'm a fan of Italian food. Pasta, pizza, gelato—you name it! How about you? Any specific culinary favorites?"],
    ["Person B", "Italian cuisine is fantastic! But I have to say, I'm a sucker for sushi. There's something about the freshness and flavors that I can't resist. Do you enjoy trying new foods?"],
    ["Person A", "Absolutely! I love exploring new flavors and experiencing different culinary cultures. It's like a delicious adventure. Speaking of adventures, what's the most spontaneous thing you've ever done?"],
    ["Person B", "Ah, the most spontaneous thing? Well, once I booked a flight on a whim and surprised my best friend in another country. It was an unforgettable experience. How about you? Any spontaneous stories to share?"],
    ["Person A", "That sounds incredible! One time, I randomly joined a group salsa dance class and ended up performing on stage the same night. Talk about stepping out of my comfort zone! So, what's the most important quality you look for in a partner?"],
    ["Person B", "Wow, that takes courage! In a partner, I value honesty and a great sense of humor. Being able to laugh together and communicate openly are crucial for me. How about you? What qualities matter most to you?"],
    ["Person A", "I completely agree. A sense of humor and open communication are vital. I also value kindness, loyalty, and a supportive nature. Building a strong connection is important to me. By the way, do you have any favorite movies or TV shows?"]
]


def seed_messages():
    for message in conversation1:
        if message[0] == "Person A":
            user = 1
        else:
            user = 2
        newMessage = Message(
            match_id = 1, user_id = user, content = message[1]
        )
        db.session.add(newMessage)
    db.session.commit()
    # messages = []
    # message1 = Message(
    #     match_id = 1, user_id = 1, content = "Hi there! I noticed your profile and couldn't resist saying hello. How's your day going?"
    # )
    # messages.append(message1)
    # message2 = Message(
    #     match_id = 1, user_id = 2, content = "Hey! Thanks for reaching out. My day's been pretty good so far. How about yours?"
    # )
    # messages.append(message2)

    # for message in messages:
    #     db.session.add(message)
    # db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
