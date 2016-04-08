var fileName = null;
var fileSize = null;

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
		$("#lblModuleManager").append(empFirstName[i] + " " +
		empLastName[i] + " (" + empPositionName[i] + ")" + '<br/>');
	}

	searchDataProgram();
  	$('#checkboxAllProgram').prop('checked', false);

  	fileName = null;
  	$('#myInput').change(function () {
        var file = document.getElementById("myInput").files[0];
        if (file) {
        	fileName = file.name;
        	fileSize = file.size;
        	if((file.name).indexOf('.') > 20){
        		$('#fileName').text((file.name).substring(0, 20) + "...").attr("title" , file.name);
        	}else{
        		$('#fileName').text(file.name).attr("title" , file.name);
        	}
        }
    });

    $('#fileName').tooltip();
    $('#lblFileName').tooltip();
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


	empFirstName = [];
	empLastName = [];
	empPositionName = [];
	empFirstNameTask = [];
	empLastNameTask = [];
	empPositionNameTask = [];

	valueEmp = valueEmp.responseJSON
	valueEmp.forEach(function(value){
		if(!check){
			empFirstName.push(value.empFirstName);
			empLastName.push(value.empLastName);
			empPositionName.push(value.empPositionName);
		}else{
			empFirstNameTask.push(value.empFirstName);
			empLastNameTask.push(value.empLastName);
			empPositionNameTask.push(value.empPositionName);
		}
	});

	check = false;
}