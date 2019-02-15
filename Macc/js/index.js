// JavaScript Document
$(".blwrap .none").click(function(){
	$(".blwrap").hide(500)
})
var carousel = {
	timer: null,
	otimer: null,
	cindex: 0,
	opacity: 0,
	init: function() {
		carousel.start();
		carousel.selected();
	},
	start: function() {
		carousel.timer = setInterval(function() {
			fun()
		},4000)
		$(".careers-mid").hover(function(){
			clearInterval(carousel.timer)
		},function(){
//			carousel.timer = setInterval(function() {
//			fun()
//		},4000)
		})
		
	},
	selected: function() {
		$(".dots").find("li").mousemove(function() {
			carousel.cindex = $(this).index();
			$(".dots").find("li").eq(carousel.cindex).addClass("current");
			$(".dots").find("li").eq(carousel.cindex).siblings("li").removeClass("current");
			if(carousel.timer){
				clearInterval(carousel.timer)
			}
			var $current = $('.banner-ul').find("li").eq(carousel.cindex);
			$current.siblings('li').hide();
			$current.show();
			carousel.shade($current);
		})

	},
	shade: function($current) {

	}
}
function fun(){
	if (carousel.cindex < 2) {
				carousel.cindex++;
			} else {
				carousel.cindex = 0;
			}
			$(".dots").find("li").eq(carousel.cindex).addClass("current");
			$(".dots").find("li").eq(carousel.cindex).siblings("li").removeClass("current");
			var $current = $('.banner-ul').find("li").eq(carousel.cindex);
			$current.siblings('li').hide();

			$current.show();
			carousel.shade($current);
}

