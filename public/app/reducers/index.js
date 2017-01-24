import { combineReducers } from 'redux'
import items from './items'
import filter from './filter'

//combineReducer可以帮助我们将reducer组合在一起，这样我们就可以将reducer拆分成不同的小的reducer来管理store了
const rootReducer = combineReducers({
    items,
    filter
})

export default rootReducer
