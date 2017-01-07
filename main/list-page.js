import {Header,Footer,Content,SubHeader} from  "../components/common"
import {ProductList} from  "../components/asdasd"
import React, {Component} from  "react"
import ReactIScroll from "react-iscroll"
import {ScrollOptions} from  "../config/config"


class ClassList  extends Component{
	constructor(props){
		super(props)
		this.state={
			classID:'',
			ID:null
		}
	}
	handleClick(id){
		this.props.changeClassID(id)
		this.setState({
			ID:id
		})
	}
	render(){
		return (
			<ul className="class-list">
				{
					this.props.classData.map((e,i)=>
						<li key={i} onClick={()=>this.handleClick(e.classID)} className={e.classID==this.state.ID?"active":""}>{e.className}</li>)
				}
			</ul>
		)
	}
}
ClassList.defaultProps = {
	classData:[]
}


// console.log(this.state.classID)

class ListPage extends Component{
	constructor(props){
		super(props)
		this.state={
			classData:[],
			productData:[]
		}
		this.classID = 0;
		this.linenumber = 5;
		this.pageCode = 0;
		this.refresh = false;
		$.get("http://datainfo.duapp.com/shopdata/getclass.php",(data)=>{
			console.log(data)
				this.setState({
					classData:data
				})
		},"json")

		this.getProductData(this.pageCode)

	}
	getProductData(){
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
			"classID":this.classID,
			"linenumber":this.linenumber,
			"pageCode":this.pageCode
		},(data)=>{
			if(data){
				this.setState({
					productData:this.pageCode==0?data:this.state.productData.concat(data)
				})
			
			}
			console.log(data)
		})
	}
	onScroll(myScroll){
		console.log(11111)
		onClick:true
		if(myScroll.y>60){
			console.log("刷新");
			this.refersh = true
		}	
	}

	onScrollEnd(myScroll){
		console.log(myScroll.y)
		console.log(myScroll.maxScrollY)
		if(this.refresh){
			this.pageCode = 0;
			this.getProductData();
			this.refresh = false
		}else if(myScroll.y-myScroll.maxScrollY<20){
			console.log("加载更多");
			console.log(this.pageCode++)
			this.getProductData()
		
		}

	}
	changeClassID(id){
		this.classID = id;
		this.pageCode = 0;
		this.getProductData()
		// console.log(this.state.classID)
	}
	render(){
		//console.log(this.onScroll)
		return (
			<div className="page" id="list-page">
				<Header title="列表" hasBack={true} rightBtn={<a onClick={()=>window.location.hash="#/cart"}>购物车</a>}/>
				<SubHeader>
					<ClassList classData={this.state.classData} changeClassID={(id)=>this.changeClassID(id)}/>
				</SubHeader>
				<Content hasFooter={true} hasSubHeader={true}>
					<ReactIScroll iScroll={IScroll} options={ScrollOptions} 
								  onScrollEnd={(myScroll)=>this.onScrollEnd(myScroll)} 
								  onScroll={(myScroll)=>this.onScroll(myScroll)}>
						<ProductList productData={this.state.productData}/>
					</ReactIScroll>					
				</Content>
				<Footer active={1}/>

			</div>
		)
	}
	
};


export default ListPage