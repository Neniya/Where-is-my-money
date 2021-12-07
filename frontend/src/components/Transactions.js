import React from 'react';
import { connect } from 'react-redux';
import Transaction from './Transaction';

const Transactions = (props) => {
  const monetaryCirculations = props.userCirculations.monetary_circulations;
  console.log(monetaryCirculations);

  return (
    <div>
      <h1>Where Is My Money</h1>
      <table className="Main_table">
        <tbody>
          <tr className="table_header">
            <th>Date</th>
            <th>Item</th>
            <th>Sum</th>
            <th>Currency</th>
            <th>Note</th>
            <th>Account</th>
          </tr>

          {monetaryCirculations.map((circulation) => (
            <Transaction circulation={circulation} key={circulation.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
function mapStateToProps({ userCirculations }) {
  return {
    userCirculations,
  };
}

export default connect(mapStateToProps)(Transactions);
