import React, { Component } from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'

export default class App extends Component {
  render() {
    return (
      <div>
        <h2 className="topbar-text">我的购物车</h2>
        <hr/>
        <ProductsContainer />
        <hr/>
        <CartContainer />
      </div>
    )
  }
}
