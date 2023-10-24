import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


import { tableReducer } from "./table/tableSlice";
import { loginReducer } from "./login/loginSlice";

const loginPersistConfig = {
  key: "login",
  storage,
  whitelist: ['token'],
};

const tablePersistConfig = {
  key: "table",
  storage,
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

export const store = configureStore({
  reducer: {
    table: persistReducer(tablePersistConfig, tableReducer),
    login: persistReducer(loginPersistConfig, loginReducer),
  },
  middleware,
});

export const persistor = persistStore(store);
