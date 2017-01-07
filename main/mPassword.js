import { Header,Content} from '../components/common.js';
import React,{Component} from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import "../css/mPassword.css";
import LoginAlert from '../components/loginalert.js';

class Mpassword extends Component{
	constructor(props){
		super(props);
		this.state={
			oldPsw:'',
			newPsw:'',
			agnewPsw:'',
			loginAlert:''
		}
	}
	oldPswChange(e){
		this.oldPsw=e.target.value;
		
	}
	newPswChange(e){
		this.newPsw=e.target.value;
		
	}
	agnewPswChange(e){
		this.agnewPsw=e.target.value;
	}
	preservedPsw(){
		var reg1=/\w{6,20}/;
		if(!this.oldPsw){
			this.setState({
				oldPsw:'密码不能为空'
			})
		}else if(!this.newPsw){
			this.setState({
				oldPsw:'',
				newPsw:'密码不能为空'
			})
		}else if(!(reg1.test(this.newPsw)) ){
			 this.setState({
			 	oldPsw:'',
				newPsw:'请输入6位以上新密码'
			})
		}else if(!this.agnewPsw){
			this.setState({
				oldPsw:'',
				newPsw:'',
				agnewPsw:'密码不能为空'
			})
		}else if(this.oldPsw==this.newPsw){
			this.setState({
				oldPsw:'',
				newPsw:'新密码不能与原密码相同',
				agnewPsw:''
			})
		}else if(!(this.newPsw==this.agnewPsw)){
			this.setState({
				oldPsw:'',
				newPsw:'',
				agnewPsw:'两次密码不相同'
			})
		}else{
			this.setState({
				oldPsw:'',
				newPsw:'',
				agnewPsw:''
			})
			this.hideshow=true;
			this.setState({
				loginAlert:'修改成功'
			})
			this.timer=setTimeout(()=>{
				this.hideshow=false;
				this.setState({
					loginAlert:''
				})
				if(this.hideshow==false){
					clearTimeout(this.timer);
					window.location.hash='/more'
				}
			},1000)
		}
		
		
		
		
		
		
		
	}
	render(){
		return (
			<div className='page' id='mpassword-page'>
			<Header title='修改密码'/>
			<Content>
				<ul className='mpasswordlist' >
					<li>
						<input type='text' placeholder='请输入原密码' onChange={(e)=>this.oldPswChange(e)}/>
						<p>{this.state.oldPsw}</p>
					</li>
					<li>
						<input type='text' placeholder='请输入新密码' onChange={(e)=>this.newPswChange(e)}/>
						<p>{this.state.newPsw}</p>
					</li>
					<li>
						<input type='text' placeholder='请再次输入新密码' onChange={(e)=>this.agnewPswChange(e)}/>
						<p>{this.state.agnewPsw}</p>
					</li>
					<li>
						<button className='preserved' onClick={()=>this.preservedPsw()}>保存</button>
					</li>
				</ul>
				<LoginAlert title={this.state.loginAlert} hideShow={this.hideshow}/>
			</Content>
			</div>
			
		)
	}

}

export default Mpassword
