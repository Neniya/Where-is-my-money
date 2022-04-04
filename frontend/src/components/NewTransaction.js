import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleAddUserCirculation } from '../actions/userCirculations';

import './NewTransaction.css';

const getOptionName = (e) => {
  return e.target.options[e.target.selectedIndex].innerHTML;
};

const NewTransaction = (props) => {
  const [sum, setSum] = useState(0.01);
  const [date, setDate] = useState('');
  const [costItemId, setCostItemID] = useState('-1');
  const [costItemName, setCostItemName] = useState('');
  const [notes, setNotes] = useState('');
  const [currencyId, setCurrencyId] = useState('-1');
  const [currencyName, setCurrencyName] = useState('');
  const [accountId, setAccountId] = useState('-1');
  const [accountName, setAccountName] = useState('');

  const handleSetCostItem = (e) => {
    setCostItemID(e.target.value);
    setCostItemName(getOptionName(e));
  };
  const handleSetCurrency = (e) => {
    setCurrencyId(e.target.value);
    setCurrencyName(getOptionName(e));
  };
  const handleSetAccount = (e) => {
    setAccountId(e.target.value);
    setAccountName(getOptionName(e));
  };

  const { costItems, userAccounts } = props;

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = props;
    const formatDate = new Date(`${date}T00:00`);
    const formatMonth = String(formatDate.getMonth() + 1);
    const circulation = {
      date: date,
      date_month: formatMonth,
      date_day: formatDate.getDate(),
      date_year: formatDate.getFullYear(),
      date_year_month: `${formatDate.getFullYear()}-${
        formatMonth.length === 1 ? `0${formatMonth}` : formatMonth
      }`,
      cost_item_id: costItemId,
      cost_item: costItemName,
      notes,
      income_sum: '0',
      spending_sum: sum,
      currency_id: currencyId,
      currency: currencyName,
      account_id: accountId,
      account: accountName,
    };

    dispatch(handleAddUserCirculation(circulation));

    setSum(0.01);
    setDate('');
    setCostItemID('-1');
    setCostItemName('');
    setNotes('');
    setCurrencyId('-1');
    setCurrencyName('');
    setAccountId('-1');
    setAccountName('');
    props.handleSetShowNewForm(false);
  };

  return (
    <form
      className="new_transaction_form el_radius"
      onSubmit={(e) => handleUserSubmit(e)}
    >
      <div className="main_data_new_transaction">
        <div className="left_data vertical_data">
          <div>
            <label className="lbl">Date:</label>
            <input
              required
              className="new_cell el_radius "
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div>
            <span>
              <label className="lbl">Title:</label>

              <select
                required
                className="new_cell el_radius"
                id="costItem"
                value={costItemId}
                onChange={(e) => handleSetCostItem(e)}
              >
                <option key="-1" value="">
                  --select--
                </option>
                {costItems.map((costItem) => (
                  <option key={costItem.id} value={costItem.id}>
                    {costItem.name}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>

        <div className="right_data vertical_data">
          <div>
            <label className="lbl">From:</label>

            <select
              required
              className="new_cell el_radius"
              id="account"
              value={accountId}
              onChange={(e) => handleSetAccount(e)}
            >
              <option key="-1" value="">
                --select account--
              </option>
              {userAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="lbl">Sum:</label>
            <input
              required
              className="sum_cell new_cell el_radius"
              type="number"
              step="0.01"
              value={sum}
              onChange={(e) => {
                setSum(e.target.value);
              }}
            ></input>

            <select
              required
              className="new_cell el_radius "
              id="currency"
              value={currencyId}
              onChange={(e) => {
                handleSetCurrency(e);
              }}
            >
              <option key="-1" value="">
                --select currency--
              </option>
              <option key="0" value="0">
                euro
              </option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="lbl">Notes:</label>
        <input
          type="text"
          className="new_cell el_radius new_notes"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        ></input>
      </div>
      <input type="submit" className="button_add" value="add" />
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
