import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li className="session-links">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    );
  }

  return (
    <ul className='nav-bar-container'>
      <li className="left-side">
        <NavLink exact to="/" className="logo"><i className="fa-solid fa-person-running"></i>MyFitnessFriend</NavLink>
        <NavLink to="/food/diary">Food Diary</NavLink>
        <NavLink to="/food/mine">My Foods</NavLink>
        <NavLink to="/meal/mine">My Meals</NavLink>
        <NavLink to="/search">Search</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
