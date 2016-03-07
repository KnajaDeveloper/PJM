$("#container_DataModule").hide();
var i = 1;
var arr_nameModule = [] , arr_initialNameModule = [] , arr_moduleManager = [] , arr_moduleMember = [] , arr_costModule = [] ,
	arr_startDate = [] , arr_endDate = [];
arr_nameModule.push("");
arr_initialNameModule.push("");
arr_moduleManager.push("");
arr_moduleMember.push("");
arr_costModule.push("");
arr_startDate.push("");
arr_endDate.push("");

$("#btnSaveModule").click(function(){
	var boolData = checkModal();
	var boolCost ;
	if(boolData==true) boolCost = checkCost($("#txtCostsModule1").val());
	if(boolData==true && boolCost == true){
		var boolSaveDB = saveModuleProjectToDB();
		if(boolSaveDB==true){
			var allModuleManager = ""+getAllModuleManager();
			var allModuleMember = ""+getAllModuleMember();
			arr_nameModule.push(""+$("#txtModuleName1").val());
			arr_initialNameModule.push(""+$("#txtInitialModuleName1").val());
			arr_moduleManager.push(""+allModuleManager);
			arr_moduleMember.push(""+allModuleMember);
			arr_costModule.push(""+$("#txtCostsModule1").val());
			arr_startDate.push(""+$("#dateStartModule").val());
			arr_endDate.push(""+$("#dateEndModule").val());
			var html="<div class='panel panel-primary' id='subrecordsModule"+i+"'>"+
				    	"<div class='panel-heading' role='tab' id='heading"+i+"'>"+
				    		"<h4 class='panel-title'>"+
					        	"<a id='headName"+i+"' role='button' data-toggle='collapse' data-parent='#collapse"+i+"' href='#collapse"+i+"' aria-expanded='true' aria-controls='collapse"+i+"'>"+
					          		"("+$("#txtInitialModuleName1").val()+")  "+$("#txtModuleName1").val()+"  ["+$("#txtCostsModule1").val()+"]"+
					        	"</a>"+
					        	"<span id='btnDeleteModule"+i+"' onclick='deleteModule(this)' type='button' class='btn btn-danger marginTop-5 pull-right'>Delete</span>"+
								"<span id='btnEditModule"+i+"' onclick='editModule(this)' type='button' data-target='#modalEditModule' data-toggle='modal' class='btn btn-warning marginTop-5 marginRight5 pull-right'>Edit</span>"+	     	
				      		"</h4>"+
				    	"</div>"+
					    "<div id='collapse"+i+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading"+i+"' style='height: auto;'>"+
					    	"<div class='panel-body'>"+
					    		"<div class='form-inline'>"+
									"<div class='col-sm-6'>"+
										"<label class='col-sm-6 control-label'>Start Date : </label>"+
										"<div class='col-sm-5 input-group'>"+
											"<label id='lbDateStartEditModule"+i+"' class='control-label'>"+$("#dateStartModule").val()+"</label>"+
										"</div>"+
									"</div>"+
									"<div class='col-sm-6'>"+
										"<label class='col-sm-3 control-label'>End Date : </label>"+
										"<div class='col-sm-5 input-group'>"+
											"<label id='lbDateEndEditModule"+i+"' class='control-label'>"+$("#dateEndModule").val()+"</label>"+
										"</div>"+
									"</div>"+
								"</div>"+
								"<div class='form-inline'>"+
									"<div class='col-sm-6'>"+
										"<label class='col-sm-6 control-label'>Module Manager :</label>"+
										"<div class='col-sm-5 input-group'>"+
											"<label id='lbEditModuleManager"+i+"' class='control-label'>"+allModuleManager+"</input>"+
										"</div>"+
									"</div>"+
									"<div class='col-sm-6'>"+
										"<label class='col-sm-3 control-label'>Module Member :</label>"+
										"<div class='col-sm-5 input-group'>"+
											"<label id='lbEditModuleMember"+i+"' class='control-label'>"+allModuleMember+"</input>"+
										"</div>"+
									"</div>"+	
								"</div>"+
					    	"</div>"+
					    "</div>"+
					"</div>";
			$("#recordsModule").append(html);
			i++;
			clearModal();
		}
	}
});

