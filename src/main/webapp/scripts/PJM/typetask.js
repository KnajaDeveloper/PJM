	$("#checkAll").click(function () {
    $(".check").prop('checked', $(this).prop('checked'));
	});
	

	$("#saveAdd").click(function(){
	var typeTask = {
		typeTaskCode : $("#typeTaskCode").val(),
		typeTaskName : $("#typeTaskName").val()
	};


	var responseHeader = null;
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/typetasks',
		data : JSON.stringify(typeTask),
		complete: function(xhr){

		},
		async: false
	});
	
	
	
});

