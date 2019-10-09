import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { UserProvider } from './context/user';
import { BoardProvider } from './context/board';

render(
  <UserProvider>
    <BoardProvider>
      <App />
    </BoardProvider>
  </UserProvider>,
  document.getElementById('root')
);
