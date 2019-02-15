localStorage.setItem("networkmodel","http://ec.51macc.com");
localStorage.setItem("username_id","sp");  
var network = localStorage.getItem("networkmodel");  
var username_id = localStorage.getItem("username_id");  

var winWidth,winHeight;
var sldSwitch = 0;
var solutSwitch = 0;

function tabSliderclock(obj,objs,objsn){
	$(function(){
		hookThumb();
	})
	var i=-1;	
	function slide(i){
		$(obj).eq(i).addClass(objs).siblings().removeClass(objs);
		$(objsn).eq(i).css('display','block').siblings(objsn).css('display','none');
	}
	function hookThumb(){
		$(obj).click(
		function(){
				i = $(this).prevAll().length;
				slide(i); 
		}); 
	}
}

function selmack(){	
	$(".ructcxsel").click(function(){
		if(!$(this).hasClass("ructcxselno")){
			var i = $(this).index(".ructcxsel");
			$(".runpseltex").show();
			$(".runtmksl").eq(i).show().siblings().hide();
		}
		else{
			return false;
		}
	})
	$(".rungelmab").click(function(){
			$(".runpseltex").hide();
		})
	$(".runtasclor").click(function(){
			$(".runpseltex").hide();
		})
	$(".runtmksltck li").click(function(){
		$(".runpseltex").hide();
		var i = $(this).parents(".runtmksl").index(".runtmksl");
		var t = $(this).text();
		$(".ructcxsel").eq(i).removeClass("ructcxselgru");
		$(".ructcxsel").eq(i+1).removeClass("ructcxselno");
		$(".ructcxsel").eq(i).find("span").text(t);
		$(".ructcxsel").eq(i).find("input").val(t);
	})
}

function runtmksltckl(){
	$(".runtmksltck li").click(function(){
		$(".runpseltex").hide();
		var i = $(this).parents(".runtmksl").index(".runtmksl");
		var t = $(this).text();
		$(".ructcxsel").eq(i).removeClass("ructcxselgru");
		$(".ructcxsel").eq(i+1).removeClass("ructcxselno");
		$(".ructcxsel").eq(i).find("span").text(t);
		$(".ructcxsel").eq(i).find("input").val(t);
		
		fontas(i);
		
	})
}


/*  文档加载完成  */
$(document).ready(function(){	
	tabSliderclock(".prolisel li","prolclok",".runpro");
	selmack();
})


/*  整体页面加载完成  */
$(window).load(function() {
});

/*  页面高度改变后  */
$(window).resize(function() {
});


// $.ajax({
// 	type:"post",
//     url:network+"/MattrioEcModel/BannerIntface/getBanner",
//     data:{
//     	"brand_key":username_id
//     },
//     dataType:"json",
//     success:function(data){
//     	// console.log(data);
//     	$.each(data.list,function(key,value){
//     		var $img = $("<img src='"+network+"/MattrioEcModel/upload/banner/soyo/"+value.image+"' width='100%' height='140px'>");
//     		if(value.type == 1){
//     			var $a = $("<a href='"+value.url+"'>");
//     		}else{
//     			var $a = $("<a href='#'>");
//     		}
//     		$img.appendTo($a);
//     		$a.appendTo(".header");
//     	})
    	
//     	$('.header a').eq(0).attr('class','headerimg');

//     	var m = 1;
// 		var timer = setInterval(run,5000);
// 		function run(){
// 			if(m >= $('.header').children("a").length){
// 				m=0;
// 			}
// 			$('.header a').eq(m).attr('class','headerimg').siblings('a').attr('class','');
// 			m++;
// 		}
//     },
//     error:function(data){
//     	// console.log(data)
//     }
// })


