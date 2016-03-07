var reciveProject ;
var findById = projectId ;
var countProjectManager = 0 ;
var countModuleProject = 0 ;
var countEditModuleManager = 0 ;
var countEditModuleMember = 0 ;
var arr__nameModule = [] , arr__initialNameModule = [] , arr__moduleManager = [] , arr__moduleMember = [] , arr__costModule = [] ,
	arr__startDate = [] , arr__endDate = [];
arr__nameModule.push(" ");
arr__initialNameModule.push(" ");
arr__moduleManager.push(" ");
arr__moduleMember.push(" ");
arr__costModule.push(" ");
arr__startDate.push(" ");
arr__endDate.push(" ");
var lengthJSON ;
var editHeader ;

$("#container_DataModule").show();
getDataProjectByProjectID(findById);
setData();

function getDataProjectByProjectID(findById){
	var dataJsonData = {
		projectID: findById
    }
	reciveProject = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/projects/findProjectByIdProject',
		data : dataJsonData,
		complete: function(xhr){
		},
		async: false
	});
	lengthJSON = reciveProject.responseJSON.ModuleProject.length;
	for(var i = 0 ; i < lengthJSON ; i++){
		arr__moduleManager.push(" ");
		arr__moduleMember.push(" ");
		arr__nameModule.push(" ");
		arr__initialNameModule.push(" ");
		arr__costModule.push(" ");
		arr__startDate.push(" ");
		arr__endDate.push(" ");
	}
}

function setData(){
	$("#txtProjectName").val(""+reciveProject.responseJSON.Project[0].projectName);
	$("#txtInitialProjectName").val(""+reciveProject.responseJSON.Project[0].projectCode);
	$("#txtCostsProject").val(""+reciveProject.responseJSON.Project[0].projectCost);
	$("#dateStartProject").val(""+new Date(reciveProject.responseJSON.Project[0].dateStart).toLocaleDateString());
	$("#dateEndProject").val(""+new Date(reciveProject.responseJSON.Project[0].dateEnd).toLocaleDateString());
	$("#txtProjectManagerName0").val(""+reciveProject.responseJSON.ProjectManager[0].empCode);
	for(var i=1 ; i<reciveProject.responseJSON.ProjectManager.length ; i++){
		loopAddPM();
		$("#txtProjectManagerName"+(i)).val(""+reciveProject.responseJSON.ProjectManager[i].empCode);
	}
	for (var i = 0 ; i<reciveProject.responseJSON.ModuleProject.length ;i++ ) {
		loopAddModule(countModuleProject,i);
		countModuleProject++;
	}
}

function loopAddPM(){
	var count_elements = countProjectManager;
	var html="<div style='padding-top: 5px;' id='container_subProjectManager"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtProjectManagerName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeletePM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteProjectManager(this.id)'>Delete</button></div>";
	$("#subProjectManager").append(html);
	countProjectManager++;
}

function loopAddModule(i,indexJSON){
	i++;
	var moduleCode = reciveProject.responseJSON.ModuleProject[indexJSON].moduleCode;
	var moduleName = reciveProject.responseJSON.ModuleProject[indexJSON].moduleName;
	var moduleCost = reciveProject.responseJSON.ModuleProject[indexJSON].moduleCost;
	var dateStart = new Date(reciveProject.responseJSON.ModuleProject[indexJSON].dateStart).toLocaleDateString();
	var dateEnd = new Date(reciveProject.responseJSON.ModuleProject[indexJSON].dateEnd).toLocaleDateString();
	var allModuleManager = getAllModuleManager(indexJSON);
	var allModuleMember = getAllModuleMember(indexJSON);
	var html="<div class='panel panel-primary' id='subrecordsModule"+i+"'>"+
				    	"<div class='panel-heading' role='tab' id='heading"+i+"'>"+
				    		"<h4 class='panel-title'>"+
					        	"<a id='headName"+i+"' role='button' data-toggle='collapse' data-parent='#collapse"+i+"' href='#collapse"+i+"' aria-expanded='true' aria-controls='collapse"+i+"'>"+
					          		"("+moduleCode+")  "+moduleName+"  ["+moduleCost+"]"+
					        	"</a>"+
					        	"<span id='btnDeleteModule"+i+"' onclick='deleteModule(this)' type='button' class='btn btn-danger marginTop-5 pull-right'>Delete</span>"+
								"<span id='btnEditModule"+i+"' onclick='editModuleEditProject(this)' type='button' data-target='#modalEditModule' data-toggle='modal' class='btn btn-warning marginTop-5 marginRight5 pull-right'>Edit</span>"+	     	
				      		"</h4>"+
				    	"</div>"+
					    "<div id='collapse"+i+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading"+i+"' style='height: auto;'>"+
					    	"<div class='panel-body'>"+
					    		"<div class='form-inline'>"+
									"<div class='col-sm-6'>"+
										"<label class='col-sm-6 control-label'>Start Date : </label>"+
										"<div class='col-sm-5 input-group'>"+
											"<label id='lbDateStartEditModule"+i+"' class='control-label'>"+dateStart+"</label>"+
										"</div>"+
									"</div>"+
									"<div class='col-sm-6'>"+
										"<label class='col-sm-3 control-label'>End Date : </label>"+
										"<div class='col-sm-5 input-group'>"+
											"<label id='lbDateEndEditModule"+i+"' class='control-label'>"+dateEnd+"</label>"+
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
}

