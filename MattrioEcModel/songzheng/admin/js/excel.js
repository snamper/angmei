var network = localStorage.getItem("networkmodel");
var network = 'http://192.168.125.131:8080'
var username_id = localStorage.getItem("username_id");
username_id = 'luosheng'
var wb; //读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
var excel = '';
var oearr = [];

function xlsx(obj) {
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
        //						console.log(excel)
//		$.each(excel,function(key,value){
//			console.log(value.产品编码)
//			console.log(value.一级分组)
//			console.log(value.二级分组)
//			var id=value.产品编码
//			if(value.一级分组){
//				var one=value.一级分组	
//			}else{
//				var one=''
//			}
//			if(value.二级分组){
//				var two=value.二级分组	
//			}else{
//				var two=''
//			}
//			oearr.push({
//				'id':id,
//				'一级':one,
//				'二级':two
//			})
//		})
        var exceli = JSON.stringify(excel[0])
//		var keyname = exceli.substring(exceli.indexOf('{"') + 2, exceli.indexOf('":"'))
        var keyname=wb.Sheets[wb.SheetNames[0]].A1.w
        oearr.push(keyname)
        $.each(excel, function(key, value) {
            oearr.push(value[keyname])
        })
        // console.log(oearr)
        upload()
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
$("#addBtn").click(function () {
    if ($('#inpsubmit').val()==''){
        swal("OMG", "请输入您要添加的产品编码", "error");
        return false;
    }
    var upmkarr=[];
    upmkarr.push({
        'product_id':$('#inpsubmit').val().replace(/\s+/g,""),
        'brand_id':username_id
    })
    addAjax(upmkarr);
})
/*导入*/
function upload() {
    var upmkarr = []
    $.each(oearr, function(key, value) {
        upmkarr.push({
            'product_id': value,
            'brand_id': username_id
        })
    })
    addAjax(upmkarr)
}
function addAjax(arr){

    $.ajax({
        type: 'post',
        url: network + "/MattrioEcModel/original_oe/uploadingmikey",
        data: {
            upmk: JSON.stringify(arr)
        },
        cache: false,
        async: true,
        crossDomain: true == !(document.all),
        success: function(data) {
            swal("导入成功!", data.msg, "success");
            $('.confirm').click(function(){
                window.location.reload(true)
            })
        },
        error: function() {
            swal("OMG", "导入失败!", "error");
        }
    })
}
