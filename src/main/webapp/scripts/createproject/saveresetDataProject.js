$("#btnSaveProject").click(function(){
	var checkInputProject = checkDataProject();
	if(checkInputProject==true){
		var bool ;
		if(dataAfterSave==null) bool = saveProjectToDB();
		else {
			if(compareData()==false) {
				var boolCost = checkTotalUse($("#txtCostsProject").val());
				if(boolCost) {
					bool = updateProjectToDB();
				}else{
					bootbox.alert(Message.Cost_module_more_than_project);
				}
			}
			else
				bootbox.alert(Message.Data_no_change);
		}
		if(bool==true) {
			$("#container_DataModule").show(500);
		}
	}
});

function checkTotalUse(pjCost){
	var totalUse = 0;
	var count_Element = $("[id^=btnEditModule]").length;
	for (var i = 0; i < count_Element; i++) {
		var id = $('[id^=btnEditModule]')[i].id;
		var number = parseInt(id.split("btnEditModule")[1]);
		totalUse += parseFloat(ModuleProject[number].moduleCost);
	}
	if(totalUse > pjCost) return false;
	else return true;
}

$("#btnResetProject").click(function(){
	resetDataProject();
});	

function checkDataProject(){
	if($("#txtProjectName").val() == "" || $("#txtProjectName").val() == " ") {
		$('#txtProjectName').attr("data-content",Message.Complete_this_feld);
		$('#txtProjectName').popover('show');
		return false;
	}
	if($("#txtInitialProjectName").val() == "" || $("#txtInitialProjectName").val() == " ") {
		$('#txtInitialProjectName').attr("data-content",Message.Complete_this_feld);
		$('#txtInitialProjectName').popover('show');
		return false;
	}
	if($("#txtCostsProject").val() == "" || $("#txtCostsProject").val() == " ") {
		$('#txtCostsProject').attr("data-content",Message.Complete_this_feld);
		$('#txtCostsProject').popover('show');
		return false;
	}
	else{
		var textCost = ""+$("#txtCostsProject").val();
		if(!$.isNumeric(textCost)){
			$('#txtCostsProject').attr("data-content", Message.Number_only);
			$('#txtCostsProject').popover('show');
			return false;
		}
		else if(parseFloat(textCost) < 0) {
			$('#txtCostsProject').attr("data-content", Message.Number_only);
			$('#txtCostsProject').popover('show');
			return false;
		}
		if(textCost.indexOf('.') > 0) {
			if (textCost.split('.')[1].length > 4) {
				$('#txtCostsProject').attr("data-placement", "bottom");
				$('#txtCostsProject').attr("data-content", Message.More_than_digit);
				$('#txtCostsProject').popover('show');
				return false;
			}
			else if(textCost.split('.')[1].length==0){
				$('#txtCostsProject').attr("data-content",Message.Number_only);
				$('#txtCostsProject').popover('show');
				return false;
			}
		}
		if(textCost.indexOf('.')==0){
			$('#txtCostsProject').attr("data-content",Message.Number_only);
			$('#txtCostsProject').popover('show');
			return false;
		}
	}
	if($("#dateStartProject").val() == "" || $("#dateStartProject").val() == " ") {
		$('#dateStartProject').attr("data-content",Message.Complete_this_feld);
		$('#dateStartProject').popover('show');
	return false;
	}
	if($("#dateEndProject").val() == "" || $("#dateEndProject").val() == " ") {
		$('#dateEndProject').attr("data-content",Message.Complete_this_feld);
		$('#dateEndProject').popover('show');
		return false;
	}

	for(var i = 0 ; i < $("[id^=txtProjectManagerName]").length ; i++) {
		var id = $("[id^=txtProjectManagerName]")[i].id ;
		if ($("#"+id).val() == "" || $("#"+id).val() == " " || $("#"+id).data("dataCode") == null || $("#"+id).data("dataCode") == "") {
			$("#"+id).attr("data-content", Message.Complete_this_feld);
			$("#"+id).attr("data-placement", "bottom");
			$("#"+id).popover('show');
			return false;
		}
	}

	var arrManager = [];
	for(var i=0;i<$("[id^=txtProjectManagerName]").length;i++){
		var id = $("[id^=txtProjectManagerName]")[i].id ;
		var name = ""+$("#"+id).data('dataCode');
		if(arrManager.indexOf(""+name) < 0) arrManager.push(""+name);
		else {
			bootbox.alert(Message.It_has_same_names);
			return false;
		}
	}
	return true;
}

function resetDataProject(){
	$("#subProjectManager").empty();
	$("#txtProjectName").val("");
	$("#txtInitialProjectName").val("");
	$("#txtProjectManagerName1").val("");
	$("#txtCostsProject").val("");
	$("#dateStartProject").val("");
	$("#dateEndProject").val("");
}
