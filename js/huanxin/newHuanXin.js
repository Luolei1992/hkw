// new Demo
window.Demo = {
    groupType: 'groupchat'
};

// initialize webIM connection

Demo.conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isHttpDNS: WebIM.config.isHttpDNS,
    isWindowSDK: WebIM.config.isWindowSDK,
    isAutoLogin: true,
    encrypt: WebIM.config.encrypt,
    delivery: WebIM.config.delivery
});

function DEMOinit() {
	//登录
	var username = (WebIM.config.autoSignIn ? WebIM.config.autoSignInName : '');
	var auth = (WebIM.config.autoSignIn ? WebIM.config.autoSignInPwd : '');
	//判断之前是否登录过，即刷新页面使用token登录
	var uri = WebIM.utils.parseHrefHash();
    var username2 = uri.username;
    var auth2 = WebIM.utils.getCookie()['webim_' + username2];
    Demo.token = auth2;
    if (username2 && auth2) {
        username2 = atob(username2);
        signin(username2, auth2, true);
    } else {
		signin(username, auth, false);
    }	
}

// $.ajax({
//     url: 'http://115.159.157.173:30001/loginHuanXin',
//     type: 'GET',
//     dataType: 'JSON'
// })
// .done(function(data) {
//     if (data) {
//         WebIM.config.autoSignIn = true;
//         WebIM.config.autoSignInName = data.userId;
//         WebIM.config.autoSignInPwd = data.password;
//         if (data.isNew != 1) {
//             //登录
//             DEMOinit();
//         } else {
//             //注册
//             autoSignup(data.userId, data.password, DEMOinit);
//         }
//     }
// })
// .fail(function() {
//     return 0;
// });

//初始化IIFE函数
(function (){
    var id = getCookie("hxid"); //环信账号ID
    if (id) {
        // var password = nick_name + mobile;
        WebIM.config.autoSignIn = true; //自动登录
        WebIM.config.autoSignInName = id; //环信账号ID
        WebIM.config.autoSignInPwd = "85e86304d37619f798bd9019614f3d29"; //环信账号密码

        //是否是对话，如果是，执行自动添加好友功能
        var talkHxid = getLocationParam("talk_hxid");
        if (talkHxid) {
            WebIM.config.isAutoAddFriend = true;
            WebIM.config.isAutoAddFriendView = true;
            WebIM.config.isAutoAddFriendId = talkHxid;
        }
        //判断是否是环信新用户，如果isNew = 1，则是新用户，需要注册。否则直接登录
        var isNew = 0; //服务端已经注册，都不算新用户
        if (isNew !== 1) {
            //登录
            DEMOinit();
        } else {
            //注册
            autoSignup(huanXinId, huanXinId, DEMOinit);
        }        
    }
})();


function autoSignup(username, password, callback, nickname) {
    var nickname = nickname || "";
    var options = {
        username: username,
        password: password,
        nickname: nickname,
        appKey: WebIM.config.appkey,
        success: function() {
            console.log("环信注册成功");
            callback();
        },
        error: function(error) {
            callback();
        },
        apiUrl: WebIM.config.apiURL
    };
    Demo.conn.registerUser(options);
}

function signin(username, auth, type) {
    var username = username;
    var auth = auth;

	if (!username || !auth) {
        Demo.api.NotifyError(Demo.lan.notEmpty);
        return false;
    }    

    var options = {
        apiUrl: WebIM.config.apiURL,
        user: username.toLowerCase(),
        pwd: auth,
        accessToken: auth,
        appKey: WebIM.config.appkey,
        success: function(token) {
        	console.log("环信登录成功啦！！！");
            var encryptUsername = btoa(username);
            encryptUsername = encryptUsername.replace(/=*$/g, "");
            var token = token.access_token;
            var url = '#username=' + encryptUsername;
            WebIM.utils.setCookie('webim_' + encryptUsername, token, 1);
            window.location.href = url
            Demo.token = token;
            
        },
        error: function(data) {
        	console.log("data");
            window.location.href = '#'

        }
    };

	if (!type) {
        delete options.accessToken;
    }    

    if (Demo.user) {
        if (Demo.user != username) {
            Demo.chatRecord = {};
        }
    }

    Demo.user = username;

    Demo.conn.autoReconnectNumTotal = 0;
    Demo.conn.open(options);   
}

