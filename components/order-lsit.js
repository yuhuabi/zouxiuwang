/**
 * Created by Administrator on 2017/1/6.
 */
import React,{Component} from  "react"
class OrderProductInfo extends Component {
    constructor(props){
        super(props)
    }
    render(){
        var data = this.props.productInfo ||[];
        return (
            <ul className="order-product-info">
                {
                    data.map((ele,i)=><li key={i}>
                        <img src={ele.goodsListImg}/>
                        <div className="text-info">
                            <p>{ele.goodsName} </p>
                        </div>
                        <div className="num-info">
                            <p><em>￥{ele.price}</em></p>
                            <p>×{ele.number}</p>
                        </div>
                    </li>)
                }
            </ul>
        )
    }
}
export {OrderProductInfo}