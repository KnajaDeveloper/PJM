function saveModuleProjectToDB(){
	var boolSameModuleCode = findSameModuleCode();
	if(boolSameModuleCode==true){
		var crateModuleProject = {
				moduleCode:$("#txtInitialModuleName1").val() ,
				moduleName:$("#txtModuleName1").val() ,
				moduleCost:parseInt($("#txtCostsModule1").val()),
				dateStart:$("#dateStartModule").val() ,
				dateEnd:$("#dateEndModule").val() ,
				projectCode:$("#txtInitialProjectName").val() ,
				arr_moduleManager: ModuleManagerToArray() ,
				arr_moduleMember: ModuleMemberToArray()
			};
		var responseHeader = null;
		$.ajax({
			headers: {
				Accept: "application/json"
			},
			type: "POST",
			url: contextPath + '/moduleprojects/saveModuleProject',
			data : crateModuleProject,
			complete: function(xhr){
				if(xhr.status === 201){
					bootbox.alert("Save Success");
				}else if(xhr.status === 500){
					bootbox.alert("Save Error");
					return false;
				}
			},
			async: false
		});
	}
	else {
		bootbox.alert("["+$('#txtInitialModuleName1').val()+"] has in database.");
		return false;
	}
	return true;
}

function ModuleManagerToArray(){
	var moduleManager = "";
	for(var i=0;i<$("[id^=txtModuleManagerName").length;i++) {
		var id = $("[id^=txtModuleManagerName")[i].id
		moduleManager+=""+$("#"+id).val();
		if(i!=$("[id^=txtModuleManagerName").length-1) moduleManager+="==";
	}
	return moduleManager;
}

function ModuleMemberToArray(){
	var moduleMember = "";
	for(var i=0;i<$("[id^=txtModuleMemberName").length;i++) {
		var id = $("[id^=txtModuleMemberName")[i].id
		moduleMember+=""+$("#"+id).val();
		if(i!=$("[id^=txtModuleMemberName").length-1) moduleMember+="==";
	}
	return moduleMember;
}

function findSameModuleCode(){
	var dataJsonData = {
		moduleCode:$('#txtInitialModuleName1').val()
    }

    var size = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/moduleprojects/findModuleByModuleCode',
		data : dataJsonData,
		complete: function(xhr){
		},
		async: false
	});
    var returnSize = jQuery.parseJSON(size.responseText);
    if(returnSize != 0) return false;
    return true;
}