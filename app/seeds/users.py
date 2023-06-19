from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
import random

female_names = [
    "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn",
    "Abigail", "Emily", "Elizabeth", "Mila", "Ella", "Avery", "Sofia", "Camila", "Aria", "Scarlett",
    "Victoria", "Madison", "Luna", "Grace", "Chloe", "Penelope", "Layla", "Riley", "Zoey", "Nora",
    "Lily", "Eleanor", "Hannah", "Lillian", "Addison", "Aubrey", "Ellie", "Stella", "Natalie", "Zoe",
    "Leah", "Hazel", "Violet", "Aurora", "Savannah", "Audrey", "Brooklyn", "Bella", "Claire", "Skylar"
]

male_names = [
    "Liam", "Noah", "William", "James", "Oliver", "Benjamin", "Elijah", "Lucas", "Mason", "Logan",
    "Alexander", "Ethan", "Jacob", "Michael", "Daniel", "Henry", "Jackson", "Sebastian", "Aiden", "Matthew",
    "Samuel", "David", "Joseph", "Carter", "Owen", "Wyatt", "John", "Jack", "Luke", "Jayden",
    "Dylan", "Grayson", "Levi", "Isaac", "Gabriel", "Julian", "Mateo", "Anthony", "Jaxon", "Lincoln",
    "Joshua", "Christopher", "Andrew", "Theodore", "Caleb", "Ryan", "Asher", "Nathan", "Thomas", "Leo"
]

gender_neutral_names = [
    "Alex", "Taylor", "Jordan", "Casey", "Riley", "Sam", "Charlie", "Jamie", "Peyton", "Reese",
    "Dakota", "Avery", "Bailey", "Parker", "Quinn", "Emerson", "Finley", "Harley", "Kai", "Rowan",
    "Sawyer", "Skyler", "Blake", "Hayden", "Morgan", "Phoenix", "River", "Arden", "Elliot", "Frankie",
    "Micah", "Tatum", "Emery", "Remy", "Sage", "Remington", "Marley", "Ashton", "Shay", "Cameron",
    "Kendall", "Drew", "Jesse"
]

states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

looking_for_gender_choices = ["Women", "Men", "Both", "Nonbinary", "Open"]

women = []
random_phone = 5555555555
for name in female_names:
    dob = datetime.strptime(f"{random.randint(1970, 2004)}-10-11", '%Y-%m-%d')
    random_phone += 1
    phone = str(random_phone)
    woman = {
        "flake_score": random.randint(1, 100),
        "first_name": name,
        "email": f"{name.lower()}@email.com",
        "password": "password",
        "date_of_birth": dob.date(),
        "phone": phone,
        "looking_for_gender": random.choice(looking_for_gender_choices),
        "state": random.choice(states),
        "city": f"{random.choice(states)} City",
        "gender": "Woman"
    }
    women.append(woman)

men = []
for male_name in male_names:
    dob_man = datetime.strptime(f"{random.randint(1970, 2004)}-10-11", '%Y-%m-%d')
    random_phone += 1
    phone_man = str(random_phone)
    man = {
        "flake_score": random.randint(1, 100),
        "first_name": male_name,
        "email": f"{male_name.lower()}@email.com",
        "password": "password",
        "date_of_birth": dob_man.date(),
        "phone": phone_man,
        "looking_for_gender": random.choice(looking_for_gender_choices),
        "state": random.choice(states),
        "city": f"{random.choice(states)} City",
        "gender": "Man"
    }
    men.append(man)

people = []
for neutral_name in gender_neutral_names:
    dob_neutral = datetime.strptime(f"{random.randint(1970, 2004)}-10-11", '%Y-%m-%d')
    random_phone += 1
    phone_neutral = str(random_phone)
    person = {
        "flake_score": random.randint(1, 100),
        "first_name": neutral_name,
        "email": f"{neutral_name.lower()}@aa.io",
        "password": "password",
        "date_of_birth": dob_neutral.date(),
        "phone": phone_neutral,
        "looking_for_gender": random.choice(looking_for_gender_choices),
        "state": random.choice(states),
        "city": f"{random.choice(states)} City",
        "gender": "Nonbinary"
    }
    people.append(person)

