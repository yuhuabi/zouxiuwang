
import React,{Component} from "react"


class ProductList  extends Component{
	constructor(props){
		super(props)
		this.state={
			key:'',
			val:''
		}
		
	}
	
	render(){
		return (
			<ul className="product-list">
				{
					this.props.productData.map((e,i)=>
						<li key={i}>
							<a href={"#/detail/"+e.goodsID} >
								<img src={e.goodsListImg}/>
								<h4>{e.goodsName}</h4>
							</a>
							<p>￥{e.price}<del>￥999</del></p>							
						</li>)
				}
			</ul>
		)
	}
}

ProductList.defaultProps={
	productData:[]
}

export {ProductList}