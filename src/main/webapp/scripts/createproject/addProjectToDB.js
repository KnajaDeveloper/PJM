var dataAfterSave ;
var oldData = [];
var newData = [];
var numOfProjectManager = 0 ;

function saveProjectToDB(){
	//var boolSameProjectCode = findSameProjectCode();
	var arr_ProjectManager = projectManagerToArray();
	var statusReturn ;
		var textdateStart = $('#dateStartProject').val();
		var textdateEnd = $('#dateEndProject').val();
		var convertFormatDateStart = DateUtil.dataDateToFrontend(DateUtil.dataDateToDataBase(textdateStart, _language),'EN');
		var convertFormatDateEnd =  DateUtil.dataDateToFrontend(DateUtil.dataDateToDataBase(textdateEnd, _language),'EN');
		var crateProject = {
			projectCode: $('#txtInitialProjectName').val(),
			projectName: $('#txtProjectName').val(),
			projectCost: $('#txtCostsProject').val(),
			dateStart: convertFormatDateStart ,
			dateEnd:  convertFormatDateEnd,
			arr_ProjectManager: arr_ProjectManager
		};
		var responseHeader = null;
		dataAfterSave = $.ajax({
			headers: {
				Accept: "application/json"
			},
			type: "POST",
			url: contextPath + '/projects/saveOrUpdateProject',
			data : crateProject,
			complete: function(xhr){
				if(xhr.status === 201){
					bootbox.alert(""+Message.Save_success);
					statusReturn = true;
					$("#btnIncresePoint").show();
					$("#btnDecresePoint").show();
					$("#btnResetProject").hide();
					saveDataProject();
				}else{
					bootbox.alert(""+Message.Save_error);
					statusReturn = false;
				}
			},
			async: false
		});
	if(statusReturn==true) return true;
	else return false;
}

function updateProjectToDB(){
	//var boolSameProjectCode = findSameProjectCode();
	var projectId = dataAfterSave.responseJSON.id ;
	var arr_ProjectManager = projectManagerToArray();
	var statusReturn ;
	var textdateStart = $('#dateStartProject').val();
	var textdateEnd = $('#dateEndProject').val();
	var convertFormatDateStart = new Date(DateUtil.dataDateToDataBase(textdateStart, _language));
	var convertFormatDateEnd = new Date(DateUtil.dataDateToDataBase(textdateEnd, _language));
	var crateProject = {
		projectID: projectId,
		projectCode: $('#txtInitialProjectName').val(),
		projectName: $('#txtProjectName').val(),
		projectCost: $('#txtCostsProject').val(),
		dateStart: convertFormatDateStart ,
		dateEnd:  convertFormatDateEnd,
		arr_ProjectManager: arr_ProjectManager
	};
	var responseHeader = null;
	dataAfterSave = $.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "POST",
		url: contextPath + '/projects/updateProjectByIdProject',
		data : crateProject,
		complete: function(xhr){
			if(xhr.status === 201){
				bootbox.alert(""+Message.Save_success);
				statusReturn = true;
				var count = $("[id^=btnEditModule]").length ;
				saveDataProject();
				for(i=0;i<count;i++){
					var number = parseInt($("[id^=btnEditModule]")[i].id.split("btnEditModule")[1]);
					var object = {};
					object.id = "btnEditModule"+number;
					editModuleWhenEdit(object);
					object.id = "btnEditSaveModule"+number;
					saveEditModuleWhenEdit(object,null);
				}
			}else{
				bootbox.alert(""+Message.Save_error);
				statusReturn = false;
			}
		},
		async: false
	});
	if(statusReturn==true) return true;
	else return false;
}