function checkModal(){
	if($("#txtModuleName1").val() == "" || $("#txtModuleName1").val() == " ") {
		$('#txtModuleName1').attr("data-placement","bottom");
		$('#txtModuleName1').attr("data-content","Please Complete this field.");
		$('#txtModuleName1').popover('show');
		return false;
	}
	if($("#txtInitialModuleName1").val() == "" || $("#txtInitialModuleName1").val() == " ") {
		$('#txtInitialModuleName1').attr("data-placement","bottom");
		$('#txtInitialModuleName1').attr("data-content","Please Complete this field.");
		$('#txtInitialModuleName1').popover('show');
		return false;
	}
	if($("#txtCostsModule1").val() == "" || $("#txtCostsModule1").val() == " ") {
		$('#txtCostsModule1').attr("data-placement","bottom");
		$('#txtCostsModule1').attr("data-content","Please Complete this field.");
		$('#txtCostsModule1').popover('show');
		return false;
	}
	else{
		var textCost = ""+$("#txtCostsModule1").val();
		var checkKey = textCost.split('');
		for(var i=0;i<checkKey.length;i++){
			if(checkKey[i]!='0'&&checkKey[i]!='1'&&checkKey[i]!='2'&&checkKey[i]!='3'&&checkKey[i]!='4'&&checkKey[i]!='5'&&checkKey[i]!='6'&&checkKey[i]!='7'&&checkKey[i]!='8'&&checkKey[i]!='9'){
				$('#txtCostsModule1').attr("data-placement","bottom");
				$('#txtCostsModule1').attr("data-content","Please enter only [0 - 9].");
				$('#txtCostsModule1').popover('show');
				return false;
				break;
			}
		}
	}
	if($("#dateStartModule").val() == "" || $("#dateStartModule").val() == " ") {
		$('#dateStartModule').attr("data-placement","bottom");
		$('#dateStartModule').attr("data-content","Please Complete this field.");
		$('#dateStartModule').popover('show');
	return false;
	}
	if($("#dateEndModule").val() == "" || $("#dateEndModule").val() == " ") {
		$('#dateEndModule').attr("data-placement","bottom");
		$('#dateEndModule').attr("data-content","Please Complete this field.");
		$('#dateEndModule').popover('show');
		return false;
	}
	var count_Element = $("[id^=txtModuleManagerName").length ;
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtModuleManagerName")[i].id;
		if($("#"+id).val() == "" || $("#"+id).val() == " ") {
			$("#"+id).attr("data-placement","bottom");
			$("#"+id).attr("data-content","Please Complete this field.");
			$("#"+id).popover('show');
			return false;
		}
	}

	count_Element = $("[id^=txtModuleMemberName").length ;
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtModuleMemberName")[i].id;
		if($("#"+id).val() == "" || $("#"+id).val() == " ") {
			$("#"+id).attr("data-placement","bottom");
			$("#"+id).attr("data-content","Please Complete this field.");
			$("#"+id).popover('show');
			return false;
		}
	}
	var boolCheckSameName = checkSameNameBeforeSave();
	if(boolCheckSameName==false) {
		bootbox.alert("It's has a same name in textbox.");
		return false;
	}
	return true;	
}

function checkCost(cost){
	var count_Element = $('[id^=btnEditModule]').length;
	var projectCost = parseInt($('#txtCostsProject').val());
	var totalModuleCost = parseInt(cost);
	for(var i=0;i<count_Element;i++) {
		var id = $('[id^=btnEditModule]')[i].id;
		var number = id.split("btnEditModule");
		if(i!=number[1]) totalModuleCost = totalModuleCost + parseInt(arr_costModule[number[1]]);
	}
	if(totalModuleCost > projectCost) {
		bootbox.alert("Total cost of module is more than project cost.");
		return false;
	}
	return true;
}