function getAllModuleManager(indexJSON){
	var allNameModuleManager = "";
	var count_Element = reciveProject.responseJSON.ModuleManager[indexJSON].length ;
	for(var i = 0 ; i < count_Element ; i++){
		var managerName = reciveProject.responseJSON.ModuleManager[indexJSON][i].empCode
		allNameModuleManager += ""+managerName+"<br/>";
	}
	return allNameModuleManager;
}

function getAllModuleMember(indexJSON){
	var allNameModuleMember = "";
	var count_Element = reciveProject.responseJSON.ModuleMember[indexJSON].length ;
	for(var i = 0 ; i < count_Element ; i++){
		var managerName = reciveProject.responseJSON.ModuleMember[indexJSON][i].empCode
		allNameModuleMember += ""+managerName+"<br/>";
	}
	return allNameModuleMember;
}

function editModuleEditProject(object){
	var id = object.id;
	var number = parseInt(id.split('btnEditModule')[1]);
	editHeader = number;
	editModuleName = reciveProject.responseJSON.ModuleProject[number-1].moduleCode;
	countEditModuleManager = reciveProject.responseJSON.ModuleManager[number-1].length + 1 ;
	countEditModuleMember = reciveProject.responseJSON.ModuleMember[number-1].length + 1 ;
	$("#subEditModuleManager").empty();
	$("#subEditModuleMember").empty();
	$("#txtEditModuleName1").val(reciveProject.responseJSON.ModuleProject[number-1].moduleName);
	$("#txtEditInitialModuleName1").val(reciveProject.responseJSON.ModuleProject[number-1].moduleCode);
	$("#txtCostsEditModule1").val(reciveProject.responseJSON.ModuleProject[number-1].moduleCost);
	$("#dateStartEditModule").val(""+new Date(reciveProject.responseJSON.ModuleProject[number-1].dateStart).toLocaleDateString());
	$("#dateEndEditModule").val(""+new Date(reciveProject.responseJSON.ModuleProject[number-1].dateEnd).toLocaleDateString());
	$("#txtEditModuleManagerName1").val(reciveProject.responseJSON.ModuleManager[number-1][0].empCode);
	for(var i = 2 ; i < countEditModuleManager  ; i++){
		var html="<div style='padding-top: 5px;' id='container_subEditModuleManager"+i+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleManagerName"+i+"'></input></div>"+
			"<button id='btnDeleteEditMM"+i+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)'>Delete</button></div>";
		$("#subEditModuleManager").append(html);
		$("#txtEditModuleManagerName"+i).val(reciveProject.responseJSON.ModuleManager[number-1][i-1].empCode);
	}

	$("#txtEditModuleMemberName1").val(reciveProject.responseJSON.ModuleMember[number-1][0].empCode);
	for(var i = 2 ; i < countEditModuleMember  ; i++){
		var html="<div style='padding-top: 5px;' id='container_subEditModuleMember"+i+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleMemberName"+i+"'></input></div>"+
			"<button id='btnDeleteEditMMem"+i+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)'>Delete</button></div>";
		$("#subEditModuleMember").append(html);
		$("#txtEditModuleMemberName"+i).val(reciveProject.responseJSON.ModuleMember[number-1][i-1].empCode);
	}
	loopGetAllCost();
}

