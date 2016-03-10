$(document).ready(function(){
    var checkdDb = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/moduleprojects/findModuleProjectByModuleProjectID',
		data: {
			id: moduleProjectID
		},
		complete: function(xhr){
		},
		async: false
	});

	checkdDb = checkdDb.responseJSON;
	$("#lblModuleNeme").text(checkdDb[0].moduleProject.moduleName);
	$("#lblModuleInitial").text(checkdDb[0].moduleProject.moduleCode);
	$("#lblModuleCost").text(checkdDb[0].moduleProject.moduleCost);
	$("#lblModuleCostBalance").text(searchTaskCost($("#lblModuleCost").text()));
	$("#lblModuleDateStart").text(DateUtil.dataDateToFrontend(checkdDb[0].moduleProject.dateStart,commonData.language));
	$("#lblModuleDateEnd").text(DateUtil.dataDateToFrontend(checkdDb[0].moduleProject.dateEnd,commonData.language));

	checkdDb.forEach(function(value){
		$("#lblModuleManager").append(value.empCode + '<br/>');
	});

	$("#lblModuleManager").append('<br/>');

	searchDataProgram();
  	$('#checkboxAllProgram').prop('checked', false);
});

function searchTaskCost(moduleCost){
    var checkdDb = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/tasks/findTaskCostforSum',
		data: {
			id: moduleProjectID
		},
		complete: function(xhr){
		},
		async: false
	});

	return moduleCost - checkdDb.responseJSON;
}