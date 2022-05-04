import React, { useState } from 'react';
import { connect } from 'react-redux';
import Transaction from './Transaction';
import NewTransaction from './NewTransaction';
import './Transactions.css';

const Transactions = (props) => {
  const [monthGroup, changeMonthGroup] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showChangeForm, setShowChangeForm] = useState(false);
  const emptyTransactionData = {
    sum: 0.01,
    date: '',
    costItemId: '-1',
    costItemName: '',
    notes: '',
    currencyId: '-1',
    currencyName: '',
    accountId: '-1',
    accountName: '',
  };

  const [transactionData, setTransactionData] = useState(emptyTransactionData);
  const monetaryCirculations = props.userCirculations;
  const TransactionsData = monetaryCirculations;

  const groupTransactions = () => {
    const res = monetaryCirculations.reduce((h, obj) => {
      return Object.assign(h, {
        [obj.date]: (h[obj.date] || []).concat({
          ...obj,
        }),
      });
    }, {});
    return res;
  };

  const transactionsByDate = groupTransactions();

  const calcDaySpendingSum = (movements) => {
    return movements.reduce((acc, mov) => acc + Number(mov.spending_sum), 0);
  };

  const handleOverlayOnClick = () => {
    if (showChangeForm) {
      setShowChangeForm(false);
    }
  };

  const setDataForChangeForm = (showForm, circulation) => {
    setTransactionData({
      sum: Number(circulation.spending_sum),
      date: circulation.formatedDate,
      costItemId: circulation.cost_item_id,
      costItemName: circulation.cost_item,
      notes: circulation.notes,
      currencyId: circulation.currency_id,
      currencyName: circulation.currency,
      accountId: circulation.account_id,
      accountName: circulation.account,
      id: circulation.id,
    });
    setShowChangeForm(showForm);
  };

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
            <NewTransaction
              handleSetShowNewForm={setShowNewForm}
              formType="Add"
              transactionData={emptyTransactionData}
            />
          )}

          {monthGroup
            ? Object.keys(transactionsByDate).map((date) => (
                <div key={date}>
                  <div className="table_line_day">
                    <div className="table_mounth header_cell">
                      {new Date(
                        `${date.slice(3, 5)}.${date.slice(0, 2)}.${date.slice(
                          6
                        )}`
                      ).toLocaleString('default', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="header_cell"> </div>
                    <div className=" header_cell sum_cell_day">
                      {`-${calcDaySpendingSum(transactionsByDate[date]).toFixed(
                        2
                      )} €`}
                    </div>
                  </div>
                  <div>
                    {transactionsByDate[date].map((circulation) => (
                      <Transaction
                        circulation={circulation}
                        key={circulation.id}
                        handleSetDataForChangeForm={setDataForChangeForm}
                      />
                    ))}
                  </div>
                </div>
              ))
            : TransactionsData.map((circulation) => (
                <Transaction
                  circulation={circulation}
                  key={circulation.id}
                  handleSetDataForChangeForm={setDataForChangeForm}
                />
              ))}
        </div>
      </div>
      <div className={`modal ${!showChangeForm && 'hidden'}`}>
        <NewTransaction
          handleShowChangeForm={setShowChangeForm}
          handleSetShowNewForm={setShowNewForm}
          formType="Change"
          transactionData={transactionData}
        />
      </div>
      <div
        className={`overlay ${!showChangeForm && 'hidden'}`}
        onClick={handleOverlayOnClick}
      ></div>
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
