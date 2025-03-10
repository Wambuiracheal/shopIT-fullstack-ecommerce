// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";  // adjust the path as needed

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: authReducer,
    // add other reducers here if needed
  },
});

export const persistor = persistStore(store);
export default store;
