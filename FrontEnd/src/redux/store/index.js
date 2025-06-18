// store.js
import thunk from 'redux-thunk';
import rootReducer from 'redux/reducers/index'; 
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';

const saveToLocalStorage = store => next => action => {
  next(action);
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
};

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk,saveToLocalStorage],
  });

export default store;
