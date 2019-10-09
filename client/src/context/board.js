import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useCurrentUser } from './user';

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const { token } = useCurrentUser();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await axios.get('/api/boards', {
          headers: {
            Authorization: token,
          },
        });

        setBoards(response.data);
      } catch (err) {
        console.log('Board loading failed:', err);
      }
    };

    if (token) loadBoards();
  }, [token]);

  return <BoardContext.Provider value={boards}>{children}</BoardContext.Provider>;
};

BoardProvider.propTypes = {
  children: PropTypes.element,
};

export const useBoards = () => {
  const context = useContext(BoardContext);

  if (context === undefined)
    throw new Error('useBoards must be used within a BoardProvider block');

  return context;
};
