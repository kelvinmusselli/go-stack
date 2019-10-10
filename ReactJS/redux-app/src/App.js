import React from 'react';
import { Router } from  'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './styles/global';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';

import Routes from './routes';

import './config/reactotronConfig';
import history from './services/history';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header/>
        <Routes/>
        <GlobalStyle/>
        <ToastContainer autoClose={3000}/>
      </Router>
    </Provider>
  );
}

export default App;
