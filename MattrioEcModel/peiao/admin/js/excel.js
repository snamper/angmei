var network = localStorage.getItem("networkmodel");
var network = 'http://192.168.125.131:8080'
var username_id = localStorage.getItem("username_id");
var wb; //读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
var excel = '';
var oearr = [];

function xlsx(obj) {
	oearr = [];
    excel=''
    $('.sr-only').width(0)
    $('.sr-only').text('')
	$(".numwrap").text('0')
	//导入
	if(!obj.files) {
		return;
	}
	const IMPORTFILE_MAXSIZE = 1 * 1024; //控制文件大小
	var f = obj.files[0];
	var suffix = f.name.substring(f.name.lastIndexOf('.') + 1)
	if(suffix != 'xls' && suffix != 'xlsx') {
		alert('导入的文件格式不正确!')
		$('#xlsxinput').val("")
		return false;
	}
	//			        if(f.size/1024 > IMPORTFILE_MAXSIZE){
	//			            alert('导入的表格文件不能大于1M')
	//			            $('#xlsxinput').val("")
	//			            return false;
	//			        }
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		if(rABS) {
			wb = XLSX.read(btoa(fixdata(data)), { //手动转化
				type: 'base64'
			});
		} else {
			wb = XLSX.read(data, {
				type: 'binary'
			});
		}
        var Sheets=wb.Sheets[wb.SheetNames[0]];
		excel = XLSX.utils.sheet_to_json(Sheets)
        if(excel.length ==0){
            swal("表格不能为空!", "", "error");
            return false;
        }
        var exceli = JSON.stringify(excel[0])
		if(Sheets.A1==undefined||Sheets.A1=='undefined'||Sheets.A1.w!='产品编码'){
			if(Sheets.B1==undefined||Sheets.B1=='undefined'||Sheets.B1.w!='产品编码'){
				if(Sheets.C1==undefined||Sheets.C1=='undefined'||Sheets.C1.w!='产品编码'){
					swal("导入格式有误!", "表头请严格按照所给出的格式来", "error");
					return false;
				}
			}
		}
        var index=0;
        var len=excel.length;
        for(var i = 0; i < len; i++) {
            for(var j = i + 1; j < len; j++) {
                if(excel[i]['产品编码'] == excel[j]['产品编码']&&excel[i]['OE号码'] == excel[j]['OE号码']&&excel[i]['分类ID'] == excel[j]['分类ID']) { //通过id属性进行匹配；
                    excel.splice(j, 1); //去除重复的对象；
                    len--;
                    j--;
                }
            }

        }
        $(".progress").show()
        forExcel(excel,index, len)
	};

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
var forExcel=(excel,index,len)=>{
    var product_id=excel[index]['产品编码']
    if(product_id=='undefined'||product_id==undefined){
        product_id=''
    }
    var oe_number=excel[index]['OE号码']
    if(oe_number=='undefined'||oe_number==undefined){
        oe_number=''
    }
    var category_id=excel[index]['分类ID']
    if(category_id=='undefined'||category_id==undefined){
        category_id=''
    }
    if (oe_number!=''&&category_id!=''&&category_id!='') {
        $.ajax({
            type: 'post',
            url: "https://www.51macc.com/api/Mattrio/ProductInterface/getOeCars",
            data: {
                'oenumber': oe_number,
                'userid': 'e8324d9d-b480-4467-8feb-30f22ba0ac71'
            },
            cache: false,
            success(data){
                if(data.list.length==0){
                    oearrpush(product_id,oe_number,category_id,username_id,index,len)
                    return false;
                }
                let arr=[];
                $.each(data.list,(key,value)=> {
                    arr.push({"Manufacture":value.Manufacture_CN,"VehicleName":value.Vehicle_Name_CN,"Engine_Code":"","ChassisNumber":"","Year_of_production":value.Vehicle_of_year,"Name_of_sales":value.Name_of_sales})
                })
                $.ajax({
                    type: 'post',
                    url: network + "/MattrioEcModel/original_oe/QueryProduct3",
                    data: {
                        'car':JSON.stringify(arr)
                    },
                    cache: false,
                    success(data){
                        let arr=[];
                        $.each(data.list,(key,value)=>{
                            arr.push({"mikey":value.mikey,"category_id":category_id,"oenumber":oe_number,"product_id":product_id,"img":"","brand_id":username_id})
                        })
                        $.ajax({
                            type: 'post',
                            url: network + "/MattrioEcModel/original_oe/insertbindingoe",
                            data: {
                                'oemk':JSON.stringify(arr)
                            },
                            cache: false,
                            success(){
                                index++
                                $('.sr-only').width(index/len*100+'%')
                                $('.sr-only').text(index/len*100+'%')
                                if (index >=len){
                                    if (oearr==[]){
                                        $("#loading").hide()
                                        swal("导入成功!", "", "success");
                                    } else{
                                        upload(oearr)
                                    }

                                }else{
                                    forExcel(excel,index,len)
                                }
                            },error(){
                                oearrpush(product_id,oe_number,category_id,username_id,index,len)
                            }
                        })

                    },error(){
                        oearrpush(product_id,oe_number,category_id,username_id,index,len)
                    }
                })
            },error(){
                oearrpush(product_id,oe_number,category_id,username_id,index,len)
            }
        })
    }else{
        oearrpush(product_id,oe_number,category_id,username_id,index,len)
    }
}
var oearrpush=(product_id,oe_number,category_id,username_id,index,len)=>{
    oearr.push({
        'product_id': product_id,
        'oe_number':oe_number,
        'category_id':category_id,
        'brand_id': username_id
    })
    index++
    $('.sr-only').width(index/len*100+'%')
    $('.sr-only').text(index/len*100+'%')
    if (index >=len){
        if (oearr==[]){
            $(".progress").hide()
            swal("导入成功!", "", "success");
        } else{
            upload(oearr)
        }
    }else{
        forExcel(excel,index,len)
    }
}



