import React, { Component, PropTypes } from 'react'
import Cart from './Cart'

//组件需要有容器包裹 onClick={onCheckoutClicked}
export default class Submit extends Component {
  render() {  
    const { product } = this.props
    console.log(this.props);
    return (
        <div className="normal">
            <div data-barstep="1" className="summary">
                <div className="select js_allbtn"></div>
                <div className="info">
                    <p className="sumPrice">合计：<em>￥&#36;{this.props.total}</em></p>   
                    <span className="totalRePrice hide">立减：<em>￥5.00</em></span>
                </div>
            </div>
            <div data-barstep="2" className="total hide">
                    <p>实付款：¥0.00</p>
            </div>
            <div data-chekout="" step="2" className="chekout"  disabled={this.props.hasProducts ? '' : 'disabled'}>结算<span className="amount-sum">({this.props.quantitys})</span></div>
        </div>    
    )
  }
}                
