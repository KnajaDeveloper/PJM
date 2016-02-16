$('#txtYear').focusout(function(){
	var textYear = ""+$("#txtYear").val();
	var checkKey = textYear.split('');
	for(var i=0;i<checkKey.length;i++){
		if(checkKey[i]!='0'&&checkKey[i]!='1'&&checkKey[i]!='2'&&checkKey[i]!='3'&&checkKey[i]!='4'&&checkKey[i]!='5'&&checkKey[i]!='6'&&checkKey[i]!='7'&&checkKey[i]!='8'&&checkKey[i]!='9'){
			$('#txtYear').attr("data-content","Please enter only [0 - 9].");
			$('#txtYear').popover('show');
			break;
		}
	}
});

$("#btnSearch").click(function(){
	var textYear = ""+$("#txtYear").val();
	var bool_year = true;
	var bool_date = true;
	if(textYear=="" || textYear==" ") {
		$('#txtYear').attr("data-content","Please enter year.");
		$('#txtYear').popover('show');
		bool_year=false;
	}
	else {
		var checkKey = textYear.split('');
		for(var i=0;i<checkKey.length;i++){
			if(checkKey[i]!='0'&&checkKey[i]!='1'&&checkKey[i]!='2'&&checkKey[i]!='3'&&checkKey[i]!='4'&&checkKey[i]!='5'&&checkKey[i]!='6'&&checkKey[i]!='7'&&checkKey[i]!='8'&&checkKey[i]!='9'){
				bool_year=false
				$('#txtYear').attr("data-content","Please enter only [0 - 9].");
				$('#txtYear').popover('show');
				break;
			}
		}
	}

	if(bool_year && bool_date) {
		var year = parseInt(""+textYear);
		bootbox.alert("Year : "+year);
	}
});

$("#btnReset").click(function(){
	$("#txtYear").val("");
	$('#txtYear').popover('hide');
	$("#ddlProject").val($("#ddlProject option:first").val());
	$("#ddlModule").val($("#ddlModule option:first").val());
	$("#ddlTeam").val($("#ddlTeam option:first").val());
	$("#dateStart").val("");
	$("#dateEnd").val("");
});