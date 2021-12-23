import React, { useState } from 'react';
import './NewTransaction.css';

const NewTransaction = (props) => {
  const [sum, setSum] = useState(0.01);
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
                <option>gym</option>
              </select>
            </span>
          </div>
        </div>

        <div className="right_data vertical_data">
          <div>
            <label className="lbl">From:</label>
            <select className="new_cell el_radius">
              <option>account</option>
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
        <lable className="lbl">Notes:</lable>
        <input type="text" className="new_cell el_radius new_notes"></input>
      </div>
    </form>
  );
};

export default NewTransaction;
