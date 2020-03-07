import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { UserProvider } from './context/user';
import { BoardProvider } from './context/board';
import { ListProvider } from './context/list';

// interface Children {
//   children: JSX.Element | Array<JSX.Element>
// }

// function combineProviders(...providers: Array<JSX.Element>): JSX.Element {
//   return ({ children }: Children): JSX.Element => {
//     providers.reduce((prev: JSX.Element, CurrentProvider: JSX.Element): JSX.Element => <CurrentProvider>{prev}</CurrentProvider>, children)
//   }
// };

// const CombinedProviders: JSX.Element = combineProviders(
//   UserProvider, BoardProvider, ListProvider
// );

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