var tab_Change = function(obj) {
	this.current = 0;
	this.ctimer = null;
	this.obj = obj;
	this.init.call(this, $(obj));
}
tab_Change.prototype = {

	init: function($obj) {
		var _t = this;
		$obj.find('.change_tab').find('a').click(function() {
			var index = $(this).parent().index();
			var $object = null;

			$(this).parent().addClass('on');
			$(this).parent().siblings('li').removeClass('on');
			_t.changemenu(index, $obj);
		});
	},
	changemenu: function(index, $obj) {
		if (this.current == index) {
			return;
		} else {
			if (this.ctimer) {
				clearInterval(tab_change.otimer)
			}
			var wap = $obj.find('.wrap_tabl').offset().left;
			var menu = $obj.find('.tabl_menu').offset().left;
			difference = menu - wap;
			var move = index * 1200;
			var times = Math.abs(move);
			this.current = index;

			$obj.find('.tabl_menu').animate({
				left: -move
			}, 100, function() {
				if ($obj.hasClass('product_solution_mid')) {
					if (index == 1) {
						carousel2.init();
					} else {
						carousel2.cancel();
					}
					if (index == 2) {
						circle = new Circle($('#special-apply'));
					} else {
						if (circle) {
							circle.cancelCircle();
						}
					}

				} else if ($obj.hasClass('aboutus_mid')) {
					if (index != 0) {
						carousel3.cancel();
					}
				}

			});

		}
	}
}
var carousel3 = {
	timer: null,
	otimer: null,
	cindex: 0,
	opacity: 0,
	init: function() {
		// carousel3.start();
		carousel3.selected();
	},
	start: function() {
		carousel3.timer = setInterval(function() {
			if (carousel3.cindex < 1) {
				carousel3.cindex++;
			} else {
				carousel3.cindex = 0;
			}
			$('.aboutus_mid').find(".cases_dots").find("li").eq(carousel3.cindex).addClass("current");
			$('.aboutus_mid').find(".cases_dots").find("li").eq(carousel3.cindex).siblings("li").removeClass("current");
			var $current = $('.teamselect').eq(carousel3.cindex);
			$current.siblings('ul').not('.cases_dots').hide();

			$current.show();
			carousel3.shade($current);
		}, 5000)
	},
	selected: function() {
		$(".cases_dots").find("li").click(function() {
			carousel3.cindex = $(this).index();
			$('.aboutus_mid').find(".cases_dots").find("li").eq(carousel3.cindex).addClass("current");
			$('.aboutus_mid').find(".cases_dots").find("li").eq(carousel3.cindex).siblings("li").removeClass("current");
			if (carousel3.timer) {
				clearInterval(carousel3.timer)
			}
			if (carousel3.otimer) {
				clearInterval(carousel3.otimer)
			}


			var $current = $('.teamselect').eq(carousel3.cindex);
			$current.siblings('ul').not('.cases_dots').hide();

			$current.show();
			carousel3.shade($current);
			//carousel3.start();
		})

	},
	shade: function($current) {
		carousel3.opacity = 0;
		carousel3.otimer = setInterval(function() {
			carousel3.opacity = carousel3.opacity + 0.1;
			if (carousel3.opacity < 1) {
				carousel3.opacity + 0.1;

			} else {
				clearInterval(carousel3.otimer)
			}
		}, 100)


	},
	cancel: function() {

		carousel3.cindex = 0;
		$('.aboutus_mid').find(".cases_dots").find("li").eq(carousel3.cindex).addClass("current");
		$('.aboutus_mid').find(".cases_dots").find("li").eq(carousel3.cindex).siblings("li").removeClass("current");
		var $current = $('.teamselect').eq(carousel3.cindex);
		$current.siblings('ul').not('.cases_dots').hide();


		$current.show();
		carousel3.shade($current);

	}
}
var Circle = function(obj, a) {
	this.obj = obj;
	this.timer = null;
	this.index = 0;
	this.a = (a == null ? 'a' : (typeof a == 'undefined' ? 'a' : a));
	this.init.call(this, obj, this.a);
}
Circle.prototype.init = function(obj, a) {
	this.start(obj, a);
	var _t = this;
	$(obj).find(a).click(function() {
		_t.selected(this);
		_t.index = $(this).index();
	});
}
Circle.prototype.start = function(obj, a) {
	var _t = this;
	if (this.timer) {
		clearInterval(this.timer);
	}
	this.timer = setInterval(function() {
		if (_t.index < 2) {
			_t.index++;
		} else {
			_t.index = 0;
		}
		_t.selected($(obj).find(a).eq(_t.index), 1);
	}, 6000);
}
Circle.prototype.selected = function(obj, a) {
	if (!a) {
		clearInterval(this.timer);
	}
	var index = $(obj).index();
	var class_name = 'cicle_bg_' + (index + 1);
	$(obj).removeClass();
	$(obj).addClass('tab_icon_' + (index + 1) + '_on');
	$(obj).siblings("a").each(function(i, n) {
		$(n).removeClass().addClass('tab_icon_' + ($(n).index() + 1));
	});
	$('.circle_left').removeClass().addClass('circle_left').addClass(class_name);
	$('.apply_case_detail').eq(index).show();
	$('.apply_case_detail').eq(index).siblings("div").hide();
}
Circle.prototype.cancelCircle = function() {
	var index = 0;
	this.index = 0;
	var obj = $(this.obj).find('a').eq(0);
	var class_name = 'cicle_bg_' + (index + 1);
	$(obj).removeClass();
	$(obj).addClass('tab_icon_1_on');
	$(obj).siblings("a").each(function(i, n) {
		$(n).removeClass().addClass('tab_icon_' + ($(n).index() + 1));
	});
	$('.circle_left').removeClass().addClass('circle_left').addClass(class_name);
	$('.apply_case_detail').eq(index).show();
	$('.apply_case_detail').eq(index).siblings("div").hide();
	if (this.timer) {
		clearInterval(this.timer);
	}
}

function showDetail(obj, event) {
	$('.ui-popup').fadeIn();
	$('.ui-popup-wrapper').fadeIn();
	$('.ui-popup-mask').fadeIn();
	$('.get_more_aboutteam').hide();
	if ($(obj).hasClass('pro_detail')) {
		$('.company_news').hide();
		$('.media_report_all').hide();
		$('.get_more').show();
	}


	if ($(obj).hasClass('check_more')) {
		$('#' + obj.id + "Div").show();
	}
	if ($(obj).hasClass('check_morex')) {
		$('#' + obj.id + "Div").show();
	}
	stop(event);
}

