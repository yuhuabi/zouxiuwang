import { Header,Content} from '../components/common.js';
import React,{Component} from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import "../css/loginPage.css";
import LoginAlert from '../components/loginalert.js'
class LoginList extends Component {
	constructor(props){
		super(props);
		this.state={
			userInfo:'',
			pswInfo:'',
			showPsw:false,//是否显示密码
			remeberPsw:true,//是否记住密码
		}
	}
	//用户名的判断
	userChange(e){
		this.userinfo=e.target.value;
		var reg1=/\w{6,20}/;
		if(!(reg1.test(this.userinfo))){
			this.setState({
				userInfo:'请输入6-20位字符'
			})
		}else{
			this.setState({
				userInfo:''
			})
		}
	}
	//密码的判断
	pswChange(e){
		this.pswinfo=e.target.value;
		var reg2=/\w{6,20}/;
		if(!(reg2.test(this.pswinfo))){
			this.setState({
				pswInfo:'请输入6位以上密码'
			})
		}else{
			this.setState({
				pswInfo:''
			})
		}
	}
	//是否显示密码切换
	showchange(){
		this.setState({
			showPsw:!this.state.showPsw
		})
		
	}
	//是否记住密码的切换
	remeberChange(){
		this.setState({
			remeberPsw:!this.state.remeberPsw
		})
	}
	//登录
	login(){
		if((this.state.userInfo=='')&&(this.state.pswInfo=='')&&(this.pswinfo!=undefined)){
			$.get('http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID='+this.userinfo+'&password='+this.pswinfo+'',(data)=>{
				if(data==0 ){
					this.props.fText('用户名不存在')
				}else if(data==2){
					this.props.fText('用户名密码不符')
				}else{
					this.props.fText('登陆成功')
					data=JSON.parse(data);
					window.localStorage.setItem('userInfo',JSON.stringify({
						uesrImg:data.userimg_url,
						userId:data.userID
					}));
					console.log(data);
					window.location.hash="/"
				}
			})
		}
	}
	render(){
		this.showPsw=false;
		return(
			<ul className='loginList'>
				<li className='user'>
					<input type='text' placeholder='请输入账户'
					className='userName inputtext' 
					onBlur={(e)=>this.userChange(e)} />
					<p className='information'>{this.state.userInfo}</p>
				</li>
				
				<li className='psw'>
					<input type={this.state.showPsw?'text':'password'} placeholder='请输入密码'
						className='psaaword inputtext' 
						onBlur={(e)=>this.pswChange(e)}/>
					<p className='information'>{this.state.pswInfo}</p>
				</li>
				<li className='showPassword clear'>
					<label className='clear fl'>
						<input type='checkbox' className='showpsw fl' onChange={()=>this.showchange()}/>
						<span className='showtext fl'>显示密码</span>
					</label>
					<Link activeStyle={{'color':'red'}} className='forgetpsw fl'>忘记密码?</Link>
				</li>
				<li className='remeberPassword'>
					<label className='clear'>
						<input type='checkbox' className='remeberpsw fl'defaultChecked={this.state.remeberPsw} onChange={this.remeberChange} />
						<span className='remebertext fl'>记住密码自动登录</span>
					</label>
				</li>
				<li className='Btn login-Btn'>
					<button className='loginBtn btn' onClick={()=>this.login()} >登录</button>
				</li>
				<li className='Btn'>
					<Link to='/register'>
						<button className='registerBtn btn'>注册</button>
					</Link>
				</li>
			</ul>
		)
	}
}
class LoginPage extends Component{
	constructor(props){
		super(props);
		this.state={
			loginAlert:'',
		}
		
	}
	showBoxText(content ){
		this.hideshow=true;
		this.setState({
			loginAlert:content,
		})
		this.timer=setTimeout(function(){
			this.hideshow=false;
			this.setState({
				loginAlert:'',
			})
			
			if(this.hideshow==false){
				clearTimeout(this.timer);	
			}
		}.bind(this),1000)
	}
	render(){
		return(
			<div className='page' id='login-page'>
				<Header title='开心摇摇用户登录'/>
				<Content>
					<LoginList fText={(content)=>this.showBoxText(content)}/>
					<LoginAlert title={this.state.loginAlert} hideShow={this.hideshow}/>
				</Content>
			</div>
		)
	}
}
export default LoginPage
