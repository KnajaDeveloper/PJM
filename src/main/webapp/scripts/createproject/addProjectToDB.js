function saveProjectToDB(){
	var boolSameProjectCode = findSameProjectCode();
	var arr_ProjectManager = projectManagerToArray();
	if(boolSameProjectCode==true){
		var convertFormatDateStart = new Date(convertDate($('#dateStartProject').val()));
		var convertFormatDateEnd = new Date(convertDate($('#dateEndProject').val()));
		var crateProject = {
			projectCode: $('#txtInitialProjectName').val(),
			projectName: $('#txtProjectName').val(),
			projectCost: $('#txtCostsProject').val(),
			dateStart: convertFormatDateStart ,
			dateEnd:  convertFormatDateEnd,
			arr_ProjectManager: arr_ProjectManager
		};
		var responseHeader = null;
		$.ajax({
			headers: {
				Accept: "application/json"
			},
			type: "POST",
			url: contextPath + '/projects/saveOrUpdateProject',
			data : crateProject,
			complete: function(xhr){
				if(xhr.status === 201){
					bootbox.alert("Save Success");
				}else if(xhr.status === 500){
					bootbox.alert("Save Error");
				}
			},
			async: false
		});
	}
	else {
		bootbox.alert("["+$('#txtInitialProjectName').val()+"] has in database.");
		return false;
	}
	return true;
}

function projectManagerToArray(){
	var projectManager = "";
	for(var i=0;i<$("[id^=txtProjectManagerName").length;i++) {
		var id = $("[id^=txtProjectManagerName")[i].id
		projectManager+=""+$("#"+id).val();
		if(i!=$("[id^=txtProjectManagerName").length-1) projectManager+="==";
	}
	return projectManager;
}

function findSameProjectCode(){
	var dataJsonData = {
		projectCode:$('#txtInitialProjectName').val()
    }

    var size = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/projects/findProjectByProjectCode',
		data : dataJsonData,
		complete: function(xhr){
		},
		async: false
	});
    var returnSize = jQuery.parseJSON(size.responseText);
    if(returnSize != 0) return false;
    return true;
}

function convertDate(input){
	var x = input.split('/');
	return ""+x[1]+"/"+x[0]+"/"+x[2];
}
