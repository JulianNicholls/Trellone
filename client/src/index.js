import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { UserProvider } from './context/user';

render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
