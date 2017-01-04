import {Header,Footer,Content,SubHeader} from  "../components/common"

import React, {Component} from  "react"



console.log(22)
class ClassList extends Component　{
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
                <h1>首页</h1>
            </div>
        )
    }
}
export  default  ClassList