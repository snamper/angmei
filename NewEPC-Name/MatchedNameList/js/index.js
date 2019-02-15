var network='https://www.51macc.com/api'
// var network='http://192.168.125.117:8080'
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}
var author=decodeURI(getUrlParam('author'));
var arr=[];
var AjaxList=[];
if (localStorage.getItem(author)){
    $('#brand').val(localStorage.getItem(author))
}
if (!getUrlParam('author')){
    alert('暂无工作人员名称')
}else{
    $('.author').text(author)
}
$(".search").click(function () {
    AjaxList=[]
    arr = []
    var type=$('#brand').val()
    $('#loading').show()
    queryAjax(type)
})
$('tbody').on('click','.del',function () {
    var type=$('#brand').val()
    var oe_name=$(this).parents('tr').find('.oe_name').text()
    var remark=$(this).parents('tr').find('.remark').text()
    var category_id=$(this).parents('tr').find('.category_id').text()
    var oenumber=$(this).parents('tr').find('.oenumber').attr('alt')
    if(confirm('是否删除')){
        $('#loading').show()
        delAjax(type,oe_name,remark,category_id,true,oenumber)
    }
})
$('.delAll').on('click',function () {
    var type=$('#brand').val()
    var index=0;
    if(confirm('是否批量删除')){
        delAll(type)
    }
})
function delAll(type){
    $.each(AjaxList,function (ke,val) {
        if (arr[0] == val.key) {
            var oe_name=val.oe_name
            var remark=val.remark
            var category_id=val.category_id
            $('#loading').show()
            $.ajax({
                type:'post',
                url:network+'/MattrioManager/EpcCategoryListController/delEpcOeNameList',
                cache:false,
                timeout:15000,
                data:{
                    'author':author,
                    'type':type,
                    'oe_name':oe_name,
                    'remark':remark,
                    'category_id':category_id
                },
                success(data){
                    arr.splice(arr.indexOf(arr[0]),1)
                    $('#loading').hide()
                    if(arr.length==0){
                        alert('删除成功')
                        $('#loading').show()
                        queryAjax(type)
                    }else{
                        delAll(type)
                    }
                },error(){
                    arr.splice(arr.indexOf(arr[0]),1)
                    $('#loading').hide()
                    if(arr.length==0){
                        alert('删除成功')
                        $('#loading').show()
                        queryAjax(type)
                    }else{
                        delAll(type)
                    }
                }
            })
        }
    })
}
var queryAjax=(type,msg)=>{
    $('#checkAll').attr("checked",false)
    $('.check').attr("checked",false)
    $.ajax({
        type:'post',
        url:network+'/MattrioManager/EpcCategoryListController/queryEpcOeNameSaveList',
        cache:false,
        timeout:15000,
        data:{
            'author':author,
            'type':type
        },
        success(data){
            $('#loading').hide()
            if ($('#example').hasClass('dataTable')) {
                var table = $('#example').dataTable();
                table.fnClearTable(); //清空一下table
                table.fnDestroy(); //还原初始化了的datatable
            }
            if(data.list==[]||data.list.length==0){
                $('.num').text('0')
                if(!msg){
                    alert('暂无')
                }
                return false;
            }
            $('.num').text(data.list.length)
            $.each(data.list,function (key,value) {
                value.key=value.oe_name+value.remark
                var $tr = $("<tr></tr>");
                var $t= $("<td class='tdcheck'></td>").html('<input class="check" type="checkbox">');
                var $td0= $("<td></td>").html(value.type);
                // var $td= $("<td class='index'></td>").html(key+1);
                var $td1 = $("<td class='oenumber' alt='"+value.oe_name+value.remark+"'></td>").html('<a href="https://www.51macc.com/content/maintain/oecont/oecont.html?demo3=true&oenumber='+value.oenumber+'" target="_blank" title="点击跳转查看该OE更多信息">'+value.oenumber+'</a>');
                var $td2 = $("<td class='oe_name' title='"+value.oe_name+"'></td>").html('<div>'+value.oe_name+'</div>');
                var $td3 = $("<td class='remark' title='"+value.remark+"'></td>").html('<div>'+value.remark+'</div>');
                var $td4 = $("<td class='category_name'></td>").html(value.category_name);
                var $td5 = $("<td class='category_id'></td>").html(value.category_id);
                var $td6 = $("<td></td>").html(new Date(value.time.time).toLocaleString());
                var $td7 = $("<td></td>").html(value.author);
                var $td8 = $("<td></td>").html('<span class="del">删除</span>');
                $t.appendTo($tr);
                // $td.appendTo($tr);
                $td0.appendTo($tr);
                $td1.appendTo($tr);
                $td2.appendTo($tr);
                $td3.appendTo($tr);
                $td4.appendTo($tr);
                $td5.appendTo($tr);
                $td6.appendTo($tr);
                $td7.appendTo($tr);
                $td8.appendTo($tr);
                $tr.appendTo($("tbody"));
            })
            AjaxList=data.list
            $('#example').DataTable({
                "pagingType": "full_numbers",
                "ordering":false,
                columns:[
                    {data:"checked"},
                    // {data:"index"},
                    {data:"type"},
                    {data:"oenumber"},
                    {data:"oe_name"},
                    {data:"remark"},
                    {data:"category_name"},
                    {data:"category_id"},
                    {data:"time"},
                    {data:"author"},
                    {data:"del"},
                ]
            });
            $('#example_filter input').attr('placeholder','请输入表格内容进行检索')
        },error(XML,textStatus){
            $('#loading').hide()
            if (textStatus == 'timeout') {
                alert('请求超时')
                return false;
            }
            alert('请求失败')
        }
    })
}
var delAjax=(type,oe_name,remark,category_id,msg,oenumber)=>{
    $.ajax({
        type:'post',
        url:network+'/MattrioManager/EpcCategoryListController/delEpcOeNameList',
        cache:false,
        timeout:15000,
        data:{
            'author':author,
            'type':type,
            'oe_name':oe_name,
            'remark':remark,
            'category_id':category_id
        },
        success(data){
            $('#loading').hide()
            if (msg) {
                alert(data.msg)
                queryAjax(type)
                arr.splice(arr.indexOf(oenumber), 1)
            }else{
                queryAjax(type,true)
            }
        },error(XML,textStatus){
            $('#loading').hide()
            if (textStatus == 'timeout') {
                if (msg) {
                    arr.splice(arr.indexOf(oenumber), 1)
                    alert('删除请求超时')
                    return false;
                }
            }
            if (msg) {
                arr.splice(arr.indexOf(oenumber), 1)
                alert('删除请求失败')
            }
        }
    })
}

