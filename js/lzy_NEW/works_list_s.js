/**
 * Created by admin on 2017/7/26.
 */
(function () {
    //获取当前页面的URL参数
    function getLocationParam(name) {
        var url = window.location.search;
        if (~url.indexOf("?")) {
            var search = {};
            var arrayParam = url.split("?")[1].split("&");
            arrayParam.map(function(value, index, elem) {
                var key = value.split("=")[0];
                var val = value.split("=")[1];
                search[key] = val;
            });
            if (name in search) {
                return search[name];
            } else {
                return "";
            }
        }
        return "";
    };
    var real = {data: undefined};
    var flag = true,tags = getLocationParam("tag");
    
    console.log(tags + '++++++++++++')
    //获取作品集所需要的参数（初始）
    var ajaxMockData = {
        sort: "add_time",
        keyword: "",
        offset: 0,
        limit: 16,
        id: getLocationParam("id")
    };
    //数据长度计算
    var ajaxMockDataMaxLength = 0;
    //地址栏获取的各分类的值
    var listInt = [0, undefined, undefined];
    //作品瀑布流初始化函数
    
    var init = function () {
        if (window.location.href.indexOf('MyDetailed.html') != -1) {
            ajaxMockData.id = 189938;
            $("#myResources").click(function () {
                ajaxMockData.offset = 0;
                refreshWorkListBoxContent();
                waterfall('pblUls', 'li');
                delay();
            });
            if(tags == "3") {
                $("#myResources").click();
            }
            $(window).scroll(function(){
                if($(this).scrollTop() + $(this).height() > $(document).height() - 600){
                    if (flag){
                        refreshWorkListBoxContent();
                        waterfall('pblUls','li');
                        delay();
                        flag = false;
                    };
                };
            });
        } else {
            $(window).scroll(function () {
                if ($(this).scrollTop() + $(this).height() > $(document).height() - 600) {
                    if (flag) {
                        refreshWorkListBoxContent();
                        flag = false;
                    }
                    ;
                }
                ;
            });
            refreshWorkListBoxContent();
        }
        //“更多”标签点击后将对应div修改的抽象实体
    };
    
    //瀑布流动态向作品集添加更多的作品
    var masornyNewLi = function (data) {
        if (data != undefined) {
            var _data = data,rzImg='';
            var _li = document.createElement('li');
            // var doSomeThing = '<div class="doSource"><a href="javascript:void(0);" class="doSourceChange">修改</a><a href="javascript:void(0);" class="doSourceDel">删除</a></div>';
            _li.className = "grid-item";
            _li.style.display = _data.display || "block";
            _li.style.visibility = 'visibile';
            rzImg = data.display == '0'?'image/examine.png':data.display == '2'?'image/notPass.png':'';
            if (window.location.href.indexOf('MyDetailed.html') != -1) {
                _li.innerHTML = '<div class="fileFullScreen">' +
                    '<img src="'+rzImg+'" alt="" style="position: absolute;top: 0px;left: 0px;width: 65px;height: 65px;z-index: 999999;">'+
                    '<a href="fileDetail.html?id=' + _data.id + '" target="_blank" class="what">' +
                    '<img src="images/1px.png" data-original="' + _data.path_thumb + '" data-perid="' + _data.id + '" alt="">' +
                    '<div class="enjoyFile" data-fileId="' + _data.id + '">' +
                    '<div class="doSource">' +
                    '<a href="javascript:void(0);" data-delid="' + _data.id + '" class="doSourceDel">删除</a>' +
                    '<a href="resources.html?id=' + data.id + '" class="doSourceChange">修改</a>' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</div>';
            } else {
                _li.innerHTML = '<div class="fileFullScreen">' +
                    '<img src="images/1px.png" data-original="' + _data.path_thumb + '" data-perid="' + _data.id + '" alt=""><a href="fileDetail.html?id=' + _data.id + '" target="_blank"><div class="enjoyFile" data-fileId="' + _data.id + '"></div></a><div class="enjoyFileWrap"><a href="javascript:void(0);" class="fileDownXzzLink"><div class="enjoyFileDown"><i class="enjoyFileDownIcon"></i><span>下载</span></div></a><a href="javascript:void(0);" class="fileZanScLink"><div class="enjoyFileZan"><i class="enjoyFileZanIcon"></i>' + (_data.is_favorite ? "<span>已收藏</span>" : "<span>收藏</span>") + '</div></a></div></div>';
            }
            return _li;
        } else {
        
        }
        ;
    };
    $(document).on("mouseenter", "#work_list_content li", function () {
        if (window.location.href.indexOf('MyDetailed.html') != -1) {
            $(this).find(".enjoyFile").slideDown(100);
        }
        ;
        $(this).find(".enjoyFile").addClass("enjoyFileTransition");
        $(this).find(".enjoyFileWrap").addClass("enjoyFileTransitions");
    });
    $(document).on("mouseleave", "#work_list_content li", function () {
        if (window.location.href.indexOf('MyDetailed.html') != -1) {
            $(this).find(".enjoyFile").slideUp(100);
        }
        ;
        $(this).find(".enjoyFile").removeClass("enjoyFileTransition");
        $(this).find(".enjoyFileWrap").removeClass("enjoyFileTransitions");
    });
    $(document).on("click", ".doSourceDel", function () {
        var id = $(this).attr("data-delid"), $this = $(this);
        console.log(id);
        $.ajax({
            url: baseLink + "resourceApi/delete_resource",
            type: "post",
            data: {
                resource_id: id
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.success) {
                    ajaxMockData.offset = 0;
                    alertUploadMsg("资源删除成功");
                    refreshWorkListBoxContent();
                }
            }
        })
    })
    $(document).on("click", ".fileZanScLink", function () {
        var filesid = $(this).parents(".fileFullScreen").find("img").attr("data-perid"),
            url = 'hkw_newapi/add_favorite',
            htm = $(this).find("span").html();
        if (getCookie("user_id")) {
            if (htm == "收藏") {
                keepFile(filesid, $(this).find("span"), url, "已收藏");
            } else {
                keepFile(filesid, $(this).find("span"), url, "收藏");
            }
        } else {
            go_login();
        }
    });
    $(document).on("click", ".fileDownXzzLink", function () {
        var filesid = $(this).parents(".fileFullScreen").find("img").attr("data-perid");
        if (getCookie("user_id")) {
            $(this).attr("href", baseLink + 'resourceApi/downloadFile/' + filesid);
        } else {
            go_login();
        }
    });
    
    function keepFile(fileId, ele, url, htm) {
        console.log(fileId);
        $.ajax({
            url: baseLink + url,
            type: "post",
            data: {
                id: fileId,
                type: "works"
            },
            dataType: "json",
            success: function (res) {
                console.log("收藏");
                if (res.success) {
                    ele.html(htm);
                } else {
                    alertUploadMsg(res.message);
                }
            }, error: function (res) {
                console.log("收藏-错");
                console.log(res);
            }
        })
    }
    
    //进行栏目内部各内容的初始化；给作品集添加延时显示；
    var startInit = function () {
        setTimeout(function () {
            init();
        }, 100);
        setTimeout(function () {
            $('#work_list_loadingImage').css('display', 'none');
            $('#work_list_content').css('visibility', 'visible');
        }, 500)
    };
    startInit();
    //根据发送的参数获取一定数量的相应作品
    var refreshWorkListBoxContent = function () {
        var url1 = baseLink + 'resourceApi/get_relation_list/' + ajaxMockData.id + '/16/' + ajaxMockData.offset;
        var url2 = baseLink + 'resourceApi/get_resource_list/468/16/' + ajaxMockData.offset + '/all/all/all/all/add_time';
        if (window.location.href.indexOf('MyDetailed.html') != -1) {
            console.log(url2);
            $.ajax({
                url: url2,
                type: "post",
                data: {
                    user_id_to: getCookie('user_id')
                },
                dataType: "json"
            }).done(function (data) {
                var _item_list = data.data.itemList;
                console.log("相关作品列表----------");
                console.log(data);
                console.log(_item_list);
                ajaxMockDataMaxLength = parseInt(data.data.total_items) - ajaxMockData.offset * 16;
                //进行作品计数
                ajaxMockData.offset = ajaxMockData.offset + 1;
                //将作品loading
                if (ajaxMockDataMaxLength > 0) {
                    workListAddMoreContentFunction(_item_list);
                } else {
                    $("#work_list_loadingImage").css("display", "none");
                }
                ;
            });
        } else if(window.location.href.indexOf('fileDetail.html') != -1) {
            console.log(url1);
            $.ajax({
                url: url1,
                type: "get",
                dataType: "json"
            }).done(function (data) {
                var _item_list = data.data.relationList;
                console.log("相关作品列表----------");
                console.log(data.data);
                ajaxMockDataMaxLength = parseInt(data.data.total_count) - ajaxMockData.offset * 16;
                //进行作品计数
                ajaxMockData.offset = ajaxMockData.offset + 1;
                //将作品loading
                if (ajaxMockDataMaxLength > 0) {
                    workListAddMoreContentFunction(_item_list);
                } else {
                    $("#work_list_loadingImage").css("display", "none");
                }
                ;
            });
        }
        
        
    };
    var mNL = 0;
    //作品loading抽象实体
    var workListAddMoreContentFunction = function (itemsData) {
        var _items = [
            masornyNewLi(itemsData[0]), masornyNewLi(itemsData[1]),
            masornyNewLi(itemsData[2]), masornyNewLi(itemsData[3]),
            masornyNewLi(itemsData[4]), masornyNewLi(itemsData[5]),
            masornyNewLi(itemsData[6]), masornyNewLi(itemsData[7]),
            masornyNewLi(itemsData[8]), masornyNewLi(itemsData[9]),
            masornyNewLi(itemsData[10]), masornyNewLi(itemsData[11]),
            masornyNewLi(itemsData[12]), masornyNewLi(itemsData[13]),
            masornyNewLi(itemsData[14]), masornyNewLi(itemsData[15])
        ];
        var $items = $(_items);
        $sourceListMasonry.html($items);
        picsLazyLoad();
        $sourceListMasonry.masonry('appended', $items);
        for (var i = 0; i < 5; i++) {
            setTimeout(function () {
                $sourceListMasonry.masonry({
                    itemSelector: '.grid-item',
                    columnWidth: 100
                });
            }, 100);
        }
        ;
        $("img[data-original]").addClass("moveToFrom");
        flag = true;
        setTimeout(function () {
            $('.pblUl:first li').css('visibility', 'visible')
        }, 1000)
    };
//点击已收藏，取消收藏
    $("body").on('click', '.deleteWroks', function (event) {
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
        function addEvent(event, ev) {
            var ele = event || window.event;
            if (ele.addEventListener) {
                ele.addEventListener(ev, throttle(lazyload, 300, 800));
            } else if (ele.attachEvent) {
                ele.attachEvent("on" + ev, throttle(lazyload, 300, 800));
            }
            ;
        };
        addEvent(scrollElement, 'scroll');
        
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
                }
                ;
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
    function addLove(model, id, $dom) {
        if (window.ajaxAddLove != null) {
            window.ajaxAddLove.abort();
        }
        window.ajaxAddLove = $.ajax({
            url: baseURL + "add_favorite",
            type: 'POST',
            dataType: 'JSON',
            data: {
                user_id: getCookie("user_id"),
                id: id,
                type: model
            }
        })
            .done(function (req) {
                // layer.msg(req.message,{time:1000});
                if (req.message.type == "delete") {
                    $dom.html("收藏");
                    layer.msg("删除成功", {time: 1000});
                }
                ;
                if (req.message.type == "add") {
                    $dom.html("已收藏");
                    layer.msg("收藏成功", {time: 1000});
                }
                ;
            })
            .fail(function (err) {
                console.log(err);
            });
    }
})();