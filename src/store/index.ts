import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authSlice, { signInUser, signOutUser } from './features/authSlice';
import menuSlice from './features/menuSlice';
import { type Persistor } from 'redux-persist/es/types';
import * as Sentry from '@sentry/react';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  menu: menuSlice,
});

const persistentReducer = persistReducer(persistConfig, rootReducer);
const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  actionTransformer: action => {
    if ([signInUser.type, signOutUser.type].includes(action.type)) {
      return null;
    }
    return action;
  },
});

export const store = configureStore({
  reducer: persistentReducer,
  enhancers: getDefaultEnhancers => {
    return getDefaultEnhancers().concat(sentryReduxEnhancer);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain "useDispatch" and "useSelector"
export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor: Persistor = persistStore(store);
