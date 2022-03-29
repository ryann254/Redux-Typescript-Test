import React from 'react';
import { Provider } from 'react-redux';
import { Todos } from './components/todos';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { store } from './redux/store';
import Routes from './routes';

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
}

export default App;
