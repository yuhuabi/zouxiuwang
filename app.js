import React,{Component} from "react"
import ReactDOM from "react-dom"
import {Router,Route,hashHistory} from "react-router"
import ListPage from "./main/listPage"
import DetailPage from "./main/detailPage"
import ClassList from "./main/indexPage"

//路由

ReactDOM.render(<Router history={hashHistory}>
        <Route path="/" component={ClassList}/>
        <Route path="/list" component={ListPage}/>
        <Route path="/detail" component={DetailPage}/>
    </Router>,document.getElementById("root")
);


//开启热替换
if(module.hot){
    module.hot.accept();
}