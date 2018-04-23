/**
 * Created by admin on 2017/4/11.
 */
let videosend={
    data:"",
    worksvideo(obj,fileQuery) {
        if(window.navigator.userAgent.indexOf("MSIE")>=1){
            alter("您的浏览器不兼容此项功能，抱歉，请使用更高版本的IE浏览器或者改用其他主流浏览器（包括但不限于火狐、谷歌、360浏览器）");
            return null
        }else{
            var file =fileQuery;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                obj.setAttribute("src", e.target.result);
                videosend.data=reader.result;
            };
            return reader
        }
    }
};