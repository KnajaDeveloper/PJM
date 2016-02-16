$("#btnSaveProject").click(function(){
	var checkInputProject = checkDataProject();
	if(checkInputProject==true){
		$("#container_DataModule").show(500);
	}
});

$("#btnResetProject").click(function(){
	resetDataProject();
});	

function checkDataProject(){
	if($("#txtProjectName").val() == "" || $("#txtProjectName").val() == " ") {
		$('#txtProjectName').attr("data-content","Please Complete this field.");
		$('#txtProjectName').popover('show');
		return false;
	}
	if($("#txtInitialProjectName").val() == "" || $("#txtInitialProjectName").val() == " ") {
		$('#txtInitialProjectName').attr("data-content","Please Complete this field.");
		$('#txtInitialProjectName').popover('show');
		return false;
	}
	if($("#txtCostsProject").val() == "" || $("#txtCostsProject").val() == " ") {
		$('#txtCostsProject').attr("data-content","Please Complete this field.");
		$('#txtCostsProject').popover('show');
		return false;
	}
	else{
		var textCost = ""+$("#txtCostsProject").val();
		var checkKey = textCost.split('');
		for(var i=0;i<checkKey.length;i++){
			if(checkKey[i]!='0'&&checkKey[i]!='1'&&checkKey[i]!='2'&&checkKey[i]!='3'&&checkKey[i]!='4'&&checkKey[i]!='5'&&checkKey[i]!='6'&&checkKey[i]!='7'&&checkKey[i]!='8'&&checkKey[i]!='9'){
				$('#txtCostsProject').attr("data-content","Please enter only [0 - 9].");
				$('#txtCostsProject').popover('show');
				return false;
				break;
			}
		}
	}
	if($("#dateStartProject").val() == "" || $("#dateStartProject").val() == " ") {
		$('#dateStartProject').attr("data-content","Please Complete this field.");
		$('#dateStartProject').popover('show');
	return false;
	}
	if($("#dateEndProject").val() == "" || $("#dateEndProject").val() == " ") {
		$('#dateEndProject').attr("data-content","Please Complete this field.");
		$('#dateEndProject').popover('show');
		return false;
	}
	if($("#txtProjectManagerName1").val() == "" || $("#txtProjectManagerName1").val() == " ") {
		$('#txtProjectManagerName1').attr("data-content","Please Complete this field.");
		$('#txtProjectManagerName1').popover('show');
		return false;
	}
	return true;
}

function resetDataProject(){
	$("#txtProjectName").val("");
	$("#txtInitialProjectName").val("");
	$("#cSearchDateBegin").val("");
	$("#cSearchDateEnd").val("");
	$("#txtProjectManagerName1").val("");
	$("#txtCostsProject").val("");
	$("#dateStartProject").val("");
	$("#dateEndProject").val("");
}
