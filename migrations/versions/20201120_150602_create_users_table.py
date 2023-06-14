"""create_users_table

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('phone', sa.String(length=10), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('date_of_birth', sa.Date(), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('about', sa.String(length=1200)),
    sa.Column('employment_title', sa.String(length=50)),
    sa.Column('employment_company', sa.String(length=50)),
    sa.Column('education_school', sa.String(length=50)),
    sa.Column('picture_1', sa.String(length=255), nullable=False),
    sa.Column('picture_2', sa.String(length=255)),
    sa.Column('picture_3', sa.String(length=255)),
    sa.Column('picture_4', sa.String(length=255)),
    sa.Column('picture_5', sa.String(length=255)),
    sa.Column('picture_6', sa.String(length=255)),
    sa.Column('looking_for_gender', sa.String(length=20), nullable=False),
    sa.Column('state', sa.String(length=40), nullable=False),
    sa.Column('city', sa.String(length=40), nullable=False),
    sa.Column('gender', sa.String(length=20), nullable=False),
    sa.Column('flake_score', sa.Numeric(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('phone')
    )

    op.create_table('matches',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('scheduled_status', sa.Boolean()),
    sa.Column('created_at', sa.DateTime()),
    sa.Column('user_1_id', sa.Integer(), nullable=False),
    sa.Column('user_2_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_1_id'], ['users.id']),
    sa.ForeignKeyConstraint(['user_2_id'], ['users.id']),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###qqqqqqqqq


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('matches')
    op.drop_table('users')
    # ### end Alembic commands ###
