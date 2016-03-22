var dataAfterSave ;

function saveProjectToDB(){
	//var boolSameProjectCode = findSameProjectCode();
	var arr_ProjectManager = projectManagerToArray();
	var statusReturn ;
		var textdateStart = $('#dateStartProject').val();
		var textdateEnd = $('#dateEndProject').val();
		var convertFormatDateStart = new Date(DateUtil.dataDateToDataBase(textdateStart, _language));
		var convertFormatDateEnd = new Date(DateUtil.dataDateToDataBase(textdateEnd, _language));
		var crateProject = {
			projectCode: $('#txtInitialProjectName').val(),
			projectName: $('#txtProjectName').val(),
			projectCost: $('#txtCostsProject').val(),
			dateStart: convertFormatDateStart ,
			dateEnd:  convertFormatDateEnd,
			arr_ProjectManager: arr_ProjectManager
		};
		var responseHeader = null;
		dataAfterSave = $.ajax({
			headers: {
				Accept: "application/json"
			},
			type: "POST",
			url: contextPath + '/projects/saveOrUpdateProject',
			data : crateProject,
			complete: function(xhr){
				if(xhr.status === 201){
					bootbox.alert(""+Message.Save_success);
					statusReturn = true;
					$("#btnIncresePoint").show();
					$("#btnDecresePoint").show();
					$("#btnSaveProject").hide();
					$("#btnResetProject").hide();
					$("#btnAddPM").hide();
					$("[id^=btnDeletePM]").hide();
					lockDataProject();
				}else{
					bootbox.alert(""+Message.Save_error);
					statusReturn = false;
				}
			},
			async: false
		});
	if(statusReturn==true) return true;
	else return false;
}

function lockDataProject(){
	$("#txtProjectName").attr("readonly","true");
	$("#txtInitialProjectName").attr("readonly","true");
	$("#txtCostsProject").attr("readonly","true");
	//$("#dateStartProject").attr("readonly","true");
	//$("#dateEndProject").attr("readonly","true");
	$("[id^=txtProjectManagerName]").attr("readonly","true");
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
    };

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
	var year = parseInt(x[2])-543;
	x[2] = ""+year;
	return ""+x[1]+"/"+x[0]+"/"+x[2];
}
