import '../App.css';
import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);

  return (
    <BrowserRouter>
      <Fragment>
        {props.loading && <LoadingBar />}
        <div className="App">
          <Routes>
            <Route
              path="/"
              exact
              element={props.loading ? null : <Login />}
            ></Route>
            <Route path="/dashboard" exact element={<Dashboard />} />
          </Routes>
        </div>
      </Fragment>
    </BrowserRouter>
  );
}

function mapStateToProps({ users }) {
  return {
    loading: users === {},
  };
}

export default connect(mapStateToProps)(App);
