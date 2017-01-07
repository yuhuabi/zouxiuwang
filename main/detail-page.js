import React, {Component} from  "react"
import {Header,Footer,Content} from  "../components/common"
import "../css/detail.css"
import {Tools} from  "../tools/tools"
//商品详情底部
class DetailFooter extends Component{
	constructor(props){
		super(props)
	}
	addCart () {
	    //判断用户是否登录
	    var userID =JSON.parse(Tools.getUserID()).userId;
		console.log(this.props.goodsID)
	    userID && $.get("http://datainfo.duapp.com/shopdata/updatecar.php",
	        {userID:userID,goodsID:this.props.goodsID,number:1},function(data){
	           console.log(data);
	            if(data==1){
	               alert("添加成功")
	            }else {
	               alert("添加失败")
	            }
	        })
	}
	
	render(){
		return (
			<ul className="detail-footer">
				<li className="detail-footer-top">
					<a href="#"><i>123</i><span>查看商品详情</span><e>{">"}</e></a>
				</li>
				<li className="detail-footer-btm">
					<button onClick={()=>this.addCart()}>添加到购物车</button>
				</li>
			</ul>
		)
			
	}
}
//商品详情内容
class DetailPage extends Component{
	constructor(props){
		super(props)
		console.log(this.props.params.goodsID)
		this.state={
			goodsID:this.props.params.goodsID,
			detailData:[],
			goodsName:null,
			currentPrice:null,
			buyNum:null,
			goodsImg:[],
			value:'',
			val:localStorage.getItem('remember')||null
		}
		//请求数据展示
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{"goodsID":this.props.params.goodsID},(data)=>{
			console.log(data)
			this.setState({
				goodsName:data[0].goodsName,
				currentPrice:data[0].price,
				buyNum:data[0].buynumber,
				goodsImg:JSON.parse(data[0].imgsUrl),
				key:data[0].goodsID,
				img:data[0].goodsListImg

			})
			//本地存储（历史记录）
			var arr = JSON.parse(localStorage.getItem('remember')) || [];
			var data ={img:this.state.img,goodsID:this.state.key,goodsName:this.state.goodsName,goodsPrice:this.state.currentPrice};
			//本地存储去重
			var num = 0;
			if(arr.length==0){
				arr.unshift(data)
			}else{
				for(var i = 0;i < arr.length;i++){
					if(data.goodsID == arr[i].goodsID){
						arr.splice(i,1)
						num++;
						arr.unshift(data)
					}
				}
				!num && arr.unshift(data)
			}
			console.log(arr)
			window.localStorage.setItem("remember",JSON.stringify(arr))
		})
			
	}
	toCart(){
		//判断用户是否登录,登录以后再跳
		//alert(123)
		Tools.getUserID()&&(window.location.hash = "#/cart")

	}	
	render(){
		return (
			<div className="detail" id="detail-page">
				<Header title="商品资料" rightBtn={<a href="javascript:;" onClick={this.toCart}>购物车</a>} />
				<Content>
					<dl className="detail-content">
						<dt className="goodsImg swiper-container" ref="swiper"style={{width:"180vw",marginLeft:"-40vw",position:"relative"}}>
							<div className="swiper-wrapper">
								{
									this.state.goodsImg.map((e,i)=><img key={i} className="swiper-slide" src = {e}/>)
								}
							</div>
							<div className="swiper-pagination" ref="pagination"></div>
							
						</dt>
						<dd className="pro-name">{this.state.goodsName}</dd>
						<dd className="pro-price">￥{this.state.currentPrice}&nbsp;<del>￥1299</del></dd>
						<dd className="pro-num">购买人数：{this.state.buyNum}</dd>				
					</dl>

				</Content>
				<DetailFooter goodsID={this.state.goodsID}/>
			</div>
		)
	}
	componentDidMount(){
        this.swiper = new Swiper(this.refs["swiper"],{
            pagination:  this.refs.pagination,
            slidesPerView: '3',
            loop:true
        })
    }
	componentDidUpdate(){       
        this.swiper.update();
        this.swiper.reLoop();        
    }
}




export  default DetailPage