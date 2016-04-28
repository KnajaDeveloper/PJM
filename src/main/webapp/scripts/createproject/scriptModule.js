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
var oldDataModule = [] ;
var newDataModule = [] ;
var oldDataEditModule = [] ;
var newDataEditModule = [] ;
var dataE1 = [],data2 = [];
$("#btnSaveModule").click(function(){
	SaveModule(null);
});

$("#btnAddModule").click(function(){
	$("#subModuleMember").empty();
	if(compareData()==true){
		$('#modalAddModule').modal('show');
		var namePM = getAllProjectManager().split("===");
		$("#txtModuleMemberName1").val(""+namePM[0]);
		$("#txtModuleMemberName1").data("dataCode",""+namePM[0].split(' ')[0]);
		$("#txtModuleMemberName1").prop('disabled',true);
		$("#txtModuleMemberName1").prop('style','background-color:white');
		for(var i = 1 ; i < namePM.length - 1 ; i++) {
			var count_elements = countModuleMember+1;
			var html = "<div style='' id='container_subModuleMember"+[count_elements+1]+"' from='project' class='form-group'><label class='col-sm-3 control-label'></label>" +
				"<div class='col-sm-4 display:inline-block''>"+
				"<div class='input-group display:inline-block'>"+
				"<input id='txtModuleMemberName"+[count_elements+1]+"' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtModuleMemberName"+[count_elements+1]+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
				"<span class='input-group-addon'>"+
				"<span id='BtntxtModuleMemberName"+[count_elements+1]+"' onclick='UtilLov.lovEmp(this)' target='txtModuleMemberName"+[count_elements+1]+"' class='fa fa-search' style='cursor:pointer;'>"+
				"<jsp:text/>"+
				"</span>"+
				"</span>"+
				"</input>"+
				"</div>"+
				"</div>"+
				"<div class='btn'></div>"+
				"</div>";

			$("#subModuleMember").append(html);
			$("#txtModuleMemberName"+[count_elements + 1]).val(""+namePM[i]);
			$("#txtModuleMemberName"+[count_elements + 1]).data("dataCode",""+namePM[i].split(' ')[0]);
			$("#txtModuleMemberName"+[count_elements + 1]).prop('disabled',true);
			$("#txtModuleMemberName"+[count_elements + 1]).prop('style','background-color:white');
			countModuleMember++;
		}
		saveDataModule();
	}else{
		bootbox.alert(Message.Cant_make_any_action+"\n"+Message.Confirm_editing_data);
	}
});

function saveDataModule(){
	oldDataModule[0] = $("#txtModuleName1").val();
	oldDataModule[1] = $("#txtInitialModuleName1").val();
	oldDataModule[2] = $("#txtCostsModule1").val();
	oldDataModule[3] = $("#dateStartModule").val();
	oldDataModule[4] = $("#dateEndModule").val();
	oldDataModule[5] = getAllModuleManager();
	oldDataModule[6] = getAllModuleMember();
}

function compareDataModule(){
	newDataModule[0] = $("#txtModuleName1").val();
	newDataModule[1] = $("#txtInitialModuleName1").val();
	newDataModule[2] = $("#txtCostsModule1").val();
	newDataModule[3] = $("#dateStartModule").val();
	newDataModule[4] = $("#dateEndModule").val();
	newDataModule[5] = getAllModuleManager();
	newDataModule[6] = getAllModuleMember();
	for(var i = 0  ; i < 7 ; i++)
		if(oldDataModule[i] != newDataModule[i]) return false;
	return true;
}

function moduleManagerChange(obj){
	$("[from=modulemanager]").remove();
	var count = $("[id^=txtModuleManagerName]").length;
	for(var i = 0 ; i < count  ; i++) {
		var textId = $("[id^=txtModuleManagerName]")[i].id;
		var checkSame = checkSameNameMember($("#"+textId).data('dataCode'));
		if(checkSame) {
			var count_elements = countModuleMember + 1;
			var html = 
				"<div style='' id='container_subModuleMember"+[count_elements+1]+"' from='modulemanager' class='form-group'>" +
					"<label class='col-sm-3 control-label'></label>" +
					"<div class='col-sm-4 display:inline-block''>"+
						"<div class='input-group display:inline-block'>"+
							"<input id='txtModuleMemberName"+[count_elements+1]+"' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtModuleMemberName"+[count_elements+1]+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
								"<span class='input-group-addon'>"+
									"<span id='BtntxtModuleMemberName"+[count_elements+1]+"' onclick='UtilLov.lovEmp(this)' target='txtModuleMemberName"+[count_elements+1]+"' class='fa fa-search' style='cursor:pointer;'>"+
										"<jsp:text/>"+
									"</span>"+
								"</span>"+
							"</input>"+
						"</div>"+
					"</div>"+
				"<div class='btn'></div>"
				"</div>";

			$("#subModuleMember").append(html);
			$("#txtModuleMemberName" + [count_elements + 1]).val("" + $("[id^=txtModuleManagerName]")[i].value);
			$("#txtModuleMemberName"+[count_elements + 1]).data("dataCode",""+$("[id^=txtModuleManagerName]")[i].value.split(' ')[0]);
			$("#txtModuleMemberName" + [count_elements + 1]).prop('disabled',true);
			$("#txtModuleMemberName" + [count_elements + 1]).prop('style','background-color:white');
			countModuleMember++;
		}
	}
}

