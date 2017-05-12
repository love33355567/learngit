import React, { Component, PropTypes } from 'react'//React组件属性部类（propTypes）校验
import { connect } from 'react-redux' //connect把React组件和 Redux 的 store 真正连接起来
import { checkout, incrementToProduct,addToCart} from '../actions'
import { getTotal, getCartProducts, getQuantitys } from '../reducers'
import { getVisibleProducts } from '../reducers/products'
import Cart from '../components/Cart'//表现组件


class CartContainer extends Component {
  render() {
    const { products, total, quantitys } = this.props

    return (
      <Cart
        products={products}
        total={total}
        quantitys = {quantitys}
        onCheckoutClicked={() => this.props.checkout()}/>
    )
  }
}

CartContainer.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  //quantitys:PropTypes.string,
  checkout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    products: getCartProducts(state),
    total: getTotal(state),
    quantitys: getQuantitys(state)
  }
}

export default connect(
  mapStateToProps,
  { checkout }
)(CartContainer)
