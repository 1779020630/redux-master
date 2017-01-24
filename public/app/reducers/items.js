import Immutable from 'immutable'
import { ADD_ITEM, DELETE_ITEM, DELETE_ALL } from '../constants/actionTypes'

//回到Redux中来看，整个的状态就相当于从[初始状态]merge一个[action.state]从而得到一个新的状态，随着action的不断传入，不断的得到新的状态的过程。(previousState, action) => newState，注意：任何情况下都不要改变previousState，因为这样View层在比较State的改变时只需要简单比较即可，而避免了深度循环比较。Reducer的数据结构我们可以用immutable-js，这样我们在View层只需要react-immutable-render-mixin插件就可以轻松的跳过更新那些state没有发生改变的组件子树。
const initialItems = Immutable.List([1, 2, 3])

export default function items(state = initialItems, action) {
    switch(action.type) {
        case ADD_ITEM:
            return state.push(state.size !== 0 ? state.get(-1) + 1 : 1)
        case DELETE_ITEM: 
            return state.delete(state.indexOf(action.item))
        case DELETE_ALL:
            return state.clear()
        default:
            return state
    }
}