function checkEditCost(cost,skipId){
	var count_Element = $('[id^=btnEditModule]').length;
	var projectCost = parseInt($('#txtCostsProject').val());
	var totalModuleCost = parseInt(cost);
	var skip = skipId.split("btnEditSaveModule");
	var idSkip = parseInt(skip[1]);
	for(var i=1;i<=count_Element;i++) {
		if(i!=idSkip) totalModuleCost = totalModuleCost + parseInt(arr_costModule[i]);
	}
	if(totalModuleCost > projectCost) {
		bootbox.alert("Total cost of module is more than project cost.");
		return false;
	}
	return true;
}

function checkEditModal(){
	if($("#txtEditModuleName1").val() == "" || $("#txtEditModuleName1").val() == " ") {
		$('#txtEditModuleName1').attr("data-placement","bottom");
		$('#txtEditModuleName1').attr("data-content","Please Complete this field.");
		$('#txtEditModuleName1').popover('show');
		return false;
	}
	if($("#txtEditInitialModuleName1").val() == "" || $("#txtEditInitialModuleName1").val() == " ") {
		$('#txtEditInitialModuleName1').attr("data-placement","bottom");
		$('#txtEditInitialModuleName1').attr("data-content","Please Complete this field.");
		$('#txtEditInitialModuleName1').popover('show');
		return false;
	}
	if($("#txtCostsEditModule1").val() == "" || $("#txtCostsEditModule1").val() == " ") {
		$('#txtCostsEditModule1').attr("data-placement","bottom");
		$('#txtCostsEditModule1').attr("data-content","Please Complete this field.");
		$('#txtCostsEditModule1').popover('show');
		return false;
	}
	else{
		var textCost = ""+$("#txtCostsEditModule1").val();
		var checkKey = textCost.split('');
		for(var i=0;i<checkKey.length;i++){
			if(checkKey[i]!='0'&&checkKey[i]!='1'&&checkKey[i]!='2'&&checkKey[i]!='3'&&checkKey[i]!='4'&&checkKey[i]!='5'&&checkKey[i]!='6'&&checkKey[i]!='7'&&checkKey[i]!='8'&&checkKey[i]!='9'){
				$('#txtCostsEditModule1').attr("data-placement","bottom");
				$('#txtCostsEditModule1').attr("data-content","Please enter only [0 - 9].");
				$('#txtCostsEditModule1').popover('show');
				break;
			}
		}
	}
	if($("#dateStartEditModule").val() == "" || $("#dateStartEditModule").val() == " ") {
		$('#dateStartEditModule').attr("data-placement","bottom");
		$('#dateStartEditModule').attr("data-content","Please Complete this field.");
		$('#dateStartEditModule').popover('show');
	return false;
	}
	if($("#dateEndEditModule").val() == "" || $("#dateEndEditModule").val() == " ") {
		$('#dateEndEditModule').attr("data-placement","bottom");
		$('#dateEndEditModule').attr("data-content","Please Complete this field.");
		$('#dateEndEditModule').popover('show');
		return false;
	}
	var count_Element = $("[id^=txtEditModuleManagerName").length ;
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtEditModuleManagerName")[i].id;
		if($("#"+id).val() == "" || $("#"+id).val() == " ") {
			$("#"+id).attr("data-placement","bottom");
			$("#"+id).attr("data-content","Please Complete this field.");
			$("#"+id).popover('show');
			return false;
		}
	}

	count_Element = $("[id^=txtEditModuleMemberName").length ;
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtEditModuleMemberName")[i].id;
		if($("#"+id).val() == "" || $("#"+id).val() == " ") {
			$("#"+id).attr("data-placement","bottom");
			$("#"+id).attr("data-content","Please Complete this field.");
			$("#"+id).popover('show');
			return false;
		}
	}		
	return true;	
}

function clearModal(){
	$("#subModuleManager").empty()
	$("#subModuleMember").empty();
	$("#txtModuleName1").val("");
	$("#txtInitialModuleName1").val("");
	$("#txtCostsModule1").val("");
	$("#cSearchDateBegin").val("");
	$("#cSearchDateEnd").val("");
	$("#txtModuleManagerName1").val("");
	$("#txtModuleMemberName1").val("");	
	$("#dateStartModule").val("");
	$("#dateEndModule").val("");
}

function clearEditModal(){
	$("#subEditModuleManager").empty()
	$("#subEditModuleMember").empty();
}

