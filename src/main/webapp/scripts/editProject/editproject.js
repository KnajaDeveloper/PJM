var dataDetail ;
var i = 1;
var oldDataProject = [] ;
var newDataProject = [] ;
var editModuleName = "";
var countEditModuleManager ;
var countEditModuleMember ;
var dataDDLByCode ;
var option = "";

findData(projectId);

$("#btnSaveModule").click(function(){
    SaveModule(null);
});

$("#btnSaveProject").click(function(){
    keepDataForCheckChange("project","newDataProject");
    if(checkChangeData()==false) {
        var checkInputProject = checkDataProject();
        if (checkInputProject == true) {
            confirmEditProject();
        }
    }
});

$("#btnEditAddMM1").click(function(){
    var count_elements = countEditModuleManager+1;
    var html="<div style='padding-top: 5px;' id='container_subEditModuleManager"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
        "<input type='text' class='form-control' id='txtEditModuleManagerName"+[count_elements+1]+"' style='margin-top:5px;'></input></div>"+
        "<button id='btnDeleteEditMM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)'>"+Button.Delete+"</button></div>";
    $("#subEditModuleManager").append(html);
    countEditModuleManager++;
});

$("#btnEditAddMMem1").click(function(){
    var count_elements = countEditModuleMember+1;
    var html="<div style='padding-top: 5px;' id='container_subEditModuleMember"+[count_elements+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
        "<input type='text' class='form-control' id='txtEditModuleMemberName"+[count_elements+1]+"'></input></div>"+
        "<button id='btnDeleteEditMMem"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)'>"+Button.Delete+"</button></div>";
    $("#subEditModuleMember").append(html);
    countEditModuleMember++;
});

function EditProjectByProjectId(){
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
    var project = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "POST",
        url: contextPath + '/projects/updateProjectByIdProject',
        data : crateProject,
        complete: function(xhr){
            if(xhr.status === 201){
                bootbox.alert(""+Message.Edit_success);
                statusReturn = true;
            }else{
                bootbox.alert(""+Message.Edit_error);
                statusReturn = false;
            }
        },
        async: false
    });
    if(statusReturn==true) {
        dataDetail.responseJSON.Project = project ;
        return true;
    }
    else return false;
}

function saveEditModule(object,cost){
    var id = object.id;
    var number = id.split("btnEditSaveModule");
    var bool = checkEditModal();
    var boolSameName = checkSameNameBeforeEdit();
    if(cost==null) boolCheckCost = checkEditCost($("#txtCostsEditModule1").val(),id,object);
    else boolCheckCost = true;
    var boolSameModuleCode = findSameModuleCodeWhenEdit(editModuleName);
    if(boolSameModuleCode==true){
        if(bool==true && boolSameName==true && boolCheckCost==true){
            var boolSave = editDataModuleInDB(number[1],cost);
            if(boolSave==true){
                findDataKeepToParameter(projectId);
                if(cost!=null){
                    var editCostProject = {
                        projectId: projectId,
                        increseCost: cost
                    };
                    var project = $.ajax({
                        headers: {
                            Accept: "application/json"
                        },
                        type: "POST",
                        url: contextPath + '/projects/incresePointProjectByIdProject',
                        data: editCostProject,
                        complete: function (xhr) {
                            if (xhr.status === 201 || xhr.status === 200) {
                                findDataKeepToParameter(projectId);
                                $("#txtCostsProject").val("" + dataDetail.responseJSON.Project[0].projectCost);
                                return true;
                            }
                        },
                        async: false
                    });
                }
                var allModuleManager = ""+getAllEditModuleManager();
                var allModuleMember = ""+getAllEditModuleMember();
                $("#headName"+number[1]).text("("+$("#txtEditInitialModuleName1").val()+")  "+$("#txtEditModuleName1").val()+"  ["+$("#txtCostsEditModule1").val()+"]");
                $("#lbDateStartEditModule"+number[1]).text(""+$("#dateStartEditModule").val());
                $("#lbDateEndEditModule"+number[1]).text(""+$("#dateEndEditModule").val());
                $("#lbEditModuleManager"+number[1]).empty();
                $("#lbEditModuleManager"+number[1]).append(""+allModuleManager);
                $("#lbEditModuleMember"+number[1]).empty();
                $("#lbEditModuleMember"+number[1]).append(""+allModuleMember);

                $('#modalEditModule').modal('toggle');
            }
        }
        else if(boolSameName==false){
            bootbox.alert(""+Message.It_has_same_names)
        }
    }
    else {
        bootbox.alert("["+$('#txtEditInitialModuleName1').val()+"] "+Message.Has_in_database);
    }
}

