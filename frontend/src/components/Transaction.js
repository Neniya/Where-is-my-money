import React from 'react';

const Transaction = (props) => {
  const { circulation } = props;
  return (
    <tr className="tableLine">
      <th>{circulation.date}</th>
      <th>{circulation.cost_item}</th>
      <th>{circulation.spending_sum}</th>
      <th>{circulation.currency}</th>
      <th>{circulation.notes}</th>
      <th>{circulation.account_id}</th>
    </tr>
  );
};

export default Transaction;
