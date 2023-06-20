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

conversation2 = [
    ["Person A", "Hi there! I noticed your profile and couldn't resist saying hello. How's your day going?"],
    ["Person B", "Hey! Thanks for reaching out. My day's been alright. How about yours?"],
    ["Person A", "I'm glad to hear that. Mine has been pretty good. So, what caught your attention in my profile?"],
    ["Person B", "Well, your profile seemed interesting. I thought I'd give it a shot. What drew you to mine?"],
    ["Person A", "I found your hobbies and adventurous spirit intriguing. Any exciting plans coming up?"],
    ["Person B", "Not much, really. Just taking it easy. How about you? Any adventures on your agenda?"],
    ["Person A", "I'm actually planning a beach getaway. Sun, sand, and relaxation—can't wait! Have you been to any exciting destinations recently?"],
    ["Person B", "Not really. I prefer staying in and watching movies. What's your favorite thing about beach vacations?"],
    ["Person A", "The sound of the waves crashing, the feeling of sand between my toes, and watching the stunning sunsets. It's pure bliss. Do you have any favorite beach activities?"],
    ["Person B", "I'm not really a beach person, to be honest. I prefer indoor activities. So, what are your other interests?"]
]

conversation3 = [
    ["Person A", "Hi there! I noticed your profile and couldn't resist saying hello. How's your day going?"],
    ["Person B", "Hey! Thanks for reaching out. My day's been great, thanks. How about yours?"],
    ["Person A", "Glad to hear that! My day has been good too. By the way, I noticed you have dogs. Tell me more about them."],
    ["Person B", "Oh, I absolutely adore my dogs! I have two playful and loving Labradors. They bring so much joy to my life."],
    ["Person A", "That's wonderful! I've always wanted to have a dog, but I never got the chance. What's it like having dogs as companions?"],
    ["Person B", "Having dogs is truly amazing. They're incredibly loyal, always there to greet you with wagging tails and wet kisses. They're like family."],
    ["Person A", "That sounds incredible. I can imagine the love and companionship they provide. What kind of activities do you enjoy doing with your dogs?"],
    ["Person B", "We love going for long walks in the park, playing fetch, and even going on hikes together. They have so much energy!"],
    ["Person A", "That's so cool! I can only imagine the adventures you have with them. It must be incredibly fulfilling. Do you have any favorite dog stories to share?"],
    ["Person B", "Oh, where do I even begin? There was this time when one of my dogs managed to sneak into the kitchen and stole an entire pizza! It was hilarious."],
]

conversation4 = [
    ["Person A", "Hi there! I noticed your profile and couldn't resist saying hello. You have the most stunning eyes."],
    ["Person B", "Excuse me? Are you seriously reducing me to just my physical appearance? I expect more respect than that."],
    ["Person A", "I apologize if I came across the wrong way. I genuinely meant it as a compliment, but I understand if it was inappropriate."],
    ["Person B", "It's not just about being inappropriate. It's about valuing someone beyond their looks. I hope you can understand that."],
    ["Person A", "You're right, and I apologize again. It's important to appreciate someone for their personality and inner qualities too."],
    ["Person B", "Thank you for acknowledging that. I believe it's essential to focus on deeper connections rather than superficial compliments."],
    ["Person A", "Absolutely, and I appreciate the reminder. So, tell me, what are some of your passions and interests in life?"],
    ["Person B", "I'm passionate about art, specifically abstract painting. It's a way for me to express emotions and tell stories."],
    ["Person A", "That's amazing. I admire your dedication to such a creative and expressive form of art. Do you have a favorite painting?"],
    ["Person B", "It's hard to pick just one favorite, but there's a particular piece I created that holds a lot of personal meaning for me."],
]

conversation5 = [
    ["Person A", "Hi there! I noticed your profile, and I saw that you enjoy hiking. I'm a big fan of hiking too! Have you been on any exciting trails recently?"],
    ["Person B", "Hey! Yes, I absolutely love hiking. I actually went on a beautiful trail last weekend with breathtaking views. How about you? Any memorable hikes?"],
    ["Person A", "That sounds incredible! I haven't been on a hike recently, but I've been itching to explore some new trails. Would you be interested in going hiking together sometime?"],
    ["Person B", "I'd love that! Hiking with a companion is always more enjoyable. How do you propose we plan it?"],
    ["Person A", "Well, we can request a time through the app. That way, we can see each other's availability and find a suitable date for our hike."],
    ["Person B", "That sounds convenient. Once I receive the request, I'll take a look at my calendar and let you know the dates that work for me."],
    ["Person A", "Great! I'll send the request shortly. I'm excited about exploring nature and sharing the hiking experience with you."],
    ["Person B", "Likewise! Hiking is such a rejuvenating and adventurous activity. I can't wait to hit the trails together!"],
    ["Person A", "Absolutely! The fresh air, stunning landscapes, and the feeling of accomplishment when you reach the summit—it's all so rewarding."],
    ["Person B", "Couldn't agree more. Let's make this hiking plan happen and create some unforgettable memories on the trails!"],
]

