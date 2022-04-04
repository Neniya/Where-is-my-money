import React, { useState } from 'react';
import { connect } from 'react-redux';
import Transaction from './Transaction';
import NewTransaction from './NewTransaction';
import './Transactions.css';

const Transactions = (props) => {
  const [monthGroup, changeMonthGroup] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const monetaryCirculations = props.userCirculations;
  const TransactionsData = monetaryCirculations;
  console.log(monetaryCirculations);

  const groupTransactions = () => {
    const res = monetaryCirculations.reduce((h, obj) => {
      return Object.assign(h, {
        [obj.date_year_month]: (h[obj.date_year_month] || []).concat({
          ...obj,
        }),
      });
    }, {});
    return res;
  };

  const transactionsByMonth = groupTransactions();
  console.log(transactionsByMonth);

  return (
    <div>
      <h1>Where Is My Money</h1>
      <div className="transactions">
        <div className="checkbox_mounth">
          <label>
            <input
              type="checkbox"
              onChange={() => changeMonthGroup(!monthGroup)}
            />
            Group by month
          </label>
        </div>

        <div className="main_table">
          <div className="table_header">
            <span className="col, column_date, header_cell">
              <h4>Date</h4>
            </span>
            <span className="col, column_Item, header_cell">
              <h4>Item</h4>
            </span>
            <span className="col, column_sum, header_cell">
              <h4>Sum</h4>
            </span>
            <span className="col, column_currency, header_cell">
              <h4>Currency</h4>
            </span>
            <span className="col, column_notes, header_cell">
              <h4>Notes</h4>
            </span>
            <span className="col column_account header_cell">
              <h4>Account</h4>
            </span>
          </div>

          <button
            className="add_transaction"
            title="add transaction"
            onClick={() => setShowNewForm(!showNewForm)}
          >
            <b>+</b>
          </button>
          {showNewForm && (
            <NewTransaction handleSetShowNewForm={setShowNewForm} />
          )}

          {monthGroup
            ? Object.keys(transactionsByMonth).map((yearMonth) => (
                <div key={yearMonth}>
                  <div className="table_mounth">
                    {new Date(yearMonth).toLocaleString('default', {
                      month: 'long',
                    })}
                  </div>
                  <div>
                    {transactionsByMonth[yearMonth].map((circulation) => (
                      <Transaction
                        circulation={circulation}
                        key={circulation.id}
                      />
                    ))}
                  </div>
                </div>
              ))
            : TransactionsData.map((circulation) => (
                <Transaction circulation={circulation} key={circulation.id} />
              ))}
        </div>
      </div>
    </div>
  );
};
function mapStateToProps({ userCirculations }) {
  return {
    userCirculations,
  };
}

export default connect(mapStateToProps)(Transactions);
