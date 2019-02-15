var network='https://www.51macc.com/api';
if (!localStorage.getItem("commercialCar")){
    window.location.href='login.html'
}
var datalist=''
$('.searchbtn').click(function () {
    var vin=$.trim($('.vininput').val()).substr(-8,8)
    $('.vininput').val(vin)
    if (vin.length==0){
        alert('请输入VIN后八位')
        return false;
    }
    $('#loading').show()
    $(".nonedata").addClass('none')
    $.ajax({
        type:'post',
        url:network+'/Mattrio/OpenApi/Request',
        data:JSON.stringify({
            "userid": "2dc77612-1461-4dc6-9cfb-ae32d166be12",
            "clientip": "101.93.159.156",
            "clienttype": 1,
            "requesttime": "2019-01-16T12:01:58.9747412+08:00",
            "actiontype": 90001,
            "actionbody": {
                "vin": vin
            }
        }),
        success(data){
            $('#loading').hide()
            $('tbody').html('')
            if(data.resultbody.recode=='暂无数据'||data.responsebody.result.length==0){
                $(".nonedata").removeClass('none')
                return false;
            }
            $.each(data.responsebody.result,function(key,value){
                var $tr=$('<tr>')
                var $td1=$('<td class="tdbrand">').html(value.brandName)
                var $td2=$('<td class="tdnumber">').html(value.seriesId)
                var $td3=$('<td class="tdseries">').html(value.seriesGroupName)
                var $td4=$('<td class="tdremark">').html(value.seriesName)
                var $td5=$('<td class="tdVin">').html(value.vin)
                var $td6=$('<td>').html('<button class="details">明细</button>')
                $td1.appendTo($tr)
                $td2.appendTo($tr)
                $td3.appendTo($tr)
                $td4.appendTo($tr)
                $td5.appendTo($tr)
                $td6.appendTo($tr)
                $tr.appendTo('tbody')

            })
        },error(){
            $('#loading').hide()
        }
    })
})
$('tbody').on('click','.details',function () {
    var brand=$(this).parents('tr').find('.tdbrand').text()
    var number=$(this).parents('tr').find('.tdnumber').text()
    var series=$(this).parents('tr').find('.tdseries').text()
    var Vin=$(this).parents('tr').find('.tdVin').text()
    var remark=$(this).parents('tr').find('.tdremark').text()
    $('.brand').text(brand)
    $('.number').text(number)
    $('.series').text(series)
    $('.Vin').text(Vin)
    $('.remark').text(remark)
    $('#loading').show()
    $.ajax({
        type:'post',
        url:network+'/Mattrio/OpenApi/Request',
        data:JSON.stringify({
            "userid": "2dc77612-1461-4dc6-9cfb-ae32d166be12",
            "clientip": "101.93.159.156",
            "clienttype": 1,
            "requesttime": "2019-01-16T12:01:58.9747412+08:00",
            "actiontype": 90002,
            "actionbody": {
                "seriesRecId": "5637147057"
            }
        }),
        success(data){
            $('#loading').hide()
            $('.inpWrap,.thead1').addClass('none')
            $('.headerdiv,.thead2,.filterdiv').removeClass('none')
            $('tbody').html('')
            datalist=data.responsebody.result
            result(data.responsebody.result)

        },error(){
            $('#loading').hide()
        }
    })
})
var result=(list)=>{
    $.each(list,function(key,value){
        var $tr=$('<tr>')
        var $td1=$('<td class="itemId">').html(value.itemId)
        var $td2=$('<td class="itemName">').html(value.itemName)
        var $td3=$('<td class="standardName">').html(value.standardName)
        var $td4=$('<td class="itemCategoryName">').html(value.itemCategoryName)
        var $td5=$('<td class="originPrice">').html(value.originPrice)
        var $td6=$('<td class="agentPrice">').html(value.agentPrice)
        var $td7=$('<td class="retailPrice">').html(value.retailPrice)
        $td1.appendTo($tr)
        $td2.appendTo($tr)
        $td3.appendTo($tr)
        $td4.appendTo($tr)
        $td5.appendTo($tr)
        $td6.appendTo($tr)
        $td7.appendTo($tr)
        $tr.appendTo('tbody')

    })
}
$('.back').click(function () {
    $('.inpWrap,.thead1').removeClass('none')
    $(".headerdiv,.thead2,.filterdiv").addClass('none')
    $('tbody').html('')
})
$('.filter').on('input',function(){
    var filterval=$(this).val()
    var arr=[];
    $("tbody").html('')
    if (filterval.length==0){
        result(datalist)
        return false;
    }
    $.each(datalist,function (key,value) {
        if (JSON.stringify(value).indexOf(filterval)>=0){
            arr.push(value)
        }
    })
    result(arr)
})