import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const EMPTY_USER = {
  displayName: '',
  avatarURL: '',
  email: '',
};

const UserContext = createContext<UserState>({} as UserState);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(EMPTY_USER);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const loadUser = async (userToken: string) => {
      setToken(userToken);

      try {
        const response = await axios.get('/api/users/current', {
          headers: { Authorization: `bearer ${userToken}` },
        });

        setUser(response.data.user);
      } catch (err) {
        console.log('Token expired');
        setToken('');
        localStorage.removeItem('trelloneAuth');
      }
    };

    const lsToken = localStorage.trelloneAuth;

    if (lsToken) loadUser(lsToken);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      const { token: userToken, user: loggedinUser } = response.data;
      setToken(userToken);
      localStorage.trelloneAuth = userToken;
      setUser(loggedinUser);

      return { ok: true };
    } catch (error) {
      return { error };
    }
  };

  const signup = async (
    email: string,
    password: string,
    displayName: string,
    avatarURL: string
  ) => {
    let response;

    try {
      response = await axios.post('/auth/signup', {
        displayName,
        avatarURL,
        email,
        password,
      });

      const { token: userToken, user: newUser } = response.data;
      setToken(userToken);
      localStorage.trelloneAuth = userToken;
      setUser(newUser);

      return { ok: true };
    } catch (err) {
      return err.response;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('trelloneAuth');
    setToken('');
    setUser(EMPTY_USER);
  };

  const userState = { token, user, login, signup, logout };

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};

export const useCurrentUser = (): UserState => {
  const context: UserState = useContext(UserContext);

  if (context === undefined)
    throw new Error('useCurrentUser must be used within a UserProvider block');

  return context;
};
