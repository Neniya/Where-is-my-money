import { handleDeleteCirculation } from '../actions/userCirculations';
import { connect } from 'react-redux';

const Transaction = (props) => {
  const { circulation } = props;

  const getDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    //add formated date for change form
    circulation.formatedDate = `${date.slice(6, 10)}-${date.slice(
      3,
      5
    )}-${date.slice(0, 2)}`;

    return new Date(
      `${date.slice(3, 5)}.${date.slice(0, 2)}.${date.slice(6)}`
    ).toLocaleDateString('de-DE', options);
  };
  const handleDeleteTransaction = (e) => {
    e.preventDefault();
    const { dispatch } = props;
    const deleteTransaction = window.confirm(
      'Are you sure you want to delete transaction?'
    );

    if (deleteTransaction) {
      dispatch(handleDeleteCirculation(e.target.id));
    }
  };

  const handleChangeTransaction = (e) => {
    e.preventDefault();
    props.handleShowChangeForm(true);
  };

  return (
    <div className="tableLine">
      <span className="data_cell">{getDate(circulation.date)}</span>
      <span className="data_cell">{circulation.cost_item}</span>
      <span className="sum_cell data_cell">{`-${circulation.spending_sum} ${circulation.currency}`}</span>
      <span className="data_cell">{circulation.notes}</span>
      <span className="data_cell">{circulation.account}</span>

      <img
        className="icon"
        src={`icons/pencil-3.png`}
        alt="change"
        width="15"
        onClick={(e) => {
          handleChangeTransaction(e);
        }}
      />
      <img
        className="icon"
        src={`icons/trash-2.png`}
        alt="change"
        width="15"
        id={circulation.id}
        onClick={(e) => {
          handleDeleteTransaction(e);
        }}
      />
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(Transaction);
