import React,{Component} from 'react';
import '../css/loginalert.css'
class LoginAlert extends Component{
	constructor( props){
		super(props)
	}
	render(){
		var loginAlert=this.props.hideShow?'block':'none'
		return(
			<div className='login-alert' style={{'display':loginAlert}}>
				{this.props.title}
			</div>
		)
	}
}
export default LoginAlert
