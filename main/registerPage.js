import { Header,Content} from '../components/common.js';
import React,{Component} from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import "../css/registerPage.css";
import LoginAlert from '../components/loginalert.js'
class RegisterList extends Component {
	constructor(props){
		super(props);
		this.state={
			userinformation:'',
			pswinformation:'',
			agpswinformation:''
		}
	}
	userChange(e){
		this.userinfo=e.target.value;
		var reg1=/^\w{6,20}$/g;
		if(!(reg1.test(this.userinfo))){
			this.setState({
				userinformation:'请输入6-20位字符'
			})
		}else{
			this.setState({
				userinformation:''
			})
		}
	}
	pswChange(e){
		this.pswinfo=e.target.value;
		var reg2=/^\w{6,20}$/;
		if(!(reg2.test(this.pswinfo))){
			this.setState({
				pswinformation:'请输入至少6位密码'
			})
		}else{
			this.setState({
				pswinformation:''
			})
		}
	}
	agpswChange(e){
		this.agpswinfo=e.target.value;
		if(!(this.agpswinfo===this.pswinfo)){
			this.setState({
				agpswinformation:'密码不一致'
			})
		}else{
			this.setState({
				agpswinformation:''
			})
		}
		
	}
	prompregister(){
		if((this.state.userinformation=='')&&(this.state.pswinformation=='')&&(this.state.agpswinformation=='')){
			if(this.agpswinfo){
				$.get('http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID='+this.userinfo+'&password='+this.pswinfo+'',(data)=>{
					if( data==0){
						this.props.fText('用户名重名')
					}else if( data==1){
						this.props.fText('注册成功')
						window.location.hash='#/login';
					}else if(data==2){
						this.props.fText('数据库报错')
					}
				})
			}
		}
	}
	render(){
		return(
			<ul className='registerList'>
				<li className='user inputli'>
					<span>账户名称:</span>
					<input type='text' placeholder='请输入账户' 
					className='userName inputtext ' 
					onBlur={(e)=>this.userChange(e)} />
					<p className='information'>{this.state.userinformation}</p>
				</li>
				
				<li className='psw inputli'>
				<span>登录密码:</span>
					<input type='password' placeholder='请输入密码' 
					className='psaaword inputtext'
					onBlur={(e)=>this.pswChange(e)}/>
					<p className='information'>{this.state.pswinformation}</p>
				</li>
				<li className='agpsw inputli'>
				<span>确认密码:</span>
					<input type='password' placeholder='请输入密码' 
					className='psaaword inputtext'
					onBlur={(e)=>this.agpswChange(e)}/>
					<p className='information'>{this.state.agpswinformation}</p>
				</li>
				
				<li className='Btn'>
					<button className='registerBtn btn' onClick={()=>this.prompregister()}>确定注册</button>
				</li>
			</ul>
		)
	}
}
class registerPage extends Component{
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
			<div className='page' id='register-page'>
				<Header title='用户注册'/>
				<Content>
					<RegisterList fText={(content)=>this.showBoxText(content)}/>
					<LoginAlert title={this.state.loginAlert} hideShow={this.hideshow}/>
				</Content>
			</div>
		)
	}
}
export default registerPage
