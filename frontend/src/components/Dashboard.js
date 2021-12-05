import React from 'react';
import Transactions from './Transactions';
import { connect } from 'react-redux';

const Dashboard = (props) => {
  return (
    <div>
      <Transactions />
    </div>
  );
};

export default connect()(Dashboard);
