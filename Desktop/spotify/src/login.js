
import React from 'react';
import "./login.css"
import { loginUrl } from './spotify';

function Login() {
  return (
    <div className='login'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/5/56/Spotify_logo_horizontal_black.jpg'
        alt='Spotify'
      />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;