function loopGetAllCost(){
	arr__costModule = [];
	arr__costModule.push("");
	var count_Element = $("[id^=headName]").length;
	for(var i = 0 ; i < count_Element ; i++){
		arr__costModule.push(""+$("[id^=headName]")[0].text.split('[')[1].split(']')[0]);
	}
}

$("#btnSaveModule1").click(function(){
	i = countModuleProject+1;
	var boolData = checkModal();
	var boolCost ;
	if(boolData==true) boolCost = checkCost($("#txtCostsModule1").val());
	if(boolData==true && boolCost == true){
		var boolSaveDB = saveModuleProjectToDB();
		if(boolSaveDB==true){
			var allModuleManager = ""+getAllModuleManager();
			var allModuleMember = ""+getAllModuleMember();
			arr__nameModule.push(""+$("#txtModuleName1").val());
			arr__initialNameModule.push(""+$("#txtInitialModuleName1").val());
			arr__moduleManager.push(""+allModuleManager);
			arr__moduleMember.push(""+allModuleMember);
			arr__costModule.push(""+$("#txtCostsModule1").val());
			arr__startDate.push(""+$("#dateStartModule").val());
			arr__endDate.push(""+$("#dateEndModule").val());
			var html="<div class='panel panel-primary' id='subrecordsModule"+i+"'>"+
				    	"<div class='panel-heading' role='tab' id='heading"+i+"'>"+
				    		"<h4 class='panel-title'>"+
					        	"<a id='headName"+i+"' role='button' data-toggle='collapse' data-parent='#collapse"+i+"' href='#collapse"+i+"' aria-expanded='true' aria-controls='collapse"+i+"'>"+
					          		"("+$("#txtInitialModuleName1").val()+")  "+$("#txtModuleName1").val()+"  ["+$("#txtCostsModule1").val()+"]"+
					        	"</a>"+
					        	"<span id='btnDeleteModule"+i+"' onclick='deleteModule(this)' type='button' class='btn btn-danger marginTop-5 pull-right'>Delete</span>"+
								"<span id='btnEditModule"+i+"' onclick='editModuleNotInDB(this)' type='button' data-target='#modalEditModule' data-toggle='modal' class='btn btn-warning marginTop-5 marginRight5 pull-right'>Edit</span>"+	     	
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
			countModuleProject = i ;
			clearModal();
		}
	}
});

function editModuleNotInDB(object){
	var id = object.id;
	var number = parseInt(id.split('btnEditModule')[1]);
	editHeader = number;
	editModuleName = arr_initialNameModule[number];
	countEditModuleManager = arr__moduleManager.length + 1 ;
	countEditModuleMember = arr__moduleMember.length + 1 ;
	$("#subEditModuleManager").empty();
	$("#subEditModuleMember").empty();
	$("#txtEditModuleName1").val(arr__nameModule[number]);
	$("#txtEditInitialModuleName1").val(arr__initialNameModule[number]);
	$("#txtCostsEditModule1").val(arr__costModule[number]);
	$("#dateStartEditModule").val(""+new Date(arr__startDate[number]).toLocaleDateString());
	$("#dateEndEditModule").val(""+new Date(arr__endDate[number]).toLocaleDateString());
	var textModuleManager = arr__moduleManager[number];
	var splitTextModuleManager = textModuleManager.split("<br/>");
	$("#txtEditModuleManagerName1").val(splitTextModuleManager[0]);
	for(var i=2 ; i< splitTextModuleManager.length ; i++){
		var html="<div style='padding-top: 5px;' id='container_subEditModuleManager"+i+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleManagerName"+i+"'></input></div>"+
			"<button id='btnDeleteEditMM"+i+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)'>Delete</button></div>";
		$("#subEditModuleManager").append(html);
		$("#txtEditModuleManagerName"+i).val(splitTextModuleManager[i-1]);
	} 

	var textModuleMemberget = arr__moduleMember[number];
	var splitTextModuleMember = textModuleMemberget.split("<br/>");
	$("#txtEditModuleMemberName1").val(splitTextModuleMember[0]);
	for(var i=2 ; i< splitTextModuleMember.length ; i++){
		var html="<div style='padding-top: 5px;' id='container_subEditModuleMember"+i+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleMemberName"+i+"'></input></div>"+
			"<button id='btnDeleteEditMMem"+i+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)'>Delete</button></div>";
		$("#subEditModuleMember").append(html);
		$("#txtEditModuleMemberName"+i).val(splitTextModuleMember[i-1]);
	}
	loopGetAllCost();
}