function checkSameNameMember(text){
	var count_Element2 = $("[id^=txtModuleMemberName]").length;
	for(var i=0;i<count_Element2;i++){
		var id = $("[id^=txtModuleMemberName]")[i].id;
		var name = ""+$("#"+id).data('dataCode');
		if(name==text) {
			return false;
		}
	}
	return true;
}

function editModuleManagerChange(obj){
	$("[from=modulemanager]").remove();
	var count = $("[id^=txtEditModuleManagerName]").length;
	for(var i = 0 ; i < count  ; i++) {
		var textId = $("[id^=txtEditModuleManagerName]")[i].id;
		var checkSame = checkEditSameNameMember($("#"+textId).data('dataCode'));
		if(checkSame) {
			var count_elements = countEditModuleMember + 1;
			var html = 
				"<div style='' id='container_subEditModuleMember"+[count_elements+1]+"' from='modulemanager' class='form-group'>" +
					"<label class='col-sm-3 control-label'></label>" +
					"<div class='col-sm-4 display:inline-block''>"+
						"<div class='input-group display:inline-block'>"+
							"<input id='txtEditModuleMemberName"+[count_elements+1]+"' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtEditModuleMemberName"+[count_elements+1]+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
								"<span class='input-group-addon'>"+
									"<span id='BtntxtEditModuleMemberName"+[count_elements+1]+"' onclick='UtilLov.lovEmp(this)' target='txtEditModuleMemberName"+[count_elements+1]+"' class='fa fa-search' style='cursor:pointer;'>"+
										"<jsp:text/>"+
									"</span>"+
								"</span>"+
							"</input>"+
						"</div>"+
					"</div>"+
				"<div class='btn'></div>"+
				"</div>";
				
			$("#subEditModuleMember").append(html);
			$("#txtEditModuleMemberName" + [count_elements + 1]).val("" + $("[id^=txtEditModuleManagerName]")[i].value);
			$("#txtEditModuleMemberName" + [count_elements + 1]).data("dataCode","" + $("[id^=txtEditModuleManagerName]")[i].value.split(' ')[0]);
			$("#txtEditModuleMemberName" + [count_elements + 1]).prop('disabled',true);
			$("#txtEditModuleMemberName" + [count_elements + 1]).prop('style','background-color:white');
			countEditModuleMember++;
		}
	}
}

function checkEditSameNameMember(text){
	var count_Element2 = $("[id^=txtEditModuleMemberName]").length;
	for(var i=0;i<count_Element2;i++){
		var id = $("[id^=txtEditModuleMemberName]")[i].id;
		var name = ""+$("#"+id).data('dataCode');
		if(name==text) {
			return false;
		}
	}
	return true;
}

function getAllProjectManager(){
	var allNameProjectManager = "";
	var count_Element = $("[id^=txtProjectManagerName]").length;
	for(var i = 0 ; i < count_Element ; i++){
		var id = $("[id^=txtProjectManagerName]")[i].id;
		allNameProjectManager += ""+$("#"+id).val()+"===";
	}
	return allNameProjectManager;
}

