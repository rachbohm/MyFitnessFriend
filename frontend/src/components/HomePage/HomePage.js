import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const durationInDays = Math.round((new Date() - new Date(sessionUser.createdAt)) / (1000 * 60 * 60 * 24));


  return (
    <div className='home-page-container'>
      <div className='abs-container'>Abs Are Made in the Kitchen. Let's Get Tracking!</div>
      <p className='welcome-back'>Welcome Back, {sessionUser.firstName} {sessionUser.lastName}.</p>
      <img src={sessionUser.profilePicture} />
      <p className='welcome-back'>Congratulations on Being a User for {durationInDays} days.</p>
    </div>
  )
}

export default HomePage;
