import React, { Component, PropTypes } from 'react'
import Product from './Product'
import Quantity from './Quantity'
//组件需要有容器包裹
export default class CartItem extends Component {
    
  render() {  
    const { product } = this.props
    console.log(this.state);
    return (
      <div className="item-item">
        <div className="item-form">
          <div className="cell p-goods">
            <div className="goods-item cf">
              <Product title={this.props.title} price={this.props.price}  quantity={this.props.quantity}  key={this.props.id} imgurl={this.props.imgurl} /> 
              <div className="p-quantity">
                    <Quantity price={this.props.price}  quantity={this.props.quantity}  /> 
              </div>

            </div>
          </div>
        </div>

      </div>       
    )
  }
}

/*CartItem.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired
}*/
