/**
 * Created by Administrator on 2017/1/4.
 */
import React,{Component} from 'react'


//购物车中心列表组件
class CartList extends Component{
    constructor(props){
        super(props)
    }
    render(){

        return (
            <div className="carts-list">
                    <ul className="list">{
                        this.props.CartData.map((ele,index)=><li className="list-item" key={index}>
                            <div className="list-left">
                                <img src={ele.goodsListImg} />
                            </div>
                            <div className="list-center">
                                <p className="name">{ele.goodsName}</p>
                                <p className="price">单价:<b>￥{ele.price}</b></p>
                                <p className="all-btn">
                                    <span>数量:</span>
                                    <button className="btn" onClick={()=>this.props.changeData(-1,index)}>-</button>
                                    <span className="list-num">{ele.number}</span>
                                    <button className="btn" onClick={()=>this.props.changeData(1,index)}>+</button>
                                </p>
                            </div>
                            <div className="list-right">
                                <a href="##" className="delete icon iconfont icon-iconfontshanchu6" onClick={()=>this.props.changeData(0,index)}></a>
                            </div>
                        </li>)
                    }</ul>
            </div>
        )
    }
    componentWillReceiveProps(newprops){
        console.log(newprops)
    }

}


export {CartList}