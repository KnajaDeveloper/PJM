$('#txtYear').focusout(function(){
	var bool = checkYear();
	if(bool == true) {
		searchProjectByYear(parseInt($("#txtYear").val()));
	}
});

$("#btnSearch").click(function(){
	var bool_year = checkYear();
	if(bool_year == true){
		var bool_Date = checkDate();
		if(bool_Date==true){
			showPlan();
		}
	}
});

$("#btnReset").click(function(){
	$("#txtYear").val("");
	$('#txtYear').popover('hide');
	$("#ddlProject").val($("#ddlProject option:first").val());
	$("#ddlModule").val($("#ddlModule option:first").val());
	$("#ddlTeam").val($("#ddlTeam option:first").val());
	$("#dateStart").val("");
	$("#dateEnd").val("");
});

$("#ddlProject").change(function(){
	var idProject = $("#ddlProject").val();
	if(idProject != "null" && idProject != null){
		searchModuleProjectByProjectId(idProject);
	}
});

function checkYear(){
	var textYear = ""+$("#txtYear").val();
	if(textYear=="" || textYear==" ") {
		$('#txtYear').attr("data-content","Please enter year.");
		$('#txtYear').popover('show');
		return false;
	}
	var checkKey = textYear.split('');
	for(var i=0;i<checkKey.length;i++){
		if(checkKey[i]!='0'&&checkKey[i]!='1'&&checkKey[i]!='2'&&checkKey[i]!='3'&&checkKey[i]!='4'&&checkKey[i]!='5'&&checkKey[i]!='6'&&checkKey[i]!='7'&&checkKey[i]!='8'&&checkKey[i]!='9'){
			$('#txtYear').attr("data-content","Please enter only [0 - 9].");
			$('#txtYear').popover('show');
			return false;
		}
	}
	return true;
}

function checkDate(){
	if($("#dateStart").val() == "" || $("#dateStart").val() == " ") {
		$('#dateStart').attr("data-content","Please Complete this field.");
		$('#dateStart').popover('show');
		return false;
	}
	if($("#dateEnd").val() == "" || $("#dateEnd").val() == " ") {
		$('#dateEnd').attr("data-content","Please Complete this field.");
		$('#dateEnd').popover('show');
		return false;
	}
	return true;
}

function searchProjectByYear(year){
	var dataJsonData = {
		year:year
	};
	var resultProject = $.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "GET",
		url: contextPath + '/projects/findProjectByYearAndProjectId',
		data : dataJsonData,
		complete: function(xhr){
			if(xhr.status === 201 || xhr.status === 200){

			}else if(xhr.status === 500){
				resultProject = null ;
			}
		},
		async: false
	});
	if(resultProject!=null) addDDLToProjectDDL(resultProject.responseJSON);
}

function searchModuleProjectByProjectId(projectId){
	var dataJsonData = {
		projectId:projectId
	};
	var resultModule = $.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "GET",
		url: contextPath + '/moduleprojects/findModuleByProjectId',
		data : dataJsonData,
		complete: function(xhr){
			if(xhr.status === 201 || xhr.status === 200){

			}else if(xhr.status === 500){
				resultModule = null ;
			}
		},
		async: false
	});
	if(resultModule!=null) addDDLToModuleDDL(resultModule.responseJSON);
}

function addDDLToProjectDDL(project){
	$("#ddlProject").empty();
	$("#ddlProject").append("<option value=null>-- Project Name --</option>");
	for(var i = 0 ; i < project.length ; i++){
		$("#ddlProject").append("<option value='"+project[i].id+"'>"+project[i].projectName+"</option>");
	}
}

function addDDLToModuleDDL(module){
	$("#ddlModule").empty();
	$("#ddlModule").append("<option value=null>-- Module --</option>");
	for(var i = 0 ; i < module.length ; i++){
		$("#ddlModule").append("<option value='"+module[i].id+"'>"+module[i].moduleName+"</option>");
	}
}

function showPlan(){
	var dateStart = new Date(dataDateToDataBase($('#dateStart').val(), commonData.language));
	var dateEnd = new Date(dataDateToDataBase($('#dateEnd').val(), commonData.language));
	$("#panelEmployee").show(500);
	$("#panelPlan").show(500);
	addDate(dateStart,dateEnd);
	addName();
	//addWork();
}