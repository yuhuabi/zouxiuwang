import React,{Component} from "react"
import {Header,Footer,Content} from  "../components/common"
import "../css/history.css"
class History  extends Component{
	constructor(props){
		super(props)
		//获取本地存储
		this.state={
			arr:localStorage.getItem("remember")?JSON.parse(localStorage.getItem("remember")):[]
		}
		this.clear = this.clear.bind(this)
	}
	//清空历史记录
	clear(){
		localStorage.removeItem("remember");
		this.setState({
			arr:[]
		})
		
	}
	render(){
		return (
			<div className="history" id="historypage">
				<Header title="历史记录" rightBtn={<button onClick={this.clear}>清空</button>}/>
				<Content>
					<ul className="product-list" ref="cle">					
						{
							this.state.arr.map((e,i)=>
								<li key={i}>
									<a href={"#/detail/"+e.goodsID} >
										<img src={e.img}/>
										<h4>{e.goodsName}</h4>
									</a>
									<p>￥{e.goodsPrice}<del>￥999</del></p>							
								</li>)
						}					
					</ul>
				</Content>
			</div>			
		)		
	}
}
export default History