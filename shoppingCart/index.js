import 'babel-polyfill'  //使用babel-polyfill编译es6拓展语法
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'//redux-logger提供一个生成器createLogger，可以生成日志中间件logger。然后，将它放在applyMiddleware方法之中，传入createStore方法，就完成了store.dispatch()的功能增强。
import thunk from 'redux-thunk'//thunk作用是使action创建函数可以返回一个function代替一个action对象
import reducer from './reducers'
import { getAllProducts } from './actions'
import App from './containers/App'  //容器组件

//通过NODE_ENV可以来设置环境变量（默认值为development）。 一般我们通过检查这个值来分别对开发环境和生产环境下做不同的处理
const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ]
//参数，Reducer 和 initialState将reducer的数据更新拿过来，然后如果没有更新的话就传一个默认值
//applyMiddleware包装 store 的 dispatch
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
//修改状态数
store.dispatch(getAllProducts())
//将store绑定到父级成为props
//将组件与redux关联起来，一个将store传给组件 将store传递给App这个组件
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
