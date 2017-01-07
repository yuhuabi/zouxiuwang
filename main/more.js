import { Header,Content} from '../components/common.js';
import React,{Component} from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import "../css/more.css"

class More extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className='page' id='more-page'>
			<Header title='更多'/>
			<Content>
				<ul className='moreList' >
					<li>
						<Link className='clear' to='/mpassword'>
							<span className='m-password  fl'>修改密码</span>
							<em className='fr'>{'>'}</em>
						</Link>
					</li>
					<li>
						<Link className='clear' to='/feedback'>
							<span className='feedback  fl'>用户反馈</span>
							<em className='fr'>{'>'}</em>
						</Link>
					</li>
					<li>
						<Link className='clear'>
							<span className='about fl'>关于</span>
							<em className='fr'>{'>'}</em>
						</Link>
					</li>
				</ul>
			</Content>
				
			</div>
			
		)
	}

}

export default More
