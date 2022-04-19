import React from 'react';

const Transaction = (props) => {
  const { circulation } = props;
  const getDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(
      `${date.slice(3, 5)}.${date.slice(0, 2)}.${date.slice(6)}`
    ).toLocaleDateString('de-DE', options);
  };
  return (
    <div className="tableLine">
      <span className="data_cell">{getDate(circulation.date)}</span>
      <span className="data_cell">{circulation.cost_item}</span>
      <span className="sum_cell data_cell">{`-${circulation.spending_sum} ${circulation.currency}`}</span>
      <span className="data_cell">{circulation.notes}</span>
      <span className="data_cell">{circulation.account}</span>
    </div>
  );
};

export default Transaction;
