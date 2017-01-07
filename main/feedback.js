import { Header,Content} from '../components/common.js';
import React,{Component} from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import LoginAlert from '../components/loginalert.js'
import "../css/feedback.css"

class Feedback extends Component{
	constructor(props){
		super(props);
		this.hideshow=false;
		this.state={
			loginAlert:''
		}
	}
	submitback(){
		var reg1=/^\w{20,}/;
		this.hideshow=true;
		if(!(reg1.test(this.refs.feedText.value))){
			this.setState({
				loginAlert:'字数太少'
			})
			this.timer=setInterval(()=>{
				this.hideshow=false;
				this.setState({
					loginAlert:''
				})
				if(this.hideshow==false){
					clearInterval(this.timer)
				}
			},1000)
		}else{
			this.setState({
				loginAlert:'提交成功'
			})
			this.timer=setTimeout(()=>{
				this.hideshow=false;
				this.setState({
					loginAlert:''
				})
				if(this.hideshow==false){
					clearTimeout(this.timer);
					this.refs.feedText.value='';
					window.location.hash='/more'
				}
			},1000)
		}
	}
	render(){
		return (
			<div className='page' id='feedback-page'>
			<Header title='意见反馈'/>
			<Content>
				<ul className='feedbackList' >
					<li className='backtext'>
						<textarea ref='feedText'></textarea>
					</li>
					<li>
						<button className='submint' onClick={()=>this.submitback()}>提交</button>
					</li>
				</ul>
				<LoginAlert title={this.state.loginAlert} hideShow={this.hideshow}/>
			</Content>
			</div>
		)
	}
}

export default Feedback
