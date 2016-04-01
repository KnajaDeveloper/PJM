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
	$("#lblModuleCost").text(checkdDb[0].moduleProject.moduleCost  + " " + Label.LABEL_POINT);
	$("#lblModuleCostBalance").text(searchTaskCost($("#lblModuleCost").text()) + " " + Label.LABEL_POINT);
	$("#lblModuleDateStart").text(DateUtil.dataDateToFrontend(checkdDb[0].moduleProject.dateStart, commonData.language));
	$("#lblModuleDateEnd").text(DateUtil.dataDateToFrontend(checkdDb[0].moduleProject.dateEnd, commonData.language));

	var empCode = [];
	checkdDb.forEach(function(value){
		empCode.push(value.empCode);
	});

	findEmpNameAndEmpPositionNameByEmpCode(empCode);
	for(var i = 0; i < empLastName.length; i++){
		$("#lblModuleManager").append(empLastName[i] + " " +
		empFirstName[i] + " (" + empPositionName[i] + ")" + '<br/>');
	}

	searchDataProgram();
  	$('#checkboxAllProgram').prop('checked', false);

  	$('#myInput').change(function () {
        var file = document.getElementById("myInput").files[0];
        if (file) {
            $('#fileName').text(file.name);
        }
    });
});

function searchTaskCost(moduleCost){
	moduleCost = moduleCost.split(' ')[0];
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

var empLastName = [];
var empFirstName = []; 
var empPositionName = [];
var empLastNameTask = [];
var empFirstNameTask = []; 
var empPositionNameTask = [];
var check = false;

function findEmpNameAndEmpPositionNameByEmpCode(empCode){
	var valueEmp = $.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/moduleprojects/findEmpNameAndEmpPositionNameByEmpCode',
		data: JSON.stringify(empCode),
		complete: function(xhr){
		},
		async: false
	});

	empLastName = [];
	empFirstName = [];
	empPositionName = [];
	empLastNameTask = [];
	empFirstNameTask = [];
	empPositionNameTask = [];

	valueEmp = valueEmp.responseJSON
	valueEmp.forEach(function(value){
		if(!check){
			empLastName.push(value.empLastName);
			empFirstName.push(value.empFirstName);
			empPositionName.push(value.empPositionName);
		}else{
			empLastNameTask.push(value.empLastName);
			empFirstNameTask.push(value.empFirstName);
			empPositionNameTask.push(value.empPositionName);
		}
	});

	check = false;
}