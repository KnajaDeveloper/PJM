function saveModuleProjectToDB(){
	var crateModuleProject = {
			moduleCode:$("#txtInitialModuleName1").val() ,
			moduleName:$("#txtModuleName1").val() ,
			moduleCost:parseInt($("#txtCostsModule1").val()),
			dateStart:$("#dateStartModule").val() ,
			dateEnd:$("#dateEndModule").val() ,
			projectCode:$("#txtInitialProjectName").val() 
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
	return true;
}

// function findSameModuleCode(){
// 	var dataJsonData = {
// 		projectCode:$('#txtInitialModuleName1').val()
//     }

//     var size = $.ajax({
// 		type: "GET",
// 		contentType: "application/json; charset=utf-8",
// 		dataType: "json",
// 		headers: {
// 			Accept: "application/json"
// 		},
// 		url: contextPath + '/projects/findProjectByProjectCode',
// 		data : dataJsonData,
// 		complete: function(xhr){
// 		},
// 		async: false
// 	});
//     var returnSize = jQuery.parseJSON(size.responseText);
//     if(returnSize != 0) return false;
//     return true;
// }