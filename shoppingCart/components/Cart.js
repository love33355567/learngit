import React, { Component, PropTypes } from 'react'
import Product from './Product'
import CartItem from './CartItem'
import Submit from './Submit'

export default class Cart extends Component {

  render() {
    const { total, onCheckoutClicked, quantitys } = this.props
    const { products } = this.props
    const hasProducts = products.length > 0
    console.log(products);

    const pp = products.map(product =>    
      <CartItem inventory={product.inventory} id={product.id} key={product.id} title={product.title} price={product.price}  quantity={product.quantity} imgurl={product.imgurl}/>)
    var nodes = '';
    if(!hasProducts){
       nodes = <em className="nogoodstip">请添加商品到购物车</em>
    }else{
       nodes = pp
    }
    return (
      <div>
        <h3 className="topbar-text">购物车</h3>
        <div>{nodes}</div>
        <div className="footbar footbar-shopcart">
          <Submit hasProducts={hasProducts} total= {total} quantitys={quantitys} />
        </div>
        
      </div>
    )
  }
}
/*
        <button onClick={onCheckoutClicked} disabled={hasProducts ? '' : 'disabled'}>
          提交
        </button>
 */
Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    //id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
   // inventory: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}
