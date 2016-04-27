var ModuleProject = [] ;
ModuleProject.push(null);

function saveModuleProjectToDB(){
	var boolSameModuleCode = findSameModuleCode();
	if(boolSameModuleCode==true){
		var textdateStart = $('#dateStartModule').val();
		var textdateEnd = $('#dateEndModule').val();
		var convertFormatDateStart = DateUtil.dataDateToFrontend(DateUtil.dataDateToDataBase(textdateStart, _language),'EN');
		var convertFormatDateEnd = DateUtil.dataDateToFrontend(DateUtil.dataDateToDataBase(textdateEnd, _language),'EN');
		var crateModuleProject = {
				moduleCode:$("#txtInitialModuleName1").val() ,
				moduleName:$("#txtModuleName1").val() ,
				moduleCost:$("#txtCostsModule1").val(),
				dateStart: convertFormatDateStart ,
				dateEnd: convertFormatDateEnd,
				projectId: dataAfterSave.responseJSON.id ,
				arr_moduleManager: ModuleManagerToArray() ,
				arr_moduleMember: ModuleMemberToArray()
			};
		var moduleProject =
		$.ajax({
			headers: {
				Accept: "application/json"
			},
			type: "POST",
			url: contextPath + '/moduleprojects/saveModuleProject',
			data : crateModuleProject,
			complete: function(xhr){
				if(xhr.status === 201 || xhr.status === 200){
					bootbox.alert(""+Message.Save_success);
					moduleProject = xhr ;
					$("#modalAddModule").modal('hide');
				}else if(xhr.status === 500){
					bootbox.alert(""+Message.Save_error);
					return false;
				}
			},
			async: false
		});
		ModuleProject.push(moduleProject.responseJSON.ModuleProject);
	}
	else {
		bootbox.alert("["+$('#txtInitialModuleName1').val()+"]"+Message.Has_in_project);
		return false;
	}
	return true;
}

function ModuleManagerToArray(){
	var moduleManager = "";
	for(var i=0;i<$("[id^=txtModuleManagerName]").length;i++) {
		var id = $("[id^=txtModuleManagerName]")[i].id;
		//moduleManager+=""+$("#"+id).val();
		moduleManager+=""+$("#"+id).data("dataCode");
		if(i!=$("[id^=txtModuleManagerName]").length-1) moduleManager+="==";
	}
	return moduleManager;
}

function ModuleMemberToArray(){
	var moduleMember = "";
	for(var i=0;i<$("[id^=txtModuleMemberName]").length;i++) {
		var id = $("[id^=txtModuleMemberName]")[i].id;
		//moduleMember+=""+$("#"+id).val()
		moduleMember+=""+$("#"+id).data("dataCode");
		if(i!=$("[id^=txtModuleMemberName]").length-1) moduleMember+="==";
	}
	return moduleMember;
}

function findSameModuleCode(){
	var retutnStatus = false ;
	var dataJsonData = {
		moduleCode:$('#txtInitialModuleName1').val(),
		projectId:dataAfterSave.responseJSON.id,
		option:"size"
    };

    var size = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/moduleprojects/findModuleByModuleCodeAndProjectId',
		data : dataJsonData,
		complete: function(xhr){
		},
		async: false
	});
    var returnSize = size.responseJSON;
    if(returnSize > 0) retutnStatus=false;
    else retutnStatus=true;
	return retutnStatus;
}

function findSameModuleCodeWhenEdit(editModuleName){
	if(editModuleName==$('#txtEditInitialModuleName1').val()) return true;
	var dataJsonData = {
		moduleCode:$('#txtEditInitialModuleName1').val(),
		id:dataAfterSave.responseJSON.id,
		option:"size"
    }

    var size = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/moduleprojects/findModuleByModuleCodeAndProjectId',
		data : dataJsonData,
		complete: function(xhr){
		},
		async: false
	});
    var returnSize = jQuery.parseJSON(size.responseText);
    if(returnSize != 0) return true;
    return false
}