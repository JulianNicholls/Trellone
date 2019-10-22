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
        const response = await axios.get(`/api/lists/board/${currentBoard._id}`, {
          headers: {
            Authorization: token,
          },
        });

        setLists(response.data);
      } catch (err) {
        console.error('List loading failed:', err);
      }
    };

    if (token && currentBoard) loadLists();
  }, [token, currentBoard]);

  const addTask = async (text, order, listId) => {
    try {
      await axios.post(
        `/api/lists/createTask/${listId}`,
        { text, order },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const newLists = [...lists];
      const updateList = newLists.find(({ _id }) => _id === listId);

      updateList.tasks.push({ text, order, archived: false });
      setLists(newLists);
    } catch (err) {
      console.error('Adding task failed:', err);
    }
  };

  const updateTask = (task, listId) => {
    const newLists = [...lists];
    const list = newLists.find(({ _id }) => _id === listId);

    const taskIdx = list.tasks.findIndex(({ _id }) => _id === task._id);
    list.tasks[taskIdx] = task;

    updateList(list);
  };

  const updateList = async list => {
    try {
      await axios.put(`/api/lists/update/${list._id}`, list, {
        headers: {
          Authorization: token,
        },
      });

      const newLists = [...lists];
      const listIdx = newLists.findIndex(({ _id }) => _id === list._id);

      newLists[listIdx] = list;
      setLists(newLists);
    } catch (err) {
      console.error('Updating list failed:', err);
    }
  };

  const state = {
    lists,
    addTask,
    updateTask,
    updateList,
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
