import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

// Firebase
import firebase from '../../firebase';
// Components
import AppRoutes from '../AppRoutes';
// Styles
import './App.scss';
import Header from '../Header';

const App = () => {
  const [user] = useAuthState(firebase.auth);

  return (
    <div className="app">
      <Header user={user} />
      <br />
      <nav>
        <Link to="/">Home</Link>
        <Link to="dashboard">Dashboard</Link>
      </nav>
      <br />
      <AppRoutes />
    </div>
  );
};

export default App;
