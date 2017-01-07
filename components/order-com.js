/**
 * Created by Administrator on 2017/1/5.
 */
import React,{Component} from "react"
import "../css/order.css"

/*订单页面收货地址组件*/
class AdsTextarea extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="ads-area">
                <p><em>收货人姓名:</em>托儿索</p>
                <p><em>收货人联系方式:</em>110</p>
                <p><em>收货人地址:</em>德玛西亚区小学生</p>
            </div>
        )

    }
}
/*订单页面商品列表组件*/
class OrderList extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var data = this.props.orderData.productInfo||[];
        //console.log(data)
        return(
            <div className="order-list">
                <ul>{
                    data.map((ele,index)=><li key={index}>
                            <div className="order-left">
                                <img src={ele.goodsListImg}/>
                            </div>
                            <div className="order-center">
                                <p className="order-name">{ele.className}</p>
                                <p className="detail">{ele.goodsName}</p>
                            </div>
                            <div className="order-right">
                                <p className="order-price">{ele.price}</p>
                                <p className="order-num">x{ele.number}</p>
                            </div>
                    </li>)
                }</ul>
                <div className="order-info">
                    <p><span>运费:</span><span>￥20</span></p>
                    <p><span>实付款(含运费):</span><span className="color">{this.props.orderData.totalPrice+20}</span></p>
                    <textarea placeholder="信息备注"></textarea>
                    <div className="card">
                        <p className="order-card icon iconfont icon-fapiao">是否需要发票</p>
                        <p className="order-btn order-card" >
                            <span className="order-cricle "></span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    /*发票部分开关按钮*/
    componentDidMount() {
                var flag = false
            $('.order-card').on('click',function () {
                if(flag){
                    $('.order-cricle').removeClass('change-cricle');
                    $('.order-btn').css({backgroundColor:"antiquewhite"});
                    flag=!flag
                }else{
                    $('.order-cricle').addClass('change-cricle');
                    $('.order-btn').css({backgroundColor:"aqua"});
                    flag=!flag
                }

            })
    }

}

/*订单页面底部提交组件*/
class OrderFooter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="order-footer">
               <span>共<em>{this.props.totalNum}</em>件,</span>
                <span>总金额<em>￥{this.props.totalPrice+20}</em></span>
                <span className="submit" onClick={()=>this.props.orderSubmit()}>提交订单</span>
            </div>
        )
    }
}

/*订单页面暴露的接口*/
export {AdsTextarea,OrderList,OrderFooter}