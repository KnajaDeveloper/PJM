var dataDetail ;

findData(projectId);

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

function setData(){
    $("#txtProjectName").val(""+dataDetail.responseJSON.Project[0].projectName);
    $("#txtInitialProjectName").val(""+dataDetail.responseJSON.Project[0].projectCode);
    $("#txtCostsProject").val(""+dataDetail.responseJSON.Project[0].projectCost);
    $("#dateStartProject").val(""+DateUtil.dataDateToFrontend(dataDetail.responseJSON.Project[0].dateStart, commonData.language));
    $("#dateEndProject").val(""+DateUtil.dataDateToFrontend(dataDetail.responseJSON.Project[0].dateEnd, commonData.language));
    var count_PM = dataDetail.responseJSON.ProjectManager.length;
    $("#txtProjectManagerName1").val(""+dataDetail.responseJSON.ProjectManager[0].empCode);
    for(var i = 1 ; i < count_PM ; i++) {
        var html="<div style='padding-top: 5px;' id='container_subProjectManager"+[count_PM+1]+"'><label class='col-sm-3 control-label'></label><div class='col-sm-3'>"+
            "<input type='text' class='form-control' style='margin-top:5px;' id='txtProjectManagerName"+[i+1]+"'></input></div>"+
            "<button id='btnDeletePM"+[count_PM+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteProjectManager(this.id)'>"+Button.Delete+"</button></div>";
        $("#subProjectManager").append(html);
        $("#txtProjectManagerName"+(i+1)).val(""+dataDetail.responseJSON.ProjectManager[i].empCode);
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