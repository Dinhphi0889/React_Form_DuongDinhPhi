import { combineReducers } from 'redux'
import studentReducer from './reducer'

const rootReducer = combineReducers({
    studentReducer,
});

export default rootReducer