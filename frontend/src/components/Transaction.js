import React from 'react';

const Transaction = (props) => {
  const { circulation } = props;
  return (
    <div className="tableLine">
      <span>{circulation.date}</span>
      <span>{circulation.cost_item}</span>
      <span>{circulation.spending_sum}</span>
      <span>{circulation.currency}</span>
      <span>{circulation.notes}</span>
      <span>{circulation.account}</span>
    </div>
  );
};

export default Transaction;
