import React, { useState } from 'react';
import { connect } from 'react-redux';
import Transaction from './Transaction';

const Transactions = (props) => {
  const [monthGroup, changeMonthGroup] = useState(false);
  const monetaryCirculations = props.userCirculations.monetary_circulations;
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
      <div>
        <label>
          <input
            type="checkbox"
            onChange={() => changeMonthGroup(!monthGroup)}
          />
          Group by month
        </label>
      </div>

      <div className="Main_table">
        <div className="table_header">
          <span className="column_date, header_cell">Date</span>
          <span className="column_Item, header_cell">Item</span>
          <span className="column_sum, header_cell">Sum</span>
          <span className="column_currency, header_cell">Currency</span>
          <span className="column_notes, header_cell">Notes</span>
          <span className="column_account, header_cell">Account</span>
        </div>
        {monthGroup
          ? Object.keys(transactionsByMonth).map((yearMonth) => (
              <div>
                <div className="table_mounth" key={yearMonth}>
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
  );
};
function mapStateToProps({ userCirculations }) {
  return {
    userCirculations,
  };
}

export default connect(mapStateToProps)(Transactions);