conversation6 = [
    ["Person A", "Hi there! I noticed your profile, and I think we have a lot in common. Would you be interested in grabbing drinks sometime?"],
    ["Person B", "Hey! I checked out your profile too, and I'd love to meet up for drinks. When are you available?"],
    ["Person A", "I'm free this Friday evening. How about we meet at that new café downtown around 7 PM?"],
    ["Person B", "Sounds perfect! Friday at 7 PM works for me. Let's schedule it through the app so we have it in our calendars."],
    ["Person A", "Agreed! I just sent you a request to schedule our drinks. Let me know once you've accepted it."],
    ["Person B", "Got it! I accepted the request, and it's in my calendar now. Looking forward to meeting you on Friday!"],
    ["Person A", "Likewise! I'm excited about our upcoming drinks. It'll be nice to chat in person and get to know each other better."],
    ["Person B", "Definitely! There's something about face-to-face conversations that adds a special touch. See you on Friday!"],
    ["Person A", "Hi! I just wanted to say that I had a fantastic time meeting you for drinks. You're even more amazing in person."],
    ["Person B", "Aw, thank you! I had a great time too. It was wonderful getting to know you, and I'm glad we hit it off."],
]


conversation7 = [
    ["Person A", "Hi there! Your profile caught my attention, and I think we could have a great time together. How about we plan a beach date?"],
    ["Person B", "Hey! I'm all for a beach date. Sounds like a fantastic idea. When are you thinking of going?"],
    ["Person A", "I was thinking of going this Saturday afternoon. How does that sound to you?"],
    ["Person B", "Saturday afternoon works perfectly for me! Let's schedule it through the app to confirm the time and location."],
    ["Person A", "Great! I just sent you a request to schedule our beach date. Let me know once you've accepted it."],
    ["Person B", "I accepted the request, and our beach date is officially in my calendar. I'm really looking forward to it!"],
    ["Person A", "That's awesome! I can't wait to enjoy the sun, sand, and good company. Do you have any preferences for the beach spot?"],
    ["Person B", "Not particularly. I'm open to suggestions. I love discovering new beaches. What about you?"],
    ["Person A", "I know a beautiful secluded beach with clear waters. I think you'll love it. By the way, what kind of wine do you enjoy?"],
    ["Person B", "I'm a fan of red wines, especially Cabernet Sauvignon. But I'm open to trying new varieties. How about you?"],
]




def seed_messages():
    #Below are the seed conversations for demo user

    for message in conversation4:
        if message[0] == "Person A":
            user = 1
        else:
            user = 10
        newMessage4 = Message(
            match_id = 4, user_id = user, content = message[1]
        )
        db.session.add(newMessage4)
    db.session.commit()

    for message in conversation3:
        if message[0] == "Person A":
            user = 1
        else:
            user = 9
        newMessage3 = Message(
            match_id = 3, user_id = user, content = message[1]
        )
        db.session.add(newMessage3)
    db.session.commit()

    for message in conversation2:
        if message[0] == "Person A":
            user = 7
        else:
            user = 1
        newMessage2 = Message(
            match_id = 2, user_id = user, content = message[1]
        )
        db.session.add(newMessage2)
    db.session.commit()

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

    for message in conversation5:
        if message[0] == "Person A":
            user = 11
        else:
            user = 1
        newMessage5 = Message(
            match_id = 5, user_id = user, content = message[1]
        )
        db.session.add(newMessage5)
    db.session.commit()

    for message in conversation7:
        if message[0] == "Person A":
            user = 1
        else:
            user = 13
        newMessage7 = Message(
            match_id = 7, user_id = user, content = message[1]
        )
        db.session.add(newMessage7)
    db.session.commit()

    for message in conversation6:
        if message[0] == "Person A":
            user = 1
        else:
            user = 12
        newMessage6 = Message(
            match_id = 6, user_id = user, content = message[1]
        )
        db.session.add(newMessage6)
    db.session.commit()


def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
