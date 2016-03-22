var editModuleName = "";

function editDataModuleInDB(number,cost){
	var moduleCost = 0;
	if(cost!=null) moduleCost = cost ;
	var returnStatus = false ;
	var convertFormatDateStart = new Date(convertDate($('#dateStartEditModule').val()));
	var convertFormatDateEnd = new Date(convertDate($('#dateEndEditModule').val()));
	var crateModuleProject = {
			moduleNeedEdit: editModuleName,
			moduleCode:$("#txtEditInitialModuleName1").val() ,
			moduleName:$("#txtEditModuleName1").val() ,
			moduleCost:moduleCost,
			dateStart: convertFormatDateStart ,
			dateEnd: convertFormatDateEnd ,
			arr_moduleManager: editModuleManagerToArray() ,
			arr_moduleMember: editModuleMemberToArray() ,
			projectId: dataAfterSave.responseJSON.id
		};
	var responseHeader = null;
	var recieve = $.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "POST",
		url: contextPath + '/moduleprojects/editModuleProjectByModuleProjectCodeAndProjectId',
		data : crateModuleProject,
		complete: function(xhr){
			if(xhr.status === 201 || xhr.status === 200){
				bootbox.alert(""+Message.Edit_success);
				returnStatus = true;
			}else if(xhr.status === 500){
				bootbox.alert(""+Message.Edit_error);
				returnStatus = false;
			}
		},
		async: false
	});
	if(number!=null){
		ModuleProject[number] = recieve.responseJSON;
	}
	return returnStatus;
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
