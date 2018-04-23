(function() {

    $.fn.jsmove = function(config) {
        var
            p = {
                head: ''
            };
        $.extend(true, p, config);
        self = this;
        obj = $(this);
        head = $(p.head);
        if (head.length == 0 || obj.length == 0) return;
        this.move = false
        var o = {
            w: 0,
            h: 0,
            lt: 0,
            tp: 0,
            ow: 0,
            oh: 0
        }
        m = {
            sx: 0,
            sy: 0,
            ex: 0,
            ey: 0,
            mx: 0,
            my: 0,
            x: 0,
            y: 0,
            minx: 0,
            miny: 0,
            maxx: 0,
            maxy: 0
        };
        o.ow = obj[0].offsetWidth;
        o.oh = obj[0].offsetHeight;
        m.x = obj.css('left');
        m.y = obj.css('top');
        head.mousedown(function(e) {
            self.move = true;
            o.lt = $(this).offset().left;
            o.tp = $(this).offset().top;
            o.w = document.documentElement.clientWidth;
            o.h = document.documentElement.clientHeight;
            m.sx = e.clientX;
            m.sy = e.clientY;
            m.x = obj.css('left');
            m.y = obj.css('top');
        });
        $(document).mousemove(function(e) {
            if (self.move) {
                m.mx = e.clientX - m.sx;
                m.my = e.clientY - m.sy;
                m.minx = -o.lt;
                m.miny = -o.tp;
                m.maxx = o.w - o.ow - o.lt;
                m.maxy = o.h - o.oh - o.tp;
                m.mx = m.mx < m.minx ? m.minx : m.mx;
                m.mx = m.mx > m.maxx ? m.maxx : m.mx;
                obj.css({
                    left: parseInt(m.x) + m.mx,
                    top: parseInt(m.y) + m.my
                });
            }
        });
        $(document).mouseup(function(e) {
            if (self.move) {
                obj.css({
                    left: parseInt(m.x) + m.mx,
                    top: parseInt(m.y) + m.my
                });
                m = {
                    mx: 0,
                    my: 0
                };
            }
            self.move = false;
        });
    }

    function avatar(target, config) {
        if (!this instanceof person.avatar) return new person.avatar(target, config);
        var Target = typeof(target) === 'string' ? $(target) : target;
        Target.data('upload') ? '' : Target.data('upload', new upload(target, config));

        var bd = $('body'),
            apd, o = {},
            obj = {},
            I = {
                start: {
                    left: 0,
                    top: 0,
                    eLeft: 0,
                    eTop: 0
                },
                end: {
                    left: 0,
                    top: 0,
                    left: 0,
                    top: 0
                },
                temp: {
                    mx: 0,
                    my: 0
                },
                ismoving: false
            },
            S = {
                isScroll: false
            },
            P = {
                ratio: 0,
                moveS1: 0,
                moveS2: 0
            }

        function upload(target, config) {
            o = $.extend(true, {
                img: '',
                width: 164,
                height: 164
            }, config);
            Target.img = $(o.img);
            init();
        }

        function init() {
            upFile();
        }

        function upFile() {
            Target.on('change', function(e) {
                var upfile = $(this).parents('.js-publish-pics'),
                    file = this.files[0],
                    reader = new FileReader(),
                    data;
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    data = e.target.result;
                    fileRead(data);
                };
            });
        }

        function fileRead(data) {
            obj.apd = $('.Ojs-upload-avatar');
            // if (!obj.apd.length) {
            //  obj.apd = $('<div class="Ojs-upload-avatar"><div class="js-mask"></div><div class="Ojs-up-wrp js-avatar-clip animate-fadeIn"><header><span class="tit">选择裁剪区域</span><i class="icon-closeB"></i></header><div class="up-main"><div class="hidbox"><div class="img-contain"><div class="Ojs-img-wrp"><img src="' + data + '" class="clip-img"></div></div><div class="img-mask"></div><div class="mask mask-t"></div><div class="mask mask-r"></div><div class="mask mask-b"></div><div class="mask mask-l"></div></div></div><div class="bottm"><span class="cancle">取消</span><span class="sure">确定</span></div></div></div>');
            //  bd.append(obj.apd);
            // }
            obj.apd = $('.Ojs-upload-avatar');
            obj.box = $('.Ojs-up-wrp');
            obj.close = $('.icon-closeB');
            obj.cancel = obj.apd.find('.cancle');
            obj.ok = obj.apd.find('.sure');
            obj.mask = $('.js-mask');
            obj.img = $('.clip-img');
            obj.imgContain = $('.img-contain');
            obj.border = obj.apd.find('.img-mask');
            obj.contain = $('#Ojs-clip-contain');
            // obj.imgWrp = $('.Ojs-img-wrp');

            function objInit() {
                obj.box.jsmove({
                    head: 'header'
                });
                cursor(obj);
                // var stI = setInterval(function() {
                // updateImg(obj); //初始化图片参数
                // if (P.ratio) {
                //  clearInterval(stI);
                //  obj.apd.css('display', 'block');
                // }
                initPos(obj); //弹框位置初始化
                // initImgPos(obj); //图片位置初始化
                // imgMove(obj); // move
                // imgScale(obj);
                console.count('repeat time:');
                // }, 100);

                obj.ok[0].onclick = obj.close[0].onclick = obj.cancel[0].onclick = function() {
                    close(obj);
                }
            }
            objInit();
        }

        function initPos(obj) {
            obj.box.w = obj.box[0].offsetWidth || 440;
            obj.box.h = obj.box[0].offsetHeight || 540;
            obj.box.css({
                left: (hkglb.win.w - obj.box.w) / 2,
                top: (hkglb.win.h - obj.box.h) / 2
            });
        }

        function initImgPos(obj) {
            if (P.ratio > 1) {
                obj.img.width = 252;
                obj.img.height = 252 * P.ratio;
                obj.img.top = 54 - (obj.img.height - 252) / 2;
                obj.img.left = 54;
            } else {
                obj.img.height = 252;
                obj.img.width = 252 / P.ratio;
                obj.img.left = 54 - (obj.img.width - 252) / 2;
                obj.img.top = 54;
            };
            obj.img.css({
                top: obj.img.top,
                left: obj.img.left,
                width: obj.img.width,
                height: obj.img.height
            });
        }

        function close(obj) {
            obj.box.removeClass('animate-fadeIn').addClass('animate-fadeOutUp');
            obj.mask.fadeOut();
            setTimeout(function() {
                obj.box.removeClass('animate-fadeOutUp').addClass('animate-fadeIn');
                // obj.apd.remove();
                obj.apd.css('display', 'none');
                obj.mask.fadeIn();
            }, 400);
        }

        function imgMove(obj) {
            obj.border.on('mousedown', function(e) {
                e.preventDefault();
                obj.border.addClass('moving');
                I.ismoving = true;
                I.start = {
                    left: parseFloat(obj.img.css('left')),
                    top: parseFloat(obj.img.css('top')),
                    eLeft: e.clientX,
                    eTop: e.clientY
                }
            });
            $(window).on('mousemove', function(e) {
                if (I.ismoving) {
                    e.preventDefault();
                    I.end.eLeft = e.clientX;
                    I.end.eTop = e.clientY;
                    I.temp.mx = I.end.eLeft - I.start.eLeft;
                    I.temp.my = I.end.eTop - I.start.eTop;
                    obj.img.css({
                        left: I.start.left + I.temp.mx,
                        top: I.start.top + I.temp.my
                    });
                }
            })
            $(window).on('mouseup', function(e) {
                if (I.ismoving) {
                    e.preventDefault();
                    obj.border.removeClass('moving');
                    I.temp = {
                        mx: 0,
                        my: 0
                    };
                    I.end.left = parseFloat(obj.img.css('left'));
                    I.end.top = parseFloat(obj.img.css('top'));
                }
                I.ismoving = false;
                endPosition(obj);
            })

            function endPosition(obj) {
                if (I.end.left > 54) {
                    if (I.end.top > 54) {
                        P.moveS1 = 1; //左 上
                    } else {
                        P.moveS1 = 2; //左
                    }
                } else if (I.end.top > 54) {
                    P.moveS1 = 3; //上
                } else {
                    P.moveS1 = 0;
                }
                if (I.end.left + obj.img.width < 306) {
                    if (I.end.top + obj.img.height < 306) {
                        P.moveS2 = 1;
                    } else {
                        P.moveS2 = 2;
                    }
                } else if (I.end.top + obj.img.height < 306) {
                    P.moveS2 = 3;
                } else {
                    P.moveS2 = 0;
                }
                obj.img.animate({
                    top: (function() {
                        if (P.moveS1 == 1 || P.moveS1 == 3) {
                            return 54
                        } else if (P.moveS2 == 1 || P.moveS2 == 3) {
                            return (306 - obj.img.height)
                        } else {
                            return obj.img.top
                        }
                    })(),
                    left: (function() {
                        if (P.moveS1 == 1 || P.moveS1 == 2) {
                            return 54
                        } else if (P.moveS2 == 1 || P.moveS2 == 2) {
                            return (306 - obj.img.width)
                        } else {
                            return obj.img.left
                        }
                    })()
                }, 200, 'backout')
                updateImg(obj);
            }
        }

        function imgScale(obj) {
            var delta, scale;
            obj.border.on('mousewheel DOMMouseScroll', function(e) {
                delta = -e.originalEvent.detail || -e.originalEvent.deltaY || e.wheelDelta;
                scale = /none/.test(obj.img.css('transform')) ? 1 : /matrix\(([\d.]+)/gi.exec(obj.img.css('transform'))[1];
                e.preventDefault();
                delta > 0 ? big() : small();
                updateImg(obj);

                function big() {
                    var imgW = $(obj.img).width(),
                        imgH = $(obj.img).height();
                    obj.img.animate({
                        width: imgW + 50,
                        height: imgH + 50
                    });
                }

                function small() {
                    if (S.isScroll) return;
                    var temp, imgW = $(obj.img).width(),
                        imgH = $(obj.img).height();
                    if (P.ratio > 1) {
                        imgW = imgW - 50 >= 250 ? (function() {
                            imgH -= 50;
                            return (imgW - 50)
                        })() : (function() {
                            temp = imgW - 250;
                            imgH = imgH - temp * P.ratio;
                            return 250;
                        })();
                    } else {
                        imgH = imgH - 50 >= 250 ? (function() {
                            imgW -= 50;
                            return (imgH - 50)
                        })() : (function() {
                            temp = imgH - 250;
                            imgW = imgW - temp / P.ratio;
                            return 250;
                        })
                    }
                    obj.img.animate({
                        width: imgW,
                        height: imgH
                    }, 200);
                    S.isScroll = true;
                    setTimeout(function() {
                        S.isScroll = false;
                    }, 200);
                }
            });
        }

        function cursor(obj) {
            var moving = false;
            obj.contain.on('mousedown', function(e) {
                e.preventDefault();
                $(this).addClass('moving');
                moving = true;
            });
            $(window).on('mouseup', function(e) {
                e.preventDefault();
                if (moving) {
                    obj.contain.removeClass('moving');
                    moving = false;
                }
            });
        }

        function updateImg(obj) {
            obj.img.left = I.end.left;
            obj.img.top = I.end.top;
            obj.img.width = obj.img[0].offsetWidth;
            obj.img.height = obj.img[0].offsetHeight;
            obj.img.Width = obj.img[0].naturalWidth;
            obj.img.Height = obj.img[0].naturalHeight;
            P.ratio = obj.img.Height / obj.img.Width;
        }
    }
    var st = setInterval(function() {
        if ($('.Ojs-person-avatar').length) {
            avatar('#Ojs-upload-avater', {
                img: '.Ojs-person-avatar'
            });
            clearInterval(st);
        }
    }, 100);
})();