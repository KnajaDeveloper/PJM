var dataDDLByCode;

$("#btnIncresePoint").click(function(){
	addDataToDDLModule();
});

$("#btnSaveIncreseCostModule").click(function(){
	var bool = checkDataBeforeSave();
});

function addDataToDDLModule(){
	var dataJsonData = {
		projectCode:$('#txtInitialProjectName').val()
    }

    dataDDLByCode = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/moduleprojects/findAllNameModuleByProjectCode',
		data : dataJsonData,
		complete: function(xhr){

		},
		async: false
	});
    $("#ddlIncreseCostModuleName").empty();
    $("#ddlIncreseCostModuleName").append("<option>--- Module Name ---</option>");
	dataDDLByCode = dataDDLByCode.responseJSON;
	dataDDLByCode.forEach(function(name) {
    	$("#ddlIncreseCostModuleName").append("<option>"+name.moduleName+"</option>");
	});
}


function checkDataBeforeSave(){
	if($("#ddlIncreseCostModuleName").val() == "--- Module Name ---") {
		$('#ddlIncreseCostModuleName').attr("data-placement","bottom");
		$('#ddlIncreseCostModuleName').attr("data-content","Please select Module name.");
		$('#ddlIncreseCostModuleName').popover('show');
		return false;
	}
	
	if($("#txtIncreseCostModuleCost").val() == "" || $("#txtIncreseCostModuleCost").val() == " ") {
		$('#txtIncreseCostModuleCost').attr("data-placement","bottom");
		$('#txtIncreseCostModuleCost').attr("data-content","Please Complete this field.");
		$('#txtIncreseCostModuleCost').popover('show');
		return false;
	}
	else{
		var textCost = ""+$("#txtIncreseCostModuleCost").val();
		var checkKey = textCost.split('');
		for(var i=0;i<checkKey.length;i++){
			if(checkKey[i]!='0'&&checkKey[i]!='1'&&checkKey[i]!='2'&&checkKey[i]!='3'&&checkKey[i]!='4'&&checkKey[i]!='5'&&checkKey[i]!='6'&&checkKey[i]!='7'&&checkKey[i]!='8'&&checkKey[i]!='9'){
				$('#txtIncreseCostModuleCost').attr("data-placement","bottom");
				$('#txtIncreseCostModuleCost').attr("data-content","Please enter only [0 - 9].");
				$('#txtIncreseCostModuleCost').popover('show');
				return false;
				break;
			}
		}
	}
	return true;
}