function saveEditModule(object,cost){
	if(compareEditData()){
		bootbox.alert("" + Message.Data_no_change);
	}
	else {
		var id = object.id;
		var number = id.split("btnEditSaveModule");
		var bool = checkEditModal();
		var boolSameName = checkSameNameBeforeEdit();
		if (cost == null) boolCheckCost = checkEditCost($("#txtCostsEditModule1").val(), id, object);
		else boolCheckCost = true;
		var boolSameModuleCode = findSameModuleCodeWhenEdit(editModuleName);
		if (boolSameModuleCode == true) {
			if (bool == true && boolSameName == true && boolCheckCost == true) {
				var boolSave = editDataModuleInDB(number[1], cost);
				if (boolSave == true) {
					if (cost != null) {
						var editCostProject = {
							projectId: dataAfterSave.responseJSON.id,
							increseCost: cost
						};
						dataAfterSave = $.ajax({
							headers: {
								Accept: "application/json"
							},
							type: "POST",
							url: contextPath + '/projects/incresePointProjectByIdProject',
							data: editCostProject,
							complete: function (xhr) {
								if (xhr.status === 201 || xhr.status === 200) {
									dataAfterSave = xhr;
									$("#txtCostsProject").val("" + dataAfterSave.responseJSON.projectCost);
									saveDataProject();
									return true;
								}
							},
							async: false
						});
					}
					var allModuleManager = "" + getAllEditModuleManager();
					var allModuleMember = "" + getAllEditModuleMember();
					arr_nameModule[number[1]] = $("#txtEditModuleName1").val();
					arr_initialNameModule[number[1]] = $("#txtEditInitialModuleName1").val();
					arr_costModule[number[1]] = $("#txtCostsEditModule1").val();
					ModuleProject[number[1]].moduleCost = ($("#txtCostsEditModule1").val());
					$("#headName" + number[1]).text("(" + $("#txtEditInitialModuleName1").val() + ")  " + $("#txtEditModuleName1").val() + "  [" + $("#txtCostsEditModule1").val() + "]");

					arr_startDate[number[1]] = $("#dateStartEditModule").val();
					$("#lbDateStartEditModule" + number[1]).text("" + $("#dateStartEditModule").val());

					arr_endDate[number[1]] = $("#dateEndEditModule").val();
					$("#lbDateEndEditModule" + number[1]).text("" + $("#dateEndEditModule").val());

					arr_moduleManager[number[1]] = allModuleManager;
					$("#lbEditModuleManager" + number[1]).empty();
					$("#lbEditModuleManager" + number[1]).append("" + allModuleManager);

					arr_moduleMember[number[1]] = allModuleMember;
					$("#lbEditModuleMember" + number[1]).empty();
					$("#lbEditModuleMember" + number[1]).append("" + allModuleMember);

					$('#modalEditModule').modal('toggle');
				}
			}
			else if (boolSameName == false) {
				bootbox.alert("" + Message.It_has_same_names);
			}
		}
		else {
			bootbox.alert("[" + $('#txtEditInitialModuleName1').val() + "] " + Message.Has_in_database);
		}
	}
}