dob1 = datetime.strptime('1990-11-11', '%Y-%m-%d')
dob2 = datetime.strptime('1991-11-11', '%Y-%m-%d')
dob3 = datetime.strptime('1992-11-11', '%Y-%m-%d')
dob4 = datetime.strptime('1993-11-11', '%Y-%m-%d')
dob5 = datetime.strptime('1994-11-11', '%Y-%m-%d')
dob6 = datetime.strptime('1995-11-11', '%Y-%m-%d')
dob7 = datetime.strptime('1989-11-11', '%Y-%m-%d')
dob8 = datetime.strptime('1989-10-11', '%Y-%m-%d')
dob9 = datetime.strptime('1988-10-11', '%Y-%m-%d')

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        flake_score = 90, first_name='Demo', email='demo@aa.io', password='password', date_of_birth=dob1.date(), phone="1111111111", looking_for_gender="Women", state="California", city="Los Angeles", gender="Man", picture_1="https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80")
    marnie = User(
        flake_score = 80, first_name='marnie', email='marnie@aa.io', password='password', date_of_birth=dob2.date(), phone="2222222222", looking_for_gender="Men", state="New York", city="New York City", gender="Woman", picture_1="https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    bobbie = User(
        flake_score = 95, first_name='bobbie', email='bobbie@aa.io', password='password', date_of_birth=dob3.date(), phone="3333333333", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80")
    dan = User(
        flake_score = 91, first_name='dan', email='dan@aa.io', password='password', date_of_birth=dob4.date(), phone="3333333332", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    brad = User(
        flake_score = 100, first_name='brad', email='brad@aa.io', password='password', date_of_birth=dob5.date(), phone="3333333339", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    donovan = User(
        flake_score = 40, first_name='donovan', email='donovan@aa.io', password='password', date_of_birth=dob6.date(), phone="3333433339", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1567784177951-6fa58317e16b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    genevieve = User(
        flake_score = 70, first_name='genevieve', email='genevieve@aa.io', password='password', date_of_birth=dob7.date(), phone="3333436339", looking_for_gender="Men", state="New York", city="New York City", gender="Woman", picture_1="https://plus.unsplash.com/premium_photo-1679993884184-70033581920b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    jared = User(
        flake_score = 92, first_name='jared', email='jared@aa.io', password='password', date_of_birth=dob8.date(), phone="3333436239", looking_for_gender="Both", state="New York", city="New York City", gender="Nonbinary", picture_1="https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80")
    bonnie = User(
        flake_score = 88, first_name='bonnie', email='bonnie@aa.io', password='password', date_of_birth=dob9.date(), phone="3433436239", looking_for_gender="Both", state="New York", city="New York City", gender="Woman")


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(dan)
    db.session.add(brad)
    db.session.add(donovan)
    db.session.add(genevieve)
    db.session.add(jared)
    db.session.add(bonnie)
    db.session.commit()

    for woman in women:
        newUser = User(
            flake_score = woman["flake_score"], first_name = woman["first_name"], email = woman["email"], password = woman["password"], date_of_birth = woman["date_of_birth"], phone = woman["phone"], looking_for_gender = woman["looking_for_gender"], state = woman["state"], city = woman["city"], gender = woman["gender"]
        )
        db.session.add(newUser)

    db.session.commit()

    for man in men:
        newMaleUser = User(
            flake_score = man["flake_score"], first_name = man["first_name"], email = man["email"], password = man["password"], date_of_birth = man["date_of_birth"], phone = man["phone"], looking_for_gender = man["looking_for_gender"], state = man["state"], city = man["city"], gender = man["gender"]
        )
        db.session.add(newMaleUser)

    db.session.commit()

    for person in people:
        neutralUser = User(
            flake_score = person["flake_score"], first_name = person["first_name"], email = person["email"], password = person["password"], date_of_birth = person["date_of_birth"], phone = person["phone"], looking_for_gender = person["looking_for_gender"], state = person["state"], city = person["city"], gender = person["gender"]
        )
        db.session.add(neutralUser)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
