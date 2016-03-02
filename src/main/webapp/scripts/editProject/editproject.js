var reciveProject ;
var findById = projectId ;
var countProjectManager = 0 ;
var countModuleProject = 0 ;
var countEditModuleManager = 0 ;
var countEditModuleMember = 0 ;
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
	var allModuleManager = getAllModuleManager();
	var allModuleMember = getAllModuleMember();
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

function getAllModuleManager(){
	var allNameModuleManager = "";
	var count_Element = reciveProject.responseJSON.ModuleManager.length ;
	for(var i = 0 ; i < count_Element ; i++){
		var managerName = reciveProject.responseJSON.ModuleManager[i].empCode
		allNameModuleManager += ""+managerName+"<br/>";
	}
	return allNameModuleManager;
}

function getAllModuleMember(){
	var allNameModuleMember = "";
	var count_Element = reciveProject.responseJSON.ModuleMember.length ;
	for(var i = 0 ; i < count_Element ; i++){
		var managerName = reciveProject.responseJSON.ModuleMember[i].empCode
		allNameModuleMember += ""+managerName+"<br/>";
	}
	return allNameModuleMember;
}

function editModuleEditProject(object){
	var id = object.id;
	var number = parseInt(id.split('btnEditModule')[1]);
	countEditModuleManager = reciveProject.responseJSON.ModuleManager.length + 1 ;
	countEditModuleMember = reciveProject.responseJSON.ModuleMember.length + 1 ;
	$("#subEditModuleManager").empty();
	$("#subEditModuleMember").empty();
	$("#txtEditModuleName"+number).val(reciveProject.responseJSON.ModuleProject[number-1].moduleName);
	$("#txtEditInitialModuleName"+number).val(reciveProject.responseJSON.ModuleProject[number-1].moduleCode);
	$("#txtCostsEditModule"+number).val(reciveProject.responseJSON.ModuleProject[number-1].moduleCost);
	$("#dateStartEditModule").val(""+new Date(reciveProject.responseJSON.ModuleProject[number-1].dateStart).toLocaleDateString());
	$("#dateEndEditModule").val(""+new Date(reciveProject.responseJSON.ModuleProject[number-1].dateEnd).toLocaleDateString());
	$("#txtEditModuleManagerName1").val(reciveProject.responseJSON.ModuleManager[0].empCode);
	for(var i = 2 ; i < countEditModuleManager  ; i++){
		var html="<div style='padding-top: 5px;' id='container_subEditModuleManager"+i+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleManagerName"+i+"'></input></div>"+
			"<button id='btnDeleteEditMM"+i+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)'>Delete</button></div>";
		$("#subEditModuleManager").append(html);
		$("#txtEditModuleManagerName"+i).val(reciveProject.responseJSON.ModuleManager[i-1].empCode);
	}
	$("#txtEditModuleMemberName1").val(reciveProject.responseJSON.ModuleMember[0].empCode);	
	for(var i = 2 ; i < countEditModuleMember  ; i++){
		var html="<div style='padding-top: 5px;' id='container_subEditModuleMember"+i+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleMemberName"+i+"'></input></div>"+
			"<button id='btnDeleteEditMMem"+i+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)'>Delete</button></div>";
		$("#subEditModuleMember").append(html);
		$("#txtEditModuleMemberName"+i).val(reciveProject.responseJSON.ModuleMember[i-1].empCode);
	}
}