function SaveModule(cost){
	var boolData = checkModal();
	//var boolCost = checkCost();
	var boolCost = true ;
	if(boolData==true) {
		if(cost==null) boolCost = checkCost($("#txtCostsModule1").val());
		else boolCost = true;
	}
	if(boolData==true && boolCost == true){
		var boolSaveDB = saveModuleProjectToDB();
		if(boolSaveDB==true){
			if(cost!=null){
				var editCostProject = {
					projectId: dataAfterSave.responseJSON.id,
					increseCost: cost
				};
				dataAfterSave = $.ajax({
					headers: {
						Accept: "application/json"
					},
					type: "POST",
					url: contextPath + '/projects/incresePointProjectByIdProject',
					data: editCostProject,
					complete: function (xhr) {
						if (xhr.status === 201 || xhr.status === 200) {
							dataAfterSave=xhr;
							$("#txtCostsProject").val("" + dataAfterSave.responseJSON.projectCost);
							saveDataProject();
							return true;
						}
					},
					async: false
				});
			}
			var allModuleManager = ""+getAllModuleManager();
			var allModuleMember = ""+getAllModuleMember();
			arr_nameModule.push(""+$("#txtModuleName1").val());
			arr_initialNameModule.push(""+$("#txtInitialModuleName1").val());
			arr_moduleManager.push(""+allModuleManager);
			arr_moduleMember.push(""+allModuleMember);
			arr_costModule.push(""+$("#txtCostsModule1").val());
			arr_startDate.push(""+$("#dateStartModule").val());
			arr_endDate.push(""+$("#dateEndModule").val());
			var html="<div class='panel panel-default' style='outline: 1px solid gray;' id='subrecordsModule"+i+"'>"+
				"<div class='panel-heading' role='tab' id='heading"+i+"'>"+
				"<h4 class='panel-title'>"+
				"<x id='headName"+i+"' role='button' data-toggle='collapse' data-parent='#collapse"+i+"' href='#collapse"+i+"' aria-expanded='true' aria-controls='collapse"+i+"'>"+
				"("+$("#txtInitialModuleName1").val()+")  "+$("#txtModuleName1").val()+"  ["+$("#txtCostsModule1").val()+"]"+
				"</x>"+
				"<span id='btnDeleteModule"+i+"' onclick='deleteModule(this)' type='button' class='btn btn-danger marginTop-5 pull-right'>"+Button.Delete+"</span>"+
				"<span id='btnEditModule"+i+"' onclick='editModule(this)' type='button' class='btn btn-info marginTop-5 marginRight5 pull-right'>"+Button.Edit+"</span>"+
				"</h4>"+
				"</div>"+
				"<div id='collapse"+i+"' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='heading"+i+"' style='height: auto;'>"+
				"<div class='panel-body'>"+
				"<div class='form-inline'>"+
				"<div class='col-sm-6'>"+
				"<label class='col-sm-5 control-label'>"+Label.Start_Date+" : </label>"+
				"<div class='col-sm-7 input-group'>"+
				"<label id='lbDateStartEditModule"+i+"' class='pull-left'>"+$("#dateStartModule").val()+"</label>"+
				"</div>"+
				"</div>"+
				"<div class='col-sm-6'>"+
				"<label class='col-sm-5 control-label'>"+Label.End_Date+" : </label>"+
				"<div class='col-sm-7 input-group'>"+
				"<label id='lbDateEndEditModule"+i+"' class='pull-left'>"+$("#dateEndModule").val()+"</label>"+
				"</div>"+
				"</div>"+
				"</div>"+
				"<div class='form-inline'>"+
				"<div class='col-sm-6'>"+
				"<label class='col-sm-5 control-label'>"+Label.Module_manager+" :</label>"+
				"<div class='col-sm-7 input-group'>"+
				"<label id='lbEditModuleManager"+i+"' class='pull-left'>"+allModuleManager+"</input>"+
				"</div>"+
				"</div>"+
				"<div class='col-sm-6'>"+
				"<label class='col-sm-5 control-label'>"+Label.Module_member+" :</label>"+
				"<div class='col-sm-7 input-group'>"+
				"<label id='lbEditModuleMember"+i+"' class='pull-left'>"+allModuleMember+"</input>"+
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
}

function checkModal(){
	if($("#txtModuleName1").val() == "" || $("#txtModuleName1").val() == " ") {
		$('#txtModuleName1').attr("data-placement","bottom");
		$('#txtModuleName1').attr("data-content",Message.Complete_this_feld);
		$('#txtModuleName1').popover('show');
		return false;
	}
	if($("#txtInitialModuleName1").val() == "" || $("#txtInitialModuleName1").val() == " ") {
		$('#txtInitialModuleName1').attr("data-placement","bottom");
		$('#txtInitialModuleName1').attr("data-content",Message.Complete_this_feld);
		$('#txtInitialModuleName1').popover('show');
		return false;
	}
	if($("#txtCostsModule1").val() == "" || $("#txtCostsModule1").val() == " ") {
		$('#txtCostsModule1').attr("data-placement","bottom");
		$('#txtCostsModule1').attr("data-content",Message.Complete_this_feld);
		$('#txtCostsModule1').popover('show');
		return false;
	}
	else{
		var textCost = ""+$("#txtCostsModule1").val();
		if(!$.isNumeric(textCost)){
			$('#txtCostsModule1').attr("data-placement", "bottom");
			$('#txtCostsModule1').attr("data-content", Message.Number_only);
			$('#txtCostsModule1').popover('show');
			return false;
		}
		else if(parseFloat(textCost) < 0) {
			$('#txtCostsProject').attr("data-content", Message.Number_only);
			$('#txtCostsProject').popover('show');
			return false;
		}
		if(textCost.indexOf('.') > 0) {
			if (textCost.split('.')[1].length > 4) {
				$('#txtCostsModule1').attr("data-placement", "bottom");
				$('#txtCostsModule1').attr("data-content", Message.More_than_digit);
				$('#txtCostsModule1').popover('show');
				return false;
			}
			else if(textCost.split('.')[1].length==0){
				$('#txtCostsModule1').attr("data-content",Message.Number_only);
				$('#txtCostsModule1').popover('show');
				return false;
			}
		}
		if(textCost.indexOf('.')==0){
			$('#txtCostsModule1').attr("data-content",Message.Number_only);
			$('#txtCostsModule1').popover('show');
			return false;
		}
	}
	if($("#dateStartModule").val() == "" || $("#dateStartModule").val() == " ") {
		$('#dateStartModule').attr("data-placement","bottom");
		$('#dateStartModule').attr("data-content",Message.Complete_this_feld);
		$('#dateStartModule').popover('show');
	return false;
	}
	if($("#dateEndModule").val() == "" || $("#dateEndModule").val() == " ") {
		$('#dateEndModule').attr("data-placement","bottom");
		$('#dateEndModule').attr("data-content",Message.Complete_this_feld);
		$('#dateEndModule').popover('show');
		return false;
	}
	var count_Element = $("[id^=txtModuleManagerName").length ;
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtModuleManagerName")[i].id;
		if($("#"+id).val() == "" || $("#"+id).val() == " " || $("#"+id).data("dataCode") == null || $("#"+id).data("dataCode") == "") {
			$("#"+id).attr("data-placement","bottom");
			$("#"+id).attr("data-content",Message.Complete_this_feld);
			$("#"+id).popover('show');
			return false;
		}
	}

	count_Element = $("[id^=txtModuleMemberName").length ;
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtModuleMemberName")[i].id;
		if($("#"+id).val() == "" || $("#"+id).val() == " " || $("#"+id).data("dataCode") == null || $("#"+id).data("dataCode") == "") {
			$("#"+id).attr("data-placement","bottom");
			$("#"+id).attr("data-content",Message.Complete_this_feld);
			$("#"+id).popover('show');
			return false;
		}
	}
	var boolCheckSameName = checkSameNameBeforeSave();
	if(boolCheckSameName==false) {
		bootbox.alert(Message.It_has_same_names);
		return false;
	}
	return true;	
}

