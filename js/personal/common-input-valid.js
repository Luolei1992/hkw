SimpoValidate = {
    //验证规则
    rules: {
        int: /^[1-9]\d*$/,
        number: /^[+-]?\d*\.?\d+$/,
        email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ,              //@[a-zA-Z0-9]{2,6}\.com  //yuxiaolong@163.com
        phone: /^1\d{10}$/,                                                         //^1[3|4|5|7|8]\d{9}$
        id: /\d{14}[x0-9]+?|\d{17}[x0-9]+?/,
        float: /^[1-9]\d*\.\d{2}/,
        age: /100|\d{2}|\d+?/,
        pwd: /^\w{6,16}$/g,
        account: /^[a-zA-Z0-9_]{6,18}$/,                    //原[a-zA-Z0-9_]{6,18}$
        string: /^[^\%\'\"\?]*$/,                          //^[^\%\'\"\]*$/
        telephone: /^(0[1-9]{2})-\d{8}$|^(0[1-9]{3}-(\d{7,8}))$/,
        address: /^[0-9a-zA-Z\u4e00-\u9fa5]*$/,
        name: /^[a-zA-Z0-9\u4e00-\u9fa5]*$/,
        textureId: /[a-zA-Z0-9]{18}/,
        zzjgId: /^[a-zA-Z0-9]{18}$/,
        zsrsbmId: /[a-zA-Z0-9]{18}/,
        bankName: /^[\u4e00-\u9fa5][0-9\u4e00-\u9fa5]*$/,
        bankCard: /\d*/,
        pri: /^[1-9]\d{0,9}\.\d{2}$/,
        price: /^(([0-9]+[\.]?[0-9]{1,2})|[1-9])$/,
        userName: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,8}$/,
        zph: /^\d{15}$/,
        addressLevel3: /(不限)|(.*\/.*\/.*)/,
        telPhone: /^\d{1,11}$/,
        courseName: /^.{1,20}$/,
        courseTxt: /^.{1,150}$/,
        iphone: /^1(3|4|5|7|8)[0-9]\d{8}$/,
        messageZYM: /^\d{4}$/,
        pictureZYM: /^[a-zA-Z0-9]{4}$/,
        userName: /^.{1,15}$/,
        inShort: /^.{1,30}$/,
        isYears: /^(19|20)\d{2}$/,
        certificateName: /^.{1,10}$/,
        businessLicense: /^\d{15}$/,
        schoolLicense: /^\d{4,30}$/,
        realName: /^[\u4E00-\u9FA5]{2,4}$/,
        IDCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
    },
//[\u4e00-\u9fa5]
    //初始化程序;
    init: function () {
        var that = this;
        this.inputDom = [];
        this.dataRuleArr = [];
        this.dataMsgArr = [];
        this.dataClsArr = [];
        this.parentParam = [];
        this.vipArr = [];
        $('.valid').each(function () {//遍历所有的元素找到带有属性valid的input标签;
            if ($(this)[0].tagName.toLowerCase() == 'input' || $(this)[0].tagName.toLowerCase() == 'textarea') {
                var validInput = $(this);
                var dataType = validInput.attr('data-type');
                var dataRule = validInput.attr('data-rule');
                var dataMsg =  validInput.attr('msg');
                var dataCls = validInput.attr('class');
                var parentCls = validInput.parent('.validate').attr('class');
                var dataVip = validInput.attr('data-vip');
                that.inputDom.push(validInput);
                that.dataRuleArr.push(dataRule);
                that.dataMsgArr.push(dataMsg);
                that.dataClsArr.push(dataCls);
                that.parentParam.push(parentCls);
                that.vipArr.push(dataVip);
                var target;
                if (dataType) {
                    target = $('input[data-type="' + dataType + '"],select[data-type="' + dataType + '"],textarea[data-type="' + dataType + '"]')
                } else {
                    target = validInput;
                }
                if (target) {
                    // target.parent('div.validate').after('<div class="errorMsg"><div class="input_valid"></div></div>');
                    //target.parent('div.validate').append('<div class="errorMsg"><div class="input_valid"></div></div>');
                    if (!target.parent('div.validate').next().hasClass('errorMsg')) {
                        target.parent('div.validate').after('<div class="errorMsg"><div class="input_valid"></div></div>');
                    }
                    target.targetRule = target.attr('data-rule');
                    target.targetMsg = target.attr('msg');
                    target.targetCls = target.attr('class');
                    target.parentCls = target.parent('div.validate').attr('class');
                    target.blur(function () {
                        SimpoValidate.flag = true;
                        if(!dataVip && typeof dataVip == 'undefined'){
                            that.resetOneInput(target);
                        }
                        SimpoValidate.validateOne(target);
                    });
                    target.on('myBlur',function(event) {
                        event.preventDefault();
                        SimpoValidate.flag = true;
                        if(!dataVip && typeof dataVip == 'undefined'){
                            that.resetOneInput(target);
                        }
                        SimpoValidate.validateOne(target);
                    });
                }
            }
        })
    },

    //validOne 单个检查
    validateOne: function (target) {

        var rule = SimpoValidate.getRule(target);
        var msg = target.attr('msg');
        var isNull = target.attr('class').indexOf('isNull') == -1 ? false : true;
        var dataType = target.attr("data-type");

        if (target) {

            //textarea input进行验证;
            if (target[0].tagName.toLowerCase() == 'input' || target[0].tagName.toLowerCase() == 'textarea' ) {
                var val = target.val();
                if (!isNull) {//不能为空
                    if ($.trim(val) == '') {
                        SimpoValidate.highLight(target, msg);
                        return false;
                    } else {
                        if (rule) {
                            var RegS = new RegExp(rule);
                            if (!RegS.test(val)) {
                                SimpoValidate.highLight(target, msg);
                                return false;
                            } else {
                                SimpoValidate.removeHighLight(target, msg);
                                return true;
                            }
                        }
                    }
                } else {
                    if ($.trim(val) == '') {
                        SimpoValidate.removeHighLight(target, msg);
                        return true;
                    } else {
                        if (rule) {
                            var Reg = new RegExp(rule);
                            if (!Reg.test(val)) {
                                SimpoValidate.highLight(target, msg);
                                return false;
                            } else {
                                SimpoValidate.removeHighLight(target, msg);
                                return true;
                            }
                        }
                    }
                }
            }
        }
    },

    //获取验证规则;
    getRule: function (target) {
        var rule = target.attr('data-rule');
        switch ($.trim(rule)) {
            case 'email':
                return this.rules.email;
                break;
            case 'phone':
                return this.rules.phone;
                break;
            case 'pwd':
                return this.rules.pwd;
                break;
            case 'string':
                return this.rules.string;
                break;
            case 'number':
                return this.rules.number;
                break;
            case 'telephone':
                return this.rules.telephone;
                break;
            case 'address':
                return this.rules.address;
                break;
            case 'name':
                return this.rules.name;
                break;
            case 'textureId':
                return this.rules.textureId;
                break;
            case 'bankName':
                return this.rules.bankName;
                break;
            case 'bankCard':
                return this.rules.bankCard;
                break;
            case 'pri':
                return this.rules.pri;
                break;
            case 'account':
                return this.rules.account;
                break;
            case 'int':
                return this.rules.int;
                break;
            case 'zzjgId':
                return this.rules.zzjgId;
                break;
            case 'zsrsbmId':
                return this.rules.zsrsbmId;
                break;
            case 'price':
                return this.rules.price;
                break;
            case 'userName':
                return this.rules.userName;
                break;
            case 'zph':
                return this.rules.zph;
                break;
            case 'addressLevel3':
                return this.rules.addressLevel3;
                break;
            case 'telPhone':
                return this.rules.telPhone;
                break;
            case 'courseName':
                return this.rules.courseName;
                break;
            case 'courseTxt':
                return this.rules.courseTxt;
                break;
            case 'iphone':
                return this.rules.iphone;
                break;
            case 'messageZYM':
                return this.rules.messageZYM;
                break;
            case 'pictureZYM':
                return this.rules.pictureZYM;
                break;
            case 'userName':
                return this.rules.userName;
                break;
            case 'inShort':
                return this.rules.inShort;
                break;
            case 'isYears':
                return this.rules.isYears;
                break;
            case 'certificateName':
                return this.rules.certificateName;
                break;
            case 'businessLicense':
                return this.rules.businessLicense;
                break;   
            case 'schoolLicense':
                return this.rules.schoolLicense;
                break;  
            case 'realName':
                return this.rules.realName;
                break;                 
            case 'IDCard':
                return this.rules.IDCard;
                break;                                                               
            default:
                return rule;
                break;
        }
    },

    //添加错误样式;
    highLight: function (target, msg) {
        target.parent('.validate').addClass('error');
        var validate = target.parent('div.validate').next().find('div.input_valid');
        validate.html('<span class="errorInput">' + msg + '</span>');
    },

    //移除错误样式;
    removeHighLight: function (target) {
        target.parent('.validate').removeClass('error');
        target.parent('div.validate').next().find('.errorInput').remove();
    },
    isTrue: function(selector){
       // this.resetAllInput(); //暂时我觉得并不需要这个，先注释掉
        var doc = selector == undefined ? document: selector;

        $(doc).find('.valid').trigger('blur');
        var len = $(doc).find('.errorInput').length;
        if(len > 0){
            return false;
        }else{
            return true;
        }
    },
    isMyBlur: function(selector){
       this.resetAllInput();
        var doc = selector == undefined ? document: selector;

        $(doc).find('.valid').trigger('myBlur');
        var len = $(doc).find('.errorInput').length;
        if(len > 0){
            return false;
        }else{
            return true;
        }
    },
    resetAllInput: function(){
        var _self = this;
        var inputDom = this.inputDom;
        var inputRule = this.dataRuleArr;
        var inputMsg = this.dataMsgArr;
        var inputCls = this.dataClsArr;
        var parentCls = this.parentParam;
        $.each(inputDom,function(n,value){
            if(!_self.vipArr[n] ||  typeof _self.vipArr[n] == 'undefined' ){
                value.attr('data-rule',inputRule[n])
                value.attr('msg',inputMsg[n])
                value.attr('class',inputCls[n])
                value.parent().attr('class',parentCls[n])
            }
        })
    },
    resetOneInput: function(target){
            target.attr('class',target.targetCls);
            target.attr('data-rule',target.targetRule);
            target.attr('msg',target.targetMsg);
            target.parent().attr('class',target.parentCls);
    }

};
SimpoValidate.init();
