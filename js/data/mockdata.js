/**
 * Created by gs on 2017/6/5 0005.
 */
/*
 * 选择联系人数据(对应id的数据)
 * */
var localUrl = '/local';
Mock.mock(localUrl + '/kkk', {
    "users":[{
        "username":"13265656565",
        "id":"476",
        "dataObj":{
            "linkName":"小明",
            "linkPhone":"13265656565",
            "linkEmail":"13265656565@163.com",
            "linkCompany":"杭州画客科技"
        }
    },{
        "username":"13265659995",
        "id":"481",
        "dataObj":{
            "linkName":"小华",
            "linkPhone":"13265659995",
            "linkEmail":"13265659995@163.com",
            "linkCompany":""
        }
    },{
        "username":"13265656665",
        "id":"499",
        "dataObj":{
            "linkName":"小强",
            "linkPhone":"13265656665",
            "linkEmail":"13265656665@163.com",
            "linkCompany":"杭州维善科技"
        }
    },{
        "username":"13265658885",
        "id":"496",
        "dataObj":{
            "linkName":"小余",
            "linkPhone":"13265658885",
            "linkEmail":"13265658885@163.com",
            "linkCompany":"杭州极影科技"
        }
    }]

});

/*
 * 弹窗:历史模板/官方模板(图片地址)
 * */
/*Mock.mock(localUrl + "/ggg", {
    "id":"10000",
    "history": ["三汇《国保教育平台》", "明牌珠宝", "三汇《国保教育》", "《国保教育平台》", "三汇国保教育平台", "明牌珠宝", "三汇《国保教育》", "《国保教育平台》", "三汇国保教育平台", "明牌珠宝", "三汇《国保教育》", "《国保教育平台》", "三汇国保教育平台"],
    "official": [{
        "title": "艺术绘画",
        "sort": ["插画", "人设", "漫画", "表情", "墙绘", "吉祥物"]
    }, {
        "title": "品牌建设",
        "sort": ["品牌档案", "名片/卡片", "包装设计", "易拉宝", "封面/画册", "导视", "logo"]
    }, {
        "title": "互联网设计",
        "sort": ["交互原型", "界面设计", "网页设计", "专题/活动", "banner"]
    }, {
        "title": "产品设计",
        "sort": ["外观设计", "结构设计", "珠宝设计", "工具设计"]
    }, {
        "title": "空间设计",
        "sort": ["软装设计", "工装设计", "家装设计", "美陈设计", "专卖店设"]
    }, {
        "title": "虚拟现实",
        "sort": ["建模", "渲染", "虚拟现实", "三维特效", "园林景观", "雕塑设计", "360/720全景"]
    }, {
        "title": "多媒体",
        "sort": ["影视后期", "宣传片", "微电影", "flash", "摄影师", "GIF", "配音"]
    }, {
        "title": "程序开发",
        "sort": ["Android开发", "IOS开发", "微信开发", "企业建设", "前端开发", "后端开发", "SEO"]
    }]
});*/
/*
 * 重要::历史报价数据和上面弹窗显示的项目名称相对应
 * 创建模板的弹窗数据:历史报价(包括详细数据)
 * */
