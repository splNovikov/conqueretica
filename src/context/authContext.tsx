import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, UserInfo } from 'firebase/auth';
// Firebase:
import firebase from '../firebase';

const contextDefault = {
  createUser: firebase.createUser,
  signOut: firebase.signOut,
  signIn: firebase.signIn,
  user: null as UserInfo | null,
};

const UserContext = createContext(contextDefault);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null as UserInfo | null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...contextDefault,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