function editDataModuleInDB(number,cost){
    var moduleCost = parseInt($("#txtCostsEditModule1").val());
    //if(cost!=null) moduleCost += cost ;
    var returnStatus = false ;
    var convertFormatDateStart =DateUtil.dataDateToFrontend($('#dateStartEditModule').val(), _language);
    var convertFormatDateEnd = DateUtil.dataDateToFrontend($('#dateEndEditModule').val(), _language);
    var crateModuleProject = {
        moduleNeedEdit: editModuleName,
        moduleCode:$("#txtEditInitialModuleName1").val() ,
        moduleName:$("#txtEditModuleName1").val() ,
        moduleCost: moduleCost,
        dateStart: convertFormatDateStart ,
        dateEnd: convertFormatDateEnd ,
        arr_moduleManager: editModuleManagerToArray() ,
        arr_moduleMember: editModuleMemberToArray() ,
        projectId: projectId
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
                bootbox.alert(""+Message.Edit_success);
                returnStatus = true;
            }else if(xhr.status === 500){
                bootbox.alert(""+Message.Edit_error);
                returnStatus = false;
            }
        },
        async: false
    });
    if(number!=null){

    }
    return returnStatus;
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
            bootbox.alert(Message.It_has_same_names);
            return false;
        }
    }
    return true;
}

function projectManagerToArray(){
    var projectManager = "";
    for(var i=0;i<$("[id^=txtProjectManagerName").length;i++) {
        var id = $("[id^=txtProjectManagerName")[i].id
        projectManager+=""+$("#"+id).val();
        if(i!=$("[id^=txtProjectManagerName").length-1) projectManager+="==";
    }
    return projectManager;
}

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

function SaveModule(cost){
    var boolData = checkModal();
    var boolCost = checkCost();
    if(boolData==true) {
        if(cost==null) boolCost = checkCost($("#txtCostsModule1").val());
        else boolCost = true;
    }
    if(boolData==true && boolCost == true){
        var boolSaveDB = saveModuleProjectToDB();
        if(boolSaveDB==true){
            var allModuleManager = moduleManagerToFrontEnd(dataDetail.responseJSON.ModuleProject.length - 1);
            var allModuleMember = moduleMemberToFrontEnd(dataDetail.responseJSON.ModuleProject.length - 1);
            if(cost!=null){
                var editCostProject = {
                    projectId: projectId,
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
                            return true;
                        }
                    },
                    async: false
                });
            }
            i = dataDetail.responseJSON.ModuleProject.length - 1;
            var html="<div class='panel panel-primary' id='subrecordsModule"+i+"'>"+
                "<div class='panel-heading' role='tab' id='heading"+i+"'>"+
                "<h4 class='panel-title'>"+
                "<x id='headName"+i+"' role='button' data-toggle='collapse' data-parent='#collapse"+i+"' href='#collapse"+i+"' aria-expanded='true' aria-controls='collapse"+i+"'>"+
                "("+$("#txtInitialModuleName1").val()+")  "+$("#txtModuleName1").val()+"  ["+$("#txtCostsModule1").val()+"]"+
                "</x>"+
                "<span id='btnDeleteModule"+i+"' onclick='deleteModule(this)' type='button' class='btn btn-danger marginTop-5 pull-right'>"+Button.Delete+"</span>"+
                "<span id='btnEditModule"+i+"' onclick='editModule(this)' type='button' data-target='#modalEditModule' data-toggle='modal' class='btn btn-warning marginTop-5 marginRight5 pull-right'>"+Button.Edit+"</span>"+
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
}