function checkCost(cost){
	var count_Element = $('[id^=btnEditModule]').length;
	var projectCost = ($('#txtCostsProject').val());
	var totalModuleCost = parseFloat(cost);
	for(var i=0;i<count_Element;i++) {
		var id = $('[id^=btnEditModule]')[i].id;
		var number = id.split("btnEditModule");
		if(i!=number[1]) totalModuleCost = totalModuleCost + parseFloat(arr_costModule[number[1]]);
	}
	if(totalModuleCost > projectCost) {
		confirmAddModuleWhenTotalCostMoreThanProject(totalModuleCost) ;
	}else{
		return true;
	}
}

function checkEditCost(cost,skipId,object){
	var count_Element = $('[id^=btnEditModule]').length;
	var projectCost = ($('#txtCostsProject').val());
	var totalModuleCost = parseFloat(cost);
	var skip = skipId.split("btnEditSaveModule");
	var idSkip = (skip[1]);
	for(var i=1;i<=count_Element;i++) {
		if(i!=idSkip) totalModuleCost = totalModuleCost + parseFloat(arr_costModule[i]);
	}
	if(totalModuleCost > projectCost) {
		confirmEditModuleWhenTotalCostMoreThanProject(totalModuleCost,object) ;
	}else{
		return true;
	}
}

function confirmAddModuleWhenTotalCostMoreThanProject(totalModuleCost){
	bootbox.confirm(Message.Cost_module_more_than_project+"\n"+Message.Confirm_add_module, function(result) {
		if(result==true){
			SaveModule(totalModuleCost-($("#txtCostsProject").val()));
		}
	});
}

function confirmEditModuleWhenTotalCostMoreThanProject(totalModuleCost,object){
	bootbox.confirm(""+Message.Cost_module_more_than_project+"\n"+Message.Confirm_edit_module, function(result) {
		if(result==true){
			saveEditModule(object, totalModuleCost-($("#txtCostsProject").val()));
		}
	});
}

function checkEditModal(){
	if($("#txtEditModuleName1").val() == "" || $("#txtEditModuleName1").val() == " ") {
		$('#txtEditModuleName1').attr("data-placement","bottom");
		$('#txtEditModuleName1').attr("data-content",Message.Complete_this_feld);
		$('#txtEditModuleName1').popover('show');
		return false;
	}
	if($("#txtEditInitialModuleName1").val() == "" || $("#txtEditInitialModuleName1").val() == " ") {
		$('#txtEditInitialModuleName1').attr("data-placement","bottom");
		$('#txtEditInitialModuleName1').attr("data-content",Message.Complete_this_feld);
		$('#txtEditInitialModuleName1').popover('show');
		return false;
	}
	if($("#txtCostsEditModule1").val() == "" || $("#txtCostsEditModule1").val() == " ") {
		$('#txtCostsEditModule1').attr("data-placement","bottom");
		$('#txtCostsEditModule1').attr("data-content",Message.Complete_this_feld);
		$('#txtCostsEditModule1').popover('show');
		return false;
	}
	else{
		var textCost = ""+$("#txtCostsEditModule1").val();
		if(!$.isNumeric(textCost)){
			$('#txtCostsEditModule1').attr("data-placement", "bottom");
			$('#txtCostsEditModule1').attr("data-content", Message.Number_only);
			$('#txtCostsEditModule1').popover('show');
			return false;
		}
		else if(parseFloat(textCost) < 0) {
			$('#txtCostsEditModule1').attr("data-content", Message.Number_only);
			$('#txtCostsEditModule1').popover('show');
			return false;
		}
		if(textCost.indexOf('.') > 0) {
			if (textCost.split('.')[1].length > 4) {
				$('#txtCostsEditModule1').attr("data-placement", "bottom");
				$('#txtCostsEditModule1').attr("data-content", Message.More_than_digit);
				$('#txtCostsEditModule1').popover('show');
				return false;
			}
			else if(textCost.split('.')[1].length==0){
				$('#txtCostsEditModule1').attr("data-content",Message.Number_only);
				$('#txtCostsEditModule1').popover('show');
				return false;
			}
		}
		if(textCost.indexOf('.')==0){
			$('#txtCostsEditModule1').attr("data-content",Message.Number_only);
			$('#txtCostsEditModule1').popover('show');
			return false;
		}
	}
	if($("#dateStartEditModule").val() == "" || $("#dateStartEditModule").val() == " ") {
		$('#dateStartEditModule').attr("data-placement","bottom");
		$('#dateStartEditModule').attr("data-content",Message.Complete_this_feld);
		$('#dateStartEditModule').popover('show');
	return false;
	}
	if($("#dateEndEditModule").val() == "" || $("#dateEndEditModule").val() == " ") {
		$('#dateEndEditModule').attr("data-placement","bottom");
		$('#dateEndEditModule').attr("data-content",Message.Complete_this_feld);
		$('#dateEndEditModule').popover('show');
		return false;
	}
	var count_Element = $("[id^=txtEditModuleManagerName").length ;

	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtEditModuleManagerName")[i].id;
		if($("#"+id).val() == "" || $("#"+id).val() == " " || $("#"+id).data("dataCode") == null || $("#"+id).data("dataCode") == "") {
			$("#"+id).attr("data-placement","bottom");
			$("#"+id).attr("data-content",Message.Complete_this_feld);
			$("#"+id).popover('show');
			return false;
		}
	}

	count_Element = $("[id^=txtEditModuleMemberName").length ;
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtEditModuleMemberName")[i].id;
		if($("#"+id).val() == "" || $("#"+id).val() == " " || $("#"+id).data("dataCode") == null || $("#"+id).data("dataCode") == "") {
			$("#"+id).attr("data-placement","bottom");
			$("#"+id).attr("data-content",Message.Complete_this_feld);
			$("#"+id).popover('show');
			return false;
		}
	}		
	return true;	
}

