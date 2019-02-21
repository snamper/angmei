function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}
var  datalist='';
var author=decodeURI(getUrlParam('author'))
$('.author').text(author)

if ($('.author').text()==''){
    $('.pauthor').hide()
    alert('暂无上传者名称')
}
if (localStorage.getItem(author)){
    $('#brand').val(localStorage.getItem(author))
}
$('.btn1').click(function () {
    var typeName=$('#brand').val();
    if ($('#inp').val()==''){
        if($("#inpselect").val()=='名称'){
           alert('请输入EPC产品名称')
        }else{
            alert('请输入OE编码')
        }
        return false;
    }
    var inpName=$('#inp').val()
    $('#loading').show()
    btnAjax(typeName,inpName)
})
var btnAjax=(typeName,inpName)=>{
    $.ajax({
        type:'post',
        url:'https://www.51macc.com/api/Mattrio/EpcCategoryInterface/queryNowEpcOe',
        cache:false,
        setTime:10000,
        data:{
            'type':typeName,
            'category_name':inpName
        },
        success:function (data) {
            $('#loading').hide()
            $('tbody').html('')
            if(data.list==[]||data.list.length==0){
                $('.num').text('0')
                alert('暂无')
                return false;
            }
            $('.num').text(data.list.length)
            datalist=data.list
            addtr(data.list)
        },error:function () {
            $('#loading').hide()
            alert('请求失败')
        }
    })
}
var addtr=(data)=>{
    $.each(data,function (key,value) {
        var tr=$('<tr>')
        var td0= $("<td class='tdcheck'></td>").html('<input class="check" type="checkbox">');
        var td1=$('<td>').html(value.type)
        var td2=$('<td class="category_name">').html(value.category_name)
        var td3=$('<td class="category_id">').html(value.category_id)
        var td4=$('<td class="oe_name">').html(value.oe_name)
        if (value.remark){
            var td5=$('<td class="remark">').html(value.remark)
        } else {
            var td5=$('<td class="remark">').html('')
        }
        var td6=$('<td title="'+value.oe_number+'">').html('<a href="https://www.51macc.com/content/maintain/oecont/oecont.html?demo3=true&oenumber='+value.oe_number+'" target="_blank" title="点击跳转查看该OE更多信息">'+value.oe_number+'</a>')
        if(value.author){
            var td7=$('<td>').html(value.author)
        }else{
            var td7=$('<td>').html('')
        }
        if(value.time){
            var td8=$('<td>').html(new Date(value.time.time).toLocaleString())
        }else{
            var td8=$('<td>').html('')
        }
        var td9=$('<td>').html('<div class="tddel">删除</div>')
        td0.appendTo(tr)
        td1.appendTo(tr)
        td2.appendTo(tr)
        td3.appendTo(tr)
        td4.appendTo(tr)
        td5.appendTo(tr)
        td6.appendTo(tr)
        td7.appendTo(tr)
        td8.appendTo(tr)
        td9.appendTo(tr)
        tr.appendTo('tbody')
    })
}
$('.add').click(function(){
    var name3=$('#3name').val()
    var OEname=$('#OEname').val()
    var brand=$('#brand').val()
    if (name3==''){
        alert('请输入三级分组名称')
        return false;
    }
    if (OEname==''){
        alert('请输入OE名称')
        return false;
    }
    if(confirm('是否添加')){
        $('#loading').show()
        $.ajax({
            type:'POST',
            url:'https://www.51macc.com/api/Mattrio/EpcCategoryInterface/insertNowEpcOe',
            cache:false,
            setTime:10000,
            data:{
                'type':brand,
                'category_name':name3,
                'oe_name':OEname,
                'author':$('.author').text()
            },
            success:function(data){
                $('#loading').hide()
                alert(data.msg)
                btnAjax(brand,name3)
            },error:function(){
                $('#loading').hide()
                alert('添加失败')
            }
        })
    }
})
var delAjax=(brand,cname,oename,len,key)=>{
    $.ajax({
        type:'post',
        url:'https://www.51macc.com/api/Mattrio/EpcCategoryInterface/deleteNowEpcOe',
        cache:false,
        setTime:10000,
        data:{
            'type':brand,
            'category_name':cname,
            'oe_name':oename,
            'author':$('.author').text()
        },
        success:function(data){
            btnAjax(brand,cname)
            if(!len||len==key+1){
                $('#loading').hide()
                alert(data.msg)
            }
        },error:function(){
            $('#loading').hide()
            if(!msg){
                alert('删除失败')
            }
        }
    })
}
$('.del').click(function(){
    var name3=$('#3name').val()
    var OEname=$('#OEname').val()
    var brand=$('#brand').val()
    if (name3==''){
        alert('请输入三级分组名称')
        return false;
    }
    if (OEname==''){
        alert('请输入OE名称')
        return false;
    }
    if(confirm('是否删除')){
        $('#loading').show()
        delAjax(brand,name3,OEname)
    }
})
$('tbody').on('click','.tddel',function () {
    var brand=$('#brand').val()
    if(confirm('是否删除')){
        $('#loading').show()
        delAjax(brand,$(this).parents('tr').find('.category_name').text(),$(this).parents('tr').find('.oe_name').text())
    }
})
$(document).on('click','.check',function () {
    var num=0;
    $(".check").each(function (key,value) {
        if ($(value).attr("checked")){
            num++
            $(value).parents('tr').addClass('tr')
        }else{
            $(value).parents('tr').removeClass('tr')
        }
    })
    if (num == $(".check").length){
        $('#checkAll').attr("checked",true);
    }else{
        $('#checkAll').attr("checked",false);
    }

})
$('#checkAll').click(function () {
    var check=$('#checkAll').is(':checked')
    if(check){
        $(".check").attr("checked",check).parents('tr').addClass('tr');
    }else{
        $(".check").attr("checked",check).parents('tr').removeClass('tr');
    }
})
$('.delAll').click(function(){
    if($('.check:checked').length==0){
        alert('请选择你要删除的内容')
        return false;
    }
    var brand=$('#brand').val()
    if(confirm('是否批量删除')){
        $('#loading').show()
        $('.check:checked').each(function(key,value){
            delAjax(brand,$(this).parents('tr').find('.category_name').text(),$(this).parents('tr').find('.oe_name').text(),$('.check:checked').length,key)
        })
    }

})
$('.filter').click(function(){
    if ($('tbody').html().length==0){
        alert('暂无可去重的数据')
        return false;
    }
    if($(this).text()=='列表去重'){
        var arr = [],len = datalist.length;
        for(i = 0; i < len; i++){
            for(j = i + 1; j < len; j++){
                if(datalist[i].oe_name == datalist[j].oe_name&&datalist[i].remark == datalist[j].remark&&datalist[i].category_name == datalist[j].category_name){
                    j = ++i;
                }
            }
            arr.push(datalist[i]);
        }
        $('tbody').html('')
        $('.num').text(arr.length)
        addtr(arr)
        $(this).text('原列表')
    }else{
        $('tbody').html('')
        $('.num').text(datalist.length)
        addtr(datalist)
        $(this).text('列表去重')
    }
})
$('#brand').on('change',function(){
    localStorage.setItem(author,$('#brand').val())
})