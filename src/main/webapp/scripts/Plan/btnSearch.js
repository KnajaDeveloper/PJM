findTeam();

//$('#txtYear').focusout(function(){
//	var bool = checkYear();
//	if(bool == true) {
//		var yearSearch = parseInt($("#txtYear").val());
//		if (commonData.language == "TH") yearSearch -= 543;
//		searchProjectByYear(yearSearch);
//	}
//});

$("#btnSearch").click(function(){
	//var bool_year = checkYear();
	//if(bool_year == true){
		var bool_Date = checkDate();
		if(bool_Date==true){
			showPlan();
		}
	//}
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
	var idProject = $("#ddlProject").data("data-Id");
	if(idProject != "null" && idProject != null){
		searchModuleProjectByProjectId(idProject);
	}else{
		$("#ddlModule").empty();
		$("#ddlModule").append("<option value=null></option>");
	}
});

$("#dateStart").on('change',function(){
	checkDateFormat($(this), Message.DATE_FORMAT,'');
});

function checkYear(){
	var textYear = ""+$("#txtYear").val();
	if(textYear=="" || textYear==" ") {
		$('#txtYear').attr("data-content",Message.Complete_this_feld);
		$('#txtYear').popover('show');
		return false;
	}
	if(!$.isNumeric(textCost)){
		if(parseFloat(textCost) < 0) {
			$('#txtYear').attr("data-content", "" + Message.Number_only);
			$('#txtYear').popover('show');
			return false;
		}
		return false;
	}
	if(textCost.indexOf('.') > 0) {
		if (textCost.split('.')[1].length > 4) {
			$('#txtYear').attr("data-placement", "bottom");
			$('#txtYear').attr("data-content", Message.More_than_digit);
			$('#txtYear').popover('show');
			return false;
		}
		else if(textCost.split('.')[1].length==0){
			$('#txtYear').attr("data-content",Message.Number_only);
			$('#txtYear').popover('show');
			return false;
		}
	}
	return true;
}

function checkDate(){
	if($("#dateStart").val() == "" || $("#dateStart").val() == " ") {
		$('#dateStart').attr("data-content",Message.MESSAGE_COMPLETE_DATE);
		$('#dateStart').popover('show');
		return false;
	}
	if($("#dateEnd").val() == "" || $("#dateEnd").val() == " ") {
		$('#dateEnd').attr("data-content",Message.MESSAGE_COMPLETE_DATE);
		$('#dateEnd').popover('show');
		return false;
	}
	return true;
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

function findTeam(){
	var resultTeam = $.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "GET",
		url: contextPath + '/central/findTeamAll',
		complete: function(xhr){
			if(xhr.status === 201 || xhr.status === 200){

			}else if(xhr.status === 500){
				resultTeam = null ;
			}
		},
		async: false
	});

	if(resultTeam!=null) addTeamToTeamDDL(resultTeam.responseJSON);
}

function addTeamToTeamDDL(team){
	$("#ddlTeam").empty();
	$("#ddlTeam").append("<option value=null></option>");
	for(var i = 0 ; i < team.length ; i++){
		$("#ddlTeam").append("<option value='"+team[i].id+"'>"+team[i].teamName+"</option>");
	}
}

function addDDLToProjectDDL(project){
	$("#ddlProject").empty();
	$("#ddlProject").append("<option value=null></option>");
	for(var i = 0 ; i < project.length ; i++){
		$("#ddlProject").append("<option value='"+project[i].id+"'>"+project[i].projectName+"</option>");
	}
}

function addDDLToModuleDDL(module){
	$("#ddlModule").empty();
	$("#ddlModule").append("<option value=null></option>");
	for(var i = 0 ; i < module.length ; i++){
		$("#ddlModule").append("<option value='"+module[i].id+"'>"+module[i].moduleName+"</option>");
	}
}

function showPlan(){

	clearPlan();
	var dateStart = new Date(dataDateToDataBase($('#dateStart').val(), commonData.language));
	var dateEnd = new Date(dataDateToDataBase($('#dateEnd').val(), commonData.language));
	$("#panelEmployee").show(500);
	$("#panelPlan").show(500);
	addDate(dateStart,dateEnd);
	addName();
	addWork();
}

function clearPlan(){
	$("#tableData").empty();
	var html = "<tr id='tbSevenDay'><th class='text-center' style='min-width:120px;'></th></tr>"+
		       "<tr id='tbDate'><td class='text-center' style='min-width:120px;'>"+Label.Employee_Name+"</td></tr>";
	$("#tableData").append(html);
}