import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { UserProvider } from './context/user';
import { BoardProvider } from './context/board';
import { ListProvider } from './context/list';

render(
  <UserProvider>
    <BoardProvider>
      <ListProvider>
        <App />
      </ListProvider>
    </BoardProvider>
  </UserProvider>,
  document.getElementById('root')
);
