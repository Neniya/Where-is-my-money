"""empty message

Revision ID: ddc7ff379091
Revises: c37c77ae8cf2
Create Date: 2021-06-02 18:34:38.297360

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ddc7ff379091'
down_revision = 'c37c77ae8cf2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('cost_items', sa.Column('type_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'cost_items', 'cost_types', ['type_id'], ['id'])
    op.add_column('monetary_circulation', sa.Column('account_id', sa.Integer(), nullable=False))
    op.add_column('monetary_circulation', sa.Column('currency_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'monetary_circulation', 'currency', ['currency_id'], ['id'])
    op.create_foreign_key(None, 'monetary_circulation', 'accounts', ['account_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'monetary_circulation', type_='foreignkey')
    op.drop_constraint(None, 'monetary_circulation', type_='foreignkey')
    op.drop_column('monetary_circulation', 'currency_id')
    op.drop_column('monetary_circulation', 'account_id')
    op.drop_constraint(None, 'cost_items', type_='foreignkey')
    op.drop_column('cost_items', 'type_id')
    # ### end Alembic commands ###
