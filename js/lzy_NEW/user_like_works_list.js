/**
 * Created by admin on 2017/8/28.
 */
(function () {
    //init_ulwl(data.data.user_id);
    var urlLocalhost = "https://www.huakewang.com/";
    var newhuakwang="hkw_newapi/";
    var offset=0;
    var init_ulwl=function(_uid){
        //“添加更多”按钮的点击事件
        refreshWorkListBoxContent(_uid);
        $('#workListAddMoreContent').on('click',function(){
            refreshWorkListBoxContent(_uid);
        });
    };
    $(document).on('click','#loveWorkList',function () {
        var _uid = $(".img_1").attr("data-id");
        init_ulwl(_uid);
    });
    window.init_ulwl=init_ulwl;
    var masornyNewLi= function (data) {
        if(data != undefined && data.display == "1"){
            var _data=data;
            var _li=document.createElement('li');
            _li.className="grid-item";
            _li.style.display=_data.display||"block";
            _li.style.visibility='hidden';
            var _imagepath=_data.path;
            if(_imagepath.indexOf("http")<0){
                _imagepath="https://www.huakewang.com/"+_imagepath;
            }
            var _path="introduction.html?"+_data.id;
            _li.innerHTML='<div class="iInspir-block"></div>'+
                '<div class="hkw-work-img thumb-a h_a">'+
                '<a href="'+_path+'" target=_blank><img class="delay maxImgWidth"   src="'+_imagepath+'"  style="" alt="'+_data.keyword||""+'"  /></a>'+
                '<div class="caption">'+
                '<h4 style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">'+
                _data.title+
                '<a href="#" class="sc">'+
                '收藏'+
                '</a>'+
                '</h4>'+
                '<p style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">'+_data.content+'</p>'+
                '</div>'+
                '</div>'+
                '<div class="hkw-work-bottom">'+
                '<a href="detailed.html?id='+_data.user_id+'" target=_blank><img '+
                'src="'+_data.user_path+'" width="16" height="16" />'+
                _data.nick_name+'</a>'+
                '<div class="hkw-work-bar fn-right">'+
                '<div class="hkw-work-bar-item">'+
                '<span class="hkw-eye-icon">'+
                '</span>'+
                _data.hits+
                '</div>'+
                '<div class="hkw-work-bar-item">'+
                '<span class="hkw-comment-icon">'+
                '</span>'+
                _data.comment_count+
                '</div>'+
                '<div class="hkw-work-bar-item">'+
                '<span class="hkw-collection-icon">'+
                '</span>'+
                _data.love_count+
                '</div>'+
                '</div>'+
                '</div>';
            return _li
        }else{
            //如果没有更多作品了则-隐藏“添加更多”-显示“没有更多”
            $('#workListAddMoreContent').css('display','none');
            $('#workListNoMoreContent').css('display','block');
        }
    };

    var refreshWorkListBoxContent= function (_uid) {
        // hkapi/get_my_love_list/$type/$max_id/$since_id/$per_page/$page     +data:{user_id:user_id}
        console.log(_uid);
        $.ajax({
            url:urlLocalhost+newhuakwang+"/get_user_love_list/works/0/0/30/1/"+_uid,
            type:"post",
            dataType:"json",
            data:{
                user_id:getCookie("user_id"),
            }
        }).done(function (data) {
            // console.log("获取感兴趣的作品");
            // console.log(data);
            var _item_list=data.data.item_list;
            var _length=_item_list.length;
            console.log(_length)
            if(_length==0){
                $('#error_workslist_user_like').siblings().css('display','none');
                $('#error_workslist_user_like').css('display','block');
            }else{
                //进行作品计数
                offset=offset+30;
                //将作品loading
                workListAddMoreContentFunction(_item_list);
            };
        })
    };

    var workListAddMoreContentFunction= function (itemsData) {
        var _items=[
            masornyNewLi(itemsData[0]),masornyNewLi(itemsData[1]),
            masornyNewLi(itemsData[2]),masornyNewLi(itemsData[3]),
            masornyNewLi(itemsData[4]),masornyNewLi(itemsData[5]),
            masornyNewLi(itemsData[6]),masornyNewLi(itemsData[7]),
            masornyNewLi(itemsData[8]),masornyNewLi(itemsData[9]),
            masornyNewLi(itemsData[10]),masornyNewLi(itemsData[11]),
            masornyNewLi(itemsData[12]),masornyNewLi(itemsData[13]),
            masornyNewLi(itemsData[14]),masornyNewLi(itemsData[15]),
            masornyNewLi(itemsData[16]),masornyNewLi(itemsData[17]),
            masornyNewLi(itemsData[18]),masornyNewLi(itemsData[19]),
            masornyNewLi(itemsData[20]),masornyNewLi(itemsData[21]),
            masornyNewLi(itemsData[22]),masornyNewLi(itemsData[23]),
            masornyNewLi(itemsData[24]),masornyNewLi(itemsData[25]),
            masornyNewLi(itemsData[26]),masornyNewLi(itemsData[27]),
            masornyNewLi(itemsData[28]),masornyNewLi(itemsData[29])];
        var $items=$(_items);
        $workListMasonry.append( $items ).masonry( 'appended', $items );
        for(var i= 0;i<10;i++){
            setTimeout(function(){
                $workListMasonry.masonry({itemSelector: '.grid-item',
                    columnWidth: 100});
            },1000+i*1000);
        };
        setTimeout(function () {
            $('.pblUl:first li').css('visibility','visible')
        },2000);
    }
})();