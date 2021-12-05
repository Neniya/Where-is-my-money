import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [userId, setUserId] = useState(null);
  const history = useNavigate();

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = props;
    dispatch(setAuthedUser(userId));
    history('/dashboard');
  };
  return (
    <div className="sign-in, center">
      <h1>Where is My Money...</h1>
      <img
        src={`images/money${Math.trunc(Math.random(0) * 6 + 1)}.jpg`}
        alt="My money"
        width="300"
      />
      <form
        className="sign-in sign-in-box"
        onSubmit={(e) => handleUserSubmit(e)}
      >
        <label htmlFor="user-select"> Sign in:</label>

        <select
          id="user-select"
          required
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        >
          <option value="">--Please sign in--</option>
          {props.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
};

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}
export default connect(mapStateToProps)(Login);
