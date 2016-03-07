var dataDDLByCode ;

$("#btnIncresePoint").click(function(){
	addDataToDDLModule();
});

$("#btnSaveIncreseCostModule").click(function(){
	var bool = checkDataBeforeSave();
	var idModuleProject = focusModuleCode($("#ddlIncreseCostModuleName").val());
	var editCostModuleProject = {
		codeProject: $("#txtInitialProjectName").val(),
		codeModuleProject: idModuleProject ,
		costIncrese: parseInt($("#txtIncreseCostModuleCost").val())
	};
	var responseHeader = null;
	var textNewCost = $.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "POST",
		url: contextPath + '/moduleprojects/increseCostByModuleNameAndCodeProject',
		data : editCostModuleProject,
		complete: function(xhr){
			if(xhr.status === 201 || xhr.status === 200){
				bootbox.alert("Increse "+parseInt($("#txtIncreseCostModuleCost").val())+" point to module "+idModuleProject+".");
				return true;
			}else if(xhr.status === 500){
				bootbox.alert("Can't increse "+parseInt($("#txtIncreseCostModuleCost").val())+" point to module "+idModuleProject+".");
				return false;
			}
		},
		async: false
	});
	changeCostLabelModule(textNewCost);
	$("#modalIncreseCost").modal('hide')
	return true;
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
		url: contextPath + '/moduleprojects/findModuleByProjectCode',
		data : dataJsonData,
		complete: function(xhr){

		},
		async: false
	});
    $("#ddlIncreseCostModuleName").empty();
    $("#ddlIncreseCostModuleName").append("<option>--- Module Name ---</option>");
	dataDDLByCode = dataDDLByCode.responseJSON;
	dataDDLByCode.forEach(function(name) {
		var text="("+name.moduleCode+") "+name.moduleName
    	$("#ddlIncreseCostModuleName").append("<option>"+text+"</option>");
	});
}


function focusModuleCode(input){
	var subInput = input.split(" ");
	var str = ""+subInput[0];
	return str.substring(1, str.length-1);
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

function changeCostLabelModule(newCost){
	var newCostToText = newCost.responseText;
	var subCost = newCostToText.split(',');
	$("#txtCostsProject").val(""+subCost[0]);
	var name = $("#ddlIncreseCostModuleName").val();
	var count_Element = $("[id^=headName]").length;
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=headName]")[i].id;
		var headName = $("#"+id).text();
		if(findEqualName(headName,name)) {
			var oldName = $("#"+id).text() ;
			// replace Cost in [ ] 
			var newName = replaceCost(oldName , subCost[1]);
			$("#"+id).text(newName);
		}
	}
}

function findEqualName(headName,name){
	var x = headName.split(' ');
	var y = name.split(' ');
	if(x[0] == y[0]) return true;
	else return false ;
}

function replaceCost(name,newCost){
	var index = name.split('[');
	index[1] = "["+newCost+"]";
	return index[0]+index[1];
}