$('#addBtn').click(function () {
    if ($.trim($('#inpsubmit').val())==''){
        swal("OMG", "请输入您要添加的产品编码", "error");
        return false;
    }
    swal({
        title: "您确定要添加该产品编码？",
        text: "OE输入框中输入OE可在添加产品编码时绑定OE",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "是的，我要添加",
        confirmButtonColor: "#ec6c62"
    }, function() {
        var upmkarr = []
        upmkarr.push({
            'product_id':$.trim($('#inpsubmit').val()) ,
            'oe_number':$.trim($('#OEnumber').val()),
            'category_id':'',
            'brand_id': username_id
        })

        upload(upmkarr)
    });
})
/*一键匹配*/
$('.match').click(function(){
    var data=sessionStorage.getItem('match')
    $('#loading').show()
    $.ajax({
        type:"post",
        url:network+"/MattrioEcModel/original_oe/QueryProduct3",
        data:{
            'car':data
        },
        cache: false,
        crossDomain: true == !(document.all),
        success:function(data){
            if(data.list==[]||data.list.length==0){
                $('#loading').hide()
                swal("暂无车型!", "", "error");
                return false
            }
            var arr = [],      /*如果有相同的值则跳过，不相同则push进数组*/
                len = data.list.length;
            for(i = 0; i < len; i++){
                for(j = i + 1; j < len; j++){
                    if(data.list[i].mikey == data.list[j].mikey){
                        j = ++i;
                    }
                }
                arr.push(data.list[i]);
            }
            var oemk=[];
            $.each(arr, function(key,value) {
                oemk.push({
                    'mikey':value.mikey,
                    'category_id':category_id,
                    'oenumber':oenumber,
                    'product_id':id,
                    'img':'',
                    'brand_id':username_id
                })
            });
            $.ajax({
                type:"post",
                url:network+"/MattrioEcModel/original_oe/insertbindingoe",
                data:{
                    'oemk':	JSON.stringify(oemk)
                },
                success:function(data){
                    $('#loading').hide()
                    swal("匹配成功", "", "success");
                    $('.confirm').click(function(){
                        window.location.href='../upload-matching.html?pages='+pages
                        // window.history.back(-1)
                    })
                },error:function(){
                    swal("请求失败!", "", "error")
                }
            })

        },error:function(){
            swal("匹配失败", "请重新进行匹配", "error")
        }
    });
})
/*导入*/
function upload(upmk) {
	// if(upmk==[]||upmk.length==0){
	// 	swal("导入格式有误!", "表头请严格按照所给出的格式来", "error");
	// 	return false;
	// }
        $.ajax({
            type: 'post',
            url: network + "/MattrioEcModel/original_oe/uploadingmikey",
            data: {
                upmk: JSON.stringify(upmk)
            },
            cache: false,
            async: true,
            crossDomain: true == !(document.all),
            success: function(data) {
                $(".progress").hide()
                swal(data.msg, "", "success");
                $('.confirm').click(function(){
                    window.history.go(0)
                })
            },
            error: function() {
                $(".progress").hide()
                swal("导入失败!", "", "error");
            }
        })
}