function clearModal(){
	$("#subModuleManager").empty();
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
	$("#subEditModuleManager").empty();
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

function getAllModuleManagerNoCode(){
	var allNameModuleManager = "";
	var count_Element = $('[id^=txtModuleManagerName]').length;
	for(var i = 0 ; i < count_Element ; i++){
		var id = $('[id^=txtModuleManagerName]')[i].id;
		allNameModuleManager += ""+$("#"+id).val().split(":")[1].trim()+"<br/>";
	}
	return allNameModuleManager;
}

function getAllModuleMemberNoCode(){
	var allNameModuleMember = "";
	var count_Element = $('[id^=txtModuleMemberName]').length;
	for(var i = 0 ; i < count_Element ; i++){
		var id = $('[id^=txtModuleMemberName]')[i].id;
		allNameModuleMember += ""+$("#"+id).val().split(":")[1].trim()+"<br/>";
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
	if(compareData()==true) {
		var id = object.id.replace("btnDeleteModule", "subrecordsModule");
		bootbox.confirm(Message.Confirm_delete, function (result) {
			if (result == true) {
				var number = parseInt(id.split('subrecordsModule')[1]);
				console.log("" + number);
				var dataJsonData = {
					moduleCode: $("#headName" + number).text().split(')')[0].split('(')[1],
					projectId: dataAfterSave.responseJSON.id
				}
				reciveProject = $.ajax({
					type: "GET",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					headers: {
						Accept: "application/json"
					},
					url: contextPath + '/moduleprojects/deleteModuleByModuleCodeAndProjectId',
					data: dataJsonData,
					complete: function (xhr) {
						if (xhr.status === 201 || xhr.status === 200) {
							$("#" + id).remove();
							bootbox.alert("" + Message.Delete_module_success);
						}
					},
					async: false
				});
			}
		});
	}else{
		bootbox.alert(Message.Cant_make_any_action+"\n"+Message.Confirm_editing_data);
	}
}

function editModule(objectModule){
	if(compareData()==true) {
		$("#modalEditModule").modal('show');
		var id = objectModule.id;
		var numID = id.split("btnEditModule");
		var number = numID[1];
		editModuleName = arr_initialNameModule[parseInt(number)];
		clearEditModal();
		var changeIDbtnSave = $('[id^=btnEditSaveModule]')[0].id;
		$('#' + changeIDbtnSave).attr('id', 'btnEditSaveModule' + number);
		$("#txtEditModuleName1").val(ModuleProject[number].moduleName);
		$("#txtEditInitialModuleName1").val(ModuleProject[number].moduleCode);
		$("#txtCostsEditModule1").val(ModuleProject[number].moduleCost);
		$("#dateStartEditModule").val(DateUtil.dataDateToFrontend(ModuleProject[number].dateStart, _language));
		$("#dateEndEditModule").val(DateUtil.dataDateToFrontend(ModuleProject[number].dateEnd, _language));
		var textModuleManager = arr_moduleManager[number];
		var splitTextModuleManager = textModuleManager.split("<br/>");
		$("#txtEditModuleManagerName1").val(splitTextModuleManager[0]);
		$("#txtEditModuleManagerName1").data("dataCode",""+splitTextModuleManager[0].split(' ')[0]);
		for (var i = 2; i < splitTextModuleManager.length; i++) {
			var html = "<div style='' id='container_subEditModuleManager"+ i +"' class='form-group'><label class='col-sm-3 control-label'></label>" +
				"<div class='col-sm-4 display:inline-block''>"+
				"<div class='input-group display:inline-block'>"+
				"<input id='txtEditModuleManagerName"+i+"' onchange='editModuleManagerChange(this)' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtEditModuleManagerName"+i+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
				"<span class='input-group-addon'>"+
				"<span id='BtntxtEditModuleManagerName"+i+"' onclick='UtilLov.lovEmp(this)' target='txtEditModuleManagerName"+i+"' class='fa fa-search' style='cursor:pointer;'>"+
				"<jsp:text/>"+
				"</span>"+
				"</span>"+
				"</input>"+
				"</div>"+
				"</div>"+
				"<button id='btnDeleteEditMM" + i + "' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)' style='margin:0px;'>" + Button.Delete + "</button>"+
				"</div>";
			$("#subEditModuleManager").append(html);
			$("#txtEditModuleManagerName" + i).val(splitTextModuleManager[i - 1]);
			$("#txtEditModuleManagerName" + i).data("dataCode",""+splitTextModuleManager[i - 1].split(' ')[0]);
		}

		var textModuleMember = arr_moduleMember[number];
		var splitTextModuleMember = textModuleMember.split("<br/>");
		var same1 = findSameModuleManagerOrProjectManager(splitTextModuleMember[0].split(' ')[0]);
		$("#txtEditModuleMemberName1").val(splitTextModuleMember[0]);
		$("#txtEditModuleMemberName1").data("dataCode",""+splitTextModuleMember[0].split(' ')[0]);
		$("#txtEditModuleMemberName1").prop('disabled',true);
		$("#txtEditModuleMemberName1").prop('style','background-color:white');
		if (same1 != "nosame") {
			if (same1 == "module") $("#container_subEditModuleMember1").attr("from", "modulemanager");
			else $("#container_subEditModuleMember1").attr("from", "project");
		}
		for (var i = 2; i < splitTextModuleMember.length; i++) {
			var same = findSameModuleManagerOrProjectManager(splitTextModuleMember[i - 1].split(' ')[0]);
			var html =
				"<div style='' id='container_subEditModuleMember"+ i +"' class='form-group'>" +
					"<label class='col-sm-3 control-label'></label>" +
					"<div class='col-sm-4 display:inline-block''>"+
						"<div class='input-group display:inline-block'>"+
							"<input id='txtEditModuleMemberName"+i+"' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtEditModuleMemberName"+i+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
								"<span class='input-group-addon'>"+
									"<span id='BtntxtEditModuleMemberName"+i+"' onclick='UtilLov.lovEmp(this)' target='txtEditModuleMemberName"+i+"' class='fa fa-search' style='cursor:pointer;'>"+
										"<jsp:text/>"+
									"</span>"+
								"</span>"+
							"</input>"+
						"</div>"+
					"</div>";
			if(same == "nosame")
				html += "<button id='btnDeleteEditMMem" + i + "' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)' style='margin:0px;'>" + Button.Delete + "</button>";
			else
				html += "<div class='btn' style='margin:0px;'>&nbsp</div>";
			html+= "</div>";
			$("#subEditModuleMember").append(html);
			$("#txtEditModuleMemberName" + i).val(splitTextModuleMember[i - 1]);
			$("#txtEditModuleMemberName" + i).data("dataCode",""+splitTextModuleMember[i - 1].split(' ')[0]);
			if(same!="nosame"){
				if(same=="module") $("#container_subEditModuleMember" + i).attr("from","modulemanager");
				else $("#container_subEditModuleMember" + i).attr("from","project");
				$("#txtEditModuleMemberName" + i).prop('disabled',true);
				$("#txtEditModuleMemberName" + i).prop('style','background-color:white');
			}
		}
		countEditModuleManager = $("[id^=btnDeleteEditMM]").length;
		countEditModuleMember = $("[id^=txtEditModuleMemberName]").length;
		saveDataEditModule();
	}else{
		bootbox.alert(Message.Cant_make_any_action+"\n"+Message.Confirm_editing_data);
	}
}

function saveDataEditModule(){
	oldDataEditModule[0] = $("#txtEditModuleName1").val();
	oldDataEditModule[1] = $("#txtEditInitialModuleName1").val();
	oldDataEditModule[2] = $("#txtCostsEditModule1").val();
	oldDataEditModule[3] = $("#dateStartEditModule").val();
	oldDataEditModule[4] = $("#dateEndEditModule").val();
	oldDataEditModule[5] = getAllEditModuleManager();
	oldDataEditModule[6] = getAllEditModuleMember();
}

function compareEditData(){
	newDataEditModule[0] = $("#txtEditModuleName1").val();
	newDataEditModule[1] = $("#txtEditInitialModuleName1").val();
	newDataEditModule[2] = $("#txtCostsEditModule1").val();
	newDataEditModule[3] = $("#dateStartEditModule").val();
	newDataEditModule[4] = $("#dateEndEditModule").val();
	newDataEditModule[5] = getAllEditModuleManager();
	newDataEditModule[6] = getAllEditModuleMember();
	for(var i = 0  ; i < 7 ; i++)
		if(oldDataEditModule[i] != newDataEditModule[i]) return false;
	return true;
}

function findSameModuleManagerOrProjectManager(needKnow){
	var count_Element = $("[id^=txtEditModuleManagerName]").length;
	var arrManager = [];
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtEditModuleManagerName]")[i].id;
		var name = ""+$("#"+id).data('dataCode');
		arrManager.push(""+name);
	}
	count_Element = $("[id^=txtProjectManagerName]").length;
	var arrProjectManager = [];
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtProjectManagerName]")[i].id;
		var name = ""+$("#"+id).data('dataCode');
		arrProjectManager.push(""+name.trim());
	}
	if(arrProjectManager.indexOf(""+needKnow) >= 0){
		return "project";
	}
	else if(arrManager.indexOf(""+needKnow) >= 0){
		return "module";
	}
	else{
		return "nosame";
	}
}

