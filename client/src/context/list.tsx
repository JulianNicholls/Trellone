import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { useCurrentUser } from './user';
import { useBoards } from './board';

const ListContext = createContext<ListState>({} as ListState);

interface ListProviderProps {
  children: React.ReactNode;
}

export const ListProvider = ({ children }: ListProviderProps): JSX.Element => {
  const { token }: UserState = useCurrentUser();
  const { currentBoard } = useBoards();
  const [lists, setLists] = useState<Array<List>>([]);

  useEffect(() => {
    const loadLists = async () => {
      try {
        const response = await axios.get(`/api/lists/board/${currentBoard!._id}`, {
          headers: { Authorization: `bearer ${token}` },
        });

        setLists(response.data);
      } catch (err) {
        console.error('List loading failed:', err);
      }
    };

    if (token && currentBoard) loadLists();
  }, [token, currentBoard]);

  const addTask = async (text: string, order: number, listId: string) => {
    try {
      const response = await axios.post(
        `/api/lists/createTask/${listId}`,
        { text, order },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );

      const listIdx = lists.findIndex(({ _id }) => _id === listId);

      const newLists = [...lists];
      newLists[listIdx] = response.data;
      setLists(newLists);
    } catch (err) {
      console.error('Adding task failed:', err);
    }
  };

  const updateTask = (task: Task, listId: string): void => {
    const newLists: Array<List> = [...lists];
    const list: List | undefined = newLists.find(({ _id }) => _id === listId);

    const taskIdx = list!.tasks.findIndex(({ _id }) => _id === task._id);
    list!.tasks[taskIdx] = task;

    updateList(list!);
  };

  const updateList = async (list: List) => {
    try {
      await axios.put(`/api/lists/${list._id}/update`, list, {
        headers: { Authorization: `bearer ${token}` },
      });

      const listIdx = lists.findIndex(({ _id }) => _id === list._id);

      const newLists = [...lists];
      newLists[listIdx] = list;
      setLists(newLists);
    } catch (err) {
      console.error('Updating list failed:', err);
    }
  };

  const state: ListState = {
    lists,
    addTask,
    updateTask,
    updateList,
  };

  return <ListContext.Provider value={state}>{children}</ListContext.Provider>;
};

export const useLists = () => {
  const context = useContext(ListContext);

  if (context === undefined)
    throw new Error('useLists must be used within a ListProvider block');

  return context;
};
