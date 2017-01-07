/**
 * Created by Administrator on 2017/1/5.
 */
import {Header,Content,SubHeader,Footer} from  "../components/common.js"
import React,{Component} from  "react"
import "../css/OrderProductInfo.css"
import "../css/confirm.css"
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
class ConfirmFooter extends Component {
    constructor(props){
        super(props)
    }
    orderSubmit(){
        console.log("提交订单,生成真实订单");
        console.log(this.props.orderData);
        console.log(this.props.totalNum);
        console.log(this.props.totalPrice);
        //1未付款，2未发货，3待收货，4待评价
        //订单的数据模型
        var orderItem = {
            orderID: new Date().getTime(),
            orderState:4,//订单的状态
            totalNumber:this.props.totalNum,
            totalPrice:this.props.totalPrice,
            orderProductInfo:this.props.orderData.productInfo//订单的商品详情
        };
        //window.localStorage.getItem("orderData") ==null
        // 之前没有订单的话，让订单的数组等于一个空数组
        var orderArray  = JSON.parse(window.localStorage.getItem("orderData")||"[]") ;

        //在订单列表里面，添加当前订单
        orderArray.push(orderItem);
        //保存在localStorage里面
        console.log(orderArray)
        window.localStorage.setItem("orderData",JSON.stringify(orderArray));
        window.has
    }
    render(){
        return(
            <div className="confirm-footer">
                <p className="num-info">
                    <span>总数:<em>{this.props.totalNum}</em></span> &nbsp;
                    <span>总金额:<em>{this.props.totalPrice}</em></span>
                </p>
                <button onClick={()=>this.orderSubmit()}>提交订单</button>
            </div>
        )
    }
}
class ConfirmPage extends Component {
    constructor(props){
        super(props);
        //先在本存储里面获取
        var data =  window.localStorage.getItem("cartData");
        //console.log(data)
        //格式转换，
        data = JSON.parse(data);
        console.log(data)
        this.state = {
            orderData:data,
            yunFei:10
        };
    }
    render() {
        var data = this.state.orderData;
        var allPrice = this.state.yunFei+data.totalPrice
        return (
            <div className="page" id="confirm-page">
                <Header title="确认订单" hasBack={false}/>
                <Content hasFooter={true}>
                    <div className="ads-info">收货地址:</div>
                    <OrderProductInfo productInfo={data.productInfo}/>
                    <div className="order-price">
                        <p>运费：<em>￥{this.state.yunFei}</em></p>
                        <p>实付（含运费）:<em>￥{allPrice}</em></p>
                    </div>
                    <textarea className="user-info"></textarea>
                </Content>
                <ConfirmFooter totalNum={data.totalNumber} orderData={data}  totalPrice={allPrice} />
            </div>
        )
    }
}
export default  ConfirmPage
