import React, { useState } from 'react';
import { connect } from 'react-redux';

import './NewTransaction.css';

const NewTransaction = (props) => {
  const [sum, setSum] = useState(0.01);
  const { costItems, userAccounts } = props;
  console.log('aacc', userAccounts);

  return (
    <form className="new_transaction_form el_radius">
      <div className="main_data_new_transaction">
        <div className="left_data vertical_data">
          <div>
            <label className="lbl">Date:</label>
            <input className="new_cell el_radius " type="date" />
          </div>
          <div>
            <span>
              <label className="lbl">Title:</label>
              <select className="new_cell el_radius">
                {costItems.map((costItem) => (
                  <option key={costItem.id}>{costItem.name}</option>
                ))}
              </select>
            </span>
          </div>
        </div>

        <div className="right_data vertical_data">
          <div>
            <label className="lbl">From:</label>
            <select className="new_cell el_radius">
              {userAccounts.map((account) => (
                <option key={account.id}>{account.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="lbl">Sum:</label>
            <input
              className="sum_cell new_cell el_radius"
              type="number"
              step="0.01"
              value={sum}
              onChange={(e) => {
                setSum(e.target.value);
              }}
            ></input>
            <select className="new_cell el_radius ">
              <option>euro</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="lbl">Notes:</label>
        <input type="text" className="new_cell el_radius new_notes"></input>
      </div>
    </form>
  );
};

function mapStateToProps({ costItems, accounts }) {
  return {
    costItems,
    userAccounts: accounts,
  };
}

export default connect(mapStateToProps)(NewTransaction);