function findData(projectId){
    dataDetail = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/projects/findProjectByIdProject',
        data: {
            projectID: projectId
        },
        complete: function(xhr){
            dataDetail = xhr ;
            setData();
        },
        async: false
    });
}

function findDataKeepToParameter(projectId){
    dataDetail = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/projects/findProjectByIdProject',
        data: {
            projectID: projectId
        },
        complete: function(xhr){
            dataDetail = xhr ;
        },
        async: false
    });
}

function setData(){
    $("#txtProjectName").val(""+dataDetail.responseJSON.Project[0].projectName);
    $("#txtInitialProjectName").val(""+dataDetail.responseJSON.Project[0].projectCode);
    $("#txtCostsProject").val(""+dataDetail.responseJSON.Project[0].projectCost);
    $("#dateStartProject").val(""+DateUtil.dataDateToFrontend(dataDetail.responseJSON.Project[0].dateStart, commonData.language));
    $("#dateEndProject").val(""+DateUtil.dataDateToFrontend(dataDetail.responseJSON.Project[0].dateEnd, commonData.language));
    var count_PM = dataDetail.responseJSON.ProjectManager.length;
    $("#txtProjectManagerName1").val(""+dataDetail.responseJSON.ProjectManager[0].empCode);
    for(var j = 1 ; j < count_PM ; j++) {
        var html="<div style='padding-top: 5px;' id='container_subProjectManager"+[count_PM+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
            "<input type='text' class='form-control' style='margin-top:5px;' id='txtProjectManagerName"+[j+1]+"'></input></div>"+
            "<button id='btnDeletePM"+[count_PM+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteProjectManager(this.id)'>"+Button.Delete+"</button></div>";
        $("#subProjectManager").append(html);
        $("#txtProjectManagerName"+(j+1)).val(""+dataDetail.responseJSON.ProjectManager[j].empCode);
    }
    var countModule = dataDetail.responseJSON.ModuleProject.length;
    for(var i = 0 ; i < countModule ; i++){
        var allModuleManager = moduleManagerToFrontEnd(i);
        var allModuleMember = moduleMemberToFrontEnd(i);
        var html="<div class='panel panel-primary' id='subrecordsModule"+i+"'>"+
            "<div class='panel-heading' role='tab' id='heading"+i+"'>"+
            "<h4 class='panel-title'>"+
            "<x id='headName"+i+"' role='button' data-toggle='collapse' data-parent='#collapse"+i+"' href='#collapse"+i+"' aria-expanded='true' aria-controls='collapse"+i+"'>"+
            "("+dataDetail.responseJSON.ModuleProject[i].moduleCode+")  "+dataDetail.responseJSON.ModuleProject[i].moduleName+"  ["+dataDetail.responseJSON.ModuleProject[i].moduleCost+"]"+
            "</x>"+
            "<span id='btnDeleteModule"+i+"' onclick='deleteModule(this)' type='button' class='btn btn-danger marginTop-5 pull-right'>"+Button.Delete+"</span>"+
            "<span id='btnEditModule"+i+"' onclick='editModule(this)' type='button' data-target='#modalEditModule' data-toggle='modal' class='btn btn-warning marginTop-5 marginRight5 pull-right'>"+Button.Edit+"</span>"+
            "</h4>"+
            "</div>"+
            "<div id='collapse"+i+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading"+i+"' style='height: auto;'>"+
            "<div class='panel-body'>"+
            "<div class='form-inline'>"+
            "<div class='col-sm-6'>"+
            "<label class='col-sm-6 control-label'>Start Date : </label>"+
            "<div class='col-sm-5 input-group'>"+
            "<label id='lbDateStartEditModule"+i+"' class='control-label'>"+DateUtil.dataDateToFrontend(dataDetail.responseJSON.ModuleProject[i].dateStart, commonData.language)+"</label>"+
            "</div>"+
            "</div>"+
            "<div class='col-sm-6'>"+
            "<label class='col-sm-3 control-label'>End Date : </label>"+
            "<div class='col-sm-5 input-group'>"+
            "<label id='lbDateEndEditModule"+i+"' class='control-label'>"+DateUtil.dataDateToFrontend(dataDetail.responseJSON.ModuleProject[i].dateEnd, commonData.language)+"</label>"+
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
    keepDataForCheckChange("project","oldDataProject");
}

function btnDeleteProjectManager(id) {
    id = id.replace("btnDeletePM","container_subProjectManager");
    $("#"+id).remove();
}

function keepDataForCheckChange(option,dataType){
    if(option=="project"){
        if(dataType=="oldDataProject"){
            oldDataProject[0] = ($("#txtProjectName").val());
            oldDataProject[1] = ($("#txtInitialProjectName").val());
            oldDataProject[2] = ($("#txtCostsProject").val());
            oldDataProject[3] = ($("#dateStartProject").val());
            oldDataProject[4] = ($("#dateEndProject").val());
            oldDataProject[5] = (getAllProjectManager());
        }else{
            newDataProject[0] = ($("#txtProjectName").val());
            newDataProject[1] = ($("#txtInitialProjectName").val());
            newDataProject[2] = ($("#txtCostsProject").val());
            newDataProject[3] = ($("#dateStartProject").val());
            newDataProject[4] = ($("#dateEndProject").val());
            newDataProject[5] = (getAllProjectManager());
        }
    }
}

function checkChangeData(){
    for(var i = 0 ; i < 6 ; i++){
        if(oldDataProject[i]!=newDataProject[i]) return false;
    }
    return true;
}

function getAllProjectManager(){
    var allNameProjectManager = "";
    var count_Element = $('[id^=txtProjectManagerName]').length;
    for(var i = 0 ; i < count_Element ; i++){
        var id = $('[id^=txtProjectManagerName]')[i].id;
        allNameProjectManager += ""+$("#"+id).val()+"<br/>";
    }
    return allNameProjectManager;
}

function moduleManagerToFrontEnd(module){
    var moduleManager = "";
    var count_Element = dataDetail.responseJSON.ModuleManager[module].length;
    for(var i = 0 ; i < count_Element ; i++){
        moduleManager += ""+dataDetail.responseJSON.ModuleManager[module][i].empCode+"<br/>";
    }
    return moduleManager;
}

function moduleMemberToFrontEnd(module){
    var moduleMember = "";
    var count_Element = dataDetail.responseJSON.ModuleMember[module].length;
    for(var i = 0 ; i < count_Element ; i++){
        moduleMember += ""+dataDetail.responseJSON.ModuleMember[module][i].empCode+"<br/>";
    }
    return moduleMember;
}

function editModule(objectModule){
    var id = objectModule.id;
    var numID = id.split("btnEditModule");
    var number = numID[1];
    editModuleName = dataDetail.responseJSON.ModuleProject[parseInt(number)].moduleCode;
    countEditModuleManager = dataDetail.responseJSON.ModuleManager[parseInt(number)].length;
    countEditModuleMember = dataDetail.responseJSON.ModuleMember[parseInt(number)].length;
    clearEditModal();
    var changeIDbtnSave = $('[id^=btnEditSaveModule]')[0].id;
    $('#'+changeIDbtnSave).attr('id','btnEditSaveModule'+number);
    $("#txtEditModuleName1").val(dataDetail.responseJSON.ModuleProject[number].moduleName);
    $("#txtEditInitialModuleName1").val(dataDetail.responseJSON.ModuleProject[number].moduleCode);
    $("#txtCostsEditModule1").val(dataDetail.responseJSON.ModuleProject[number].moduleCost);
    $("#dateStartEditModule").val(DateUtil.dataDateToFrontend(dataDetail.responseJSON.ModuleProject[number].dateStart, _language));
    $("#dateEndEditModule").val(DateUtil.dataDateToFrontend(dataDetail.responseJSON.ModuleProject[number].dateEnd, _language));
    var textModuleManager = moduleManagerToFrontEnd(number);
    var splitTextModuleManager = textModuleManager.split("<br/>");
    $("#txtEditModuleManagerName1").val(splitTextModuleManager[0]);
    for(var i=2 ; i< splitTextModuleManager.length ; i++){
        var html="<div style='padding-top: 5px;' id='container_subEditModuleManager"+i+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
            "<input type='text' class='form-control' id='txtEditModuleManagerName"+i+"' style='margin-top: 5px;'></input></div>"+
            "<button id='btnDeleteEditMM"+i+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)'>"+Button.Delete+"</button></div>";
        $("#subEditModuleManager").append(html);
        $("#txtEditModuleManagerName"+i).val(splitTextModuleManager[i-1]);
    }

    var textModuleMember = moduleMemberToFrontEnd(number);
    var splitTextModuleMember = textModuleMember.split("<br/>");
    $("#txtEditModuleMemberName1").val(splitTextModuleMember[0]);
    for(var i=2 ; i< splitTextModuleMember.length ; i++){
        var html="<div style='padding-top: 5px;' id='container_subEditModuleMember"+i+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
            "<input type='text' class='form-control' id='txtEditModuleMemberName"+i+"'  style='margin-top: 5px;'></input></div>"+
            "<button id='btnDeleteEditMMem"+i+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)'>"+Button.Delete+"</button></div>";
        $("#subEditModuleMember").append(html);
        $("#txtEditModuleMemberName"+i).val(splitTextModuleMember[i-1]);
    }
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
        bootbox.alert(Message.It_has_same_names);
        return false;
    }
    return true;
}