function checkSameNameBeforeEdit(){
	var count_Element = $("[id^=txtEditModuleManagerName").length;
	var arrManager = [];
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=txtEditModuleManagerName")[i].id;
		var name = ""+$("#"+id).data('dataCode');
		if(arrManager.indexOf(""+name) < 0) arrManager.push(""+name);
		else {
			return false;
		}
	}
	var count_Element2 = $("[id^=txtEditModuleMemberName").length;
	var arrMember = [];
	for(var i=0;i<count_Element2;i++){
		var id = $("[id^=txtEditModuleMemberName")[i].id;
		var name = ""+$("#"+id).data('dataCode');
		if(arrMember.indexOf(""+name) < 0) arrMember.push(""+name);
		else {
			bootbox.alert(Message.It_has_same_names);
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
		var name = ""+$("#"+id).data('dataCode');
		if(arrManager.indexOf(""+name) < 0) arrManager.push(""+name);
		else {
			return false;
		}
	}
	var count_Element2 = $("[id^=txtModuleMemberName").length;
	var arrMember = [];
	for(var i=0;i<count_Element2;i++){
		var id = $("[id^=txtModuleMemberName")[i].id;
		var name = ""+$("#"+id).data('dataCode');
		if(arrMember.indexOf(""+name) < 0) arrMember.push(""+name);
		else {
			return false;
		}
	}
	return true;
}

