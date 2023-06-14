from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

dob1 = datetime.strptime('1990-11-11', '%Y-%m-%d')

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', email='demo@aa.io', password='password', date_of_birth=dob1.date(), phone="1111111111", looking_for_gender="Women", state="California", city="Los Angeles", gender="Man", picture_1="https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80")
    marnie = User(
        first_name='marnie', email='marnie@aa.io', password='password', date_of_birth=dob1.date(), phone="2222222222", looking_for_gender="Men", state="New York", city="New York City", gender="Woman", picture_1="https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    bobbie = User(
        first_name='bobbie', email='bobbie@aa.io', password='password', date_of_birth=dob1.date(), phone="3333333333", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80")
    dan = User(
        first_name='dan', email='dan@aa.io', password='password', date_of_birth=dob1.date(), phone="3333333332", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    brad = User(
        first_name='brad', email='brad@aa.io', password='password', date_of_birth=dob1.date(), phone="3333333339", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    donovan = User(
        first_name='donovan', email='donovan@aa.io', password='password', date_of_birth=dob1.date(), phone="3333433339", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1567784177951-6fa58317e16b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")


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