function saveEditModule_(object){
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
				var number = editHeader;
				arr_nameModule[number] = $("#txtEditModuleName1").val();
				arr_initialNameModule[number] = $("#txtEditInitialModuleName1").val();
				arr_costModule[number] = $("#txtCostsEditModule1").val();
				$("#headName"+number).text("("+$("#txtEditInitialModuleName1").val()+")  "+$("#txtEditModuleName1").val()+"  ["+$("#txtCostsEditModule1").val()+"]");
				
				arr_startDate[number] = $("#dateStartEditModule").val();
				$("#lbDateStartEditModule"+number).text(""+$("#dateStartEditModule").val());

				arr_endDate[number] = $("#dateEndEditModule").val();
				$("#lbDateEndEditModule"+number).text(""+$("#dateEndEditModule").val());

				arr_moduleManager[number] = allModuleManager;
				$("#lbEditModuleManager"+number).empty();
				$("#lbEditModuleManager"+number).append(""+allModuleManager);

				arr_moduleMember[number] = allModuleMember;
				$("#lbEditModuleMember"+number).empty();
				$("#lbEditModuleMember"+number).append(""+allModuleMember);

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

$("#btnSaveEditProject").click(function(){
	var checkInputProject = checkDataProject();
	if(checkInputProject==true){
		var bool = updateProjectByIdProject();
	}
});

$("#btnResetEditProject").click(function(){
	resetDataProject();
	$("#txtProjectManagerName0").val("");
	$("#txtProjectName").val(""+reciveProject.responseJSON.Project[0].projectName);
	$("#txtInitialProjectName").val(""+reciveProject.responseJSON.Project[0].projectCode);
	$("#txtCostsProject").val(""+reciveProject.responseJSON.Project[0].projectCost);
	$("#dateStartProject").val(""+new Date(reciveProject.responseJSON.Project[0].dateStart).toLocaleDateString());
	$("#dateEndProject").val(""+new Date(reciveProject.responseJSON.Project[0].dateEnd).toLocaleDateString());
	$("#txtProjectManagerName0").val(""+reciveProject.responseJSON.ProjectManager[0].empCode);
	for(var j=1 ; i<reciveProject.responseJSON.ProjectManager.length ; j++){
		loopAddPM();
		$("#txtProjectManagerName"+(j)).val(""+reciveProject.responseJSON.ProjectManager[j].empCode);
	}
});

function updateProjectByIdProject(){
	var boolSameProjectCode = findSameProjectCode();
	var arr_ProjectManager = projectManagerToArray();
	var statusReturn ;
	if(boolSameProjectCode==true){
		var textdateStart = $('#dateStartProject').val();
		var textdateEnd = $('#dateEndProject').val();
		var convertFormatDateStart = new Date(DateUtil.dataDateToDataBase(textdateStart, _language));
		var convertFormatDateEnd = new Date(DateUtil.dataDateToDataBase(textdateEnd, _language));
		var crateProject = {
			projectID: reciveProject.responseJSON.Project[0].id,
			projectCode: $('#txtInitialProjectName').val(),
			projectName: $('#txtProjectName').val(),
			projectCost: $('#txtCostsProject').val(),
			dateStart: convertFormatDateStart ,
			dateEnd:  convertFormatDateEnd,
			arr_ProjectManager: arr_ProjectManager
		};
		var responseHeader = null;
		$.ajax({
			headers: {
				Accept: "application/json"
			},
			type: "POST",
			url: contextPath + '/projects/updateProjectByIdProject',
			data : crateProject,
			complete: function(xhr){
				if(xhr.status === 201 || xhr.status === 200){
					bootbox.alert("Edit Success");
					statusReturn = true;
				}else{
					bootbox.alert("Edit Error");
					statusReturn = false;
				}
			},
			async: false
		});
	}
	else {
		bootbox.alert("["+$('#txtInitialProjectName').val()+"] has in database.");
		return false;
	}
	if(statusReturn==true) return true;
	else return false;
}


