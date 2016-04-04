var countProjectManager = 1 ;
var countModuleManager = 1 ;
var countEditModuleManager = 1 ;
var countModuleMember = 1 ;
var countEditModuleMember = 1 ;
var resultEmployee;

////////////////// Module Manager //////////////////

$("#btnAddMM1").click(function(){
	var count_elements = countModuleManager;
	var html="<div style='padding-top: 5px;' id='container_subModuleManager"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' style='margin-top: 5px;' id='txtModuleManagerName"+[count_elements+1]+"' onchange='moduleManagerChange(this)'></input></div>"+
			"<button id='btnDeleteMM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteModuleManager(this.id)'>"+Button.Delete+"</button></div>";
	$("#subModuleManager").append(html);
	countModuleManager++;
});

function btnDeleteModuleManager(id) {
	id = id.replace("btnDeleteMM","container_subModuleManager");
	$("#"+id).remove();
	moduleManagerChange(null);
}

$("#btnEditAddMM1").click(function(){
	var count_elements = countEditModuleManager+1;
	var html="<div style='padding-top: 5px;' id='container_subEditModuleManager"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleManagerName"+[count_elements+1]+"' style='margin-top:5px;' onchange='editModuleManagerChange(this)'></input></div>"+
			"<button id='btnDeleteEditMM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)'>"+Button.Delete+"</button></div>";
	$("#subEditModuleManager").append(html);
	countEditModuleManager++;
});

function btnDeleteEditModuleManager(id) {
	id = id.replace("btnDeleteEditMM","container_subEditModuleManager");
	$("#"+id).remove();
	editModuleManagerChange(null);
}

//////////////////////////////////////////////////////

////////////////// Module Member //////////////////

$("#btnAddMMem1").click(function(){
	var count_elements = countModuleMember+1;
	var html="<div style='padding-top: 5px;' id='container_subModuleMember"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' style='margin-top: 5px;' id='txtModuleMemberName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeleteMMem"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteModuleMember(this.id)'>"+Button.Delete+"</button></div>";
	$("#subModuleMember").append(html);
	countModuleMember++;
});

function btnDeleteModuleMember(id) {
	id = id.replace("btnDeleteMMem","container_subModuleMember");
	$("#"+id).remove();
}

$("#btnEditAddMMem1").click(function(){
	var count_elements = countEditModuleMember+1;
	var html="<div style='padding-top: 5px;' id='container_subEditModuleMember"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleMemberName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeleteEditMMem"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)'>"+Button.Delete+"</button></div>";
	$("#subEditModuleMember").append(html);
	countEditModuleMember++;
});

function btnDeleteEditModuleMember(id) {
	id = id.replace("btnDeleteEditMMem","container_subEditModuleMember");
	$("#"+id).remove();
}

//////////////////////////////////////////////////////

////////////////// Project Manager //////////////////

$("#btnAddPM").click(function(){
	loopAddPM();
});

function loopAddPM(){
	var count_elements = countProjectManager;
	//var html="<div style='padding-top: 5px;' id='container_subProjectManager"+[count_elements+1]+"'>
	// 				<label class='col-sm-3 control-label'></label>
	// 				<div class='col-sm-3'>"+
		//				"<input type='text' class='form-control' style='margin-top:5px;' id='txtProjectManagerName"+[count_elements+1]+"'></input>
		// 			</div>"+
	//				"<button id='btnDeletePM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteProjectManager(this.id)'>"+Button.Delete+"</button>
	// 			</div>";
	var html = "<div style='padding-top: 10px;' id='container_subProjectManager"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label>" +
					"<div class='col-sm-3 display:inline-block''>"+
						"<div class='input-group display:inline-block'>"+
							"<input id='txtProjectManagerName"+[count_elements+1]+"' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtProjectManagerName"+[count_elements+1]+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
								"<span class='input-group-addon'>"+
									"<span id='${id}Btn' onclick='UtilLov.lovEmp(this)' target='${id}' class='fa fa-search' style='cursor:pointer;'>"+
										"<jsp:text/>"+
									"</span>"+
								"</span>"+
							"</input>"+
						"</div>"+
					"</div>"+
					"<button id='btnDeletePM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteProjectManager(this.id)' style='margin-top: -0.5px'>"+Button.Delete+"</button>" +
				"</div>";

	$("#subProjectManager").append(html);
	countProjectManager++;
}

function btnDeleteProjectManager(id) {
	id = id.replace("btnDeletePM","container_subProjectManager");
	$("#"+id).remove();
}

//////////////////////////////////////////////////////