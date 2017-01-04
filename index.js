import {Header,Footer,Content,SubHeader} from "./components/common"
import Productlist from "./components/product-list"
import React,{Component} from "react"
import ReactDOM from "react-dom"
import "./css/common.css"
import "./css/list.css"
import ReactIScroll from "react-iscroll"
import {ScrollOptions} from "./config/config.js"

class ClassList extends Component{
	constructor(props){
		super(props)
		//在这里获取数据
	}
	handleClick(id){
		console.log(id);
		this.props.changeClassID(id)
	}
	render(){
		return(
			<ul className = "class-list">
			{
				this.props.classData.map((e,i)=><li onClick={()=>this.handleClick(e.classID)} key={i}>{e.className}</li>)
			}
			</ul>
		)
	}
}
ClassList.defaultProps = {
	classData:[],
}
class ListPage extends Component{
	constructor(props){
		super(props)//让react的Component帮你实现组件的方法
		this.state={
			classData:[],
			productData:[]
		}
		//设置默认的数据请求选项
		this.classID = undefined;
		this.linenumber = 5;
		this.pageCode = 0;
		this.refresh = false;
		$.get("http://datainfo.duapp.com/shopdata/getclass.php",(data)=>{
			console.log(data)
			this.setState({
				classData:data
			})
		},"json")
		//请求商品数据
		this.getProductData(this.pageCode)
	}
	changeClassID(id){
		console.log(id);
		console.log(this)
		this.classID = id;
		this.pageCode = 0;//重置页码
		this.getProductData()
	}
	getProductData(){
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
			"classID":this.classID,
			"linenumber":this.linenumber,
			"pageCode":this.pageCode
		},(data)=>{
			//刷新需要覆盖数据，加载需要和之前的数据合并
			if(data){
				this.setState({
					productData:this.pageCode==0?data:this.state.productData.concat(data)
				})
			}
		})
		
	}
	
	onScrollEnd(myScroll){
		//myyScroll 是ReactIScroll提供的操作滚动条的对象
		console.log("end")
		//需要当前的滚动的位置和最大的滚动数值
		if(this.refresh){
			this.pageCode = 0;
			this.getProductData();
			this.refresh = false;
			console.log(11)
		}else if(myScroll.y-myScroll.maxScrollY<=20){
			console.log("加载更多");
			this.pageCode++;
			this.getProductData();
		}
	}
	onScroll(myScroll){
		//console.log(myScroll)
		if(myScroll.y>60){
			console.log("刷新")
			this.refresh = true;
		}
	}
	render(){
		return (
			<div className = "page" id = "list-page">
				<Header hasSerarch={true} rightBtn={"按钮"}/>
				<SubHeader>
					<ClassList classData = {this.state.classData} changeClassID = {(id)=>this.changeClassID(id)}/>
				</SubHeader>
				<Content hasFooter={true} hasSubHeader={true}>
					<ReactIScroll iScroll={IScroll} options={ScrollOptions} onScroll={(myScroll)=>this.onScroll(myScroll)} onScrollEnd={(myScroll)=>this.onScrollEnd(myScroll)}>
						<Productlist productData = {this.state.productData}/>
					</ReactIScroll>
				</Content>
				<Footer active = {1}/>
			</div>
		)
	}
}

//ReactDOM.render(<ListPage/>,document.getElementById("root"));
/*zepto 不是按照模块化的规范写的*/