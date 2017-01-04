import {Header,Footer,Content,SubHeader} from  "../components/common"

import React, {Component} from  "react"




class DetailPage extends Component　{
    constructor(props){
        super(props)
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){
        return (
            <div>
                详情页面
            </div>
        )
    }
}
//暴露接口
export  default  DetailPage