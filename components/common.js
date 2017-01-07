/**
 * Created by hasee on 2016/12/29.
 */
/*缺少字体图库*/
import "../css/common.css"
import React,{Component} from "react"


//头部
class Header extends Component {
    constructor(props) {
        super(props)
    }
    render () {

        return <div className="header">
            <ul className="header-list">
                <li className="header-btn">
                    {this.props.hasBack?<a onClick={()=>window.history.go(-1)}>{"<"}</a>:""}

                </li>
                <li className="header-tit">{this.props.title}</li>
                <li className="header-btn">
                    {this.props.rightBtn||(this.props.hasSearch?<a>搜索</a>:"")}
                </li>
            </ul>
        </div>
    }
}

Header.defaultProps={
    hasBack:true
};

//底部
class Footer extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return <div className="footer">
            <ul className="footer-list">
                {
                    this.props.footerData.map((ele,i)=><li key={i}>
                        <i className={"iconfont "+ele.className}></i>
                        <a href={ele.path} className={i==this.props.active?"active":""}>{ele.content}</a>

                    </li>)
                }
            </ul>

        </div>
    }
}
Footer.defaultProps={
    footerData:[
        {
            content:"首页",
            className:"icon-shouye-copy",
            path:"/"
        },
        {
            content:"分类",
            className:"icon-fenlei",
            path:"#/list"
        },
        {
            content:"购物车",
            className:"icon-gouwuche",
            path:"#/cart"
        },
        {
            content:"我的秀",
            className:"icon-wode5",
            path:"#/myshow"
        },
        {
            content:"更多",
            className:"icon-gengduo",
            path:"#/more"
        }
    ]


};



//内容区域
class Content extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let contentStyle = {
            "overflowY":this.props.hasIScroll?"hidden":"auto"
        };
        let contentClass = "content"
            +(this.props.hasFooter?" has-footer":"")
            +(this.props.hasSubHeader?" has-sub-header":"");

        //this.props.hasIScroll  如果需要iscroll就必须引入iscroll的结构

        return <div className={contentClass} style={contentStyle}>
            {this.props.hasIScroll?
                <div className="scroll-wrap" ref="scrollWrap">
                    <div className="scroller">
                        {this.props.children}
                    </div>
                </div>:this.props.children}
        </div>
    }
    componentDidMount() {
        //react-iscroll 插件
        //组件渲染完成以后，获取scroll-wrap，创建iscroll
        //如果需要iscroll再创建
        this.props.hasIScroll && (this.myScroll = new IScroll(this.refs.scrollWrap))
    }
    componentDidUpdate() {
        //组件更新的时候，也更新iscroll
        this.props.hasIScroll && this.myScroll.refresh()
    }
}


//二级头部
class SubHeader extends Component {
    constructor (props){
        super(props)
    }
    render () {
        return (
            <div className="sub-header">{this.props.children}</div>
        )
    }

}

//暴露借口
export { Header,Footer,Content,SubHeader}