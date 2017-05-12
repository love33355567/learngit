import React, { Component, PropTypes } from 'react'
import Product from './Product'

export default class ProductItem extends Component {
  render() {
    const { product } = this.props

    return (
      <div className="item-item" style={{ marginBottom: 20 }}>
        <div className="item-form">
          <Product
            title={product.title}
            price={product.price} imgurl={product.imgurl} />
          <button className="btn btn-primary btn-sm addCarBtn"
            onClick={this.props.onAddToCartClicked}
            disabled={product.inventory > 0 ? '' : 'disabled'}>
            {product.inventory > 0 ? '加入购物车' : '售完'}
          </button>
      </div>
      </div>
    )
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}