Demo.conn.listen({
	onTextMessage: function ( message ) {
		setLocalStorageMsg(message, 'txt');
		headMsgIconShow();
	},
	onEmojiMessage: function ( message ) {
		setLocalStorageMsg(message, 'emoji');
		headMsgIconShow();
	},
	onPictureMessage: function ( message ) {
		setLocalStorageMsg(message, 'img');
		headMsgIconShow();
	},
	onCmdMessage: function ( message ) {
		setLocalStorageMsg(message, 'cmd');
		headMsgIconShow();
	},	
	onAudioMessage: function ( message ) {
		setLocalStorageMsg(message, 'aud');
		headMsgIconShow();
	},
	onLocationMessage: function ( message ) {
		setLocalStorageMsg(message, 'loc');
		headMsgIconShow();
	},
	onFileMessage: function ( message ) {
		setLocalStorageMsg(message, 'file');
		headMsgIconShow();
	},
	onVideoMessage: function (message ) {
		setLocalStorageMsg(message, 'video');
		headMsgIconShow();
    },
    onBlacklistUpdate: function (list) {
        //获取黑名单
        Demo.customBlacklist = list;
    },
    onOpened: function () {
        Demo.conn.getBlacklist(); //链接成功后去获取黑名单，回调函数在监听函数onBlacklistUpdate里
        Demo.ConnectionSuccess = true;
    },
    onError: function (message) {
        Demo.ConnectionSuccess = false;
    }	
});

/**
 * 收到消息了，在head.html的消息按钮应该出现一个红点提示
 * @Author   郑国庆
 * @DateTime 2017-07-09T18:58:32+0800
 */
function headMsgIconShow(){
	window.localStorage.setItem("headMsgIconShow", "show");
	document.getElementById("head-webim-msg-icon").style.display = "inline-block";
	showMsgNumber();
}

function showMsgNumber(){
	var msgNumber = window.localStorage.getItem('localStorageTempMsg');
	if (msgNumber) {
		// msgNumber = msgNumber.split("={").length -1;
		if (parseInt(msgNumber) > 99) {
			msgNumber = "99+";
		}
	}
	document.getElementById("head-webim-msg-icon").innerHTML = msgNumber;
}

//判断是否该显示head.html的消息按钮的红点
$(function(){
	if (window.localStorage.getItem("headMsgIconShow") == "show") {
		document.getElementById("head-webim-msg-icon").style.display = "inline-block";
		showMsgNumber();
	}
});

//监听到消息后临时保存消息
function setLocalStorageMsg(message,type){
	// var strMsg = JSON.stringify(message);
	// var oldTempMsg = window.localStorage.getItem('localStorageTempMsg');
	// var newTempMsg = "";
	// if (oldTempMsg) {
	// 	newTempMsg += oldTempMsg+"&"+type+"="+strMsg;
	// } else {
	// 	newTempMsg += type+"="+strMsg; 		
	// }
    // window.localStorage.setItem('localStorageTempMsg', newTempMsg);
    var msgNumber = window.localStorage.getItem('localStorageTempMsg');
    msgNumber = msgNumber || 0;
    window.localStorage.setItem('localStorageTempMsg', parseInt(msgNumber) + 1);
    setLocalStorageChatRecord(message, type);
}
//ajax设置新的环信聊天记录,原名ajaxSetChatRecord,历史原因，写成setLocalStorageChatRecord.
function setLocalStorageChatRecord (message, type) {
    $.ajax({
        url: "https://www.huakewang.com/hkw_newapi/save_hx_msg",
        type: "POST",
        dataType: "JSON",
        data: {
            hxid: WebIM.utils.getCookie()["user_id"],
            selected: message.from,
            type: type || "txt",
            status: "Unread",
            message: JSON.stringify(message) || {}
        },
        success: function (response) {

        }
    });
}

//全局函数，不需要页面加载完成就可以执行
//获取当前页面的URL参数
function getLocationParam(name){
    var url = window.location.search;
    if (~url.indexOf("?")) {
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
}
