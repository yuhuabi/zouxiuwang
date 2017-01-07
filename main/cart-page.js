import {Header,Footer} from "../components/common"
import {SubCart} from "../components/sub-cart"
import {CartList} from "../components/cart-list"
import React,{Component} from "react"
import {Tools} from "../tools/tools"
import "../css/cart.css"
import ReactDOM from "react-dom"

//购物车页面
class CartPage extends Component{
	constructor(props){
		super(props)
		this.state={
			CartData:[],
			totalNum:0,
			totalPrice:0
		}
		//本地存储获取ID
		var userID =JSON.parse(Tools.getUserID()).userId;
		console.log(userID)
		userID && $.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{"userID":userID},(data)=>{
			if(data == 0){return}
			this.setState({
				CartData:data
			});
			this.getTotal(data)
		})
		this.changeData=this.changeData.bind(this)
	}
	//增减数据
	changeData(type,index){
		var data = this.state.CartData;
		var ID = data[index].goodsID;
		var number = data[index].number;
		if(type){
			number=type+number*1
			data[index].number=number
				if(number==0){
					this.upDateCart(data,index)
				}
		}else{
			number=0
			data.splice(index,1)
		}

		this.setState({
			CartData:data
		});
		setTimeout(function(){
			this.upDateCart(number,ID)
		}.bind(this,data),2000)
		this.getTotal(data)
	}
	//获得商品的总价格
	getTotal(data){
		var number = 0;
		var price = 0;
		for(var i=0;i<data.length;i++){
			number+=data[i].number*1;
			price+=data[i].number*data[i].price
		}
		this.setState({
			totalNumber:number,
			totalPrice:price
		});

	}
	//更新购物车数据
	upDateCart(number,ID){
		//需要获取ID
		var userID =JSON.parse(Tools.getUserID()).userId;
		console.log(userID)
		userID && $.get('http://datainfo.duapp.com/shopdata/updatecar.php?userID='+userID+'&goodsID='+ID+'&number='+number,(data)=>{
			//console.log(data)
		})
	}
	//跳转到点单页面
	TorderPage(){
		//console.log(1)
		var userID =JSON.parse(Tools.getUserID()).userId;
		console.log(userID)
		window.localStorage.setItem("cartData",JSON.stringify({
			totalPrice:this.state.totalPrice,
			totalNumber:this.state.totalNumber,
			productInfo:this.state.CartData,
			totalUserID:userID

		}));
		window.location.hash = "#/order"
	}
	render() {
		console.log(this.state.CartData)
		return(
		<div className="cart-list">
			<Header hasSearch={false} hasBack={false} title={"购物车"} rightBtn={<a href="javascript:;" className="check" onClick={()=>this.TorderPage()}>结算</a>}/>
			<SubCart totalNumber={this.state.totalNumber} totalPrice={this.state.totalPrice}/>
				<CartList CartData={this.state.CartData} changeData={this.changeData}/>
			<Footer active={2}/>
		</div>)
	}

}

/*zepto 不是按照模块化的规范写的*/

export default CartPage