function checkCost(cost){
    var count_Element = dataDetail.responseJSON.ModuleProject.length;
    var projectCost = parseInt($('#txtCostsProject').val());
    var totalModuleCost = parseInt(cost);
    for(var i=0;i<count_Element;i++) {
        totalModuleCost += parseInt(dataDetail.responseJSON.ModuleProject[i].moduleCost);
    }
    if(totalModuleCost > projectCost) {
        confirmAddModuleWhenTotalCostMoreThanProject(totalModuleCost) ;
    }else{
        return true;
    }
}

function checkEditCost(cost,skipId,object){
    var count_Element = dataDetail.responseJSON.ModuleProject.length;
    var projectCost = parseInt($('#txtCostsProject').val());
    var totalModuleCost = parseInt(cost);
    var skip = skipId.split("btnEditSaveModule");
    var idSkip = parseInt(skip[1]);
    for(var i=0;i<count_Element;i++) {
        if(i!=idSkip) totalModuleCost = totalModuleCost + parseInt(dataDetail.responseJSON.ModuleProject[i].moduleCost);
    }
    if(totalModuleCost > projectCost) {
        confirmEditModuleWhenTotalCostMoreThanProject(totalModuleCost,object) ;
    }else{
        return true;
    }
}

function confirmEditProject(){
    bootbox.confirm(Message.Confirm_edit_module, function(result) {
        if(result==true){
            EditProjectByProjectId();
        }
    });
}

