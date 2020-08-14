// import theme from '../reducers/main';
import { createStore, combineReducers } from "redux";
// import app from '../reducers/appDefualts';
import appReduserData from "../Reducers/appReducerData";
const allReducers = combineReducers({
  appReducer: appReduserData,
});

const Store = createStore(allReducers);

export default Store;
