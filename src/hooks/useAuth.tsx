import React, {createContext, useContext, useState} from 'react';

export interface AuthContextInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthUserContext = createContext<undefined | AuthContextInterface>(
  undefined,
);

export const AuthUserProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthUserContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw Error('useAuth hook called without its provider');
  }
  return context;
}