function editModuleWhenEdit(objectModule){
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
		var html = "<div style='padding-top: 10px;' id='container_subEditModuleManager"+ i +"'><label class='col-sm-3 control-label'></label>" +
			"<div class='col-sm-4 display:inline-block''>"+
			"<div class='input-group display:inline-block'>"+
			"<input id='txtEditModuleManagerName"+i+"' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtEditModuleManagerName"+i+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
			"<span class='input-group-addon'>"+
			"<span id='BtntxtEditModuleManagerName"+i+"' onclick='UtilLov.lovEmp(this)' target='txtEditModuleManagerName"+i+"' class='fa fa-search' style='cursor:pointer;'>"+
			"<jsp:text/>"+
			"</span>"+
			"</span>"+
			"</input>"+
			"</div>"+
			"</div>"+
			"<button id='btnDeleteEditMM" + i + "' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)'>" + Button.Delete + "</button>"+
			"</div>";
		$("#subEditModuleManager").append(html);
		$("#txtEditModuleManagerName" + i).val(splitTextModuleManager[i - 1]);
		$("#txtEditModuleManagerName" + i).data("dataCode",""+splitTextModuleManager[i - 1].split(' ')[0]);
	}

	var textModuleMember = arr_moduleMember[number];
	var splitTextModuleMember = textModuleMember.split("<br/>");
	$("#txtEditModuleMemberName1").val(splitTextModuleMember[0]);
	$("#txtEditModuleMemberName1").data("dataCode",""+splitTextModuleMember[0].split(' ')[0]);
	$("#txtEditModuleMemberName1").disableSelection();
	for (var i = 2; i < splitTextModuleMember.length; i++) {
		var same = findSameModuleManagerOrProjectManager(splitTextModuleMember[i - 1]);
		var html =
			"<div style='padding-top: 10px;' id='container_subEditModuleMember"+ i +"'>" +
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
			html += "<button id='btnDeleteEditMMem" + i + "' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)'>" + Button.Delete + "</button>";
		else
			html += "<div class='btn'>&nbsp</div>";
		html+= "</div>";
		$("#subEditModuleMember").append(html);
		$("#txtEditModuleMemberName" + i).val(splitTextModuleMember[i - 1]);
		$("#txtEditModuleMemberName" + i).data("dataCode",""+splitTextModuleMember[i - 1].split(' ')[0]);
		if(same!="nosame"){
			if(same=="module") $("#container_subEditModuleMember" + i).attr("from","modulemanager");
			else $("#container_subEditModuleMember" + i).attr("from","project");
			$("#txtEditModuleMemberName" + i).disableSelection();
		}
	}
	countEditModuleManager = $("[id^=btnDeleteEditMM]").length;
	countEditModuleMember = $("[id^=txtEditModuleMemberName]").length;
}

function saveEditModuleWhenEdit(object,cost){
	var id = object.id;
	var number = id.split("btnEditSaveModule");
	var bool = checkEditModal();
	var boolSameName = checkSameNameBeforeEdit();
	if(cost==null) boolCheckCost = checkEditCost($("#txtCostsEditModule1").val(),id,object);
	else boolCheckCost = true;
	var boolSameModuleCode = findSameModuleCodeWhenEdit(editModuleName);
	if(boolSameModuleCode==true){
		if(bool==true && boolSameName==true && boolCheckCost==true){
			var boolSave = editDataModuleInDBWhenEdit(number[1],cost);
			if(boolSave==true){
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
				var allModuleManager = ""+getAllEditModuleManager();
				var allModuleMember = ""+getAllEditModuleMember();
				arr_nameModule[number[1]] = $("#txtEditModuleName1").val();
				arr_initialNameModule[number[1]] = $("#txtEditInitialModuleName1").val();
				arr_costModule[number[1]] = $("#txtCostsEditModule1").val();
				ModuleProject[number[1]].moduleCost = ($("#txtCostsEditModule1").val());
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

				//$('#modalEditModule').modal('toggle');
			}
		}
	}
}

