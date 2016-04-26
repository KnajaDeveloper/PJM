var dataDDLByCode ;
var option = "";

$("#btnIncresePoint").hide();
$("#btnDecresePoint").hide();

$("#btnIncresePoint").click(function(){
	if(compareData()==true){
		$("#modalIncreseCost").modal('show');
		option = "increse";
		addDataToDDLModule();
		$("#ddlIncreseCostModuleName").attr("readonly","true");
	}else{
		bootbox.alert(Message.Cant_make_any_action+"\n"+Message.Confirm_editing_data);
	}
});

$("#btnDecresePoint").click(function(){
	if(compareData()==true){
		$("#modalIncreseCost").modal('show');
		option = "decrese";
		addDataToDDLModule();
		$("#ddlIncreseCostModuleName").attr("readonly","true");
	}else{
		bootbox.alert(Message.Cant_make_any_action+"\n"+Message.Confirm_editing_data);
	}
});

function checkCostCanDecrese(){
	if(option=="decrese") {
		if($("[value=project]").prop("checked")==true) {
			var totalUse = 0;
			var count_Element = $("[id^=btnEditModule]").length;
			for (var i = 0; i < count_Element; i++) {
				var id = $('[id^=btnEditModule]')[i].id;
				var number = parseInt(id.split("btnEditModule")[1]);
				totalUse += ModuleProject[number].moduleCost;
			}
			var needDecrese = ($("#txtIncreseCostModuleCost").val());
			var canDecrese = ($("#txtCostsProject").val()) - totalUse;
			if (canDecrese > needDecrese) {
				saveIncreseCost(null);
			} else {
				if (canDecrese >= 0) {
					confirmWhenDecresePointLessThanCanDecrese(canDecrese);
				} else {
					bootbox.alert(Message.Can_not_decrese_from_project);
				}
			}
		}
		else {
			var totalUse = 0;
			totalUse +=  ModuleProject[$("#ddlIncreseCostModuleName").val()].moduleCost;
			var needDecrese = ($("#txtIncreseCostModuleCost").val());
			var canDecrese = totalUse - needDecrese ;
			if (totalUse >= needDecrese) {
				saveIncreseCost(null);
			} else {
				if (canDecrese > 0) {
					confirmWhenDecresePointLessThanCanDecrese(canDecrese);
				} else {
					bootbox.alert(Message.Can_not_decrese_from_project);
				}
			}
		}
	}
	else{
		saveIncreseCost(null);
	}
}

function confirmWhenDecresePointLessThanCanDecrese(canDecrese){
	bootbox.confirm(Message.You_can_decrese+" "+canDecrese+" "+Label.Point+"\n"+Message.Do_you_want_to_decrese+" "+canDecrese+" "+Message.Point_from_project+" ?", function(result) {
		if(result==true){
			saveIncreseCost(canDecrese);
		}
	});
}