Mock.mock(localUrl + '/www', {
    "history": [
        {   //项目
            "section": {
                "id":123,
                "runTimeOut":1859655845,    //报价发送的时间，时间到了自动取消报价
                "agreement":true,          //对方是否同意了报价
                "proname": "三汇集团",      //项目名称
                "main": [   //报价单
                    {
                        "priceName": "企业官网建设",  //报价单名称
                        "cash": "要发票(税6%)",
                        "remarks": "备注备注备注备注备注备注备注备注备注备注",
                        "totalAll": "33660.00",      //报价单总计
                        "parts": [   //部分
                            {
                                "description": "交互设计",       //部分描述
                                "achievement": "黑白流程说明",   //部分成果
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）1",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.00",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略2",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.00",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略3",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.00",
                                        "total": "1830.00"
                                    }
                                ]
                            },
                            {
                                "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                                "achievement": "成果：黑白流程说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）4",
                                        "desResult": "交互原则互动演绎，整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.55",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略5",
                                        "desResult": "融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.89",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略6",
                                        "desResult": "交互原则互动演绎，融合产品与要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.48",
                                        "total": "1830.00"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "priceName": "微信小程序设计开发",
                        "cash": "不要发票",
                        "remarks": "备注备注备注备注备注备注备注备注备注备注备注备注备注备注",
                        "totalAll": "33666.00",
                        "parts": [
                            {
                                "description": "在原来的功能的基础上进行用户使用流程优化方案设计",
                                "achievement": "交互流程说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）7",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.00",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略8",
                                        "desResult": "交互原则，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.50",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略9",
                                        "desResult": "交互原则互动演绎，与用户的需要参与策划与数（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.82",
                                        "total": "1830.00"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "priceName": "微信小程序设计",
                        "cash": "不要发票",
                        "remarks": "备注备注备注备注备注备注备注备注备注备注备注备注备注备注",
                        "totalAll": "33666.00",
                        "parts": [
                            {
                                "description": "（在原来的功能的基础上进行用户使用流程优化方案设计）",
                                "achievement": "交互流程说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）7",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.00",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略8",
                                        "desResult": "交互原则，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.50",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略9",
                                        "desResult": "交互原则互动演绎，与用户的需要参与策划与数（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.82",
                                        "total": "1830.00"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            "section": {
                "id":485,
                "runTimeOut":1859695845,
                "agreement":false,
                "proname": "三汇集团网站建设",
                "main": [
                    {
                        "priceName": "企业官网建设",
                        "cash": "要发票(税6%)",
                        "remarks": "备注备注备注备注备注备注备注备注备注备注",
                        "totalAll": "33660.00",
                        "parts": [
                            {
                                "description": "交互设计",
                                "achievement": "黑白流程说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）1",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.00",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略2",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.00",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略3",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.00",
                                        "total": "1830.00"
                                    }
                                ]
                            },
                            {
                                "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                                "achievement": "成果黑白流程说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）4",
                                        "desResult": "交互原则互动演绎，整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.55",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略5",
                                        "desResult": "融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.89",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略6",
                                        "desResult": "交互原则互动演绎，融合产品与要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.48",
                                        "total": "1830.00"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "priceName": "微信小程序设计开发",
                        "cash": "不要发票",
                        "remarks": "备注备注备注备注备注备注备注备注备注备注备注备注备注备注",
                        "totalAll": "33666.00",
                        "parts": [
                            {
                                "description": "（在原来的功能的基础上进行用户使用流程优化方案设计）",
                                "achievement": "交互说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）7",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.00",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略8",
                                        "desResult": "交互原则，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.50",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略9",
                                        "desResult": "交互原则互动演绎，与用户的需要参与策划与数（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.82",
                                        "total": "1830.00"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            "section": {
                "id":552,
                "runTimeOut":1959695845,
                "agreement":"inResponse",
                "proname": "三汇集团网站建设",
                "main": [
                    {
                        "priceName": "企业官网建设",
                        "cash": "要发票(税6%)",
                        "remarks": "备注备注备注备注备注备注备注备注备注备注",
                        "totalAll": "33660.00",
                        "parts": [
                            {
                                "description": "交互设计",
                                "achievement": "黑白流程说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）1",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.00",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略2",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.00",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略3",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.00",
                                        "total": "1830.00"
                                    }
                                ]
                            },
                            {
                                "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                                "achievement": "成果黑白流程说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）4",
                                        "desResult": "交互原则互动演绎，整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.55",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略5",
                                        "desResult": "融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.89",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略6",
                                        "desResult": "交互原则互动演绎，融合产品与要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.48",
                                        "total": "1830.00"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "priceName": "微信小程序设计开发",
                        "cash": "不要发票",
                        "remarks": "备注备注备注备注备注备注备注备注备注备注备注备注备注备注",
                        "totalAll": "33666.00",
                        "parts": [
                            {
                                "description": "（在原来的功能的基础上进行用户使用流程优化方案设计）",
                                "achievement": "交互说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）7",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.00",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略8",
                                        "desResult": "交互原则，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.50",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略9",
                                        "desResult": "交互原则互动演绎，与用户的需要参与策划与数（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.82",
                                        "total": "1830.00"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ]
});


/*
 * 官方模板具体数据请求
 * */
Mock.mock(localUrl + "/fff", {
    "officialTemp":{
        "yshh":{
            "title":"艺术绘画",
            "num":"1",
            "detail":{
                "chtemp": {
                    "chtempli":"插画",
                    "priceName": "珠宝官网建设",
                    "cash": "要发票(税6%)",
                    "remarks": "备注备注备备注备注备注备注备备注备注备注备注备备注备注",
                    "totalAll": "28608.00",
                    "parts": [
                        {
                            "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                            "achievement": "成果：交互流程说明",
                            "part": [
                                {
                                    "order": "1",
                                    "content": "交互策略（微型BS）",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "1000.00",
                                    "number": "30",
                                    "rate": "200",
                                    "total": "1800.00"
                                },
                                {
                                    "order": "2",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                },
                                {
                                    "order": "3",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                }
                            ]
                        },
                        {
                            "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                            "achievement": "成果：黑白流程说明",
                            "part": [
                                {
                                    "order": "1",
                                    "content": "交互策略（微型BS）",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "1000.00",
                                    "number": "30",
                                    "rate": "200",
                                    "total": "1800.00"
                                },
                                {
                                    "order": "2",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                }
                            ]
                        }
                    ]
                },
                "rstemp": {
                    "chtempli":"人设",
                    "priceName": "珠宝企业官网建设",
                    "cash": "不要发票",
                    "remarks": "备注备注备备注备注",
                    "totalAll": "28608.00",
                    "parts": [
                        {
                            "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                            "achievement": "成果：黑白流程说明",
                            "part": [
                                {
                                    "order": "1",
                                    "content": "交互策略（微型BS）",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "1000.00",
                                    "number": "30",
                                    "rate": "200",
                                    "total": "1800.00"
                                },
                                {
                                    "order": "2",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                },
                                {
                                    "order": "3",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                }
                            ]
                        },
                        {
                            "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                            "achievement": "成果：黑白流程说明",
                            "part": [
                                {
                                    "order": "1",
                                    "content": "交互策略（微型BS）",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "1000.00",
                                    "number": "30",
                                    "rate": "200",
                                    "total": "1800.00"
                                },
                                {
                                    "order": "2",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                }
                            ]
                        }
                    ]
                }
            }
        },
        "ppjs":{
            "title":"品牌建设",
            "num":"2",
            "detail":{
                "pptemp": {
                    "chtempli":"品牌建设",
                    "priceName": "珠宝官网建设",
                    "cash": "要发票(税6%)",
                    "remarks": "备注备注备备注备注备注备注备备注备注备注备注备备注备注",
                    "totalAll": "28608.00",
                    "parts": [
                        {
                            "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                            "achievement": "成果：交互流程说明",
                            "part": [
                                {
                                    "order": "1",
                                    "content": "交互策略（微型BS）",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "1000.00",
                                    "number": "30",
                                    "rate": "200",
                                    "total": "1800.00"
                                },
                                {
                                    "order": "2",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                },
                                {
                                    "order": "3",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                }
                            ]
                        },
                        {
                            "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                            "achievement": "成果：黑白流程说明",
                            "part": [
                                {
                                    "order": "1",
                                    "content": "交互策略（微型BS）",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "1000.00",
                                    "number": "30",
                                    "rate": "200",
                                    "total": "1800.00"
                                },
                                {
                                    "order": "2",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                }
                            ]
                        }
                    ]
                },
                "mptemp": {
                    "chtempli":"名片/卡片",
                    "priceName": "珠宝企业官网建设",
                    "cash": "不要发票",
                    "remarks": "备注备注备备注备注",
                    "totalAll": "28608.00",
                    "parts": [
                        {
                            "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                            "achievement": "成果：黑白流程说明",
                            "part": [
                                {
                                    "order": "1",
                                    "content": "交互策略（微型BS）",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "1000.00",
                                    "number": "30",
                                    "rate": "200",
                                    "total": "1800.00"
                                },
                                {
                                    "order": "2",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                },
                                {
                                    "order": "3",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                }
                            ]
                        },
                        {
                            "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                            "achievement": "成果：黑白流程说明",
                            "part": [
                                {
                                    "order": "1",
                                    "content": "交互策略（微型BS）",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "1000.00",
                                    "number": "30",
                                    "rate": "200",
                                    "total": "1800.00"
                                },
                                {
                                    "order": "2",
                                    "content": "交互策略",
                                    "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                    "unit": "套",
                                    "price": "800.00",
                                    "number": "50",
                                    "rate": "200",
                                    "total": "1830.00"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
    /*
     * 插画，人设，漫画，表情，墙绘，吉祥物
     * 品牌档案，名片/卡片，包装设计，易拉宝，封面/画册，导视，logo
     * 交互原型，界面设计，网页设计，专题/活动，banner
     * 外观设计，结构设计，珠宝设计，工具设计
     * 软装设计，工装设计，家装设计，美陈设计，专卖店设计
     * 建模、渲染，虚拟现实，三维特效，园林景观，雕塑设计，360/720全景
     * 影视后期，宣传片，微电影，flash，摄影师，GIF，配音
     * Android开发，IOS开发，微信开发，企业建设，前端开发，后端开发，SEO
     * 所有官方数据模板都在这里
     * */
});

/*
* 设计师数据模拟
* user_id	        用户ID
* nick_name	        用户昵称
* company	        公司名称
* job_name	        职位
* user_Path	        头像大图
* path_thumb	    头像小图
* attachment_list   生活照片
* video_url	        视频
* sex	            性别
* experience	    工作经验
* works_count	    作品数量
* hits_count	    浏览量
* love_count	    点赞数
* rec_count         留言
* txt_address       设计师地址
* signature	        个人签名
* credit_val	    信誉值
* jobs	            职业
* keywords	        擅长
* qq                qq号
* */
Mock.mock(localUrl + "/rrrr", {
    "success": true,
    "main": [
        {
            "user_id": "54",
            "user_path": "http://huakewang.b0.upaiyun.com/2014/12/31/20141231131956609839.png!138x138",
            "nick_name": "hkw5815603",
            "company": "",
            "sex": "保密",
            "experience": "1-3年",
            "works_count": "20",
            "hits_count": "2600",
            "txt_address":"杭州市-滨江区",
            "rec_count":"5",
            "love_count": "0",
            "signature": "",
            "credit_val": "5.0",
            "qq":114525365,
            "design_img":[
                {
                    "workId":"55",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231134422156492.jpg!209x150"
                },
                {
                    "workId":"18",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231141901379831.jpg!209x150"
                },
                {
                    "workId":"41",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231143728609783.jpg!209x150"
                },
                {
                    "workId":"56",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                },
                {
                    "workId":"57",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144343279139.jpg!209x150"
                },
                {
                    "workId":"58",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                }],
            "keywords": [
                "UI设计","Photoshop","网站设计","字体设计","logo"
            ]
        },
        {
            "user_id": "64",
            "user_path": "images/team15.png",
            "nick_name": "hkw5819603",
            "company": "",
            "sex": "男",
            "experience": "8年",
            "works_count": "60",
            "hits_count": "5680",
            "txt_address":"杭州市-西湖区",
            "rec_count":"121",
            "love_count": "500",
            "signature": "",
            "credit_val": "3.5",
            "qq":114525365,
            "design_img":[
                {
                    "workId":"59",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231134422156492.jpg!209x150"
                },
                {
                    "workId":"60",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231141901379831.jpg!209x150"
                },
                {
                    "workId":"10",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231143728609783.jpg!209x150"
                },
                {
                    "workId":"11",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                },
                {
                    "workId":"12",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144343279139.jpg!209x150"
                },
                {
                    "workId":"16",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                }
            ],
            "keywords": [
                "UI设计","Photoshop","平面设计","摄影","SEO"
            ]
        },
        {
            "user_id": "55",
            "user_path": "http://huakewang.b0.upaiyun.com/2014/12/31/20141231131956609839.png!138x138",
            "nick_name": "hkw5815603",
            "company": "",
            "sex": "保密",
            "experience": "2年",
            "works_count": "20",
            "hits_count": "2600",
            "txt_address":"杭州市-滨江区",
            "rec_count":"5",
            "love_count": "0",
            "signature": "",
            "credit_val": "4.5",
            "qq":114525349,
            "design_img":[
                {
                    "workId":"30",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231134422156492.jpg!209x150"
                },
                {
                    "workId":"18",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231141901379831.jpg!209x150"
                },
                {
                    "workId":"41",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231143728609783.jpg!209x150"
                },
                {
                    "workId":"53",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                },
                {
                    "workId":"66",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144343279139.jpg!209x150"
                },
                {
                    "workId":"88",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                }
            ],
            "keywords": [
                "UI设计","Photoshop","网站设计","字体设计","logo"
            ]
        },
        {
            "user_id": "58",
            "user_path": "http://huakewang.b0.upaiyun.com/2014/12/31/20141231131956609839.png!138x138",
            "nick_name": "hkw5815603",
            "company": "",
            "sex": "保密",
            "experience": "2年",
            "works_count": "20",
            "hits_count": "2600",
            "txt_address":"杭州市-滨江区",
            "rec_count":"5",
            "love_count": "0",
            "signature": "",
            "credit_val": "5.0",
            "qq":2547795593,
            "design_img":[
                {
                    "workId":"99",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231134422156492.jpg!209x150"
                },
                {
                    "workId":"98",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231141901379831.jpg!209x150"
                },
                {
                    "workId":"97",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231143728609783.jpg!209x150"
                },
                {
                    "workId":"96",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                },
                {
                    "workId":"95",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144343279139.jpg!209x150"
                },
                {
                    "workId":"94",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                }
            ],
            "keywords": [
                "UI设计","Photoshop","网站设计","字体设计","logo"
            ]
        },
        {
            "user_id": "51",
            "user_path": "http://huakewang.b0.upaiyun.com/2014/12/31/20141231131956609839.png!138x138",
            "nick_name": "hkw5815603",
            "company": "",
            "sex": "保密",
            "experience": "2年",
            "works_count": "20",
            "hits_count": "2600",
            "txt_address":"杭州市-滨江区",
            "rec_count":"5",
            "love_count": "0",
            "signature": "",
            "credit_val": "4.5",
            "qq":2845492904,
            "design_img":[
                {
                    "workId":"93",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231134422156492.jpg!209x150"
                },
                {
                    "workId":"92",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231141901379831.jpg!209x150"
                },
                {
                    "workId":"91",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231143728609783.jpg!209x150"
                },
                {
                    "workId":"90",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                },
                {
                    "workId":"89",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144343279139.jpg!209x150"
                },
                {
                    "workId":"88",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                }
            ],
            "keywords": [
                "UI设计","Photoshop","网站设计","字体设计","logo"
            ]
        },
        {
            "user_id": "52",
            "user_path": "http://huakewang.b0.upaiyun.com/2014/12/31/20141231131956609839.png!138x138",
            "nick_name": "hkw5815603",
            "company": "",
            "sex": "保密",
            "experience": "2年",
            "works_count": "20",
            "hits_count": "2600",
            "txt_address":"杭州市-滨江区",
            "rec_count":"5",
            "love_count": "0",
            "signature": "",
            "credit_val": "4.0",
            "qq":114525365,
            "design_img":[
                {
                    "workId":"87",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231134422156492.jpg!209x150"
                },
                {
                    "workId":"86",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231141901379831.jpg!209x150"
                },
                {
                    "workId":"85",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231143728609783.jpg!209x150"
                },
                {
                    "workId":"84",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                },
                {
                    "workId":"83",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144343279139.jpg!209x150"
                },
                {
                    "workId":"82",
                    "src":"http://huakewang.b0.upaiyun.com/2014/12/31/20141231144705421348.jpg!209x150"
                }
            ],
            "keywords": [
                "UI设计","Photoshop","网站设计","字体设计","logo"
            ]
        }
    ]
})



/*
* 搜索历史地址数据模拟
* */
Mock.mock(localUrl + "/cccc",{
    "success":true,
    "data":[
    {
        "id":"13",
        "user_id":"67094",
        "longitude":"120.191923",
        "latitude":"30.268165",
        "long_lat_address":"浙江 杭州 上城区",
        "mobile":"",
        "is_save":0,
        "is_default":0,
        "search_keyword":"",
        "set_cur_city":"杭州",
        
        "long_lat_address_jd":"上城区刀茅巷169号"
    },
        {
            "id":"133",
            "user_id":"67088",
            "longitude":"120.191923",
            "latitude":"30.268165",
            "long_lat_address":"浙江 杭州 里城区",
            "mobile":"",
            "is_save":"0",
            "is_default":"0",
            "search_keyword":"",
            "set_cur_city":"杭州",
            "long_lat_address_jd":"下城区刀茅巷129号"
        },
        {
            "id":"133",
            "user_id":"67088",
            "longitude":"120.191923",
            "latitude":"30.268165",
            "long_lat_address":"浙江 杭州 下城区",
            "mobile":"",
            "is_save":"0",
            "is_default":"0",
            "search_keyword":"",
            "set_cur_city":"杭州",
            "long_lat_address_jd":"下城区刀茅巷129号"
        },
        {
            "id":"133",
            "user_id":"67088",
            "longitude":"120.191923",
            "latitude":"30.268165",
            "long_lat_address":"浙江 杭州 下城区",
            "mobile":"",
            "is_save":"0",
            "is_default":"0",
            "search_keyword":"",
            "set_cur_city":"杭州",
            "long_lat_address_jd":"下城区刀茅巷129号"
        },{
            "id":"133",
            "user_id":"67088",
            "longitude":"120.191923",
            "latitude":"30.268165",
            "long_lat_address":"浙江 杭州 下城区",
            "mobile":"",
            "is_save":"0",
            "is_default":"0",
            "search_keyword":"",
            "set_cur_city":"杭州",
            "long_lat_address_jd":"下城区刀茅巷129号"
        },
        {
            "id":"133",
            "user_id":"67088",
            "longitude":"120.191923",
            "latitude":"30.268165",
            "long_lat_address":"浙江 杭州 下城区",
            "mobile":"",
            "is_save":"0",
            "is_default":"0",
            "search_keyword":"",
            "set_cur_city":"杭州",
            "long_lat_address_jd":"下城区刀茅巷129号"
        }

]
});

/*
 * 合作伙伴数据模拟（没选择分类之前要有推荐展示的数据）
 * 每个大的类别（例“aa”“bb”）要分页21条数据为一页（一页为一个ul列表）
 * */
Mock.mock(localUrl + "/dddd",{
    "success":"true",
    "data":[
        //21个对象为一个数组元素，相当于一页
        {"lists":[
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },{
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            }]},
        {"lists":[    {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            },
            {
                "path":"images/team15.png",
                "title":"Motorala",
                "description":"总部设在美国伊利诺伊州绍姆堡.位于芝加哥市郊.世界财富百强企业之一…",
                "company_des":"合作规模：20万元",
                "link":"www.motorola.com.cn"
            }
        ]}
    ]
});

//需求预算(默认的艺术绘画/插画/3年以内)
// [percent=百分比] 总和为1
// [priceRange=价格区间]
// http://139.224.68.145:8080/hkw_newapi//get_keyword_list/user/艺术绘画
Mock.mock(localUrl+'/sasasa/艺术绘画',{
    "success": true,
    "data": [
        {
            "name": "插画",
            "experience":[
                {
                    "percent":['10%','20%','30%','40%'],
                    "priceRange":["799~1200元","1200~5000元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['15%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5500元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5050元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','13%'],
                    "priceRange":["799~1200元","1200~5005元","5000~8000元","8000~18000元"]
                }
            ]

        },
        {
            "name": "人设",
            "experience":[
                {
                    "percent":['29%','30%','658%','10%'],
                    "priceRange":["799~1200元","1200~5000元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5500元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5050元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','13%'],
                    "priceRange":["799~1200元","1200~5005元","5000~8000元","8000~18000元"]
                }
            ]
        },
        {
            "name": "漫画",
            "experience":[
                {
                    "percent":['20%','30%','60%','100%'],
                    "priceRange":["799~1200元","1200~5000元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5500元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5050元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','13%'],
                    "priceRange":["799~1200元","1200~5005元","5000~8000元","8000~18000元"]
                }
            ]
        },
        {
            "name": "吉祥物",
            "experience":[
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5000元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5500元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5050元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','13%'],
                    "priceRange":["799~1200元","1200~5005元","5000~8000元","8000~18000元"]
                }
            ]

        },
        {
            "name": "表情",
            "experience":[
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5000元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5500元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5050元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','13%'],
                    "priceRange":["799~1200元","1200~5005元","5000~8000元","8000~18000元"]
                }
            ]

        }
    ]
});
Mock.mock(localUrl+'/sasasa/品牌建设',{
    "success": true,
    "data": [
        {
            "name": "品牌档案",
            "experience":[
                {
                    "percent":['20%','300%','60%','10%'],
                    "priceRange":["799~1200元","1200~5000元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','100%'],
                    "priceRange":["799~1200元","1200~5500元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5050元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','13%'],
                    "priceRange":["799~1200元","1200~5005元","5000~8000元","8000~18000元"]
                }
            ]
        },
        {
            "name": "易拉宝",
            "experience":[
                {
                    "percent":['20%','300%','10%','10%'],
                    "priceRange":["799~1200元","1200~5000元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','39%','99%','10%'],
                    "priceRange":["799~1200元","1200~5500元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5050元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','13%'],
                    "priceRange":["799~1200元","1200~5005元","5000~8000元","8000~18000元"]
                }
            ]
        },
        {
            "name": "名片/卡片",
            "experience":[
                {
                    "percent":['209%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5000元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5500元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5050元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','13%'],
                    "priceRange":["799~1200元","1200~5005元","5000~8000元","8000~18000元"]
                }
            ]
        },
        {
            "name": "logo",
            "experience":[
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5000元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5500元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','10%'],
                    "priceRange":["799~1200元","1200~5050元","5000~8000元","8000~18000元"]
                },
                {
                    "percent":['20%','30%','60%','13%'],
                    "priceRange":["799~1200元","1200~5005元","5000~8000元","8000~18000元"]
                }
            ]

        }
    ]
});

$(function () {

    var a = {"history": [
        {
            "section": {
                "proname": "三汇集团",
                "main": [
                    {
                        "priceName": "企业官网建设",
                        "cash": "要发票(税6%)",
                        "remarks": "备注备注备注备注备注备注备注备注备注备注",
                        "totalAll": "33660.00",
                        "parts": [
                            {
                                "description": "交互设计",
                                "achievement": "黑白流程说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）1",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.00",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略2",
                                        "desResult": "交互原则互动演绎，融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.00",
                                        "total": "1830.00"
                                    }
                                ]
                            },
                            {
                                "description": "交互设计（在原来的功能的基础上进行用户使用流程优化方案设计）",
                                "achievement": "成果：黑白流程说明",
                                "part": [
                                    {
                                        "order": "1",
                                        "content": "交互策略（微型BS）4",
                                        "desResult": "交互原则互动演绎，整合（线框图）",
                                        "unit": "套",
                                        "price": "1000.00",
                                        "number": "30",
                                        "rate": "200.55",
                                        "total": "1800.00"
                                    },
                                    {
                                        "order": "2",
                                        "content": "交互策略5",
                                        "desResult": "融合产品与用户的需要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.89",
                                        "total": "1830.00"
                                    },
                                    {
                                        "order": "3",
                                        "content": "交互策略6",
                                        "desResult": "交互原则互动演绎，融合产品与要参与策划与数据整合（线框图）",
                                        "unit": "套",
                                        "price": "800.00",
                                        "number": "50",
                                        "rate": "200.48",
                                        "total": "1830.00"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }]}
    var b = {
        arr:[
            ["1","30","确认接收订单","首款","57240.00","2585.00"],      //最后加上每一条的税金（也可能没有）
            ["2","70","结算尾款","尾款","133560.00","4800.00"]
        ],
        arrDiscount:"190000.00",       //打折后的总价
        arrTotal:'190800.00',          //没有打折前的总价
        discountCashMoney:'10400',     //打折后的税金
        totalCashMoney:'10800',        //没有打折前的税金
        user_id:69123,
        project_id:"415"
    }
})