function confirmAddModuleWhenTotalCostMoreThanProject(totalModuleCost){
    bootbox.confirm(Message.Cost_module_more_than_project+"\n"+Message.Confirm_add_module, function(result) {
        if(result==true){
            SaveModule(totalModuleCost-parseInt($("#txtCostsProject").val()));
        }
    });
}

function confirmEditModuleWhenTotalCostMoreThanProject(totalModuleCost,object){
    bootbox.confirm(""+Message.Cost_module_more_than_project+"\n"+Message.Confirm_edit_module, function(result) {
        if(result==true){
            saveEditModule(object, totalModuleCost-parseInt($("#txtCostsProject").val()));
        }
    });
}

function saveModuleProjectToDB(){
    var boolSameModuleCode = findSameModuleCode();
    if(boolSameModuleCode==true){
        var textdateStart = $('#dateStartModule').val();
        var textdateEnd = $('#dateEndModule').val();
        var convertFormatDateStart = new Date(DateUtil.dataDateToDataBase(textdateStart, _language));
        var convertFormatDateEnd = new Date(DateUtil.dataDateToDataBase(textdateEnd, _language));
        var crateModuleProject = {
            moduleCode:$("#txtInitialModuleName1").val() ,
            moduleName:$("#txtModuleName1").val() ,
            moduleCost:parseInt($("#txtCostsModule1").val()),
            dateStart: convertFormatDateStart ,
            dateEnd: convertFormatDateEnd,
            projectId: projectId ,
            arr_moduleManager: ModuleManagerToArray() ,
            arr_moduleMember: ModuleMemberToArray()
        };
        var moduleProject =
            $.ajax({
                headers: {
                    Accept: "application/json"
                },
                type: "POST",
                url: contextPath + '/moduleprojects/saveModuleProject',
                data : crateModuleProject,
                complete: function(xhr){
                    if(xhr.status === 201 || xhr.status === 200){
                        bootbox.alert(""+Message.Save_success);
                        moduleProject = xhr ;
                    }else if(xhr.status === 500){
                        bootbox.alert(""+Message.Save_error);
                        return false;
                    }
                },
                async: false
            });
        dataDetail.responseJSON.ModuleProject[dataDetail.responseJSON.ModuleProject.length] = moduleProject.responseJSON.ModuleProject;
        dataDetail.responseJSON.ModuleManager[dataDetail.responseJSON.ModuleManager.length] = moduleProject.responseJSON.ModuleManager;
        dataDetail.responseJSON.ModuleMember[dataDetail.responseJSON.ModuleMember.length] = moduleProject.responseJSON.ModuleMember;
    }
    else {
        bootbox.alert("["+$('#txtInitialModuleName1').val()+"]"+Message.Has_in_project);
        return false;
    }
    return true;
}