function saveIncreseCost(canDecrese){
	if($("[value=project]").prop("checked")==true) {
		var bool = checkDataBeforeSave("project");
		if (bool == true) {
			if(option=="decrese") {
				if(canDecrese==null) $("#txtIncreseCostModuleCost").val("-"+$("#txtIncreseCostModuleCost").val());
				else $("#txtIncreseCostModuleCost").val("-"+canDecrese);
			}
			var editCostProject = {
				projectId: dataAfterSave.responseJSON.id,
				increseCost: $("#txtIncreseCostModuleCost").val()
			};
			var recieveProject = $.ajax({
				headers: {
					Accept: "application/json"
				},
				type: "POST",
				url: contextPath + '/projects/incresePointProjectByIdProject',
				data: editCostProject,
				complete: function (xhr) {
					if (xhr.status === 201 || xhr.status === 200) {
						if(option=="decrese")  bootbox.alert(""+Message.Decrese+" " + $("#txtIncreseCostModuleCost").val() + " "+Message.Point_from_project);
						else bootbox.alert(""+Message.Increse +" "+ ($("#txtIncreseCostModuleCost").val()) + " "+Message.Point_to_project);
						recieveProject = xhr;
						$("#txtCostsProject").val("" + recieveProject.responseJSON.projectCost);
						saveDataProject();
						return true;
					} else if (xhr.status === 500) {
						if(option=="decrese")  bootbox.alert(""+Message.Cant_Decrese+" " + $("#txtIncreseCostModuleCost").val() + " "+Message.Point_from_project);
						else bootbox.alert(""+Message.Cant_Increse+" " + $("#txtIncreseCostModuleCost").text() + " "+Message.Point_to_project);
						return false;
					}
				},
				async: false
			});
			$("#modalIncreseCost").modal('hide');
			clearModalIncresePoint();
			return true;
		} else {
			return false;
		}
	}
	else {
		var bool = checkDataBeforeSave("module");
		if (bool == true) {
			if(option=="decrese") $("#txtIncreseCostModuleCost").val("-"+$("#txtIncreseCostModuleCost").val());
			var idModuleProject = $("#ddlIncreseCostModuleName").val();
			var editCostModuleProject = {
				projectId: dataAfterSave.responseJSON.id,
				codeModuleProject: idModuleProject,
				costIncrese: $("#txtIncreseCostModuleCost").val()
			};
			var responseHeader = null;
			var textNewCost = $.ajax({
				headers: {
					Accept: "application/json"
				},
				type: "POST",
				url: contextPath + '/moduleprojects/increseCostByModuleNameAndProjectId',
				data: editCostModuleProject,
				complete: function (xhr) {
					if (xhr.status === 201 || xhr.status === 200) {
						if (option != "decrese") bootbox.alert("" + Message.Increse + " " + ($("#txtIncreseCostModuleCost").val()) + " " + Message.Point_to_module + " " + idModuleProject + ".");
						else bootbox.alert("" + Message.Decrese + " " + ($("#txtIncreseCostModuleCost").val()) + " " + Message.Point_from_module + " " + idModuleProject + ".");
						changeParameterIncreseOrDecresePointByModuleCode($("#ddlIncreseCostModuleName").val(), ($("#txtIncreseCostModuleCost").val()));
						saveDataProject();
						return true;
					} else if (xhr.status === 500) {
						if (option != "decrese") bootbox.alert("" + Message.Cant_Increse + " " + ($("#txtIncreseCostModuleCost").val()) + " " + Message.Point_to_module + " " + idModuleProject + ".");
						else bootbox.alert("" + Message.Cant_Decrese + " " + ($("#txtIncreseCostModuleCost").val()) + " " + Message.Point_from_module + " " + idModuleProject + ".");
						return false;
					}
				},
				async: false
			});
			changeCostLabelModule(textNewCost);
			$("#modalIncreseCost").modal('hide');
			clearModalIncresePoint();
			return true;
		} else {
			return false;
		}
	}
}

$("#btnSaveIncreseCostModule").click(function(){
	checkCostCanDecrese();
});

function clearModalIncresePoint(){
	$("#txtIncreseCostModuleCost").val("");
	$("[value=project]").prop("checked",true);
}

function changeParameterIncreseOrDecresePointByModuleCode(moduleCode,increseCost){
	for(var i = 1 ; i <= ModuleProject.length ; i++){
		if(ModuleProject[i].moduleCode == moduleCode) {
			ModuleProject[i].moduleCost = parseFloat(ModuleProject[i].moduleCost) + parseFloat(increseCost);
			break;
		}
	}
}

function addDataToDDLModule(){
	var dataJsonData = {
		projectId: dataAfterSave.responseJSON.id
    }

    dataDDLByCode = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/moduleprojects/findModuleByProjectId',
		data : dataJsonData,
		complete: function(xhr){

		},
		async: false
	});
    $("#ddlIncreseCostModuleName").empty();
    $("#ddlIncreseCostModuleName").append("<option value=''> </option>");
	dataDDLByCode = dataDDLByCode.responseJSON;
	if(dataDDLByCode != undefined) {
		dataDDLByCode.forEach(function (name) {
			var text = "(" + name.moduleCode + ") " + name.moduleName
			$("#ddlIncreseCostModuleName").append("<option value='"+name.moduleCode+"'>" + text + "</option>");
		});
	}
}

