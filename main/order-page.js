/**
 * Created by Administrator on 2017/1/5.
 */
import {Header} from "../components/common"
import {AdsTextarea,OrderList,OrderFooter} from "../components/order-com"
import React,{Component} from "react"


//订单页面父组件
class OrderPage extends Component {
    constructor(props){
        super(props)
        var data = window.localStorage.getItem("cartData");
        data = JSON.parse(data)
        console.log(data)
        this.state={
            orderData:data
        };
    }
    //提交订单
    orderSubmit(){
        //1未付款，2未发货，3待收货，4待评价
        //订单的数据模型
        var orderItem = {
            orderID: new Date().getTime(),
            orderState:1,
            totalNumber:this.state.orderData.totalNumber,
            totalPrice:this.state.orderData.totalPrice,
            orderProductInfo:this.state.orderData.productInfo
        };
        //window.localStorage.getItem("orderData") ==null
        // 之前没有订单的话，让订单的数组等于一个空数组
        var orderArray  = JSON.parse(window.localStorage.getItem("orderData")||"[]") ;
        //在订单列表里面，添加当前订单
        orderArray.push(orderItem);
        //保存在localStorage里面
        console.log(orderArray)
        window.localStorage.setItem("orderData",JSON.stringify(orderArray))
        window.location.hash="#/myorder"
    }
    render(){
        return(
            <div className="order-page">
                <Header hasSearch={false} hasBack={false} title={"确认订单"}/>
                <div className="order-cent">
                    <AdsTextarea/>
                    <OrderList orderData={this.state.orderData} />
                </div>
                <OrderFooter orderSubmit={()=>this.orderSubmit()} totalNum={this.state.orderData.totalNumber} totalPrice={this.state.orderData.totalPrice}/>
            </div>
        )
    }
}
//暴露的接口
export default OrderPage