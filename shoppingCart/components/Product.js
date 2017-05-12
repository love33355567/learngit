import React, { Component, PropTypes } from 'react'
//    return <div> {title} - &#36;{price} {quantity ? `x ${quantity}` : null} </div>
export default class Product extends Component {
  render() {
    const { price, quantity, title, imgurl } = this.props //从属性中获取到 三种元素

    return (
              <div className="p-cont">
                <div className="p-img"> 
                    <a href="http://test.m.yao123.com/product/GWM0300001_1">
                      <img src={imgurl} />
                  </a> 
                </div>              
                <div className="item-msg">            
                  <div className="p-name ellipsis"><a href="">{title}</a></div>
                  <div className="cell p-sum cf"><strong className="price">¥ {price}</strong></div>
                  <div>{quantity ? `x ${quantity}` : null}</div>
                </div>
              </div>
    	)

  }
}
//校验
Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string
}
