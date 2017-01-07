/**
 * Created by Administrator on 2017/1/6.
 */
import {Header,Content,SubHeader,Footer} from  "../components/common.js"
import React,{Component} from  "react"
import {OrderProductInfo} from "../components/order-lsit"
import "../css/myfirm-page.css"


//二级头部点击切换按钮
class StateList extends Component {
    constructor(props){
        super(props)
    }
    changeState(index) {
        console.log(index)
        this.props.selectOrderState(index)
    }
    render() {
        var data =this.props.stateData|| ["全部","待付款","待发货","待收货","待评价"]
        console.log(this.props.stateData)
        return (
            <ul className="order-state-list">
                {
                    data.map((e,i)=><li key={i} onClick={()=>this.changeState(i)}>{e}</li>)
                }
            </ul>
        )
    }
}


//订单内容
class OrderList extends Component {
    constructor(props){
        super(props)
    }
    render() {
        var data = this.props.orderData||[];
        console.log(data); //所有的订单
        return (
            <ul className="order-list">
                {
                    data.map((e,i)=><li key={i}>
                        <OrderProductInfo productInfo={e.orderProductInfo}/>
                        <div className="total-info">
                            <span className="total-num">总数量:<em>{e.totalNumber}</em></span>
                            <span className="total-prc">总金额:<em>{e.totalPrice}</em></span>
                        </div>
                        <Orderbtn orderState={e.orderState}/>
                    </li>)
                }
            </ul>
        )
    }
}

//根据订单不同的状态来解析
class Orderbtn extends Component {
    constructor(props){
        super(props)
    }
    render (){
        var state= this.props.orderState
        return(
            <div className="order-btn">
                {
                    state ==1?<div>
                        <em>待付款</em>
                        <button className="btn-one">立即付款</button>
                        <button className="btn-two">取消订单</button>
                    </div>:state ==2?<div>
                        <em>待发货</em>
                        <button className="btn-one">提醒发货</button>
                    </div>:state==3?<div>
                        <em>待收货</em>
                        <button className="btn-one">确认发货</button>
                    </div>:<div>
                        <em>待评价</em>
                        <button className="btn-one">去评价</button>
                    </div>
                }
            </div>
        )
    }
}

//订单输出组件
class MyFirmPage extends Component {
    constructor(props){
        super(props)
        //获取数据(所有的订单 根据数据内的)
        var data =  JSON.parse(window.localStorage.getItem("orderData")||"[]")
        this.state = {
            orderData:data
        };
        /*data = data.filter(functoin(ele,index){
            return data.o
        })*/
        this.selectOrderState = this.selectOrderState.bind(this)
    }
    //过滤
    selectOrderState(index){
        var data =  JSON.parse(window.localStorage.getItem("orderData")||"[]");
        //过滤

        index && (data =data.filter(function(ele){
            return ele.orderState == index
        }))
        //改变组件的state，让组件重新渲染
        this.setState ({
            orderData:data
        });
    }
    //删除订单
   removeOrder (orderID){
        //通过orderID找到对应的订单

   }
    render() {
        return(
            <div className="page" id="myFirm-page">
                <Header hasBack={false} title="我的订单" />
                    <SubHeader>
                       <StateList selectOrderState={this.selectOrderState}/>
                    </SubHeader>
                    <Content hasSubHeader={true}>
                       <OrderList orderData={this.state.orderData}/>
                    </Content>
            </div>
        )
    }
}
export default  MyFirmPage
