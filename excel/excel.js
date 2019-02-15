 //读取表格
 var excel;
 var i=0;
 var Dir=[];
 var urlList=[];
 var index=0;
 		function xlsx(obj){
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
			        // if(f.size/1024 > IMPORTFILE_MAXSIZE){
			        //     alert('导入的表格文件不能大于1M')
			        //     $('#xlsxinput').val("")
			        //     return false;
			        // }
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
                        // for (var j=0;j<excel.length;j++){
                        //     if(Dir.indexOf(excel[j].URL.substr('-27',3))<0){
                        //         Dir.push(excel[j].URL.substr('-27',3))
                        //         for (var i=j;i<excel.length;i++){
                        //             if (excel[i].URL.substr('-27',3)==Dir[index]){
                        //                 urlList.push(
                        //                     {
                        //                         name: excel[i].URL.substr('-23')+".jpg",
                        //                         url: excel[i].URL
                        //                     }
                        //                 )
                        //             }else{
                        //                 thunderLink.newTask({
                        //                     minVersion: '10.0.1.0', // 指定响应批量任务的迅雷最低版本；格式匹配：/^\d+\.\d+\.\d+(?:\.\d+)?$/ 【一般不必填写】
                        //                     downloadDir:'dow',
                        //                     taskGroupName: Dir[index], // 指定任务组名称，将在下载目录中创建同名子文件夹保存所有下载文件。【若不填此项，将不会创建同名子文件夹保存下载文件】
                        //                     tasks: urlList
                        //                 });
                        //                 urlList=[];
                        //                 index++;
                        //                 j = i;
                        //                 break;
                        //             }
                        //         }
                        //     }
                        // }

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
 // thunderLink.newTask({
 //     minVersion: '10.0.1.0', // 指定响应批量任务的迅雷最低版本；格式匹配：/^\d+\.\d+\.\d+(?:\.\d+)?$/ 【一般不必填写】
 //     taskGroupName: 111, // 指定任务组名称，将在下载目录中创建同名子文件夹保存所有下载文件。【若不填此项，将不会创建同名子文件夹保存下载文件】
 //     tasks:  {
 //         name: '111.jpg', // 指定下载文件名（含扩展名）。【若不填此项，将根据下载 URL 自动获取文件名】
 //         url: 'https://file.zhipeix.com/ffs/epc/benz/001/B32001000003.920310.jpg', // 指定下载地址【必填项】
 //     },
 // });
 //
// function down(excel){
//     console.log(excel[i].URL)
//     //下载保存文件名
//     var imgname = excel[i].URL.substr('-23');
//     $('#downImg').attr('src', excel[i].URL);
//     var img = $('#downImg').attr("src");
//     var alink = document.createElement("a");
//     alink.href = img;
//     alink.download = imgname;
//     alink.click();
// }