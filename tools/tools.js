/**
 * Created by hasee on 2016/12/29.
 */


let Tools = {
    getUserID:function () {
        let id =  window.sessionStorage.getItem("userInfo")||window.localStorage.getItem("userInfo");
        if(!id){
            alert("还未登录")
            window.location.hash = "#/login"
        }
        return id
    }
};

export  {Tools}
