/**
 * Created by Administrator on 2017/1/4.
 */
import React,{Component} from "react"
//购物车页面头部
class SubCart extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="sub-car">
                <span className="num">商品数量:{this.props.totalNumber}</span>
                <span className="total-num">应付总额(不含运费):</span><b>￥{this.props.totalPrice}</b>
            </div>
        )
    }
}
export  {SubCart}