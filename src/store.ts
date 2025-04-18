import { createStore, combineReducers } from 'redux';
import { userReducer } from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