function findSameModuleCode(){
    var retutnStatus = false ;
    var dataJsonData = {
        moduleCode:$('#txtInitialModuleName1').val(),
        projectId:projectId,
        option:"size"
    };

    var size = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/moduleprojects/findModuleByModuleCodeAndProjectId',
        data : dataJsonData,
        complete: function(xhr){
        },
        async: false
    });
    var returnSize = size.responseJSON;
    if(returnSize > 0) retutnStatus=false;
    else retutnStatus=true;
    return retutnStatus;
}

function findSameModuleCodeWhenEdit(editModuleName){
    if(editModuleName==$('#txtEditInitialModuleName1').val()) return true;
    var dataJsonData = {
        moduleCode:$('#txtEditInitialModuleName1').val(),
        id:projectId,
        option:"size"
    }

    var size = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/moduleprojects/findModuleByModuleCodeAndProjectId',
        data : dataJsonData,
        complete: function(xhr){
        },
        async: false
    });
    var returnSize = jQuery.parseJSON(size.responseText);
    if(returnSize != 0) return true;
    return false
}

function ModuleManagerToArray(){
    var moduleManager = "";
    for(var i=0;i<$("[id^=txtModuleManagerName").length;i++) {
        var id = $("[id^=txtModuleManagerName")[i].id
        moduleManager+=""+$("#"+id).val();
        if(i!=$("[id^=txtModuleManagerName").length-1) moduleManager+="==";
    }
    return moduleManager;
}

