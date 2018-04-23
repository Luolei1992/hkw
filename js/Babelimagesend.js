'use strict';
/**
 * Created by admin on 2017/4/5.
 */
var imagesend = {
    data: "",
    getPath: function getPath(obj, fileQuery, transImg, index) {
        var imgSrc = '',
            imgArr = [],
            strSrc = '';
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            // IE浏览器判断
            if (obj.select) {
                obj.select();
                var path = document.selection.createRange().text;
                alert(path);
                obj.removeAttribute("src");
                imgSrc = fileQuery.value;
                imgArr = imgSrc.split('.');
                strSrc = imgArr[imgArr.length - 1].toLowerCase();
                if (strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0) {
                    obj.setAttribute("src", transImg);
                    obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + path + "', sizingMethod='scale');"; // IE通过滤镜的方式实现图片显示
                } else {
                    //try{
                    throw new Error('File type Error! please image file upload..');
                    //}catch(e){
                    // alert('name: ' + e.name + 'message: ' + e.message) ;
                    //}
                }
            } else {
                // alert(fileQuery.value) ;
                imgSrc = fileQuery.value;
                imgArr = imgSrc.split('.');
                strSrc = imgArr[imgArr.length - 1].toLowerCase();
                if (strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0) {
                    obj.src = fileQuery.value;
                } else {
                    //try{
                    throw new Error('File type Error! please image file upload..');
                    //}catch(e){
                    // alert('name: ' + e.name + 'message: ' + e.message) ;
                    //}
                }
            }
        } else {
            var file = fileQuery.files[index];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                imgSrc = fileQuery.value;
                imgArr = imgSrc.split('.');
                strSrc = imgArr[imgArr.length - 1].toLowerCase();
                if (strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0) {
                    obj.setAttribute("src", e.target.result);
                } else {
                    throw new Error('File type Error! please image file upload..');
                }
                imagesend.data = reader.result;
            };
        }
    },
    worksimage: function worksimage(obj, fileQuery) {
        var aaa = undefined;
        var file = fileQuery;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            obj.setAttribute("src", e.target.result);
            imagesend.data = reader.result;
            aaa = reader.result;
        };
        return reader;
    }
};
