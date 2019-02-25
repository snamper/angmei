localStorage.setItem("network",'https://www.51macc.com/api');
// var network = 'http://192.168.125.117:8080';
var network = localStorage.getItem("network");
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}
switch(decodeURI(getUrlParam('author'))){
    case '张总':
        var userid = 'c3b3102f-2162-4f49-8417-7a589242d3a1'
        break;
    case '刘尚锦':
        var userid = 'a9b962d4-bed5-4b95-b61e-de8c31e91c81'
        break;
    case '小吕':
        var userid = '042a7e7b-851d-4f18-b2f6-3a5425dd0e83'
        break;
    case '蔡超群':
        var userid = '5bd18151-6bfb-47ef-86fd-b6dca709406a'
        break;
    case '孙剑':
        var userid = '8e73e54d-b971-4caf-9e5c-85793178efc5'
        break;
    case '小邵':
        var userid = '03464499-96ff-47e4-a76b-818143afbec8'
        break;
    case '魏鹏程':
        var userid = '3b17c1bf-b475-43c3-ba29-bc038dc6c6bb'
        break;
    case '韩斌':
        var userid = 'df822bfb-812f-461e-a42d-c0e8ada3c53a'
        break;
    case '小廖':
        var userid = '3be25489-9886-4e36-bd75-f49ce3adb61f'
        break;
    default:
        alert('暂无工作人员名称')
}
localStorage.setItem('demo3UserId',userid)
var listIndex=0,vinIndex=0,len=0;
var textarr,vinarr;
var stop=false;
var numarr=[];
var currentAjax;
 //读取表格
