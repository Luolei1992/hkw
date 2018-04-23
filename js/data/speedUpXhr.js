$(function () {
    //获取当前页面的URL参数
    function getLocationParam(name){
        var url = window.location.search;
        if ( ~url.indexOf("?") ) {
            var search = {};
            var arrayParam = url.split("?")[1].split("&");
            arrayParam.map(function(value,index, elem) {
                var key = value.split("=")[0];
                var val = value.split("=")[1];
                search[key] = val;
            });
            if (name in search){
                return search[name];
            }else{
                return "";
            }
        }
        return "";
    };
    /*设计加速分类导航栏-一级导航*/
    var sort = '',order = 'add_time',ntemp = 1,nplus = 0,industryId = 'all',specialPart = "all",srcVal1="",srcVal2="",srcVal3="",tempNumFlag = 0;
    // 热门下载：download_count
    // 最新上传：add_time
    $.ajax({
        url:baseLink + 'resourceApi/get_top_menu/468',
        type:"get",
        dataType:"json",
        success:function (res) {
            if (res.success){
                getFstMenu(res.data);
            };
        }
    });
    $.ajax({
        url:baseLink + 'resourceApi/get_industry_list',
        type:"get",
        dataType:"json",
        success:function (res) {
            if (res.success){
                var sts = '';
                for(var i = 0;i < res.data.length;i++) {
                    sts += '<li data-navid="'+res.data[i].id+'">'+res.data[i].category_name+'</li>';
                }
                $(".nav-sons").html(sts);
                // addClassActiveColor($(".nav-leis li"),srcVal1,false);
                // addClassActiveColor($(".nav-keys li"),srcVal2,true);
                addClassActiveColor($(".nav-sons li"),srcVal3,false);
            };
        }
    });
    var urlParm1 = getLocationParam('tempF'),
        urlParm2 = getLocationParam('tempS'),
        urlParm3 = getLocationParam('tempT');
    //刷新页面，展示之前选中的分类
    function reflashKey() {
        urlParm1 = getLocationParam('tempF'),
        urlParm2 = getLocationParam('tempS'),
        urlParm3 = getLocationParam('tempT');
    };
    renderLastLis();
    function renderLastLis() {
        if(window.location.href.indexOf("?") != -1) {
            $(".nav-select").css("display","block");
            var pub1 = urlParm1.split("_")[0],
                pub2 = decodeURIComponent(urlParm1.split("_")[1]);
            srcVal1 = pub2;
            if(urlParm2 && urlParm3 == 'all') {
                var a1 = urlParm2.split("_")[0],
                    a2 = decodeURIComponent(urlParm2.split("_")[1]);
                srcVal2 = a2;
                getDifferentLists(a1,order,1,nplus,"all",specialPart,12);
                $(".nav-tmps").html('<li data-navid="'+pub1+'">'+pub2+'</li><li class="liSecTmp" data-navid="'+a1+'"><span>></span><p class="secTmp">'+a2+'</p></li>');
            }else if(urlParm2 && urlParm3 != 'all'){
                var b1 = urlParm2.split("_")[0],
                    b2 = urlParm3.split("_")[0],
                    b3 = decodeURIComponent(urlParm2.split("_")[1]),
                    b4 = decodeURIComponent(urlParm3.split("_")[1]);
                srcVal2 = b3;
                srcVal3 = b4;
                getDifferentLists(b1,order,1,nplus,b2,specialPart,12);
                $(".nav-tmps").html('<li data-navid="'+pub1+'">'+pub2+'</li><li class="liSecTmp" data-navid="'+b1+'"><span>></span><p class="secTmps">'+b3+'</p></li><li class="liSecTmp" data-navid="'+b2+'"><span>></span><p class="secTmp">'+b4+'<i>X</i></p></li>');
            }else if(!urlParm2 && urlParm3 != 'all'){
                var c1 = urlParm3.split("_")[0],
                    c2 = decodeURIComponent(urlParm3.split("_")[1]);
                srcVal3 = c2;
                getDifferentLists(pub1,order,1,nplus,c1,specialPart,12);
                $(".nav-tmps").html('<li data-navid="'+pub1+'">'+pub2+'</li><li class="liSecTmp" data-navid="'+c1+'"><span>></span><p class="secTmp">'+c2+'<i>X</i></p></li>');
            }else if(!urlParm2 && urlParm3 == 'all'){
                var d1 = urlParm1.split("_")[0];
                getDifferentLists(d1,order,1,nplus,"all",specialPart,12);
                $(".nav-tmps").html('<li data-navid="'+pub1+'">'+pub2+'</li>');
            }
        }
    }

    function addClassActiveColor(ele,value,flag) {
        if(value) {
            ele.each(function (idx,val) {
                if($(val).html() == value) {
                    ele.eq(idx).addClass("activeColorBlue");
                };
            });
            if(flag) {
                $(".nav-key").css("display","block");
            };
        };
    };
    if(urlParm2 && urlParm1.split("_")[0] != "468") {
        hots(urlParm1.split("_")[0],true);
    };
    function clickAuto() {
        tempNumFlag ++;
        if(tempNumFlag >1) {
            return false;
        }else{
            $(".nav-leis li").each(function () {
                if($(this).html() == srcVal1 && srcVal1 != "all") {
                    alert(4)
                    $(this).click();
                }
            })
        }
    }
    /*点击获取类别*/
    $(document).on("click",".nav-leis li",function () {
        var temp = $(this).html();
        sort = $(this).attr("data-navid");
        nplus = 0;
        $(this).addClass("activeColorBlue").siblings().removeClass("activeColorBlue");
        if(sort == "468") {
            $(".nav-key").css("display","none");
            $(".nav-sons li").removeClass("activeColorBlue");
            $(".nav-keys li").removeClass("activeColorBlue");
            industryId = "all";
        }else{
            hots(sort,false);
        };
        ajaxSeoMsg(temp,"");
        $(".nav-select").css("display","block");
        if($(".nav-sons li").hasClass("activeColorBlue")) {
            industryId = $(".nav-sons .activeColorBlue").attr("data-navid");
            var tepHtm = $(".nav-sons .activeColorBlue").html();
            getDifferentLists(sort,order,1,nplus,industryId,specialPart,12);               //分类查询
            setTempUrl("fastdesign.html?tempF="+sort+'_'+temp+'&tempT='+industryId+'_'+tepHtm);
            $(".nav-tmps").html('<li data-navid="'+sort+'">'+temp+'</li><li class="liSecTmp" data-navid="'+industryId+'"><span>></span><p class="secTmp">'+tepHtm+'<i>X</i></p></li>');
        }else{
            getDifferentLists(sort,order,1,nplus,"all",specialPart,12);               //分类查询
            setTempUrl("fastdesign.html?tempF="+sort+'_'+temp+'&tempT='+industryId);
            $(".nav-tmps").html('<li data-navid="'+sort+'">'+temp+'</li>');
        };
        reflashKey();
    });
    //子类
    $(document).on("click",".nav-keys li",function () {
        $(this).addClass("activeColorBlue").siblings().removeClass("activeColorBlue");
        var temp = $(this).html(),
            tepHtm2 = $(".nav-leis .activeColorBlue").attr("data-navid"),
            tepHtm3 = $(".nav-leis .activeColorBlue").html();
        sort = $(this).attr("data-navid");
        nplus = 0;
        ajaxSeoMsg($(".nav-tmps li:first").html(),temp);
        $(".liSecTmp").remove();
        $(".nav-select").css("display","block");
        $(".liSecTmps").remove();
        if($(".nav-sons li").hasClass("activeColorBlue")) {
            industryId = $(".nav-sons .activeColorBlue").attr("data-navid");
            var tepHtm = $(".nav-sons .activeColorBlue").html();
            getDifferentLists(sort,order,1,nplus,industryId,specialPart,12);                     //分类查询
            setTempUrl("fastdesign.html?tempF="+tepHtm2+'_'+tepHtm3+'&tempS='+sort+'_'+temp+'&tempT='+industryId+'_'+tepHtm);
            $(".nav-tmps").append('<li class="liSecTmps" data-navid="'+sort+'"><span>></span><p class="secTmps">'+temp+'</p></li><li class="liSecTmp" data-navid="'+industryId+'"><span>></span><p class="secTmp">'+tepHtm+'<i>X</i></p></li>');
        }else{
            industryId = 'all';
            setTempUrl("fastdesign.html?tempF="+tepHtm2+'_'+tepHtm3+'&tempS='+sort+'_'+temp+'&tempT='+industryId);
            getDifferentLists(sort,order,1,nplus,industryId,specialPart,12);                    //分类查询
            $(".nav-tmps").append('<li class="liSecTmps" data-navid="'+sort+'"><span>></span><p class="secTmps">'+temp+'</p></li>');
        }
        reflashKey();
    });
    //行业
    $(document).on("click",".nav-sons li",function () {
        $(this).addClass("activeColorBlue").siblings().removeClass("activeColorBlue");
        var temp = $(this).html();
        nplus = 0;
        ajaxSeoMsg($(".nav-tmps li:first").html(),temp);
        $(".liSecTmp").remove();
        $(".nav-select").css("display","block");
        industryId = $(this).attr("data-navid");
        if($(".nav-select-l ul li").length > 0) {
            if($(".nav-keys li").hasClass("activeColorBlue")){
                sort = $(".nav-keys li.activeColorBlue").attr("data-navid");
                var tempF = $(".nav-leis li.activeColorBlue").attr("data-navid"),
                    tempF1 = $(".nav-leis li.activeColorBlue").html(),
                    tempF2 = $(".nav-keys li.activeColorBlue").html();
                setTempUrl("fastdesign.html?tempF="+tempF+'_'+tempF1+'&tempS='+sort+'_'+tempF2+'&tempT='+industryId+'_'+temp);
            }else{
                var tempF1 = $(".nav-leis li.activeColorBlue").html();
                sort = $(".nav-leis li.activeColorBlue").attr("data-navid");
                setTempUrl("fastdesign.html?tempF="+sort+'_'+tempF1+'&tempT='+industryId+'_'+temp);
            };
            $(".nav-tmps").append('<li class="liSecTmp" data-navid="'+sort+'"><span>></span><p class="secTmp">'+temp+'<i>X</i></p></li>');
        }else{
            $(".nav-leis li:first").addClass("activeColorBlue");
            setTempUrl("fastdesign.html?tempF=468"+"_全部"+'&tempT='+industryId+"_"+temp);
            $(".nav-tmps").append('<li data-navid="468">全部</li><li class="liSecTmp"><span>></span><p class="secTmp">'+temp+'<i>X</i></p></li>');
        };
        getDifferentLists(sort,order,1,nplus,industryId,specialPart,12);                     //分类查询
        reflashKey();
    });
    //删除职业
    $(document).on("click",".secTmp i",function () {
        $(".nav-sons li").removeClass("activeColorBlue");
        if($(".nav-select-l ul li").length >0) {
            sort = $(".liSecTmp").prev().attr("data-navid");
        }else{
            sort = '468'
        };
        $(this).parent().parent().remove();
        nplus = 0;
        industryId = 'all';
        var tempListFst = $(".nav-tmps li:first").attr("data-navid"),
            val1 = $(".nav-leis li.activeColorBlue").html(),
            val2 = $(".nav-keys li.activeColorBlue").html();
        if(urlParm2) {
            setTempUrl("fastdesign.html?tempF="+tempListFst+'_'+val1+'&tempS='+sort+'_'+val2+'&tempT='+industryId);
        }else{
            setTempUrl("fastdesign.html?tempF="+sort+'_'+val1+'&tempT='+industryId);
        }
        getDifferentLists(sort,order,1,nplus,industryId,specialPart,12);          //分类查询
        reflashKey();
    });
    //更改路径参数，刷新保留数据
    function setTempUrl(str) {
        window.history.pushState({},0,str);
    };
    //排序
    $(document).on("click",".nav-select-r li",function () {
        $(this).addClass("activeColorBlue").siblings().removeClass("activeColorBlue");
        order = $(this).attr("data-order");
        nplus = 0;
        sort = decodeURIComponent(urlParm1.split("_")[0]);
        if($(".nav-sons li").hasClass("activeColorBlue")) {
            industryId = $(".nav-sons .activeColorBlue").attr("data-navid");
            getDifferentLists(sort,order,1,nplus,industryId,specialPart,12);                     //分类查询
        }else{
            industryId = 'all';
            getDifferentLists(sort,order,1,nplus,industryId,specialPart,12);                     //分类查询
        }
    });
    /*默认展示精品推荐/平面设计/交互设计数据获取*/
    $.ajax({
        url:baseLink + 'resourceApi/get_cover/',
        type:"get",
        dataType:"json",
        success:function (res) {
            if(res.success){
                silentShows(res.data.special_topic_list,$(".mainSpeedMidTj ul"),4);
                silentShow(res.data.itemMenuList[0],$(".mainSpeedMidPm ul"),8);
                silentShow(res.data.itemMenuList[1],$(".mainSpeedMidJh ul"),8);
                silentShow(res.data.itemMenuList[2],$(".mainSpeedMidCl ul"),8);
                silentShow(res.data.itemMenuList[3],$(".mainSpeedMidTu ul"),8);
            };
        }
    });
    
    /**
     * 分类获取资源列表
     * @param sort            一级分类（有二级分类就用二级分了）
     * @param order           排序类别
     * @param n              页码
     * @param nplus          增加数量获取
     * @param industryId    行业id
     */
    function getDifferentLists(sort,order,n,nplus,industryId,specialPart,Num) {
        $.ajax({
            url:baseLink + 'resourceApi/get_resource_list/'+sort+'/'+Num+'/'+nplus+'/all/all/'+industryId+'/'+specialPart+'/'+order,
            type:"post",
            data:{
                user_id_to:0
            },
            dataType:"json",
            success:function (res) {
                if(res.success) {
                    if(res.data.total_items < Num && res.data.total_items > 0) {
                        $(".nav-select-b i").html(res.data.total_items);
                        $("#kkpager").empty();
                        renderDifferentLists(res.data);
                    }else if(res.data.total_items >= Num){
                        $(".nav-select-b i").html(res.data.total_items);
                        renderDifferentLists(res.data);
                        pagePaper(res.data.total_pages,n,Num);
                    } else {
                        $(".nav-select-b i").html("0");
                        $("#kkpager").empty();
                        $(".mainSpeedMid").html('<img src="image/tempNull2.png" class="tempNullPng">');
                    }
                }
            },error:function (res) {
                console.log(res);
            }
        });
    }
    function renderDifferentLists(data) {
        var lis = '';
        for (var i = 0;i < data.itemList.length;i++) {
            lis += '<li class="enjoyFileList"><img src="images/1px.png" data-original="'+data.itemList[i].path_thumb+'" data-perid="'+data.itemList[i].id+'" alt=""><a href="fileDetail.html?id='+data.itemList[i].id+'" target="_blank"><div class="enjoyFile" data-fileId="'+data.itemList[i].id+'"></div></a><div class="enjoyFileWrap"><a href="javascript:void(0);" class="fileDownXzzLink"><div class="enjoyFileDown"><i class="enjoyFileDownIcon"></i><span>下载</span></div></a><a href="javascript:void(0);" class="fileZanScLink"><div class="enjoyFileZan"><i class="enjoyFileZanIcon"></i>'+(data.itemList[i].is_favorite?"<span>已收藏</span>":"<span>收藏</span>")+'</div></a></div></li>';
        }
        var list = '<ul>'+lis+'</ul>';
        $(".mainSpeedMid").html(list);
        picsLazyLoad();
    }
    //当前页为专题
    if(window.location.href.indexOf("special.html") != -1) {
        var specialId = getLocationParam("id");
        getDifferentLists("468",order,1,nplus,"all",specialId,16);
    };
    /**
     * 分页插件<设计师>(每次获取数据的总页数改变需要加载一次分页插件)
     * @param totalPage[总页数]
     * @param page[当前页数]
     */
    function pagePaper(totalPage,page,Num) {
        var pageNo = page;
        //生成分页
        kkpager.generPageHtml({
            pno: pageNo,
            //总页码
            total: totalPage,
            pagerid:"kkpager",
            //总数据条数
            mode: 'click', //默认值是link，可选link或者click
            click: function(n) {
                //手动选中按钮
                this.selectPage(n);
                if(pageNo > n) {
                    nplus = nplus - Num;
                    getDifferentLists(sort,order,n,nplus,industryId,specialPart,Num);
                }else if(pageNo == n){
                    return;
                }else{
                    nplus = nplus + Num;
                    getDifferentLists(sort,order,n,nplus,industryId,specialPart,Num);
                }
                $("body,html").animate({scrollTop:0},200); //使整个页面回到顶部
                return false;
            }
        },true);
    }
    /**
     * 默认展示精品推荐/平面设计/交互设计渲染
     */
    function silentShow(data,ele,num) {
        var jp = '',pm = '',jh = '',nus = data.item_list.length,numbers = 0;
        if(nus > 0) {
            num > nus?numbers = nus:numbers = num;
            //精品推荐、平面设计、交互设计
            for (var i = 0;i < numbers;i++) {
                pm += '<li class="enjoyFileList"><img src="images/1px.png" data-original="'+data.item_list[i].path_thumb+'" data-perid="'+data.item_list[i].id+'" alt=""><a href="fileDetail.html?id='+data.item_list[i].id+'" target="_blank"><div class="enjoyFile" data-fileId="'+data.item_list[i].id+'"></div></a><div class="enjoyFileWrap"><a href="javascript:void(0);" class="fileDownXzzLink"><div class="enjoyFileDown"><i class="enjoyFileDownIcon"></i><span>下载</span></div></a><a href="javascript:void(0);" class="fileZanScLink"><div class="enjoyFileZan"><i class="enjoyFileZanIcon"></i>'+(data.item_list[i].is_favorite?"<span>已收藏</span>":"<span>收藏</span>")+'</div></a></div></li>';
            }
            ele.html(pm);
            picsLazyLoad();
        }
    };
    function silentShows(data,ele,num) {
        var jp = '',pm = '',jh = '',nus = data.length,numbers = 0;
        num > nus?numbers = nus:numbers = num;
        //精品推荐、平面设计、交互设计
        for (var i = 0;i < numbers;i++) {
            pm += '<a href="special.html?id='+data[i].id+'" target="_blank"><li class="enjoyFileLists"><img src="images/1px.png" data-original="'+data[i].path+'" data-perid="'+data[i].id+'" alt=""></li></a>';
        }
        ele.html(pm);
        picsLazyLoad();
    };
    $(document).on("click",".fileDownXzzLink",function () {
        var filesid = $(this).parents(".enjoyFileList").find("img").attr("data-perid");
        if(getCookie("user_id") && $(".phonenum").hasClass("idAuth")) {
            $(this).attr("href",baseLink+'resourceApi/downloadFile/'+filesid);
        }else{
            go_login();
        }
    });
    $(document).on("click",".fileZanScLink",function () {
        var filesid = $(this).parents(".enjoyFileList").find("img").attr("data-perid"),
            url = 'hkw_newapi/add_favorite',
            htm = $(this).find("span").html();
        if(getCookie("user_id")){
            if( htm== "收藏") {
                keepFile(filesid,$(this).find("span"),url,"已收藏");
            }else{
                keepFile(filesid,$(this).find("span"),url,"收藏");
            }
        }else{
            go_login();
        }
    });
    function keepFile(fileId,ele,url,htm) {
        $.ajax({
            url:baseLink + url,
            type:"post",
            data: {
                id: fileId,
                type: "works"
            },
            dataType:"json",
            success:function (res) {
                if(res.success) {
                    ele.html(htm);
                }else{
                    alertUploadMsg(res.message);
                }
            },error:function (res) {
                console.log(res);
            }
        })
    }
    $(document).on("mouseenter",".enjoyFileList",function () {
        // $(this).find(".enjoyFile").slideDown(100);
        $(this).find(".enjoyFile").addClass("enjoyFileTransition");
        $(this).find(".enjoyFileWrap").addClass("enjoyFileTransitions");
    });
    $(document).on("mouseleave",".enjoyFileList",function () {
        // $(this).find(".enjoyFile").slideUp(100);
        $(this).find(".enjoyFile").removeClass("enjoyFileTransition");
        $(this).find(".enjoyFileWrap").removeClass("enjoyFileTransitions");
    });
    
    /**
     * 获取子类
     * @param sort
     */
    function hots(sort,flag) {
        $.ajax({
            url:baseLink + 'resourceApi/get_top_menu/'+sort,
            type:"get",
            dataType:"json",
            success:function (res) {
                if (res.success){
                    getSecMenu(res.data,flag);
                }
            }
        });
    }
    /**
     * 二级导航渲染
     * @param data
     */
    function getSecMenu(data,flag) {
        var list = '';
        for (var i = 0;i < data.length;i++) {
            list+='<li class="speedNavTop" data-navid="'+data[i].id+'">'+data[i].menu_name+'</li>'
        };
        $(".nav-keys").html(list).parents(".nav-key").css("display","block");
        if(flag){
            addClassActiveColor($(".nav-keys li"),srcVal2,flag);
        }
    }
    /**
     * 一级导航渲染
     * @param data
     */
    function getFstMenu(data) {
        var list = '',lis = '<li data-navid="468">全部</li>';
        for (var i = 0;i < data.length;i++) {
            list+='<li class="speedNavTop" data-navid="'+data[i].id+'">'+data[i].menu_name+'</li>'
        };
        $(".nav-leis").html(lis+list);
        addClassActiveColor($(".nav-leis li"),srcVal1,false);
        // addClassActiveColor($(".nav-keys li"),srcVal2,true);
        // addClassActiveColor($(".nav-sons li"),srcVal3,false);
    }
    //获取不同栏目分类下的seo信息
    function ajaxSeoMsg(key,key2) {
        $.ajax({
            url:baseURL+'get_menu_class_by_name/'+key,
            type:"get",
            dataType:"json",
            success:function (res) {
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

});