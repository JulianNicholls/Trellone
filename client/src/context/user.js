import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: '',
    displayName: '',
    avatarURL: '',
    email: '',
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.element,
};

export const useCurrentUser = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error('useCurrentUser must be used within a UserProvider block');

  return context;
};
