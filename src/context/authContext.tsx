import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, UserInfo } from 'firebase/auth';
// Firebase:
import firebase from '../firebase';

const contextDefault = {
  createUser: firebase.createUser,
  signOut: firebase.signOut,
  signIn: firebase.signIn,
  user: null as UserInfo | null,
  isLoading: true,
};

const UserContext = createContext(contextDefault);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null as UserInfo | null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    ...contextDefault,
    user,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
