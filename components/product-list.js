/**
 * Created by hasee on 2016/12/30.
 */

import "../css/product-list.css"
import React,{Component} from "react"

/*写组件的时候，尽量 把组件名写完整，描述清晰*/
class  ProductList extends Component {
     constructor(props){
         super(props)
     }
     render(){
         console.log(this.props.productData)
         return (
             <ul className="product-list">
                 {
                     this.props.productData.map((ele,i)=><li key={i}>
                         <a href={"#/detail/"+ele.goodsID}><img src={ele.goodsListImg}/></a>
                         <p className="tit">{ele.goodsName}</p>
                         <p className="new-price">￥<em>{ele.price}</em></p>
                         <p className="old-price">￥999</p>
                     </li>)
                 }
             </ul>
         )
     }

}
ProductList.defaultProps={
    productData:[]
};


export default ProductList