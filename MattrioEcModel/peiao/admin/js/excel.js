var network = localStorage.getItem("networkmodel");
var network = 'http://192.168.125.131:8080'
var username_id = localStorage.getItem("username_id");
username_id = 'luosheng'
var wb; //读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
var excel = '';
var oearr = [];

function xlsx(obj) {
	oearr = [];
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
		excel = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
		var exceli = JSON.stringify(excel[0])
		if(wb.Sheets[wb.SheetNames[0]].A1==undefined||wb.Sheets[wb.SheetNames[0]].A1=='undefined'||wb.Sheets[wb.SheetNames[0]].A1.w!='产品编号(必须有)'){
			if(wb.Sheets[wb.SheetNames[0]].B1==undefined||wb.Sheets[wb.SheetNames[0]].B1=='undefined'||wb.Sheets[wb.SheetNames[0]].B1.w!='产品编号(必须有)'){
				if(wb.Sheets[wb.SheetNames[0]].C1==undefined||wb.Sheets[wb.SheetNames[0]].C1=='undefined'||wb.Sheets[wb.SheetNames[0]].C1.w!='产品编号(必须有)'){
					swal("导入格式有误!", "表头请严格按照所给出的格式来", "error");
					return false;
				}
			}
		}
		$.each(excel, function(key, value) {
			var product_id=value['产品编号(必须有)']
			if(product_id=='undefined'||product_id==undefined){
				product_id=''
			}
			var oe_number=value['OE号码(可以没有)']
			if(oe_number=='undefined'||oe_number==undefined){
				oe_number=''
			}
			var category_id=value['分类ID(可以没有)']
			if(category_id=='undefined'||category_id==undefined){
				category_id=''
			}
			oearr.push({
				'product_id': product_id,
				'oe_number':oe_number,
				'category_id':category_id,
				'brand_id': username_id
			})
		})
		upload(oearr)
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
/*导入*/
function upload(upmk) {
	if(upmk==[]||upmk.length==0){
		swal("导入格式有误!", "表头请严格按照所给出的格式来", "error");
		return false;
	}
	$("#loading").show()
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
			$("#loading").hide()
			swal(data.msg, "", "success");
			$('.confirm').click(function(){
				window.history.go(0)
			})
		},
		error: function() {
			$("#loading").hide()
			swal("导入失败!", "", "error");
		}
	})
}