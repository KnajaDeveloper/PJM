$("#btnUpModule").click(function(){
	collapseShow(false);
});

$("#btnDownModule").click(function(){
	collapseShow(true);
});

function collapseShow(status){
	var countCollapse = $('[id^=collapse]').length ;
	if(status){
		for(var i = 1 ; i <= countCollapse ; i++)
			$("#collapse"+i).addClass("in");
	}
	else{
		for(var i = 1 ; i <= countCollapse ; i++)
			$("#collapse"+i).removeClass("in");		
	}
}