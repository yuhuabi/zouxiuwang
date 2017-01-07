import React,{Component} from "react";
import ReactDOM from "react-dom";
import {Router,Route,hashHistory} from "react-router";
//王森
import ListPage from "./main/list-page";
import DetailPage from "./main/detail-page";
import ClassList from "./main/indexPage";
import History from "./main/history";
//王杰
import CartPage from "./main/cart-page";
import OrderPage from "./main/order-page";
import MyOrderPage from "./main/myorder-page";
//李娜
import LoginPage from "./main/login-page.js";//登录
import registerPage from "./main/registerPage.js";//注册
import More from "./main/more.js";//更多
import MyShow from './main/myShow.js';//我的秀
import Feedback from './main/feedback.js';//意见反馈
import Mpassword from './main/mPassword.js';//修改密码



//路由
ReactDOM.render(<Router history={hashHistory}>

        <Route path="/" component={ClassList}/>
        <Route path="/list" component={ListPage}/>
        <Route path="/detail(/:goodsID)" component={DetailPage}/>
        <Route path="/history" component={History} />

        <Route path="/cart" component={CartPage}/>
        <Route path="/order" component={OrderPage}/>
        <Route path='/myorder' component={MyOrderPage} />


        <Route path="/" component={Feedback}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={registerPage}/>
        <Route path='/myshow' component={MyShow} />
        <Route path='/more' component={More} />
        <Route path='/mpassword' component={Mpassword} />
        <Route path='/feedback' component={Feedback} />


    </Router>,document.getElementById("root")
);


//开启热替换
if(module.hot){
    module.hot.accept();
}