function ModuleMemberToArray(){
    var moduleMember = "";
    for(var i=0;i<$("[id^=txtModuleMemberName").length;i++) {
        var id = $("[id^=txtModuleMemberName")[i].id
        moduleMember+=""+$("#"+id).val();
        if(i!=$("[id^=txtModuleMemberName").length-1) moduleMember+="==";
    }
    return moduleMember;
}

function editModuleManagerToArray(){
    var moduleManager = "";
    for(var i=0;i<$("[id^=txtEditModuleManagerName").length;i++) {
        var id = $("[id^=txtEditModuleManagerName")[i].id
        moduleManager+=""+$("#"+id).val();
        if(i!=$("[id^=txtEditModuleManagerName").length-1) moduleManager+="==";
    }
    return moduleManager;
}

function editModuleMemberToArray(){
    var moduleMember = "";
    for(var i=0;i<$("[id^=txtEditModuleMemberName").length;i++) {
        var id = $("[id^=txtEditModuleMemberName")[i].id
        moduleMember+=""+$("#"+id).val();
        if(i!=$("[id^=txtEditModuleMemberName").length-1) moduleMember+="==";
    }
    return moduleMember;
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

function deleteModule(object){
    var id = object.id.replace("btnDeleteModule","subrecordsModule");
    bootbox.confirm(Message.Confirm_delete, function(result) {
        if(result == true){
            var number = parseInt(id.split('subrecordsModule')[1]);
            console.log(""+number);
            var dataJsonData = {
                moduleCode: $("#headName"+number).text().split(')')[0].split('(')[1],
                projectId: projectId
            }
            reciveProject = $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url: contextPath + '/moduleprojects/deleteModuleByModuleCodeAndProjectId',
                data : dataJsonData,
                complete: function(xhr){
                    if(xhr.status===201 || xhr.status===200){
                        $("#"+id).remove();
                        bootbox.alert(""+Message.Delete_module_success);
                    }
                },
                async: false
            });
        }
    });
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

function btnDeleteEditModuleManager(id) {
    id = id.replace("btnDeleteEditMM","container_subEditModuleManager");
    $("#"+id).remove();
}

function btnDeleteEditModuleMember(id) {
    id = id.replace("btnDeleteEditMMem","container_subEditModuleMember");
    $("#"+id).remove();
}

$("#btnIncresePoint").click(function(){
    option = "increse";
    addDataToDDLModule();
    $("#ddlIncreseCostModuleName").attr("readonly","true");
});

$("#btnDecresePoint").click(function(){
    option = "decrese";
    addDataToDDLModule();
    $("#ddlIncreseCostModuleName").attr("readonly","true");
});

function checkCostCanDecrese(){
    if(option=="decrese") {
        if($("[value=project]").prop("checked")==true) {
            var totalUse = 0;
            var count_Element = $("[id^=btnEditModule]").length;
            for (var i = 0; i < count_Element; i++) {
                var id = $('[id^=btnEditModule]')[i].id;
                var number = parseInt(id.split("btnEditModule")[1]);
                totalUse += dataDetail.responseJSON.ModuleProject[number].moduleCost
            }
            var needDecrese = parseInt($("#txtIncreseCostModuleCost").val());
            var canDecrese = parseInt($("#txtCostsProject").val()) - totalUse;
            if (canDecrese >= needDecrese) {
                saveIncreseCost(null);
            } else {
                if (canDecrese > 0) {
                    confirmWhenDecresePointLessThanCanDecrese(canDecrese);
                } else {
                    bootbox.alert(Message.Can_not_decrese_from_project);
                }
            }
        }
        else{
            saveIncreseCost(null);
        }
    }
    else{
        saveIncreseCost(null);
    }
}

