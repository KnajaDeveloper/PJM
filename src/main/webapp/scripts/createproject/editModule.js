var editModuleName = "";

function editDataModuleInDB(){
	var convertFormatDateStart = new Date(convertDate($('#dateStartEditModule').val()));
	var convertFormatDateEnd = new Date(convertDate($('#dateEndEditModule').val()));
	var crateModuleProject = {
			moduleNeedEdit: editModuleName,
			moduleCode:$("#txtEditInitialModuleName1").val() ,
			moduleName:$("#txtEditModuleName1").val() ,
			moduleCost:parseInt($("#txtCostsEditModule1").val()),
			dateStart: convertFormatDateStart ,
			dateEnd: convertFormatDateEnd ,
			arr_moduleManager: editModuleManagerToArray() ,
			arr_moduleMember: editModuleMemberToArray()
		};
	var responseHeader = null;
	$.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "POST",
		url: contextPath + '/moduleprojects/editModuleProjectByModuleProjectCode',
		data : crateModuleProject,
		complete: function(xhr){
			if(xhr.status === 201 || xhr.status === 200){
				bootbox.alert("Edit Success");
				return true;
			}else if(xhr.status === 500){
				bootbox.alert("Edit Error");
				return false;
			}
		},
		async: false
	});
	return true;
}

function editModuleManagerToArray(){
	var moduleManager = "";
	for(var i=0;i<$("[id^=txtEditModuleManagerName").length;i++) {
		var id = $("[id^=txtEditModuleManagerName")[i].id
		moduleManager+=""+$("#"+id).val();
		if(i!=$("[id^=txtEditModuleManagerName").length-1) moduleManager+="==";
	}
	return moduleManager;
}

function editModuleMemberToArray(){
	var moduleMember = "";
	for(var i=0;i<$("[id^=txtEditModuleMemberName").length;i++) {
		var id = $("[id^=txtEditModuleMemberName")[i].id
		moduleMember+=""+$("#"+id).val();
		if(i!=$("[id^=txtEditModuleMemberName").length-1) moduleMember+="==";
	}
	return moduleMember;
}
