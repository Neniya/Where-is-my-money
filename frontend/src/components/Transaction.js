import React from 'react';

const Transaction = (props) => {
  const { circulation } = props;
  return (
    <div className="tableLine">
      <span className="data_cell">{circulation.date}</span>
      <span className="data_cell">{circulation.cost_item}</span>
      <span className="sum_cell data_cell">{`${circulation.spending_sum} ${circulation.currency}`}</span>
      <span className="data_cell">{circulation.notes}</span>
      <span className="data_cell">{circulation.account}</span>
    </div>
  );
};

export default Transaction;