function confirmWhenDecresePointLessThanCanDecrese(canDecrese){
    bootbox.confirm("You can decrese "+canDecrese+" point. Do you want to decrese "+canDecrese+" point from project ?", function(result) {
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
                projectId: projectId,
                increseCost: parseInt($("#txtIncreseCostModuleCost").val())
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
                        if(option=="decrese")  bootbox.alert(""+Message.Decrese+" " + parseInt($("#txtIncreseCostModuleCost").val()) + " "+Message.Point_from_project);
                        else bootbox.alert(""+Message.Increse +" "+ parseInt($("#txtIncreseCostModuleCost").val()) + " "+Message.Point_to_project);
                        recieveProject = xhr;
                        $("#txtCostsProject").val("" + recieveProject.responseJSON.projectCost);
                        return true;
                    } else if (xhr.status === 500) {
                        if(option=="decrese")  bootbox.alert(""+Message.Cant_Decrese+" " + parseInt($("#txtIncreseCostModuleCost").val()) + " "+Message.Point_from_project);
                        else bootbox.alert(""+Message.Cant_Increse+" " + parseInt($("#txtIncreseCostModuleCost").text()) + " "+Message.Point_to_project);
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
                projectId: projectId,
                codeModuleProject: idModuleProject,
                costIncrese: parseInt($("#txtIncreseCostModuleCost").val())
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
                        bootbox.alert(""+Message.Increse+" " + parseInt($("#txtIncreseCostModuleCost").val()) + " "+Message.Point_to_module+" " + idModuleProject + ".");
                        changeParameterIncreseOrDecresePointByModuleCode($("#ddlIncreseCostModuleName").val(), parseInt($("#txtIncreseCostModuleCost").val()));
                        return true;
                    } else if (xhr.status === 500) {
                        bootbox.alert(""+Message.Cant_Increse+" " + parseInt($("#txtIncreseCostModuleCost").text()) + " "+Message.Point_to_module+" " + idModuleProject + ".");
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
    for(var i = 0 ; i < dataDetail.responseJSON.ModuleProject.length ; i++){
        if(dataDetail.responseJSON.ModuleProject[i].moduleCode == moduleCode) {
            dataDetail.responseJSON.ModuleProject[i].moduleCost += increseCost;
            break;
        }
    }
}

function addDataToDDLModule(){
    var dataJsonData = {
        projectId: projectId
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
    $("#ddlIncreseCostModuleName").append("<option>--- Module Name ---</option>");
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
        if ($("#ddlIncreseCostModuleName").val() == "--- Module Name ---") {
            $('#ddlIncreseCostModuleName').attr("data-placement", "bottom");
            $('#ddlIncreseCostModuleName').attr("data-content", "Please select Module name.");
            $('#ddlIncreseCostModuleName').popover('show');
            return false;
        }
    }

    if($("#txtIncreseCostModuleCost").val() == "" || $("#txtIncreseCostModuleCost").val() == " ") {
        $('#txtIncreseCostModuleCost').attr("data-placement","bottom");
        $('#txtIncreseCostModuleCost').attr("data-content","Please Complete this field.");
        $('#txtIncreseCostModuleCost').popover('show');
        return false;
    }
    else{
        var textCost = ""+$("#txtIncreseCostModuleCost").val();
        var checkKey = textCost.split('');
        for(var i=0;i<checkKey.length;i++){
            if(checkKey[i]!='0'&&checkKey[i]!='1'&&checkKey[i]!='2'&&checkKey[i]!='3'&&checkKey[i]!='4'&&checkKey[i]!='5'&&checkKey[i]!='6'&&checkKey[i]!='7'&&checkKey[i]!='8'&&checkKey[i]!='9'){
                $('#txtIncreseCostModuleCost').attr("data-placement","bottom");
                $('#txtIncreseCostModuleCost').attr("data-content","Please enter only [0 - 9].");
                $('#txtIncreseCostModuleCost').popover('show');
                return false;
                break;
            }
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

