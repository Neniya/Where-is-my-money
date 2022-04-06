"""empty message

Revision ID: 119974b82b54
Revises: 1169c58dbee9
Create Date: 2022-04-04 18:15:45.129209

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '119974b82b54'
down_revision = '1169c58dbee9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('monetary_circulation', sa.Column('timestamp', sa.BigInteger(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('monetary_circulation', 'timestamp')
    # ### end Alembic commands ###