import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Transactions = (props) => {
  return (
    <dir>
      <h1>Where Is My Money</h1>
      <table class="Main_table">
        <tr>
          <th>Date</th>
          <th>Item</th>
          <th>Sum</th>
          <th>Currency</th>
          <th>Note</th>
          <th>Account</th>
        </tr>
      </table>
    </dir>
  );
};

export default connect()(Transactions);
