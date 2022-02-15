import React from 'react';
import { Provider } from 'react-redux';
import { Todos } from './components/todos';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { store } from './redux/store';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Todos />
      </Provider>
    </div>
  );
}

export default App;
