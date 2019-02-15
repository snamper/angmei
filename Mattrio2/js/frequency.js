if (localStorage) {
	    var network = localStorage.getItem("network");
	} else {
	    var network = $.cookie("network");
	}
function frequencyfun(userid,recode){
	$.ajax({
		type: "post",
		url: network+"/Mattrio/InterfaceList/getUserFrequency",
		cache: false,
		async:false,
		data: {
			"userid": userid
		},
		dataType: "json",
		crossDomain: true == !(document.all),
		success: function(data) {
			 $.cookie("frequency", data.frequency[0].day_frequency, { expires: 7, path: '/' });
			 $(".navcenter").html($.cookie("frequency"));
			 $(".divnum span").html($.cookie("frequency"));
			 recode=data.frequency[0].day_frequency
		},
		error: function() {
	
		}
	});
	return recode
}
