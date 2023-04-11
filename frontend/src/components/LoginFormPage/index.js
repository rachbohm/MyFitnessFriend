import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const handleSubmitDemo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password"}))
  }

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-form-title">Log In</h1>
        <ul className="login-form-errors">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="login-form-input-group">
          <label htmlFor="username-email">Username or Email</label>
          <input
            id="username-email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="login-form-input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-form-submit">Log In</button>
      {/* <form onSubmit={handleSubmitDemo} className="demo-form"> */}
          <button onClick={handleSubmitDemo} className="demo-form-button">
          Demo Login
        </button>
      {/* </form> */}
      </form>
    </div>
  );
}

export default LoginFormPage;
