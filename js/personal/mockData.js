var personal2MockData = {
  "success": true,
  data: {
    order: [{
      order_id: "10001",
      user_id: "69590",
      order_type: "0",
      order_progress: "0",
      order_name: "三汇企业官网建设",
      end_date: "2017年08月05日",
      content: [
        ["交互设计", "交互策略（微型BS）", "黑白流程说明", 2472.00],
        ["视觉设计", "主页面，页面组，表单组，图标组，控件组", "PSD源文件", 2472.00],
        ["前端开发", "基于web静态页面首页开发（html适配IE8及以上）", "html文件包", 2472.00],
      ],
      pay_array: ["20%", "40%", "40%"],
      collection_times: 2,
      collection_money: 13300.00,
      total_price: 33053.00,
      tax_price: 561.60,
      order_tips: "对方申请延长项目时间",
      has_reminded: true /*因为一天最多能提醒三次 ,判断是否还能再提醒，如果为false，则表示今天不能提醒了*/
    }, {
      order_id: "10002",
      user_id: "69590",
      order_type: "0",
      order_progress: "1",
      order_name: "三汇企业官网建设╮(╯_╰)╭",
      end_date: "2017年08月24日",
      content: [
        ["交互设计", "交互策略alal（微型BS）", "黑白流程说明", 2472.00],
        ["视觉设计", "主页面666，页面组，表单组，图标组，控件组", "PSD源文件", 2472.00],
        ["前端开发233", "基于web静态页面首页开发（html适配IE8及以上）", "html文件包", 2472.00],
      ],
      pay_array: ["10%", "40%", "50%"],
      collection_times: 3,
      collection_money: 33053.00,
      total_price: 33053.00,
      tax_price: 561.60,
      order_tips: "已全部收款",
      has_rated: true,
      /*因为只能评价一次，判断他是否已经评价过，如果已经评价，返回评价星级和内容*/ rated: 4,
      rated_txt: "做的还不错，给他点个赞"
    }, {
      order_id: "10003",
      user_id: "69590",
      order_type: "0",
      order_progress: "1",
      order_name: "六汇企业官网建设╮(╯_╰)╭",
      end_date: "2017年07月25日",
      content: [
        ["3交互设计", "交互策略alal（微型BS）", "黑白流程说明", 2472.00],
        ["3视觉设计", "主页面666，页面组，表单组，图标组，控件组", "PSD源文件", 2472.00],
        ["3前端开发233", "基于web静态页面首页开发（html适配IE8及以上）", "html文件包", 2472.00],
      ],
      pay_array: ["10%", "40%", "50%"],
      collection_times: 3,
      collection_money: 33053.00,
      total_price: 33053.00,
      tax_price: 0,
      order_tips: "已全部收款",
      has_rated: false,
      rated: 0,
      rated_txt: ""
    }, {
      order_id: "10004",
      user_id: "69590",
      order_type: "1",
      order_progress: "0",
      order_name: "三汇企业官网建设╮(╯_╰)╭",
      end_date: "2017年08月24日",
      content: [
        ["PS简单处理图片", "1", 500.00],
        ["网站banner大图", "1", 500.00],
        ["网站icon图标", "10", 300.00],
      ],
      total_price: 33053.00,
      tax_price: 561.60,
      order_tips: "",
      count_down: "9天23时",
      has_reminded: false
    }, {
      order_id: "10005",
      user_id: "69590",
      order_type: "1",
      order_progress: "1",
      order_name: "六汇企业官网建设╮(╯_╰)╭",
      end_date: "2017年07月25日",
      content: [
        ["PS高级照片处理", "10086", 10086.00],
        ["网站背景大图", "233", 666.00],
        ["网站商标图设计", "1", 88888.00],
      ],
      total_price: 33053.00,
      tax_price: 0,
      order_tips: "",
      count_down: "",
      has_rated: false,
      rated: 0,
      rated_txt: ""
    }],
    total_pages: 66
  }
}