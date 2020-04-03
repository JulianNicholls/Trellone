import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { useCurrentUser } from './user';

const BoardContext = React.createContext<BoardState>({} as BoardState);

interface BoardProviderProps {
  children: React.ReactNode;
}

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const { token } = useCurrentUser();
  const [boards, setBoards] = useState<Array<Board>>([]);
  const [currentBoard, setCurrentBoard] = useState<Board | undefined>(undefined);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await axios.get('/api/boards', {
          headers: { Authorization: `bearer ${token}` },
        });

        setBoards(response.data);
      } catch (err) {
        console.error('Board loading failed:', err);
      }
    };

    if (token) loadBoards();
  }, [token]);

  const boardById = (boardId: string): Board | undefined => {
    const board = boards.find(({ _id }) => _id === boardId);

    if (boards.length > 0 && !board)
      console.error(`board ID:`, boardId, 'not found');

    setCurrentBoard(board); // Assume it's become the current one

    return board;
  };

  const state = {
    boards,
    boardById,
    currentBoard,
  };

  return <BoardContext.Provider value={state}>{children}</BoardContext.Provider>;
};

export const useBoards = (): BoardState => {
  const context: BoardState = useContext(BoardContext);

  if (context === undefined)
    throw new Error('useBoards must be used within a BoardProvider block');

  return context;
};
