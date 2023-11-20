import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/login/authSlice";
import { applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};


const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  devTools: true,
});

export const persistor = persistStore(store)