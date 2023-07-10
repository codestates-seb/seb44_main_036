import { combineReducers } from 'redux';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export default rootReducer;
