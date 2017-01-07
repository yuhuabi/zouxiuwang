/**
 * Created by Administrator on 2017/1/6.
 */
import {Header} from "../components/common"
import {MyOrderSub,MyOrderCont} from "../components/my-order"
import "../css/my-order.css"
import React,{Component} from "react"

/*我的订单父组件*/
class MyOrderPage extends Component{
    constructor(props){
        super(props)
        var data = JSON.parse(window.localStorage.getItem("orderData")||'[]')
        this.state={
            orderData:data
        }
        this.selectOrderState = this.selectOrderState.bind(this)
        this.cancleOrder = this.cancleOrder.bind(this)
    }
/*选择订单的状态*/
    selectOrderState(index){
        //获取所有订单数据
        var data =  JSON.parse(window.localStorage.getItem("orderData")||"[]");
       // console.log(index)
        //通过index过滤得到想要显示的数据
        if(index!=0){
            data = data.filter(function(ele){
                return ele.orderState==index
            });
        }
        //改变组件的state，让组件重新渲染
        this.setState({
            orderData:data
        });
    }
    /*取消订单*/
    cancleOrder(orderID){
        console.log("取消订单");

        //更新state （setState ）
        var state = this.state.orderData;
        state= state.filter(function(ele){
            return ele.orderID!=orderID
        });
        this.setState({
            orderData:state
        });

        //更新本地存储的数据
        var data =  JSON.parse(window.localStorage.getItem("orderData")||"[]");
        data = data.filter(function(ele){
            return ele.orderID!=orderID
        });
        window.localStorage.setItem("orderData",JSON.stringify(data));
    }
    render(){
        return (
            <div className="myorder-page">
                <Header hasSearch={false} hasBack={true} title={"我的订单"}/>
                <MyOrderSub selectOrderState={this.selectOrderState}/>
                <MyOrderCont orderData={this.state.orderData} cancleOrder={this.cancleOrder}/>
            </div>
        )
    }
}

/*暴露接口*/
export default MyOrderPage