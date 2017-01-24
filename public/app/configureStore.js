import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

//在Redux中，Middleware 主要是负责改变Store中的dispatch方法，从而能处理不同类型的 action 输入，得到最终的 Javascript Plain Object 形式的 action 对象。

//当ThunkMiddleware 判断action传入的是一个函数，就会为该thunk函数补齐dispatch和getState参数，否则，就调用next(action)，给后续的Middleware（Middleware 插件可以被绑定多个）得到使用dispatch的机会。

var buildStore

if (__DEBUG__) {
    buildStore = compose(
        applyMiddleware(thunk),
        require('redux-devtools').devTools(),
        require('redux-devtools').persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)
} else {
    buildStore = compose(applyMiddleware(thunk))(createStore)
}

export default function configureStore(initialState) {
    const store = buildStore(rootReducer, initialState)

    if(module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers'))
        })
    }

    return store
}
