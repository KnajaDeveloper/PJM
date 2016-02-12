$("#btnAddMM1").click(function(){
	var count_elements = $('[id^=btnDeleteMM]').length;
	var html="<div style='padding-top: 5px;'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtModuleManagerName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeleteMM"+[count_elements+1]+"' type='button' class='btn btn-danger'>Delete</button></div>";
	$("#container_nameModuleManager").append(html);
});

$("#btnAddMMem1").click(function(){
	var count_elements = $('[id^=btnDeleteMMem]').length;
	var html="<div style='padding-top: 5px;'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtModuleMemberName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeleteMMem"+[count_elements+1]+"' type='button' class='btn btn-danger'>Delete</button></div>";
	$("#container_nameModuleMember").append(html);
});

////////////////// Project Manager //////////////////

$("#btnAddPM").click(function(){
	var count_elements = $('[id^=btnDeletePM]').length;
	var html="<div style='padding-top: 5px;'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
			"<input type='text' class='form-control' id='txtProjectManagerName"+[count_elements+1]+"'></input></div>"+
			"<button id='btnDeletePM"+[count_elements+1]+"' type='button' class='btn btn-danger'>Delete</button></div>";
	$("#container_nameManager").append(html);
});

$('[id^="btnDeletePM"]').click(function(){
	alert(""+this.id);
});
//////////////////////////////////////////////////////

// var arr = [];
// for(var i=0;i<3;i++) arr.push(""+i);
// arr.splice(1,1);
// alert(""+arr);	