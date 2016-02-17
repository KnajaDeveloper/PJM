$("#btnIncresePoint").click(function(){
	addDataToDDLModule();
});

function addDataToDDLModule(){
	var dataJsonData = {
		projectCode:$('#txtInitialProjectName').val()
    }

    var dataDDLByCode = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/moduleprojects/findModuleByModuleCode',
		data : dataJsonData,
		complete: function(xhr){
		},
		async: false
	});
	// ddlIncreseCostModuleName
}