function getAllModuleManager(){
	var allNameModuleManager = "";
	var count_Element = $('[id^=txtModuleManagerName]').length;
	for(var i = 0 ; i < count_Element ; i++){
		var id = $('[id^=txtModuleManagerName]')[i].id;
		allNameModuleManager += ""+$("#"+id).val()+"<br/>";
	}
	return allNameModuleManager;
}

function getAllModuleMember(){
	var allNameModuleMember = "";	
	var count_Element = $('[id^=txtModuleMemberName]').length;
	for(var i = 0 ; i < count_Element ; i++){
		var id = $('[id^=txtModuleMemberName]')[i].id;
		allNameModuleMember += ""+$("#"+id).val()+"<br/>";
	}
	return allNameModuleMember;
}

function getAllEditModuleManager(){
	var allNameModuleManager = "";
	var count_Element = $('[id^=txtEditModuleManagerName]').length;
	for(var i = 0 ; i < count_Element ; i++){
		var id = $('[id^=txtEditModuleManagerName]')[i].id;
		allNameModuleManager += ""+$("#"+id).val()+" <br/> ";
	}
	return allNameModuleManager;
}

function getAllEditModuleMember(){
	var allNameModuleMember = "";
	var count_Element = $('[id^=txtEditModuleMemberName]').length;
	for(var i = 0 ; i < count_Element ; i++){
		var id = $('[id^=txtEditModuleMemberName]')[i].id;
		allNameModuleMember += ""+$("#"+id).val()+"<br/>";
	}
	return allNameModuleMember;
}

function deleteModule(object){
	var id = object.id.replace("btnDeleteModule","subrecordsModule");
	bootbox.confirm("คุณต้องการลบข้อมูลที่เลือกหรือไม่", function(result) {
			if(result == true){
				var number = parseInt(id.split('subrecordsModule')[1]);
				console.log(""+number);
				var dataJsonData = {
					moduleCode: $("#headName"+number).text().split(')')[0].split('(')[1]
			    }
				reciveProject = $.ajax({
					type: "GET",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					headers: {
						Accept: "application/json"
					},
					url: contextPath + '/moduleprojects/deleteModuleByModuleCode',
					data : dataJsonData,
					complete: function(xhr){
						if(xhr.status===201 || xhr.status===200){
							$("#"+id).remove();
						}
					},
					async: false
				});
			}
	});
}

function editModule(objectModule){
	var id = objectModule.id;
	var numID = id.split("btnEditModule");
	var number = numID[1];
	editModuleName = arr_initialNameModule[parseInt(number)];
	clearEditModal();
	var changeIDbtnSave = $('[id^=btnEditSaveModule]')[0].id;
	$('#'+changeIDbtnSave).attr('id','btnEditSaveModule'+number);
	$("#txtEditModuleName1").val(arr_nameModule[number]);
	$("#txtEditInitialModuleName1").val(arr_initialNameModule[number]);
	$("#txtCostsEditModule1").val(arr_costModule[number]);
	$("#dateStartEditModule").val(arr_startDate[number]);
	$("#dateEndEditModule").val(arr_endDate[number]);
	var textModuleManager = arr_moduleManager[number];
	var splitTextModuleManager = textModuleManager.split("<br/>");
	$("#txtEditModuleManagerName1").val(splitTextModuleManager[0]);
	for(var i=2 ; i< splitTextModuleManager.length ; i++){
		var html="<div style='padding-top: 5px;' id='container_subEditModuleManager"+i+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleManagerName"+i+"'></input></div>"+
			"<button id='btnDeleteEditMM"+i+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)'>Delete</button></div>";
		$("#subEditModuleManager").append(html);
		$("#txtEditModuleManagerName"+i).val(splitTextModuleManager[i-1]);
	} 

	var textModuleMember = arr_moduleMember[number];
	var splitTextModuleMember = textModuleMember.split("<br/>");
	$("#txtEditModuleMemberName1").val(splitTextModuleMember[0]);
	for(var i=2 ; i< splitTextModuleMember.length ; i++){
		var html="<div style='padding-top: 5px;' id='container_subEditModuleMember"+i+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleMemberName"+i+"'></input></div>"+
			"<button id='btnDeleteEditMMem"+i+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)'>Delete</button></div>";
		$("#subEditModuleMember").append(html);
		$("#txtEditModuleMemberName"+i).val(splitTextModuleMember[i-1]);
	}
	countEditModuleManager = $("[id^=btnDeleteEditMM]").length ;
	countEditModuleMember = $("[id^=btnDeleteEditMMem]").length ;
}