function editDataModuleInDBWhenEdit(number,cost){
	var moduleCost = $("#txtCostsEditModule1").val();
	//if(cost!=null) moduleCost = cost ;
	var returnStatus = false ;
	var convertFormatDateStart = DateUtil.dataDateToFrontend(convertDate($('#dateStartEditModule').val()),'EN');
	var convertFormatDateEnd = DateUtil.dataDateToFrontend(convertDate($('#dateEndEditModule').val()),'EN');
	var crateModuleProject = {
		moduleNeedEdit: editModuleName,
		moduleCode:$("#txtEditInitialModuleName1").val() ,
		moduleName:$("#txtEditModuleName1").val() ,
		moduleCost:moduleCost,
		dateStart: convertFormatDateStart ,
		dateEnd: convertFormatDateEnd ,
		arr_moduleManager: editModuleManagerToArray() ,
		arr_moduleMember: editModuleMemberToArray() ,
		projectId: dataAfterSave.responseJSON.id
	};
	var responseHeader = null;
	var recieve = $.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "POST",
		url: contextPath + '/moduleprojects/editModuleProjectByModuleProjectCodeAndProjectId',
		data : crateModuleProject,
		complete: function(xhr){
			if(xhr.status === 201 || xhr.status === 200){
				returnStatus = true;
			}else if(xhr.status === 500){
				returnStatus = false;
			}
		},
		async: false
	});
	if(number!=null){
		ModuleProject[number] = recieve.responseJSON.ModuleProject;
	}
	return returnStatus;
}

function saveDataProject(){
	var numOfProjectManagerOld = numOfProjectManager;
	oldData[0] = $("#txtProjectName").val();
	oldData[1] = $("#txtInitialProjectName").val();
	oldData[2] = $("#txtCostsProject").val();
	oldData[3] = $("#dateStartProject").val();
	oldData[4] = $("#dateEndProject").val();
	oldData[5] = projectManagerToArray();
	numOfProjectManager = oldData[5].split('==').length;
	changeArrModuleMember(numOfProjectManagerOld);
}

function changeArrModuleMember(num){
	var count = arr_moduleMember.length;
	for(var i = 1 ; i < count ; i++){
		var newArr = "";
		var x = projectManagerToArrayDetail();
		x = x.split("==");
		for(var j = 0 ; j < x.length ; j++)
			newArr += x[j]+"<br/>";
		for(var k = num ; k < arr_moduleMember[i].split('<br/>').length ;k++) {
			if(x.indexOf(arr_moduleMember[i].split('<br/>')[k] == -1))
					newArr += arr_moduleMember[i].split('<br/>')[k];
			if(k!=arr_moduleMember[i].split('<br/>').length - 1) newArr += "<br/>";
		}
		arr_moduleMember[i] = newArr;
		$("#lbEditModuleMember"+i).empty();
		$("#lbEditModuleMember"+i).append(arr_moduleMember[i]);
	}
}

function projectManagerToArray(){
	var projectManager = "";
	for(var i=0;i<$("[id^=txtProjectManagerName").length;i++) {
		var id = $("[id^=txtProjectManagerName")[i].id;
		//projectManager+=""+$("#"+id).val();
		projectManager+=""+$("#"+id).data("dataCode");
		if(i!=$("[id^=txtProjectManagerName]").length-1) projectManager+="==";
	}
	return projectManager;
}

function projectManagerToArrayDetail(){
	var arrText = [];
	var projectManager = "";
	for(var i=0;i<$("[id^=txtProjectManagerName]").length;i++) {
		var id = $("[id^=txtProjectManagerName]")[i].id;
		if(arrText.indexOf($("#"+id).data("dataCode")) == -1){
			arrText.push($("#"+id).data("dataCode"));
			projectManager+=""+$("#"+id).data('dataCode');
			if(i!=$("[id^=txtProjectManagerName]").length-1) projectManager+="==";
		}
	}
	return projectManager;
}

function convertDate(input){
	var x = input.split('/');
	var year = parseInt(x[2])-543;
	x[2] = ""+year;
	return ""+x[1]+"/"+x[0]+"/"+x[2];
}
