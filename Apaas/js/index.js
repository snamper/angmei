/*地图*/
var map = new BMap.Map("map");
var point = new BMap.Point(121.430096,31.094);
map.centerAndZoom(point,16);
map.enableScrollWheelZoom(true);
//		map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
var point2 = new BMap.Point(121.430096,31.089157);
var marker = new BMap.Marker(point2);        // 创建标注    
map.addOverlay(marker); 
// var opts = {
//    position : point,    // 指定文本标注所在的地理位置
//    offset   : new BMap.Size(0, 0)    //设置文本偏移量
//  }
//  var label = new BMap.Label("姓名:张三 电话:13814823567", opts);  // 创建文本标注对象
//      label.setStyle({
//           color : "red",
//           fontSize : "12px",
//           height : "20px",
//           lineHeight : "20px",
//           fontFamily:"微软雅黑"
//       });
//  map.addOverlay(label); 
var opts = {
	  width : 200,     // 信息窗口宽度
	  height: 100,     // 信息窗口高度
	  title : "昂裕电子商务" , // 信息窗口标题
	  enableMessage:true,//设置允许信息窗发送短息
	  message:"上海市闵行区沪光东路89号福克斯大厦2号楼103B"
}
	var infoWindow = new BMap.InfoWindow("地址：上海市闵行区沪光东路89号福克斯大厦2号楼103B", opts);  // 创建信息窗口对象 
	marker.addEventListener("click", function(){          
		map.openInfoWindow(infoWindow,point2); //开启信息窗口
	});

$('.navbar-nav li a').bind('click', function(event) {
	var nav = $($(this).attr('href'));
	if (nav.length) {
		$('html, body').stop().animate({				
				scrollTop: $(nav).offset().top-94			
		}, 1000);		
		event.preventDefault();
	}
});

/*业务逻辑
* */
$('.vin').click(function(){
    window.open('https://www.51macc.com')
})
$('.btnDetails').click(function(){
    $(this).hide()
    $('.hidep').slideDown(200)
})
$('.section2List').hover(function(){
    $(this).find('.border').hide()
    $(this).find('.line').fadeIn(200)
},function(){
    $(this).find('.line').hide()
    $(this).find('.border').fadeIn(200)
})
/*独特优势*/
$('.flexLeft button').hover(function(){
    $('.flexLeft button').removeClass('fbtn')
    $(this).addClass('fbtn')
    $('.flexRight').find('img').attr('src','img/advantage'+$(this).index()+'.png')
})
/*工作*/
$('.jobtitle button').hover(function(){
    $('.jobtitle button').removeClass('jobBtn')
    $(this).addClass('jobBtn')
    $(".jobtext").find('ul').hide()
    $(".jobtext").find('ul').eq($(this).index()).show()
})
// $(window).scroll(function() {
// 	var topOfWindow = $(window).scrollTop();
// 	var wHeight=$(window).height()
// 	var imagePos2 = $('#section2').offset().top;
// 	var dHeight2=$('#section2').outerHeight()
// 	if (topOfWindow+wHeight>imagePos2&&topOfWindow<imagePos2+dHeight2) {
// 		$('#section2').find('.section2List:eq(0),.section2List:eq(2)').addClass("animated fadeInDown");
// 		$('#section2').find('.section2List:eq(1),.section2List:eq(3)').addClass("animated fadeInUp");
// 	}
//     var imagePos3=$('.section3Content').offset().top;
//     var dHeight3=$('.section3Content').outerHeight()
//     if (topOfWindow+wHeight>imagePos3&&topOfWindow<imagePos3+dHeight3) {
// 		$('.Taiwan, .shengpai').addClass("animated jackInTheBox");
// 		$('.TaiwanRight, .shengpaiRight').addClass("animated bounceInRight");
// 	}
// 	if(topOfWindow>='2400'){
// 		$(".Top").show(500)
// 	}else{
// 		$(".Top").hide(500)
// 	}
// });
$("img").on('dragstart',function(){
	return false;
})
var arr=[
    {

    }
]