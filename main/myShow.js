import React,{Component} from "react";
import {Router,Route,hashHistory,Link} from "react-router";
import { Header,Content,Footer} from '../components/common.js';
import '../css/myShow.css';


class MyshowList extends Component{
	constructor(props){
		super(props);
		var data=JSON.parse(window.localStorage.getItem('userInfo'))||{};
		this.state={
			userImg:data.uesrImg||'',
			userId:data.userId||'请登录'
		}
	}
	render(){
		return (
			<div className='myshowList'>
				<div className='aboutuser clear'>
					<div className='Avatar fl'>
						<img src={this.state.userImg}/>
					</div>
					<div className='userinfo fl'>
						<p className='userName'>昵称:{this.state.userId}</p>
						<p>余额:0</p>
					</div>
				</div>
				<ul className='userList'>
					<li>
						<Link className='clear' to="/myorder">
							<span className='myOrder fl' >我的订单</span>
							<em className='fr'>{'>'}</em>
						</Link>
					</li>
					<li>
						<Link className='clear'>
							<span className='myCoupon fl'>我的优惠券</span>
							<em className='fr'>{'>'}</em>
						</Link>
					</li>
					<li>
						<Link className='clear' to="/history">
							<span className='browse-records fl'>浏览记录</span>
							<em className='fr'>{'>'}</em>
						</Link>
					</li>
					<li>
						<Link className='clear' >
							<span className='myCollection fl'>我的收藏</span>
							<em className='fr'>{'>'}</em>
						</Link>
					</li>
				</ul>
			</div>
		)
	}
}
class MyShow extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className='page' id='myshow-page'>
				<Header title='我的秀' rightBtn='充值'/>
				<Content hasFooter={true}>
					<MyshowList/>
				</Content>
				<Footer active={3}/>
			</div>
		)
	}
}
export default MyShow