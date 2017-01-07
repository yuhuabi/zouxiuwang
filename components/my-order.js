/**
 * Created by Administrator on 2017/1/6.
 */
import React,{Component} from "react"

/*我的订单subHeader*/
class MyOrderSub extends Component{
    constructor(props){
        super(props)
        this.state={
            subData:['全部','代付款','代发货','待收货','待评价']
        }
    }
    changeState(index){
        this.props.selectOrderState(index)
    }
    render(){
        return(
                <ul className="myorder-sub">{
                    this.state.subData.map((ele,index)=><li key={index} onClick={()=>this.changeState(index)}>{ele}</li>)
                }</ul>
        )
    }
    componentDidMount(){
        $(".myorder-sub li")[0].className="checked"
        $(".myorder-sub li").on("click",function(){
            $(this).addClass("checked").siblings().removeClass("checked")
        })
    }
}

/*我的订单列表*/
class OrderList extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var listData= this.props.productInfo;
        return(
            <div>{
                listData.map((ele, index)=><div className="li-order" key={index}>
                    <div className="li-order-left">
                        <img src={ele.goodsListImg}/>
                    </div>
                    <div className="li-order-center">
                        <p>{ele.className}</p>
                        <p>{ele.goodsName}</p>
                    </div>
                    <div className="li-order-right">
                        <p>￥{ele.price}</p>
                        <p>x{ele.number}</p>
                    </div>
                </div>)
            }</div>
    )
    }
}

/*订单页面按钮*/
class OrderBtns extends Component{
    constructor(props){
        super(props)
    }
/*取消订单*/
    cancleOrder(orderID){
        this.props.cancleOrder(orderID)
    }
    render(){
        var state = this.props.orderState

        return (
            <div className="order-btns">{
                state == 1 ?
                    <div className="order-btns">
                        <em>待付款</em>
                        <button>立即付款</button>
                        <button onClick={()=>this.cancleOrder(this.props.orderID)}>取消订单</button>
                    </div> : state == 2 ? <div className="order-btns">
                    <em>待发货</em>
                    <button>提醒发货</button>
                </div> : state == 3 ? <div className="order-btns">
                    <em>待收货</em>
                    <button>确认收货</button>
                </div> : <div className="order-btns">
                    <em>待评价</em>
                    <button>去评价</button>
                </div>
            }</div>
        )
    }
}

/*我的订单中心部分*/
class MyOrderCont extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        var data = this.props.orderData||[];
        return(
           <div className="myorder-cont">
               <ul className="myorder-list">{
                  data.map((ele,index)=><li key={index}>
                      <OrderList productInfo={ele.orderProductInfo}/>
                       <div className="total-info">
                           <span>共<em>{ele.totalNumber}</em>件</span>
                           <span>商品实付:<em>{ele.totalPrice}</em></span>
                       </div>
                      <OrderBtns orderState={ele.orderState} orderID={ele.orderID} cancleOrder={this.props.cancleOrder}/>
                  </li>)
              }</ul>
           </div>
        )
    }
}

export {MyOrderSub,MyOrderCont}