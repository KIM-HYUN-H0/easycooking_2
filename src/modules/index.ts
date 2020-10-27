import { combineReducers } from 'redux';
import categoryControl from './categoryControl';
import boardControl from './boardControl';
import userControl from './userControl';

const rootReducer = combineReducers({
    categoryControl,
    boardControl,
    userControl
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;