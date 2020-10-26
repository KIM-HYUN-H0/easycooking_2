import { combineReducers } from 'redux';
import categoryControl from './categoryControl';

const rootReducer = combineReducers({
    categoryControl,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;