function compareData(){
	newData[0] = $("#txtProjectName").val();
	newData[1] = $("#txtInitialProjectName").val();
	newData[2] = $("#txtCostsProject").val();
	newData[3] = $("#dateStartProject").val();
	newData[4] = $("#dateEndProject").val();
	newData[5] = projectManagerToArray();
	for(var i = 0  ; i < 6 ; i++)
		if(oldData[i] != newData[i]) return false;
	return true;
}

function closeModalSaveModule(obj){
	if(compareDataModule()==false){
		bootbox.confirm(Message.Confirm_exit, function (result) {
			if (result) {
				$("#modalAddModule").modal('hide');
				clearModal();
			}
		});
	}
	else{
		$("#modalAddModule").modal('hide');
		clearModal();
	}
}

function closeModalEditModule(){
	if(compareEditData()==false){
		bootbox.confirm(Message.Confirm_exit, function (result) {
			if (result) {
				$("#modalEditModule").modal('hide');
				clearEditModal();
			}
		});
	}
	else{
		$("#modalEditModule").modal('hide');
		clearEditModal();
	}
}

function closeModalIncrese(){
	if($("#txtIncreseCostModuleCost").val() != ""){
		bootbox.confirm(Message.Confirm_exit, function (result) {
			if (result) {
				$("#modalIncreseCost").modal('hide');
				$("#txtIncreseCostModuleCost").val("");
				$(".popover ").hide()
			}
		});
	}
	else{
		$("#modalIncreseCost").modal('hide');
		$(".popover ").hide()
	}
}