function checkDataBeforeSave(option){
	if(option=="module") {
		if ($("#ddlIncreseCostModuleName").val() == "") {
			$('#ddlIncreseCostModuleName').attr("data-placement", "bottom");
			$('#ddlIncreseCostModuleName').attr("data-content", Message.Please_select_module);
			$('#ddlIncreseCostModuleName').popover('show');
			return false;
		}
	}
	
	if($("#txtIncreseCostModuleCost").val() == "" || $("#txtIncreseCostModuleCost").val() == " ") {
		$('#txtIncreseCostModuleCost').attr("data-placement","bottom");
		$('#txtIncreseCostModuleCost').attr("data-content",Message.Complete_this_feld);
		$('#txtIncreseCostModuleCost').popover('show');
		return false;
	}
	else{
		var textCost = ""+$("#txtIncreseCostModuleCost").val();
		if(!$.isNumeric(textCost)){
			$('#txtIncreseCostModuleCost').attr("data-placement", "bottom");
			$('#txtIncreseCostModuleCost').attr("data-content", Message.Number_only);
			$('#txtIncreseCostModuleCost').popover('show');
			return false;
		}
		else if(parseFloat(textCost) < 0) {
			$('#txtIncreseCostModuleCost').attr("data-placement", "bottom");
			$('#txtIncreseCostModuleCost').attr("data-content", Message.Number_only);
			$('#txtIncreseCostModuleCost').popover('show');
			return false;
		}
		if(textCost.indexOf('.') > 0) {
			if (textCost.split('.')[1].length > 4) {
				$('#txtIncreseCostModuleCost').attr("data-placement", "bottom");
				$('#txtIncreseCostModuleCost').attr("data-content", Message.More_than_digit);
				$('#txtIncreseCostModuleCost').popover('show');
				return false;
			}
			else if(textCost.split('.')[1].length==0){
				$('#txtIncreseCostModuleCost').attr("data-content",Message.Number_only);
				$('#txtIncreseCostModuleCost').popover('show');
				return false;
			}
		}
		if(textCost.indexOf('.')==0){
			$('#txtIncreseCostModuleCost').attr("data-content",Message.Number_only);
			$('#txtIncreseCostModuleCost').popover('show');
			return false;
		}
	}
	return true;
}

function changeCostLabelModule(newCost){
	var newCostToText = newCost.responseText;
	var subCost = newCostToText.split(',');
	$("#txtCostsProject").val(""+subCost[0]);
	var name = $("#ddlIncreseCostModuleName").val();
	var count_Element = $("[id^=headName]").length;
	for(var i=0;i<count_Element;i++){
		var id = $("[id^=headName]")[i].id;
		var headName = $("#"+id).text();
		if(findEqualName(headName,name)) {
			var oldName = $("#"+id).text() ;
			// replace Cost in [ ] 
			var newName = replaceCost(oldName , subCost[1]);
			$("#"+id).text(newName);
		}
	}
}

function findEqualName(headName,name){
	var x = headName.split(' ');
	var y = name.split(' ');
	var head = x[0].substr(1,x[0].length-2);
	if(head == y[0]) return true;
	else return false ;
}

function replaceCost(name,newCost){
	var index = name.split('[');
	index[1] = "["+newCost+"]";
	return index[0]+index[1];
}

$("input:radio[name=project]").click(function() {
	var value = $(this).val();
	if(value=="project"){
		$("#ddlIncreseCostModuleName").attr("readonly","true");
	}else{
		$("#ddlIncreseCostModuleName").removeAttr("readonly");
	}
});