function saveEditModule(object){
	var id = object.id;	
	var bool = checkEditModal();
	var boolSameName = checkSameNameBeforeEdit();
	var boolCheckCost = checkEditCost($("#txtCostsEditModule1").val(),id);
	var boolSameModuleCode = findSameModuleCodeWhenEdit(editModuleName);
	if(boolSameModuleCode==true){
		if(bool==true && boolSameName==true && boolCheckCost==true){
			var boolSave = editDataModuleInDB();
			if(boolSave==true){
				var allModuleManager = ""+getAllEditModuleManager();
				var allModuleMember = ""+getAllEditModuleMember();
				var number = id.split("btnEditSaveModule");
				arr_nameModule[number[1]] = $("#txtEditModuleName1").val();
				arr_initialNameModule[number[1]] = $("#txtEditInitialModuleName1").val();
				arr_costModule[number[1]] = $("#txtCostsEditModule1").val();
				$("#headName"+number[1]).text("("+$("#txtEditInitialModuleName1").val()+")  "+$("#txtEditModuleName1").val()+"  ["+$("#txtCostsEditModule1").val()+"]");
				
				arr_startDate[number[1]] = $("#dateStartEditModule").val();
				$("#lbDateStartEditModule"+number[1]).text(""+$("#dateStartEditModule").val());

				arr_endDate[number[1]] = $("#dateEndEditModule").val();
				$("#lbDateEndEditModule"+number[1]).text(""+$("#dateEndEditModule").val());

				arr_moduleManager[number[1]] = allModuleManager;
				$("#lbEditModuleManager"+number[1]).empty();
				$("#lbEditModuleManager"+number[1]).append(""+allModuleManager);

				arr_moduleMember[number[1]] = allModuleMember;
				$("#lbEditModuleMember"+number[1]).empty();
				$("#lbEditModuleMember"+number[1]).append(""+allModuleMember);

				$('#modalEditModule').modal('toggle');
			}
		}
		else if(boolSameName==false){
			bootbox.alert("It's has same name.")
		}
	}
	else {
		bootbox.alert("["+$('#txtEditInitialModuleName1').val()+"] has in database.");
	}
}

function checkSameNameBeforeEdit(){
	var count_Element = $("[id^=txtEditModuleManagerName").length;
	var arrManager = [];
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtEditModuleManagerName")[i].id;
		var name = ""+$("#"+id).val();
		if(arrManager.indexOf(""+name) < 0) arrManager.push(""+name);
		else {
			return false;
		}
	}
	var count_Element2 = $("[id^=txtEditModuleMemberName").length;
	var arrMember = [];
	for(var i=0;i<count_Element2;i++){
		var id = $("[id^=txtEditModuleMemberName")[i].id;
		var name = ""+$("#"+id).val();
		if(arrMember.indexOf(""+name) < 0) arrMember.push(""+name);
		else {
			bootbox.alert("It's has a same name in textbox.");
			return false;
		}
	}
	return true;
}

function checkSameNameBeforeSave(){
	var count_Element = $("[id^=txtModuleManagerName").length;
	var arrManager = [];
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtModuleManagerName")[i].id;
		var name = ""+$("#"+id).val();
		if(arrManager.indexOf(""+name) < 0) arrManager.push(""+name);
		else {
			return false;
		}
	}
	var count_Element2 = $("[id^=txtModuleMemberName").length;
	var arrMember = [];
	for(var i=0;i<count_Element2;i++){
		var id = $("[id^=txtModuleMemberName")[i].id;
		var name = ""+$("#"+id).val();
		if(arrMember.indexOf(""+name) < 0) arrMember.push(""+name);
		else {
			return false;
		}
	}
	return true;
}
