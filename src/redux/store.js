import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { AuthReducer , UserReducer } from "./reducers";
import { thunk } from "redux-thunk";



const persistStorageConfig = {
    key :"DealKarts",
    storage:AsyncStorage
}


const RootReducer = combineReducers({
    AuthReducer,
    UserReducer,
});


const persistedReducer = persistReducer(persistStorageConfig,RootReducer);

export default store = createStore(persistedReducer,applyMiddleware(thunk));

export const persistor = persistStore(store);