"""Add completed fields to user_activities

Revision ID: 3c27c6f19b24
Revises: 7a42a7de2345
Create Date: 2025-01-25 01:12:49.066441

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3c27c6f19b24'
down_revision = '7a42a7de2345'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('user_activities', schema=None) as batch_op:
        batch_op.add_column(sa.Column('completed', sa.Boolean(), nullable=False, server_default=sa.text('false')))
        batch_op.add_column(sa.Column('completed_at', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('completed_int_time', sa.Boolean(), nullable=False, server_default=sa.text('false')))

def downgrade():
    with op.batch_alter_table('user_activities', schema=None) as batch_op:
        batch_op.drop_column('completed')
        batch_op.drop_column('completed_at')
        batch_op.drop_column('completed_int_time')