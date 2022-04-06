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
      console.log(`${obj.spending_sum}`);
      return Object.assign(h, {
        [obj.date]: (h[obj.date] || []).concat({
          ...obj,
        }),
      });
    }, {});
    return res;
  };

  const transactionsByDate = groupTransactions();
  console.log(transactionsByDate);

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
            Group by date
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
            ? Object.keys(transactionsByDate).map((date) => (
                <div key={date}>
                  <div className="table_mounth">
                    {new Date(
                      `${date.slice(3, 5)}.${date.slice(0, 2)}.${date.slice(6)}`
                    ).toLocaleString('default', {
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div>
                    {transactionsByDate[date].map((circulation) => (
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
    userCirculations: userCirculations.sort(
      (a, b) => b.timestamp - a.timestamp
    ),
  };
}

export default connect(mapStateToProps)(Transactions);