$('#checkAll').click(function (e) {
    e.stopPropagation()
    var check=$('#checkAll').is(':checked')
    if (check){
        $(".check").each(function (key,value) {
            if (arr.indexOf($(value).parents('tr').find('.oenumber').attr('alt'))<0) {
                arr.push($(value).parents('tr').find('.oenumber').attr('alt'))
            }
        })
    } else{
        $(".check").each(function (key,value) {
            if (arr.indexOf($(value).parents('tr').find('.oenumber').attr('alt'))>=0){
                arr.splice(arr.indexOf($(value).parents('tr').find('.oenumber').attr('alt')),1)
            }
        })
    }
    $(".check").attr("checked",check);
})
$(document).on('click','.check',function (e) {
    e.stopPropagation()
    var num=0;
    var check=$(this).is(':checked')
    var oenumber=$(this).parents('tr').find('.oenumber').attr('alt')
    if (check){
        $(".check").each(function (key,value) {
            if ($(value).attr("checked")){
                num++
            }
        })
        if(arr.indexOf(oenumber)<0){
            arr.push(oenumber)
        }
    }else{
        arr.splice(arr.indexOf(oenumber),1)
    }
    if (num == $(".check").length){
        $('#checkAll').attr("checked",true);
    }else{
        $('#checkAll').attr("checked",false);
    }
})
$(document).on('click','.thcheck',function (e) {
    e.stopPropagation()
    var check=$('#checkAll').is(':checked')
    $('#checkAll').attr('checked',!check)
    if (!check){
        $(".check").each(function (key,value) {
            if (arr.indexOf($(value).parents('tr').find('.oenumber').attr('alt'))<0) {
                arr.push($(value).parents('tr').find('.oenumber').attr('alt'))
            }
        })
    } else{
        $(".check").each(function (key,value) {
            if (arr.indexOf($(value).parents('tr').find('.oenumber').attr('alt'))>=0){
                arr.splice(arr.indexOf($(value).parents('tr').find('.oenumber').attr('alt')),1)
            }
        })
    }
    $(".check").attr("checked",!check);
})
$(document).on('click','.tdcheck',function (e) {
    e.stopPropagation()
    var num=0;
    var check=$(this).find('.check').is(':checked')
    var oenumber=$(this).parents('tr').find('.oenumber').attr('alt')
    $(this).find('.check').attr('checked',!check)
    if (!check){
        $(".check").each(function (key,value) {
            if ($(value).attr("checked")){
                num++
            }
        })
        if(arr.indexOf(oenumber)<0){
            arr.push(oenumber)
        }
    }else{
        arr.splice(arr.indexOf(oenumber),1)
    }
    if (num == $(".check").length){
        $('#checkAll').attr("checked",true);
    }else{
        $('#checkAll').attr("checked",false);
    }
})
$(document).on('click','.paginate_button',function () {
    $('#checkAll').attr("checked",false)
    var num=0;
    $(".check").each(function (key,value) {
        if ($(value).attr("checked")){
            num++
        }else{
            num--
        }
    })
    if (num == $(".check").length){
        $('#checkAll').attr("checked",true);
    }else{
        $('#checkAll').attr("checked",false);
    }
})
$('.addBtn').click(function () {
    var numindex=0;
    var type=$('#brand').val()
    var len=arr.length;
    if (len==0){
        alert('请勾选你要保存的数据')
        return false;
    }
    if(confirm('是否导入系统')){
        var len=arr.length;
        $('#loading2 p').text('正在插入中')
        $('.arrNum').text('')
        $('.progress-bar').width(0)
        $('#loading2').show()
        arrAjax(arr,0,author,type,numindex,len)
    }
})
function arrAjax(arr,index,author,type,width,len){
    $.each(AjaxList,function(ke,val){
        if (arr[index] == val.key){
            $.ajax({
                type:'post',
                url:network+'/MattrioManager/EpcCategoryListController/addEpcCategory',
                cache:false,
                setTime:5000,
                data:{
                    'author':author,
                    'type':type,
                    'oe_name':val.oe_name,
                    'remark':val.remark,
                    'category_id':val.category_id
                },
                success(data){
                    delAjax(type,val.oe_name,val.remark,val.category_id,false,val.key)
                    arr.splice(index, 1)
                    width++
                    $('.arrNum').text(width)
                    $('.progress-bar').width(width/len*100+'%')
                    arrAjax(arr,index,author,type,width,len)
                    if (arr.length==0){
                        $('#loading2 p').text('插入成功')
                        setTimeout(function () {
                            $('#loading2').hide()
                        },2000)
                    }

                },error(xml,textStatus){
                    // delAjax(type,val.oe_name,val.remark,val.category_id,false,val.key)
                    arr.splice(index, 1)
                    width++
                    $('.arrNum').text(width)
                    $('.progress-bar').width(width/len*100+'%')
                    arrAjax(arr,index,author,type,width,len)
                    if (arr.length==0){
                        $('#loading2 p').text('插入成功')
                        setTimeout(function () {
                            $('#loading2').hide()
                        },2000)
                    }
                }
            })
        }
    })
}
$('.close').click(function () {
    $('#progress').hide()
})
$('#brand').on('change',function(){
    if ($('#example').hasClass('dataTable')) {
        var table = $('#example').dataTable();
        table.fnClearTable(); //清空一下table
        table.fnDestroy(); //还原初始化了的datatable
    }
    localStorage.setItem(author,$('#brand').val())
})