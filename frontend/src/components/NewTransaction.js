import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  handleAddUserCirculation,
  handleChangeUserCirculation,
} from '../actions/userCirculations';

import './NewTransaction.css';

const getOptionName = (e) => {
  return e.target.options[e.target.selectedIndex].innerHTML;
};

const NewTransaction = (props) => {
  const { formType, transactionData } = props;
  const [sum, setSum] = useState(transactionData.sum);
  const [date, setDate] = useState(transactionData.date);
  const [costItemId, setCostItemID] = useState(transactionData.costItemId);
  const [costItemName, setCostItemName] = useState(
    transactionData.costItemName
  );
  const [notes, setNotes] = useState(transactionData.notes);
  const [currencyId, setCurrencyId] = useState(transactionData.currencyId);
  const [currencyName, setCurrencyName] = useState(
    transactionData.currencyName
  );
  const [accountId, setAccountId] = useState(transactionData.accountId);
  const [accountName, setAccountName] = useState(transactionData.accountName);
  useEffect(() => {
    setSum(transactionData.sum);
    setDate(transactionData.date);
    setCostItemID(transactionData.costItemId);
    setCostItemName(transactionData.costItemName);
    setNotes(transactionData.notes);
    setCurrencyId(transactionData.currencyId);
    setCurrencyName(transactionData.currencyName);
    setAccountId(transactionData.accountId);
    setAccountName(transactionData.accountName);
  }, [props]);

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
      timestamp: formatDate.getTime(),
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

    if (formType === 'Change') {
      circulation.id = transactionData.id;
      dispatch(handleChangeUserCirculation(circulation));
      props.handleShowChangeForm(false);
    } else {
      dispatch(handleAddUserCirculation(circulation));
    }

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

  const handleChangeTransaction = (e) => {
    e.preventDefault();
    props.handleShowChangeForm(false);
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      props.handleShowChangeForm(false);
    }
  });

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
                €
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
      <div className="buttons">
        {formType === 'Change' && (
          <input
            className="cancelBtn"
            type="button"
            className="button_cancel, btn"
            value="Cancel"
            onClick={(e) => {
              handleChangeTransaction(e);
            }}
          />
        )}
        <input type="submit" className="button_submit, btn" value={formType} />
      </div>
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
