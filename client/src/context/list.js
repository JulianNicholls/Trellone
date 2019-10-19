import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useCurrentUser } from './user';
import { useBoards } from './board';

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const { token } = useCurrentUser();
  const { currentBoard } = useBoards();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const loadLists = async () => {
      try {
        let response = await axios.get(`/api/lists/board/${currentBoard._id}`, {
          headers: {
            Authorization: token,
          },
        });

        setLists(response.data);
      } catch (err) {
        console.error('List loading failed:', err);
      }
    };

    if (token) loadLists();
  }, [token, currentBoard]);

  const state = {
    lists,
  };

  return <ListContext.Provider value={state}>{children}</ListContext.Provider>;
};

ListProvider.propTypes = {
  children: PropTypes.element,
};

export const useLists = () => {
  const context = useContext(ListContext);

  if (context === undefined)
    throw new Error('useLists must be used within a ListProvider block');

  return context;
};
