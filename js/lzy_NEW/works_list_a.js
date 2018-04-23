/**
 * Created by admin on 2017/7/26.
 */
(function () {
    var _LZY_real_Url='https://www.huakewang.com/';
    var newhuakwang="hkw_newapi/";
    var real={data:undefined};
    var flag = true;

    //获取作品集所需要的参数（初始）
    var ajaxMockData={
        firstid:148,
        secondid:undefined,
        sort:"add_time",
        keyword:"",
        offset:0,
        limit:20,
        user_id: getCookie("user_id")
    };
    //数据长度计算
    var ajaxMockDataMaxLength=0;
    //分类列表锁
    var getSelectValue=[undefined,undefined,undefined];
    //地址栏获取的各分类的值
    var listInt=[0,undefined,undefined];
    //第二级分类空数组、第三级分类空数组
    var _secondForListZeroArray=[],_thirdForListZeroArray=[];
    //判断地址栏的各级分类值
    if(window.location.href.split("?")[1]){
        var tag = parseInt(window.location.href.split("?")[1].split("=")[1]);
        listInt[0]=tag;
        var secend_keyword=window.location.href.split("?")[1].split("=")[1].split('#')[1];
        if(secend_keyword!=undefined){
            if(secend_keyword.indexOf("k")>-1){
                var _keyword_href=secend_keyword.split("k")[1];
                listInt[2]=_keyword_href;
                ajaxMockData.keyword=_keyword_href;
            }else{
                listInt[1]=parseInt(secend_keyword);
            };
        };
    };
    //分类栏参数获取
    function workListChange(num) {
        $.ajax({
            url:_LZY_real_Url+newhuakwang+"get_menu_class/"+num,
            type:"get",
            dataType:"json",
        }).done(function (data) {
            real.data=data.data;
            if(data.success){
                //分类栏参数实现,分类栏是否全部类
                if(listInt[0]==undefined||listInt[0]==0){
                    $('#firstSelect').html('<li><span class="text"><a class="leiRed" href="works-list.html?tag=0" data-id="148" style="color:red">全部</a></span></li>');
                    //判断是否有相关分类被选择，由此选择第二类栏目的；如果为“全部”，隐藏第二类栏目
                    $('#secondSelect').css('display','none');
                }else{
                    //第一级分类初始化首标签：“全部”
                    $('#secondSelect').css('display','block');
                    $('#firstSelect').html('<li><span class="text"><a href="works-list.html?tag=0">全部</a></span></li>');
                };
                //第二、第三级分类初始化栏目名称
                $('#secondSelect').html('<li><span class="text text1" style="line-height:38px">子类目：</span></li>');
                $('#thirdSelect').html('<li><span style="line-height:38px" class="text text1">热门关键词：</span></li>');
                _secondForListZeroArray=[];
                _thirdForListZeroArray=[];
                //分类栏数目大于9则添加“更多”标签，多余数据存入对应级别分类的空数组
                // 第一级分类for循环实例化
                if(data.data.length>9){
                    for(var d1=0;d1<9;d1++){
                        firstForList(data.data[d1],d1);
                    };
                    $('#firstSelect').append('<li><span class="text"><a id="workListFirstSelectMore1" style="cursor: pointer;visibility: visible;">更多</a></span></li>');
                }else{
                    for(var d2=0;d2<data.data.length;d2++){
                        firstForList(data.data[d2],d2);
                    };
                };
            };
        });
    };
    workListChange(148);
    //第一级分类抽象实体
    var firstForList= function (_data1,_val) {
        getSelectValue[0]=1;
        _val++;
        // var _href="works-list.html?tag="+_val;
        //判断是否有相关分类被选择，选择则标红，并修改对应的作品请求数据中的数据 否则：直接添加标签
        if(_val==listInt[0]){
            ajaxMockData.firstid=_data1.id;
            $('#firstSelect').append('<li><span class="text"><a class="leiRed"  data-id="'+_data1.id+'">'+_data1.menu_name+'('+_data1.totals+')</a></span></li>');
        }else{
            $('#firstSelect').append('<li><span class="text"><a  data-id="'+_data1.id+'">'+_data1.menu_name+'('+_data1.totals+')</a></span></li>');
        };
        //判断是否有相关分类被选择，由此选择第二类栏目的；
        if(_val==listInt[0]){
            //第二类栏目数量大于9个则添加“更多”标签
            if(_data1.subMenuList.length>9){
                for(var l1=0;l1<9;l1++){
                    secondForList(_data1.subMenuList[l1]);
                };
                $('#secondSelect').append('<li><span class="text"><a id="workListFirstSelectMore2" style="cursor: pointer;visibility: visible;">更多</a></span></li>');
            }else{
                for(var l2=0;l2<_data1.subMenuList.length;l2++){
                    secondForList(_data1.subMenuList[l2])
                };
            };
            var _keword1=_data1.keyword.split(",").join("，").split("，").join("、").split("、");
            //第三轮栏目数量大于9个则添加更多标签；如果第三类数据为空，则显示“暂无”字样
            if(_keword1.length>9){
                for(var l3=0;l3<9;l3++){
                    thirdForList(_keword1[l3]);
                };
                $('#thirdSelect').append('<li><span class="text"><a id="workListFirstSelectMore3" style="cursor: pointer;visibility: visible;">更多</a></span></li>');
            }else if(_keword1!=""){
                for(var l4=0;l4<_keword1.length;l4++){
                    thirdForList(_keword1[l4])
                };
            }else{
                getSelectValue[2]=1;
                $('#thirdSelect').append('<li><span class="text" style="margin-left:20px;">暂无</span></li>');
            };
        }else if(listInt[0]==0){
            //如果为全部则将第二类第三类的样式定为如下
            for(var l5=0;l5<_data1.subMenuList.length;l5++){
                secondForListZero(_data1.subMenuList[l5])
            }
            var _keword2=_data1.keyword.split(",").join("，").split("，").join("、").split("、");
            for(var l6=0;l6<_keword2.length;l6++){
                thirdForListZero(_keword2[l6])
            };
        };
    };
    //第二类抽象实体
    var secondForList= function (_data2) {
        getSelectValue[1]=1;
        if(listInt[1]!=undefined&&listInt[1]==_data2.id){
            $('#secondSelect').append('<li><span class="text"><a style="cursor: pointer" href="#'+_data2.id+'" data-selector-id="'+_data2.id+'" style="color: red">'+_data2.menu_name+'('+_data2.totals+')</a></span></li>');
        }else{
            $('#secondSelect').append('<li><span class="text"><a style="cursor: pointer" href="#'+_data2.id+'" data-selector-id="'+_data2.id+'">'+_data2.menu_name+'('+_data2.totals+')</a></span></li>');
        };
    };
    //第二类全部状态下抽象实体（已经被隐藏）
    var secondForListZero= function (_data3) {
        getSelectValue[1]=1;
        if(_secondForListZeroArray.indexOf(_data3.menu_name)==-1){
            _secondForListZeroArray.push(_data3);
            if(_secondForListZeroArray.length<10){
                $('#secondSelect').append('<li><span class="text"><a style="cursor: pointer"  href="#'+_data3.id+'" data-selector-id="'+_data3.id+'">'+_data3.menu_name+'('+_data3.totals+')</a></span></li>');
            }else if(_secondForListZeroArray.length==10){
                $('#secondSelect').append('<li><span class="text"><a id="workListFirstSelectMore2" style="cursor: pointer;visibility: visible;">更多</a></span></li>');
            };
        };
    };
    //第三类抽象实体
    var thirdForList= function (_data4) {
        getSelectValue[2]=1;
        if(listInt[2]!=undefined&&listInt[2]==_data4){
            $('#thirdSelect').append('<li><span class="text">' +
                '<a  href="#k'+_data4+'"  style="cursor: pointer;color:red">'+_data4+'</a></span></li>')
        }else{
            $('#thirdSelect').append('<li><span class="text">' +
                '<a  href="#k'+_data4+'"  style="cursor: pointer;">'+_data4+'</a></span></li>')
        };
    };
    //第三类全部状态下抽象实体
    var thirdForListZero= function (_data5) {
        getSelectValue[2]=1;
        if(_thirdForListZeroArray.indexOf(_data5)==-1&&_data5!=""){
            _thirdForListZeroArray.push(_data5);
            if(_thirdForListZeroArray.length<10){
                $('#thirdSelect').append('<li><span class="text"><a style="cursor: pointer"  href="#k'+_data5+'"  >'+_data5+'</a></span></li>');
            }else if(_thirdForListZeroArray.length==10){
                $('#thirdSelect').append('<li><span class="text"><a id="workListFirstSelectMore3" style="cursor: pointer;visibility: visible;">更多</a></span></li>');
            };
        };
    };
    //作品瀑布流初始化函数
    var init=function(){
        //第一级：button更多的点击事件，
        $('#workListFirstSelectMore1').on('click', function () {
            //将对应的div的状态从none修改到block
                $('#workListFirstSelectMoreBox').css('display','block');
                //清空对应div的原有内容
                $('#workListKindMoreContentChange').html(" ");
            //将“更多”字样标红
                $('#workListFirstSelectMore1').css('color','red');
                //对应div的新内容添加
                for(var MB1=9;MB1<real.data.length;MB1++){
                    var _real_data=real.data[MB1];
                    $('#workListKindMoreContentChange').append('<li><span class="text"><a style="cursor: pointer" data-selector-id="'+_real_data.id+'">'+_real_data.menu_name+'('+_real_data.totals+')</a></span></li>');
                };
            //设定特征值，为新添加的内容添加对应的点击事件
            $('.WLFSMB_close:first').attr('name',"workListFirstSelectMore1");
            setAddMoreBox();
        });

        //第二级：button更多的点击事件，
        $('#workListFirstSelectMore2').on('click', function () {
                $('#workListFirstSelectMoreBox').css('display','block');
                $('#workListKindMoreContentChange').html(" ");
                $('#workListFirstSelectMore2').css('color','red');
            for(var MB2=9;MB2<_secondForListZeroArray.length;MB2++){
                    var _real_data=_secondForListZeroArray[MB2];
                    $('#workListKindMoreContentChange').append('<li><span class="text"><a style="cursor: pointer" data-selector-id="'+_real_data.id+'">'+_real_data.menu_name+'('+_real_data.totals+')</a></span></li>');
                };
            $('.WLFSMB_close:first').attr('name',"workListFirstSelectMore2");
            setAddMoreBox();
        });

        //第三级：button更多的点击事件，
        $('#workListFirstSelectMore3').on('click', function () {
                $('#workListFirstSelectMoreBox').css('display','block');
                $('#workListKindMoreContentChange').html(" ");
                $('#workListFirstSelectMore3').css('color','red');
            for(var MB3=9;MB3<_thirdForListZeroArray.length;MB3++){
                    var _real_data=_thirdForListZeroArray[MB3];
                    $('#workListKindMoreContentChange').append('<li><span class="text"><a style="cursor: pointer" data-selector-id="'+_real_data.id+'">'+_real_data.menu_name+'('+_real_data.totals+')</a></span></li>');
                };
            $('.WLFSMB_close:first').attr('name',"workListFirstSelectMore3");
            setAddMoreBox();
        });
        //更多内容点击展示出的div的关闭按钮点击事件
        $('.WLFSMB_close:first').on('click', function () {
            $('#'+this.name).css('color',"");
            $('#workListFirstSelectMoreBox').css('display','none');
        });
        //“添加更多”按钮的点击事件
        $('#workListAddMoreContent').on('click',function(){
            refreshWorkListBoxContent();
        });
        $(window).scroll(function(){
            if($(this).scrollTop() + $(this).height() > $(document).height() - 600){
                if (flag){
                    refreshWorkListBoxContent();
                    flag = false;
                };
            };
        });
        //第一级栏目点击事件
        $(document).on("click","#firstSelect li",function () {
            var _thisVal = $(this).find("a").html(),
                idx = $(this).find("a").attr("data-id");
            listInt[0] = $(this).index();
            $('#thirdSelect').css('color','');
            $('#work_list_content').html("");
            ajaxMockData.offset=0;
            ajaxSeoMsg(_thisVal.split("(")[0],"");
            workListChange(idx);
            refreshWorkListBoxContent();
        });
        //第二级栏目各标签的点击事件
        $(document).on("click","#secondSelect li a",function () {
            var _this=$(this);
            ajaxMockData.secondid=_this.attr('data-selector-id');
            ajaxMockData.keyword="";
            _this.parent().parent().siblings().find("a").css('color','#676767');
            _this.css('color','red');
            $('#thirdSelect').css('color','');
            $('#work_list_content').html("");
            ajaxMockData.offset=0;
            //修改参数后刷新作品集
            ajaxSeoMsg(_this.html().split("(")[0],$("#firstSelect a.leiRed").html().split("(")[0]);
            refreshWorkListBoxContent();
        });
        //第三级栏目各标签的点击事件
        $(document).on('click','#thirdSelect li a', function () {
            var _this=$(this);
            ajaxMockData.keyword=_this.html();
            ajaxMockData.secondid=undefined;
            _this.parents("li").siblings().find("a").css('color','');
            _this.css('color','red');
            $('#secondSelect').css('color','');
            $('#work_list_content').html("");
            ajaxMockData.offset=0;
            ajaxSeoMsg(_this.html(),$("#firstSelect a.leiRed").html().split("(")[0]);
            refreshWorkListBoxContent();
        });
        //获取不同栏目分类下的seo信息
        function ajaxSeoMsg(key,key2) {
            console.log(key + "****" + key2);
            $.ajax({
                url:_LZY_real_Url+newhuakwang+'get_menu_class_by_name/'+key,
                type:"get",
                dataType:"json",
                success:function (res) {
                    console.log("seoseoseoseoseo");
                    console.log(res);
                    if(res.success){
                        if(!key2) {
                            //标题
                            $("title").html(res.data.seo_title || "");
                            //关键词
                            $("meta[name=keywords]").attr("content",res.data.keyword || "");
                            //页面描述
                            if(res.data.content){
                                $("meta[name=description]").attr("content",res.data.content || "");
                            }else{
                                $("meta[name=description]").attr("content",res.data.cover_keyword || "");
                            };
                            //页面功能
                            if(res.data.abstract) {
                                $("meta[name=description]").attr("content",res.data.abstract || "");
                            };
                        } else {
                            if(res.data.seo_title && res.data.keyword){
                                //标题
                                $("title").html(res.data.seo_title);
                                //关键词
                                $("meta[name=keywords]").attr("content",res.data.keyword);
                                //页面描述
                                if(res.data.content){
                                    $("meta[name=description]").attr("content",res.data.content || "");
                                }else{
                                    $("meta[name=description]").attr("content",res.data.cover_keyword || "");
                                };
                                //页面功能
                                if(res.data.abstract) {
                                    $("meta[name=description]").attr("content",res.data.abstract || "");
                                };
                            }else{
                                $.ajax({
                                    url:baseURL+'get_menu_class_by_name/'+key2,
                                    type:"get",
                                    dataType:"json",
                                    success:function (res) {
                                        console.log("seoseoseoseo");
                                        console.log(res);
                                        if(res.success){
                                            //标题
                                            $("title").html(res.data.seo_title || "");
                                            //关键词
                                            $("meta[name=keywords]").attr("content",res.data.keyword || "");
                                            //页面描述
                                            if(res.data.content){
                                                $("meta[name=description]").attr("content",res.data.content || "");
                                            }else{
                                                $("meta[name=description]").attr("content",res.data.cover_keyword || "");
                                            };
                                            //页面功能
                                            if(res.data.abstract) {
                                                $("meta[name=description]").attr("content",res.data.abstract || "");
                                            };
                                        }else{
                                            console.log(res.message);
                                        };
                                    }, error:function (res) {
                                        console.log(res.message);
                                    }
                                });
                            };
                        }
                    }else{
                        console.log(res.message);
                    };
                }, error:function (res) {
                    console.log(res);
                }
            })
        };
        //“更多”标签点击后将对应div修改的抽象实体
        var setAddMoreBox= function () {
          $('#workListKindMoreContentChange').find('a').each(function(){
              $(this).on('click', function () {
                  var _this=$(this);
                  var _WLFSMB_close_name=$('.WLFSMB_close:first').attr('name');
                  //根据特征值修改将要发送的数据
                  if(_WLFSMB_close_name=="workListFirstSelectMore1"){
                      ajaxMockData.firstid=_this.attr('data-selector-id');
                      ajaxMockData.offset=0;
                      ajaxMockData.secondid=undefined;
                      ajaxMockData.keyword="";
                  }else if(_WLFSMB_close_name=="workListFirstSelectMore2"){
                      ajaxMockData.secondid=_this.attr('data-selector-id');
                      ajaxMockData.offset=0;
                      ajaxMockData.keyword="";
                      $('#thirdSelect').find('a').css('color','');
                  }else if(_WLFSMB_close_name=="workListFirstSelectMore3"){
                      ajaxMockData.keyword=_this.html;
                      ajaxMockData.offset=0;
                      ajaxMockData.secondid=undefined;
                      $('#secondSelect').find('a').css('color','');
                  }
                  $('#workListFirstSelectMoreBox').css('display','none');
                  $('#work_list_content').html("");
                  ajaxMockData.offset=0;
                  refreshWorkListBoxContent();
              });
          })
        };
    };
    //瀑布流动态向作品集添加更多的作品
    var masornyNewLi= function (data) {
        if(data!=undefined&&data.display=="1"){
            var _data=data;
            var _li=document.createElement('li');
            _li.className="grid-item";
            _li.style.display=_data.display||"block";
            _li.style.visibility='hidden';
            var _imagepath=_data.path.indexOf("upaiyun")!=-1?_data.path+'!209x150':_data.path_thumb;
            if(_imagepath.indexOf("http")<0){
                _imagepath="https://www.huakewang.com/"+_imagepath;
            }
            var favoriteTxt = "收藏";
            _data.is_favorite == "1" ? favoriteTxt = "已收藏" : "";
            var _path="introduction.html?id="+_data.id;
            _li.innerHTML='<div class="iInspir-block"></div>'+
                '<div class="hkw-work-img thumb-a h_a">'+
                '<a href="'+_path+'" target=_blank><img class="delay maxImgWidth" src="images/1px.png" data-original="'+_imagepath+'"  style="" alt="'+_data.keyword+'"  /></a>'+
                '<div class="caption fn-hide">'+
                '<h4 style="overflow: hidden;display: block;text-overflow:ellipsis;white-space: nowrap;">'+
                _data.title+
                '<a href="javascript:void(0)" data-id="'+_data.id+'" class="sc deleteWroks">'+
                favoriteTxt+
                '</a>'+
                '</h4>'+
                '<p class="captionContent">'+_data.content.replace('<p>','').replace('</p>','')+'</p>'+
                '</div>'+
                '</div>'+
                '<div class="hkw-work-bottom">'+
                '<a href="detailed.html?id='+_data.user_id+'" target=_blank><img '+
                'src="'+(_data.user_path?(_data.user_path.indexOf("upaiyun")!=-1?_data.user_path+'!67x67':_data.user_path_thumb):"./images/selec.jpeg")+'" width="16" height="16" />'+
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
            return _li;
        }else{
            //如果没有更多作品了则-隐藏“添加更多”-显示“没有更多”
            $('#workListAddMoreContent').css('display','none');
            $('#work_list_loadingImage').css('display','none');
            $('#workListNoMoreContent').css('display','block');
        };
    };

    //等待分类栏目初始化完成，完成后请求作品集数据
    var readWait=setInterval(function () {
        if(getSelectValue[0]==1&&getSelectValue[1]==1&&getSelectValue[2]==1){
            startInit();
            refreshWorkListBoxContent();
            clearInterval(readWait);
        };
    },0);
    //进行栏目内部各内容的初始化；给作品集添加延时显示；
    var startInit=function(){
        setTimeout(function () {
            init();
        },100);
        setTimeout(function () {
            // $('#work_list_loadingImage').css('display','none');
            // $('#work_list_content').css('visibility','visible');
        },500)
    };
    //根据发送的参数获取一定数量的相应作品
    var refreshWorkListBoxContent = function () {
        window.reS = $.ajax({
            url:_LZY_real_Url+newhuakwang+"get_works_list_ex",
            type:"post",
            dataType:"json",
            data:ajaxMockData
        }).done(function (data) {
            var _item_list=data.data.item_list;
            console.log("作品列表");
            console.log(data.data.item_list);
            //进行作品计数
            ajaxMockData.offset=ajaxMockData.offset+20;
            ajaxMockDataMaxLength=parseInt(data.data.total_count)-ajaxMockData.offset;
            //将作品loading
            workListAddMoreContentFunction(_item_list);
        });
    };
    var mNL=0;
    //作品loading抽象实体
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
            masornyNewLi(itemsData[18]),masornyNewLi(itemsData[19])
        ];
        var $items=$(_items);
        $workListMasonry.append( $items );
        picsLazyLoad();
        $workListMasonry.masonry( 'appended', $items );
        for(var i= 0;i<5;i++){
            setTimeout(function(){
                $workListMasonry.masonry({
                    itemSelector: '.grid-item',
                    columnWidth: 100
                });
            },100);
        };
        $("img[data-original]").addClass("moveToFrom");
        flag = true;
        setTimeout(function () {
            $('.pblUl:first li').css('visibility','visible')
        },1000)
    };
