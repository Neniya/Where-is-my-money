import React, { useState } from 'react';

const NewTransaction = (props) => {
  const [sum, setSum] = useState(0.01);
  return (
    <div className="tableLine">
      <input className="data_cell" type="date" />
      <select className="data_cell">
        <option>gym</option>
      </select>
      <input
        className="sum_cell data_cell"
        type="number"
        step="0.01"
        value={sum}
        onChange={(e) => {
          setSum(e.target.value);
        }}
      ></input>
      <select className="data_cell">
        <option>euro</option>
      </select>
      <input className="data_cell" type="text"></input>
      <select className="data_cell">
        <option>account</option>
      </select>
    </div>
  );
};

export default NewTransaction;
