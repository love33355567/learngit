import React, { Component } from 'react'

export default class Quantity extends Component {
  /* constructor(props) {
    console.log(props);
        super(props);
        this.state = {
            value: props.quantity
        }
    }	*/
   handleChange(e) {
        this.setState({
            value: e.target.value
        })
   }	
  	render() {
    //const { price, quantity, title } = this.props //从属性中获取到 三种元素/*
    /*
     <a href="javascript:void(0);" clstag="clickcart|keycount|xincart|cart_num_down" className="decrement disabled" >-</a>
      <input className="itxt" onChange={e => this.handleChange(e)} value={this.state.value} />
      <a href="javascript:void(0);" clstag="clickcart|keycount|xincart|cart_num_up" className="increment">+</a>
    
     */
    return (
		<div className="quantity-form" promoid="">
      <div className="count">
        <span className="reduce fl"><i className="iconfont icon-reduce"></i></span>
        <span className="add fr"><i className="iconfont icon-add"></i></span>
        <input data-quantity="" className="J_input text cell" type="text" maxLength="8" onChange={e => this.handleChange(e)} value={this.props.quantity} />
      </div>
      <span className="num hide">X3</span> 
    </div>    	
   	)
  }
}