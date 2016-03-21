var dataDDLByCode ;
var option = "";

$("#btnIncresePoint").hide();
$("#btnDecresePoint").hide();

$("#btnIncresePoint").click(function(){
	option = "increse";
	addDataToDDLModule();
	$("#ddlIncreseCostModuleName").attr("readonly","true");
});

$("#btnDecresePoint").click(function(){
	option = "decrese";
	addDataToDDLModule();
	$("#ddlIncreseCostModuleName").attr("readonly","true");
});

function checkCostCanDecrese(){

}

$("#btnSaveIncreseCostModule").click(function(){
	if($("[value=project]").prop("checked")==true) {
		var bool = checkDataBeforeSave("project");
		if (bool == true) {
			if(option=="decrese") {
				checkCostCanDecrese();
				$("#txtIncreseCostModuleCost").val("-"+$("#txtIncreseCostModuleCost").val());
			}
			var editCostProject = {
				projectId: dataAfterSave.responseJSON.id,
				increseCost: parseInt($("#txtIncreseCostModuleCost").val())
			};
			var recieveProject = $.ajax({
				headers: {
					Accept: "application/json"
				},
				type: "POST",
				url: contextPath + '/projects/incresePointProjectByIdProject',
				data: editCostProject,
				complete: function (xhr) {
					if (xhr.status === 201 || xhr.status === 200) {
						if(option=="decrese")  bootbox.alert("Decrese " + parseInt($("#txtIncreseCostModuleCost").val()) + " point from project.");
						else bootbox.alert("Increse " + parseInt($("#txtIncreseCostModuleCost").val()) + " point to project.");
						recieveProject = xhr;
						$("#txtCostsProject").val("" + recieveProject.responseJSON.projectCost);
						return true;
					} else if (xhr.status === 500) {
						if(option=="decrese")  bootbox.alert("Can't Decrese " + parseInt($("#txtIncreseCostModuleCost").val()) + " point to project.");
						else bootbox.alert("Can't increse " + parseInt($("#txtIncreseCostModuleCost").text()) + " point to project.");
						return false;
					}
				},
				async: false
			});
			$("#modalIncreseCost").modal('hide');
			clearModalIncresePoint();
			return true;
		} else {
			return false;
		}
	}
	else {
		var bool = checkDataBeforeSave("module");
		if (bool == true) {
			if(option=="decrese") $("#txtIncreseCostModuleCost").val("-"+$("#txtIncreseCostModuleCost").val());
			var idModuleProject = $("#ddlIncreseCostModuleName").val();
			var editCostModuleProject = {
				projectId: dataAfterSave.responseJSON.id,
				codeModuleProject: idModuleProject,
				costIncrese: parseInt($("#txtIncreseCostModuleCost").val())
			};
			var responseHeader = null;
			var textNewCost = $.ajax({
				headers: {
					Accept: "application/json"
				},
				type: "POST",
				url: contextPath + '/moduleprojects/increseCostByModuleNameAndProjectId',
				data: editCostModuleProject,
				complete: function (xhr) {
					if (xhr.status === 201 || xhr.status === 200) {
						bootbox.alert("Increse " + parseInt($("#txtIncreseCostModuleCost").val()) + " point to module " + idModuleProject + ".");
						changeParameterIncreseOrDecresePointByModuleCode($("#ddlIncreseCostModuleName").val(), parseInt($("#txtIncreseCostModuleCost").val()));
						return true;
					} else if (xhr.status === 500) {
						bootbox.alert("Can't increse " + parseInt($("#txtIncreseCostModuleCost").text()) + " point to module " + idModuleProject + ".");
						return false;
					}
				},
				async: false
			});
			changeCostLabelModule(textNewCost);
			$("#modalIncreseCost").modal('hide');
			clearModalIncresePoint();
			return true;
		} else {
			return false;
		}
	}
});

function clearModalIncresePoint(){
	$("#txtIncreseCostModuleCost").val("");
	$("[value=project]").prop("checked",true);
}

function changeParameterIncreseOrDecresePointByModuleCode(moduleCode,increseCost){
	for(var i = 1 ; i <= ModuleProject.length ; i++){
		if(ModuleProject[i].moduleCode == moduleCode) {
			ModuleProject[i].moduleCost += increseCost;
			break;
		}
	}
}

function addDataToDDLModule(){
	var dataJsonData = {
		projectId: dataAfterSave.responseJSON.id
    }

    dataDDLByCode = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/moduleprojects/findModuleByProjectId',
		data : dataJsonData,
		complete: function(xhr){

		},
		async: false
	});
    $("#ddlIncreseCostModuleName").empty();
    $("#ddlIncreseCostModuleName").append("<option>--- Module Name ---</option>");
	dataDDLByCode = dataDDLByCode.responseJSON;
	if(dataDDLByCode != undefined) {
		dataDDLByCode.forEach(function (name) {
			var text = "(" + name.moduleCode + ") " + name.moduleName
			$("#ddlIncreseCostModuleName").append("<option value='"+name.moduleCode+"'>" + text + "</option>");
		});
	}
}

function checkDataBeforeSave(option){
	if(option=="module") {
		if ($("#ddlIncreseCostModuleName").val() == "--- Module Name ---") {
			$('#ddlIncreseCostModuleName').attr("data-placement", "bottom");
			$('#ddlIncreseCostModuleName').attr("data-content", "Please select Module name.");
			$('#ddlIncreseCostModuleName').popover('show');
			return false;
		}
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
	var head = x[0].substr(1,x[0].length-2);
	if(head == y[0]) return true;
	else return false ;
}

function replaceCost(name,newCost){
	var index = name.split('[');
	index[1] = "["+newCost+"]";
	return index[0]+index[1];
}

$("input:radio[name=project]").click(function() {
	var value = $(this).val();
	if(value=="project"){
		$("#ddlIncreseCostModuleName").attr("readonly","true");
	}else{
		$("#ddlIncreseCostModuleName").removeAttr("readonly");
	}
});

function incresePointWhenMoreThanProjectCode(){

}