function xlsx(obj){
    $('.progress-value').text('0%');
    $('.progress-bar').css('width','0%');
    stop=false;
    $('.stopImg').show();
    $('.stopAction').hide();
    listIndex=0;
    numarr=[];
    $('textarea').val('')
    var allow;;
    var wb;//读取完成的数据
    var rABS = false; //是否将文件读取为二进制字符串
    var excel='';
    var j=0;
    //导入
    if(!obj.files) {
        return;
    }
    const IMPORTFILE_MAXSIZE = 1*1024; //控制文件大小
    var f = obj.files[0];
    //判断上传的文件是否是excel
    var suffix=f.name.substring(f.name.lastIndexOf('.')+1)
    if(suffix != 'xls' && suffix !='xlsx'){
        alert('导入的文件格式不正确!')
        $('#xlsxinput').val("")
        return false;
    }
    // 控制解析的表格的大小
    if(f.size/1024 > IMPORTFILE_MAXSIZE){
        alert('导入的表格文件不能大于1M')
        $('#xlsxinput').val("")
        return false;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        if(rABS) {
            wb = XLSX.read(btoa(fixdata(data)),{//手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data,{
                type: 'binary'
            });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据

        //                  document.getElementById("demo").innerHTML=JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
        //表格内容
        excel=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        // console.log(excel)
        // console.log(wb.Sheets[wb.SheetNames[0]].A1.w)
        // console.log(wb.Sheets[wb.SheetNames[0]].B1.w)
        var exceli=JSON.stringify(excel[0])
        var keyname=wb.Sheets[wb.SheetNames[0]].A1.w

        /*获取全部的编码转换为数组并去重*/
        $.each(excel,function(key,value){
            if(numarr.indexOf(value[keyname])<0&&value[keyname].replace(/\s+/g,"")!=''){
                numarr.push(value[keyname])
            }
        })
        $.each(numarr,function(key,value){
            $("textarea").val(function(n,c){
                return c + value+',';
            })
        })
        textarr=numarr
    };
    $("#xlsxinput").val('')
    if(rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
    function fixdata(data) { //文件流转BinaryString
        var o = "",
            l = 0,
            w = 10240;
        for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    }
}

$('.textarea1').on('change',function(){
    $('.progress-value').text('0%');
    $('.progress-bar').css('width','0%');
    stop=false;
    $('.stopImg').show();
    $('.stopAction').hide();
    vinarr=$('.textarea1').val().replace(/\n|\s+|，/g,',').split(',');
    $('.textarea1').val('');
    vinarr = vinarr.filter((x, index,self)=>(self.indexOf(x) === index) && (x!=''))
    $.each(vinarr,function(key,value){
        $(".textarea1").val(function(n,c){
            return c + value+',';
        })
    })
})
$('.textarea2').on('change',function(){
	$('.progress-value').text('0%');
    $('.progress-bar').css('width','0%');
    stop=false;
	$('.stopImg').show();
	$('.stopAction').hide();
	textarr=$('.textarea2').val().replace(/\n|\s+|，/g,',').split(',');
    $('.textarea2').val('');
    textarr = textarr.filter((x, index,self)=>(self.indexOf(x) === index) && (x!=''))
    $.each(textarr,function(key,value){
        $(".textarea2").val(function(n,c){
            return c + value+',';
        })
    })
})
$(".fileBtn").click(function(){
    $('.file').click()
})
/*批量查询*/
$('.btn2').click(function(){
    if($('.input-vin').val()==''){
        alert('请输入VIN码');
        return false;
    }else if($('.btn2').attr('disabled')){
        alert('请稍等......')
        return false;
    }
    else if($('textarea').val()==''){
        alert('请导入excel');
        return false;
    }else if(stop){
        alert('已暂停');
        return false;
    }
    listIndex=0, vinIndex=0,len = 0;
    $('tbody').html('');
    $('#export tbody').html('');
    $('.progress-value').text('0%');
    $('.progress-bar').css('width','0%');
    vinarr=$('.textarea1').val().split(',');
    textarr=$('.textarea2').val().split(',');
    vinarr.pop()
    textarr.pop()
    $('.btn2').attr('disabled',true).addClass('disable')
    $("#loading").show()
    ajaxid()
    function ajaxid(){
       var xhr = $.ajax({
            type:"post",
            url:network+"/Mattrio/ProductInterface/getCategoryList",
            // async:false,
            cache:false,
            timeout:100000,
            data:{
                'category_list':textarr.join(",")
            },
            success:function(data){
                $("#loading").hide()
                $('.btn2').attr('disabled',false).removeClass('disable')
                if(data.list==''||data.list.length==[]){
                    alert('名称有误或不标准')
                    return false;
                }
                textarr=data.list;
                nameFun(textarr,vinarr);
            },error:function(XMLHttpRequest, textStatus){
               $("#loading").hide()
               $('.btn2').attr('disabled',false).removeClass('disable')
               if (textStatus == 'timeout') {
                   xhr.abort();
                   alert('获取别名ID超时,请重新获取')
                   return false;
               }
               alert('获取别名ID失败,请重新获取')
            }
        });
    }
})
$('.stop').click(function(){
    if($('.progress-value').text()=='0%'&&!stop){
        alert('请先开始获取数据');
        return false;
    }else if($('.progress-value').text()=='100%'){
        alert('已经获取完');
        return false;
    }
    if(stop){
        stop=false;
        $('.stopImg').show();
        $('.stopAction').hide();
        nameFun(textarr,vinarr);
    }else{
        stop=true;
        $('.stopImg').hide();
        $('.stopAction').show();
    }
})
function add(vin,tr,tdImg,td2val,td5val,td12val,td6val,td7val,nameInput,id,cartype){
    var tdvin= $('<td class="vin">').html(vin).appendTo(tr);
    var tdcar= $('<td class="car">').html(cartype).appendTo(tr);
    var td2 = $('<td>').html('<div class="nameinpwrap"><span class="nameInput">'+nameInput+'</span><img class="tdImg" src="'+tdImg+'" /><div class="listwrap"></div></div>').appendTo(tr)
    var td14= $('<td class="id">').html(id).appendTo(tr);
    var td3 = $('<td class="td2">').html(td2val).appendTo(tr);
    var td5 = $('<td class="td4">').html(td5val).appendTo(tr);
    var td12 = $('<td class="td5">').html(td12val).appendTo(tr);
    var td6 = $('<td class="oe">').html(td6val).appendTo(tr);
    var td7 = $('<td class="money">').html(td7val).appendTo(tr);
}
function nameFun(value,vinlist){
	if(stop){
		alert('已暂停');
		return false;
	}
    $.ajax({
		type:"post",
		url:network+"/Mattrio/VinPartTestInterface/VinOeName",
        cache:false,
        timeout:10000,
		data:{
			'category_name':value[listIndex].category_name,
			'vin': vinlist[vinIndex],
			'category_id':value[listIndex].category_id,
			'oe_number':'',
			'userid': userid
		},
		success:function(data){
            if(data.recode==-3){
                stop=true;
                $('.stopImg').hide();
                $('.stopAction').show();
                alert('次数已用完')
            }
            if (data.car_info.length==0){
                var car='';

            }else{
                if(data.car_info[0].Capacity){
                    var car=data.car_info[0].Manufacture_CN+' '+data.car_info[0].Vehicle_Name_CN+' '+data.car_info[0].Year_of_production+' '+data.car_info[0].Capacity
                }else{
                    var car=data.car_info[0].Manufacture_CN+' '+data.car_info[0].Vehicle_Name_CN+' '+data.car_info[0].Year_of_production
                }
            }
			if(data.oelist==[]||data.oelist.length==0){
                var tr=$('<tr>').appendTo('.table tbody');
                add(vinlist[vinIndex],tr,'img/jingshi.png','空','空','空','空','空',value[listIndex].category_name,value[listIndex].category_id,car)
				listIndex++;
                len++;
                $('.progress-value').text(((len/(value.length*vinarr.length))*100).toFixed(2)+'%');
                $('.progress-bar').css('width',((len/(value.length*vinarr.length))*100).toFixed(2)+'%');
                if(listIndex<value.length){
                    nameFun(value,vinarr)
                }else if (listIndex==value.length){
                    vinIndex++
                    if (vinIndex==vinarr.length){
                        $('.progress-bar').removeClass('active')
                    }else{
                        listIndex=0;
                        nameFun(value,vinarr)
                    }
                }
				return false;
			}
			$.each(data.oelist, function(ke,val) {
				var tr=$('<tr>').appendTo('.table tbody');
                add(vinlist[vinIndex],tr,'img/duihao.png',val.mattrio_category_name,val.oe_name,val.remark,'<a href="https://www.51macc.com/content/maintain/oecont/oecont.html?demo3=true&oenumber='+val.oe_number+'" target="_blank" title="点击跳转查看该OE更多信息">'+val.oe_number+'</a>','￥'+val.price,value[listIndex].category_name,value[listIndex].category_id,car)

                function imgError(that){
                    that.parents('.imgbox').hide();
                    that.parents('.imgbox').siblings('.p').show();
                }
                if(ke+1==data.oelist.length){
                    listIndex++;
                    len++;
                    $('.progress-value').text(((len/(value.length*vinarr.length))*100).toFixed(2)+'%');
                    $('.progress-bar').css('width',((len/(value.length*vinarr.length))*100).toFixed(2)+'%');
                    if(listIndex<value.length){
                        nameFun(value,vinarr)
                    }else if (listIndex==value.length){
                        vinIndex++
                        if (vinIndex==vinarr.length){
                            $('.progress-bar').removeClass('active')
                        }else{
                            listIndex=0;
                            nameFun(value,vinarr)
                        }
                    }
                }
			});
		},error:function(XMLHttpRequest, textStatus){
            if (textStatus == 'timeout') {
                addTr('请求超时',value,vinlist[vinIndex])
                return false;
            }
            addTr('请求失败',value,vinlist[vinIndex])
		}
	});
}
function addTr(text,value,vin){
    var tr=$('<tr>').appendTo('.table tbody');
    add(vin,tr)
    tr.find('.tdImg').attr('src','img/jingshi.png')
    tr.find('.id').text(value[listIndex].category_id);
    tr.find('.car').text(text);
    tr.find('.td2').text(text);
    tr.find('.td4').text(text);
    tr.find('.td5').text(text);
    tr.find('.oe').text(text);
    tr.find('.money').text(text);
    tr.find('.nameInput').text(value[listIndex].category_name+'-'+value[listIndex].category_id)
    listIndex++;
    len++;
    $('.progress-value').text(((len/(value.length*vinarr.length))*100).toFixed(2)+'%');
    $('.progress-bar').css('width',((len/(value.length*vinarr.length))*100).toFixed(2)+'%');
    if(listIndex<value.length){
        nameFun(value,vinarr)
    }else if (listIndex==value.length){
        vinIndex++
        if (vinIndex==vinarr.length){
            $('.progress-bar').removeClass('active')
        }else{
            listIndex=0;
            nameFun(value,vinarr)
        }
    }
}
/*end*/

$('.export').click(function(){
    new ExcelGen({
        "src_id": "table",
        "show_header": true
    }).generate("VIN.xlsx");
})
$('.backTop').click(function () {
    $('html ,body').animate({scrollTop: 0}, 500);
})

//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) {
		e.stopPropagation(); 
	}else {
		e.cancelBubble = true; 
	}
} 