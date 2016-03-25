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

	checkdDb.forEach(function(value){
		$("#lblModuleManager").append(value.empCode + '<br/>');
	});

	$("#lblModuleManager").append('<br/>');

	searchDataProgram();
  	$('#checkboxAllProgram').prop('checked', false);

  	$('#myInput').change(function () {
        var file = document.getElementById("myInput").files[0];
        if (file) {
            $('#fileName').text(file.name);
        }
    });

    // Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test 

    // $('#testMyInput').change(function () {
    //     var file = document.getElementById("testMyInput").files[0];
    //     if (file) {
    //         $('#testFileName').text(file.name);
    //     }
    // });

    // Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
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