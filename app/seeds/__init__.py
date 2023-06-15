from flask.cli import AppGroup
from .users import seed_users, undo_users
from .matches import seed_matches, undo_matches
from .requested_matches import seed_requested_matches, undo_requested_matches
from .messages import seed_messages, undo_messages
from .dates import seed_dates, undo_dates
from .date_reports import seed_date_reports, undo_date_reports
from .date_requests import seed_date_requests, undo_date_requests

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_date_requests()
        undo_date_reports()
        undo_dates()
        undo_messages()
        undo_requested_matches()
        undo_matches()
        undo_users()
    seed_users()
    seed_matches()
    seed_requested_matches()
    seed_messages()
    seed_dates()
    seed_date_reports()
    seed_date_requests()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_date_requests()
    undo_date_reports()
    undo_dates()
    undo_messages()
    undo_requested_matches()
    undo_matches()
    undo_users()
    # Add other undo functions here
