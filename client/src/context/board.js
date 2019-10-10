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
        console.error('Board loading failed:', err);
      }
    };

    if (token) loadBoards();
  }, [token]);

  const boardById = boardId => {
    const board = boards.find(({ _id }) => _id === boardId);

    if (boards.length > 0 && !board)
      console.error(`board ID:`, boardId, 'not found');

    return board;
  };

  const state = {
    boards,
    boardById,
  };

  return <BoardContext.Provider value={state}>{children}</BoardContext.Provider>;
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
