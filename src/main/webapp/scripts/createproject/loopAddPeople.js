var countProjectManager = 1 ;
var countModuleManager = 1 ;
var countEditModuleManager = 1 ;
var countModuleMember = 1 ;
var countEditModuleMember = 1 ;

////////////////// Module Manager //////////////////

$("#btnAddMM1").click(function(){
	var count_elements = countModuleManager;
	var html="<div style='padding-top: 5px;' id='container_subModuleManager"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtModuleManagerName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeleteMM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteModuleManager(this.id)'>Delete</button></div>";
	$("#subModuleManager").append(html);
	countModuleManager++;
});

function btnDeleteModuleManager(id) {
	id = id.replace("btnDeleteMM","container_subModuleManager");
	$("#"+id).remove();
}

$("#btnEditAddMM1").click(function(){
	var count_elements = countEditModuleManager+1;
	alert("EditAddMM1 : "+(count_elements+1));
	var html="<div style='padding-top: 5px;' id='container_subEditModuleManager"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleManagerName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeleteEditMM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)'>Delete</button></div>";
	$("#subEditModuleManager").append(html);
	countEditModuleManager++;
});

function btnDeleteEditModuleManager(id) {
	id = id.replace("btnDeleteEditMM","container_subEditModuleManager");
	$("#"+id).remove();
}

//////////////////////////////////////////////////////

////////////////// Module Member //////////////////

$("#btnAddMMem1").click(function(){
	var count_elements = countModuleMember+1;
	var html="<div style='padding-top: 5px;' id='container_subModuleMember"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtModuleMemberName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeleteMMem"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteModuleMember(this.id)'>Delete</button></div>";
	$("#subModuleMember").append(html);
	countModuleMember++;
});

function btnDeleteModuleMember(id) {
	id = id.replace("btnDeleteMMem","container_subModuleMember");
	$("#"+id).remove();
}

$("#btnEditAddMMem1").click(function(){
	var count_elements = countEditModuleMember+1;
	alert("EditAddMMem1 : "+(count_elements+1));
	var html="<div style='padding-top: 5px;' id='container_subEditModuleMember"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtEditModuleMemberName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeleteEditMMem"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)'>Delete</button></div>";
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
	var count_elements = countProjectManager;
	var html="<div style='padding-top: 5px;' id='container_subProjectManager"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtProjectManagerName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeletePM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteProjectManager(this.id)'>Delete</button></div>";
	$("#subProjectManager").append(html);
	countProjectManager++;
});

function btnDeleteProjectManager(id) {
	id = id.replace("btnDeletePM","container_subProjectManager");
	$("#"+id).remove();
}

//////////////////////////////////////////////////////

// var arr = [];
// for(var i=0;i<3;i++) arr.push(""+i);
// arr.splice(1,1);
// alert(""+arr);	