function stop(event) {
	if (($.browser.msie && $.browser.version <= 8)) {
		window.event.cancelBubble = true;
	} else if (navigator.appName == "Netscape") {
		if (window.event) {
			window.event.cancelBubble = true;
		} else {
			event.stopPropagation();
		}
	} else {
		event.stopPropagation();
	}


};

function quanp() {
	var single_hh = $(window).height();
	var single_ww = $(window).width();
	$('.num').height(single_hh);
	$('.num>li').width(single_ww);
}
quanp();
$(window).resize(function () {
	if (typeof indexSlides != 'undefined' && indexSlides.reformat)
		indexSlides.reformat();
	quanp();
});


var i=1;
$(".change_tab ul li").click(function(){
	i=$(this).index()
	$(this).addClass("on").siblings("li").removeClass("on")
	$(".tabl_menu .menu_option").eq(i).fadeIn().siblings(".menu_option").fadeOut()
})
var a=setInterval(function() {
		fnb()
},2000)
$(".wrap").hover(function(){
			clearInterval(a)
		},function(){
			a = setInterval(function() {
			fnb()
		},2000)
		})
function fnb(){
		i==5?i=0:i
		$(".change_tab ul li").eq(i).addClass("on").siblings("li").removeClass("on")
		$(".tabl_menu .menu_option").eq(i).fadeIn().siblings(".menu_option").fadeOut()
		i++
} 
//加入我们
$(".jobwrap .job").click(function(){
	$(this).find("span").addClass("bortop").parent(".job").siblings(".job").find("span").removeClass("bortop")
	$(".jobwrap-content").find(".content").eq($(this).index()).siblings().hide()
	$(".jobwrap-content").find(".content").eq($(this).index()).fadeIn()
	
})
//反馈
$(".contact").click(function(e){
	e.stopPropagation()
	$(".suggest").show()
})
$(".suggestcont").click(function(e){
	e.stopPropagation()
})
$(document).click(function(e){
	e.stopPropagation()
	$(".suggest").hide()	
})
$(".contact").click(function(){
    $('.suggest').fadeIn();
})
$(".onbtn").click(function(){
    $('.suggest').fadeOut();
})
$(".offbtn").click(function(){
    if($(".suggest textarea").val() == ""){
        alert("填写您的意见建议");
        return false;
    }
    $.ajax({
        type:"post",
        url:"http://www.51macc.com:8080/Mattrio/OeProductErrorCorrectionInterface/addFeedbackSuggestion",
        data:{
            "type":"功能建议",
            "msg":$(".suggest textarea").val(),
            "user_name":$(".user_name").val(),
            "user_phone":$(".user_phone").val()
        },
        dataType:"json",
        cache: false,
        crossDomain: true == !(document.all),
        success:function(data){
            alert("提交建议成功");
            $('.suggest').fadeOut();
        }
    })
})

$(document).ready(function() {
		    var b_name = navigator.appName; 
		    var b_version = navigator.appVersion; 
		    var version = b_version.split(";"); 
		    var trim_version = String(version[1]).replace(/\s/g, ""); 
		    if (b_name == "Microsoft Internet Explorer") {
		        /*如果是IE6或者IE7*/ 
		        if (trim_version == "MSIE 7.0" || trim_version == "MSIE 6.0") { 
		        	alert("您使用的浏览器版本过低，可能有安全风险，建议您更换浏览器或升级浏览器");
		        	window.open('','_self');window.close();
		        }
		    }
		}); 
	var circle;
		$(function(){
		    $('#dowebok').fullpage({
		    	scrollingSpeed:600,
		    	anchors: ['page1','page2', 'page3', 'page4', 'page5'],
				menu: '#menu',
				paddingTop:"62px"
		    });
		    		    		    
		    carousel.init();
	        var tab_change2=new tab_Change($('.aboutus_mid'));

	     	carousel3.init();
	     $(".ui-popup-wrapper").on("mouseout",function(){
	     	$('.ui-popup').fadeOut();
	        $('.ui-popup-wrapper').fadeOut();
	        $('.ui-popup-mask').fadeOut();
	     })
	     
	      			    
		});


$(document).bind("contextmenu",function(){return false;});
$(document).bind("selectstart",function(){return false;});
$(document).bind("dragstart",function(){return false;});
