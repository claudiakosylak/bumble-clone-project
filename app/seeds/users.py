from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

dob1 = datetime.strptime('1990-11-11', '%Y-%m-%d')

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', email='demo@aa.io', password='password', date_of_birth=dob1.date(), phone="1111111111", looking_for_gender="Women", state="California", city="Los Angeles", gender="Man")
    marnie = User(
        first_name='marnie', email='marnie@aa.io', password='password', date_of_birth=dob1.date(), phone="2222222222", looking_for_gender="Men", state="New York", city="New York City", gender="Woman")
    bobbie = User(
        first_name='bobbie', email='bobbie@aa.io', password='password', date_of_birth=dob1.date(), phone="3333333333", looking_for_gender="Women", state="New York", city="New York City", gender="Man")
    dan = User(
        first_name='dan', email='dan@aa.io', password='password', date_of_birth=dob1.date(), phone="3333333332", looking_for_gender="Women", state="New York", city="New York City", gender="Man")
    brad = User(
        first_name='brad', email='brad@aa.io', password='password', date_of_birth=dob1.date(), phone="3333333339", looking_for_gender="Women", state="New York", city="New York City", gender="Man")
    donovan = User(
        first_name='donovan', email='donovan@aa.io', password='password', date_of_birth=dob1.date(), phone="3333433339", looking_for_gender="Women", state="New York", city="New York City", gender="Man")


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(dan)
    db.session.add(brad)
    db.session.add(donovan)
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
