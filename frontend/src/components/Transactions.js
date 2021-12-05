import React, { useState, useEffect } from 'react';

const Transactions = (props) => {
  return (
    <dir>
      <h1>Where Is My Money</h1>
      <table class="Main_table">
        <tr>
          <th>Item</th>
          <th>Spend</th>
          <th>Sum</th>
          <th>Currency</th>
          <th>Notice</th>
          <th>Account</th>
        </tr>
      </table>
    </dir>
  );
};

export default connect()(Transactions);