//点击已收藏，取消收藏
$("body").on('click', '.deleteWroks', function(event) {
	event.preventDefault();
	var $dom = $(this);
	var id = $(this).attr('data-id');
	// deleteLove("works", id, $dom); //原来的删除接口
	addLove("works", id, $dom);
});
//图片懒加载
function picsLazyLoad() {
        var scrollElement = window,
            viewH = document.documentElement.clientHeight;
        function lazyload() {
            var nodes = document.querySelectorAll('img[data-original]');
            $.each(nodes, function (idx, item) {
                var rect;
                rect = item.getBoundingClientRect();
                if (rect.bottom >= 0 && rect.top < viewH) {
                    var img = new Image();
                    img.onload = function () {
                        $(item).addClass("moveToFrom").attr("src", img.src);
                        // $(item).animate({"opacity":1},2000);
                    };
                    img.src = $(item).attr("data-original");
                    $(item).attr("data-original", "");
                }
                ;
            });
        };
        lazyload();
        //滚动事件监听兼容到ie8
        function addEvent(event,ev) {
            var ele = event || window.event;
            if(ele.addEventListener){
                ele.addEventListener(ev,throttle(lazyload,300,800));
            }else if(ele.attachEvent){
                ele.attachEvent("on"+ev,throttle(lazyload,300,800));
            };
        };
        addEvent(scrollElement,'scroll');
        function throttle(fun, delay, time) {
            var timeout,
                startTime = new Date();
            return function () {
                var context = this,
                    args = arguments,
                    curTime = new Date();
                clearTimeout(timeout);
                if (curTime - startTime >= time) {
                    fun.apply(context, args);
                    startTime = curTime;
                } else {
                    timeout = setTimeout(fun, delay);
                };
            };
        };
    };

/**
 * [添加我的关注，如果该作品已经被关注，则取消关注]
 * @Author   郑国庆
 * @DateTime 2017-09-08T20:42:32+0800
 * @param    {[String]} model [删除类型]
 * @param    {[Number]} id   [关注的id]
 * @param    {[Object]} $dom   [删除按钮]
 */
function addLove(model, id, $dom){
	if (window.ajaxAddLove != null) {
		window.ajaxAddLove.abort();
	}
	window.ajaxAddLove = $.ajax({
		url: _LZY_real_Url+newhuakwang+"add_favorite",
		type: 'POST',
		dataType: 'JSON',
		data: {
			user_id: getCookie("user_id"),
			id: id,
			type:model
		}
	})
	.done(function(req) {
		// layer.msg(req.message,{time:1000});
		if (req.message.type == "delete") {
			$dom.html("收藏");
			layer.msg("删除成功",{time:1000});
		};
		if (req.message.type == "add") {
			$dom.html("已收藏");
			layer.msg("收藏成功",{time:1000});
		};
	})
	.fail(function(err) {
		console.log(err);
	});
}
})();