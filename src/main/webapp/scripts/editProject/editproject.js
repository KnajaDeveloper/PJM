var detailEmp = [];
var dataDetail;
var i = 1;
var oldDataProject = [];
var newDataProject = [];
var oldDataModule = [] ;
var newDataModule = [] ;
var oldDataEditModule = [] ;
var newDataEditModule = [] ;
var editModuleName = "";
var countEditModuleManager;
var countEditModuleMember;
var countProjectManager;
var countModuleManager = 1;
var countModuleMember = 1;
var dataDDLByCode;
var option = "";
var numOfProjectManager = 0 ;
var first = true ;
var _language = _language;
var ModuleProject = [];

findData(projectId);

$("#btnSaveModule").click(function () {
    SaveModule(null);
});

$("#btnSaveProject").click(function () {
    keepDataForCheckChange("project", "newDataProject");
    if (checkChangeData() == false) {
        var checkInputProject = checkDataProject();
        if (checkInputProject == true) {
            var boolCost = checkTotalUse($("#txtCostsProject").val());
            if(boolCost) {
                confirmEditProject();
            }else{
                bootbox.alert(Message.Cost_module_more_than_project);
            }
        }
    }
    else{
        bootbox.alert(Message.Data_no_change);
    }
});

function checkTotalUse(pjCost){
    var totalUse = 0;
    var count_Element = $("[id^=btnEditModule]").length;
    for (var i = 0; i < count_Element; i++) {
        var id = $('[id^=btnEditModule]')[i].id;
        var number = parseInt(id.split("btnEditModule")[1]);
        totalUse += parseFloat(dataDetail.responseJSON.ModuleProject[number].moduleCost);
    }
    if(totalUse > pjCost) return false;
    else return true;
}

$("#btnEditAddMM1").click(function(){
    var count_elements = countEditModuleManager+1;
    var html = "<div style='' id='container_subEditModuleManager"+[count_elements+1]+"' class='form-group'><label class='col-sm-3 control-label'></label>" +
        "<div class='col-sm-4 display:inline-block''>"+
        "<div class='input-group display:inline-block'>"+
        "<input id='txtEditModuleManagerName"+[count_elements+1]+"' onchange='editModuleManagerChange(this)' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtEditModuleManagerName"+[count_elements+1]+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
        "<span class='input-group-addon'>"+
        "<span id='BtntxtEditModuleManagerName"+[count_elements+1]+"' onclick='UtilLov.lovEmp(this)' target='txtEditModuleManagerName"+[count_elements+1]+"' class='fa fa-search' style='cursor:pointer;'>"+
        "<jsp:text/>"+
        "</span>"+
        "</span>"+
        "</input>"+
        "</div>"+
        "</div>"+
        "<button id='btnDeleteEditMM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)' style='margin: 0px'>"+Button.Delete+"</button>" +
        "</div>";
    $("#subEditModuleManager").append(html);
    countEditModuleManager++;
});

$("#btnEditAddMMem1").click(function(){
    var count_elements = countEditModuleMember+1;
    var html =
        "<div style='' id='container_subEditModuleMember"+[count_elements+1]+"' class='form-group'>" +
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
        "<button id='btnDeleteEditMMem"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)' style='margin: 0px'>"+Button.Delete+"</button>" +
        "</div>";
    $("#subEditModuleMember").append(html);
    countEditModuleMember++;
});

$("#btnAddModule").click(function () {
    $("#subModuleMember").empty();
    if(role!="ModuleManager") {
        if (compareData() == true) {
            $('#modalAddModule').modal('show');
            var namePM = getAllProjectManager().split("<br/>");
            $("#txtModuleMemberName1").val("" + namePM[0]);
            $("#txtModuleMemberName1").data("dataCode", "" + namePM[0].split(' ')[0]);
            $("#txtModuleMemberName1").prop('disabled',true);
            $("#txtModuleMemberName1").prop('style','background-color:white');
            for (var i = 1; i < namePM.length - 1; i++) {
                var count_elements = countModuleMember + 1;
                var html = "<div style='' id='container_subModuleMember" + [count_elements + 1] + "' from='project' class='form-group'><label class='col-sm-3 control-label'></label>" +
                    "<div class='col-sm-4 display:inline-block''>" +
                    "<div class='input-group display:inline-block'>" +
                    "<input id='txtModuleMemberName" + [count_elements + 1] + "' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtModuleMemberName" + [count_elements + 1] + "' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>" +
                    "<span class='input-group-addon'>" +
                    "<span id='BtntxtModuleMemberName" + [count_elements + 1] + "' onclick='UtilLov.lovEmp(this)' target='txtModuleMemberName" + [count_elements + 1] + "' class='fa fa-search' style='cursor:pointer;'>" +
                    "<jsp:text/>" +
                    "</span>" +
                    "</span>" +
                    "</input>" +
                    "</div>" +
                    "</div>" +
                    "<div class='btn'></div>" +
                    "</div>";
                $("#subModuleMember").append(html);
                $("#txtModuleMemberName" + [count_elements + 1]).val("" + namePM[i]);
                $("#txtModuleMemberName" + [count_elements + 1]).data("dataCode", "" + namePM[i].split(' ')[0]);
                $("#txtModuleMemberName"+[count_elements + 1]).prop('disabled',true);
                $("#txtModuleMemberName"+[count_elements + 1]).prop('style','background-color:white');
                countModuleMember++;
                saveDataModule();
            }
        } else {
            bootbox.alert(Message.Cant_make_any_action + "\n" + Message.Confirm_editing_data);
        }
    }else{
        bootbox.alert(Message.No_role);
    }
});

$("#btnAddPM").click(function () {
    var count_elements = countProjectManager;
    var html = "<div style='' id='container_subProjectManager"+[count_elements+1]+"' class='form-group'><label class='col-sm-3 control-label'></label>" +
        "<div class='col-sm-3 display:inline-block''>"+
        "<div class='input-group display:inline-block'>"+
        "<input id='txtProjectManagerName"+[count_elements+1]+"' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtProjectManagerName"+[count_elements+1]+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
        "<span class='input-group-addon'>"+
        "<span id='BtntxtProjectManagerName"+[count_elements+1]+"' onclick='UtilLov.lovEmp(this)' target='txtProjectManagerName"+[count_elements+1]+"' class='fa fa-search' style='cursor:pointer;'>"+
        "<jsp:text/>"+
        "</span>"+
        "</span>"+
        "</input>"+
        "</div>"+
        "</div>"+
        "<button id='btnDeletePM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteProjectManager(this.id)' style='margin:0px;'>"+Button.Delete+"</button>" +
        "</div>";
    $("#subProjectManager").append(html);
    countProjectManager++;
});

$("#btnAddMM1").click(function(){
    var count_elements = countModuleManager;
    var html = "<div style='' id='container_subModuleManager"+[count_elements+1]+"' class='form-group'><label class='col-sm-3 control-label'></label>" +
        "<div class='col-sm-4 display:inline-block''>"+
        "<div class='input-group display:inline-block'>"+
        "<input id='txtModuleManagerName"+[count_elements+1]+"' onchange='moduleManagerChange(this)' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtModuleManagerName"+[count_elements+1]+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
        "<span class='input-group-addon'>"+
        "<span id='BtntxtModuleManagerName"+[count_elements+1]+"' onclick='UtilLov.lovEmp(this)' target='txtModuleManagerName"+[count_elements+1]+"' class='fa fa-search' style='cursor:pointer;'>"+
        "<jsp:text/>"+
        "</span>"+
        "</span>"+
        "</input>"+
        "</div>"+
        "</div>"+
        "<button id='btnDeleteMM"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteModuleManager(this.id)' style='margin:0px;'>"+Button.Delete+"</button>" +
        "</div>";
    $("#subModuleManager").append(html);
    countModuleManager++;
});

$("#btnAddMMem1").click(function () {
    var count_elements = countModuleMember+1;
    var html = "<div style='' id='container_subModuleMember"+[count_elements+1]+"' class='form-group'>" +
        "<div style='margin-bottom:5px;'></div>"+
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
        "<button id='btnDeleteMMem"+[count_elements+1]+"' type='button' class='btn btn-danger' onclick='btnDeleteModuleMember(this.id)' style='margin: 0px'>"+Button.Delete+"</button>" +
        "</div>";
    $("#subModuleMember").append(html);
    countModuleMember++;
});

function findEmployee(){
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
        complete: function (xhr) {
            dataDetail = xhr;
            setData();
        },
        async: false
    });
    countProjectManager = dataDetail.responseJSON.ProjectManager.length+1;
}

function EditProjectByProjectId() {
    var arr_ProjectManager = projectManagerToArray();
    var statusReturn;
    var textdateStart = $('#dateStartProject').val();
    var textdateEnd = $('#dateEndProject').val();
    var convertFormatDateStart = new Date(DateUtil.dataDateToDataBase(textdateStart, _language));
    var convertFormatDateEnd = new Date(DateUtil.dataDateToDataBase(textdateEnd, _language));
    var crateProject = {
        projectID: projectId,
        projectCode: $('#txtInitialProjectName').val(),
        projectName: $('#txtProjectName').val(),
        projectCost: $('#txtCostsProject').val(),
        dateStart: convertFormatDateStart,
        dateEnd: convertFormatDateEnd,
        arr_ProjectManager: arr_ProjectManager,
        version: dataDetail.responseJSON.Project[0].version
    };
    var project = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "POST",
        url: contextPath + '/projects/updateProjectByIdProject',
        data: crateProject,
        complete: function (xhr) {
            if (xhr.status === 201) {
                bootbox.alert("" + Message.Edit_success);
                statusReturn = true;
                var count = $("[id^=btnEditModule]").length ;
                first = false;
                keepDataForCheckChange("project","oldDataProject");
                for(i=0;i<count;i++){
                    var number = parseInt($("[id^=btnEditModule]")[i].id.split("btnEditModule")[1]);
                    var object = {};
                    object.id = "btnEditModule"+number;
                    editModuleWhenEdit(object);
                    object.id = "btnEditSaveModule"+number;
                    saveEditModuleWhenEdit(object,null);
                }
                findDataKeepToParameter(projectId);
            }
            else if (xhr.status === 404) {
                bootbox.alert(Message.MS_VERSION);
            }
            else {
                bootbox.alert("" + Message.Edit_error);
                statusReturn = false;
            }
        },
        async: false
    });
    if (statusReturn == true) {
        dataDetail.responseJSON.Project = project;
        return true;
    }
    else return false;
}

function saveEditModule(object, cost) {
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
                    findDataKeepToParameter(projectId);
                    if (cost != null) {
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
                    var allModuleManager = "" + getAllEditModuleManager();
                    var allModuleMember = "" + getAllEditModuleMember();
                    $("#headName" + number[1]).text("(" + $("#txtEditInitialModuleName1").val() + ")  " + $("#txtEditModuleName1").val() + "  [" + $("#txtCostsEditModule1").val() + "]");
                    $("#lbDateStartEditModule" + number[1]).text("" + $("#dateStartEditModule").val());
                    $("#lbDateEndEditModule" + number[1]).text("" + $("#dateEndEditModule").val());
                    $("#lbEditModuleManager" + number[1]).empty();
                    $("#lbEditModuleManager" + number[1]).append("" + allModuleManager);
                    $("#lbEditModuleMember" + number[1]).empty();
                    $("#lbEditModuleMember" + number[1]).append("" + allModuleMember);

                    $('#modalEditModule').modal('toggle');
                    first = true;
                    keepDataForCheckChange("project", "oldDataProject");
                }
            }
            else if (boolSameName == false) {

            }
        }
        else {
            bootbox.alert("[" + $('#txtEditInitialModuleName1').val() + "] " + Message.Has_in_database);
        }
    }
}

function editDataModuleInDB(number, cost) {
    var moduleCost = ($("#txtCostsEditModule1").val());
    //if(cost!=null) moduleCost += cost ;
    var returnStatus = false;
    var convertFormatDateStart = DateUtil.dataDateToFrontend(DateUtil.dataDateToDataBase($('#dateStartEditModule').val(), _language),'EN');
    var convertFormatDateEnd = DateUtil.dataDateToFrontend(DateUtil.dataDateToDataBase($('#dateEndEditModule').val(), _language),'EN');
    var crateModuleProject = {
        moduleNeedEdit: editModuleName,
        moduleCode: $("#txtEditInitialModuleName1").val(),
        moduleName: $("#txtEditModuleName1").val(),
        moduleCost: moduleCost,
        dateStart: convertFormatDateStart,
        dateEnd: convertFormatDateEnd,
        arr_moduleManager: editModuleManagerToArray(),
        arr_moduleMember: editModuleMemberToArray(),
        projectId: projectId,
        version: ModuleProject[number].version
    };
    var responseHeader = null;
    var recieve = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "POST",
        url: contextPath + '/moduleprojects/editModuleProjectByModuleProjectCodeAndProjectId',
        data: crateModuleProject,
        complete: function (xhr) {
            if (xhr.status === 201 || xhr.status === 200) {
                bootbox.alert("" + Message.Edit_success);
                returnStatus = true;
            } else if (xhr.status === 500) {
                bootbox.alert("" + Message.Edit_error);
                returnStatus = false;
            }
            else if (xhr.status === 404) {
                bootbox.alert(Message.MS_VERSION);
            }
        },
        async: false
    });
    if (number != null) {
        ModuleProject[number] = recieve.responseJSON.ModuleProject;
    }
    return returnStatus;
}

function checkEditModal() {
    if ($("#txtEditModuleName1").val() == "" || $("#txtEditModuleName1").val() == " ") {
        $('#txtEditModuleName1').attr("data-placement", "bottom");
        $('#txtEditModuleName1').attr("data-content", Message.Complete_this_feld);
        $('#txtEditModuleName1').popover('show');
        return false;
    }
    if ($("#txtEditInitialModuleName1").val() == "" || $("#txtEditInitialModuleName1").val() == " ") {
        $('#txtEditInitialModuleName1').attr("data-placement", "bottom");
        $('#txtEditInitialModuleName1').attr("data-content", Message.Complete_this_feld);
        $('#txtEditInitialModuleName1').popover('show');
        return false;
    }
    if ($("#txtCostsEditModule1").val() == "" || $("#txtCostsEditModule1").val() == " ") {
        $('#txtCostsEditModule1').attr("data-placement", "bottom");
        $('#txtCostsEditModule1').attr("data-content", Message.Complete_this_feld);
        $('#txtCostsEditModule1').popover('show');
        return false;
    }
    else {
        var textCost = "" + $("#txtCostsEditModule1").val();
        if (!$.isNumeric(textCost)) {
            $('#txtCostsEditModule1').attr("data-placement", "bottom");
            $('#txtCostsEditModule1').attr("data-content", Message.Number_only);
            $('#txtCostsEditModule1').popover('show');
            return false;
        }
        else if(parseFloat(textCost) < 0) {
            $('#txtCostsEditModule1').attr("data-placement", "bottom");
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
    if ($("#dateStartEditModule").val() == "" || $("#dateStartEditModule").val() == " ") {
        $('#dateStartEditModule').attr("data-placement", "bottom");
        $('#dateStartEditModule').attr("data-content", Message.Complete_this_feld);
        $('#dateStartEditModule').popover('show');
        return false;
    }
    if ($("#dateEndEditModule").val() == "" || $("#dateEndEditModule").val() == " ") {
        $('#dateEndEditModule').attr("data-placement", "bottom");
        $('#dateEndEditModule').attr("data-content", Message.Complete_this_feld);
        $('#dateEndEditModule').popover('show');
        return false;
    }


    var count_Element = $("[id^=txtEditModuleManagerName").length;
    for (var i = 0; i < count_Element; i++) {
        var id = $("[id^=txtEditModuleManagerName")[i].id;
        if ($("#" + id).val() == "" || $("#" + id).val() == " " || $("#"+id).data("dataCode") == null || $("#"+id).data("dataCode") == "") {
            $("#" + id).attr("data-placement", "bottom");
            $("#" + id).attr("data-content", Message.Complete_this_feld);
            $("#" + id).popover('show');
            return false;
        }
    }

    count_Element = $("[id^=txtEditModuleMemberName").length;
    for (var i = 0; i < count_Element; i++) {
        var id = $("[id^=txtEditModuleMemberName")[i].id;
        if ($("#" + id).val() == "" || $("#" + id).val() == " " || $("#"+id).data("dataCode") == null || $("#"+id).data("dataCode") == "") {
            $("#" + id).attr("data-placement", "bottom");
            $("#" + id).attr("data-content", Message.Complete_this_feld);
            $("#" + id).popover('show');
            return false;
        }
    }
    return true;
}

function checkSameNameBeforeEdit() {
    var count_Element = $("[id^=txtEditModuleManagerName]").length;
    var arrManager = [];
    for (var i = 0; i < count_Element; i++) {
        var id = $("[id^=txtEditModuleManagerName]")[i].id;
        var name = "" + $("#" + id).data('dataCode');
        if (arrManager.indexOf("" + name) < 0) arrManager.push("" + name);
        else {
            return false;
        }
    }
    var count_Element2 = $("[id^=txtEditModuleMemberName]").length;
    var arrMember = [];
    for (var i = 0; i < count_Element2; i++) {
        var id = $("[id^=txtEditModuleMemberName]")[i].id;
        //var name = "" + $("#" + id).val();
        var name = "" + $("#" + id).data('dataCode');
        if (arrMember.indexOf("" + name) < 0) arrMember.push("" + name);
        else {
            bootbox.alert(Message.It_has_same_names);
            return false;
        }
    }
    return true;
}

function projectManagerToArray() {
    var projectManager = "";
    for (var i = 0; i < $("[id^=txtProjectManagerName").length; i++) {
        var id = $("[id^=txtProjectManagerName")[i].id
        //projectManager += "" + $("#" + id).val();
        projectManager+=""+$("#"+id).data("dataCode");
        if (i != $("[id^=txtProjectManagerName").length - 1) projectManager += "==";
    }
    return projectManager;
}

function checkDataProject() {
    if ($("#txtProjectName").val() == "" || $("#txtProjectName").val() == " ") {
        $('#txtProjectName').attr("data-content", Message.Complete_this_feld);
        $('#txtProjectName').popover('show');
        return false;
    }
    if ($("#txtInitialProjectName").val() == "" || $("#txtInitialProjectName").val() == " ") {
        $('#txtInitialProjectName').attr("data-content", Message.Complete_this_feld);
        $('#txtInitialProjectName').popover('show');
        return false;
    }
    if ($("#txtCostsProject").val() == "" || $("#txtCostsProject").val() == " ") {
        $('#txtCostsProject').attr("data-content", Message.Complete_this_feld);
        $('#txtCostsProject').popover('show');
        return false;
    }
    else {
        var textCost = "" + $("#txtCostsProject").val();
        if (!$.isNumeric(textCost)) {
            $('#txtCostsProject').attr("data-placement", "bottom");
            $('#txtCostsProject').attr("data-content", Message.Number_only);
            $('#txtCostsProject').popover('show');
            return false;
        }
        else if(parseFloat(textCost) < 0) {
            $('#txtCostsProject').attr("data-placement", "bottom");
            $('#txtCostsProject').attr("data-content", Message.Number_only);
            $('#txtCostsProject').popover('show');
            return false;
        }
        if(textCost.indexOf('.') > 0) {
            if (textCost.split('.')[1].length > 4) {
                $('#txtCostsProject').attr("data-placement", "bottom");
                $('#txtCostsProject').attr("data-content", Message.More_than_digit);
                $('#txtCostsProject').popover('show');
                return false;
            }
            else if(textCost.split('.')[1].length==0){
                $('#txtCostsProject').attr("data-content",Message.Number_only);
                $('#txtCostsProject').popover('show');
                return false;
            }
        }
        if(textCost.indexOf('.')==0){
            $('#txtCostsProject').attr("data-content",Message.Number_only);
            $('#txtCostsProject').popover('show');
            return false;
        }
    }
    if ($("#dateStartProject").val() == "" || $("#dateStartProject").val() == " ") {
        $('#dateStartProject').attr("data-content", Message.Complete_this_feld);
        $('#dateStartProject').popover('show');
        return false;
    }
    if ($("#dateEndProject").val() == "" || $("#dateEndProject").val() == " ") {
        $('#dateEndProject').attr("data-content", Message.Complete_this_feld);
        $('#dateEndProject').popover('show');
        return false;
    }

    for(var i = 0 ; i < $("[id^=txtProjectManagerName]").length ; i++) {
        var id = $("[id^=txtProjectManagerName]")[i].id ;
        if ($("#"+id).val() == "" || $("#"+id).val() == " " || $("#"+id).data("dataCode") == null || $("#"+id).data("dataCode") == "") {
            $("#"+id).attr("data-content", Message.Complete_this_feld);
            $("#"+id).attr("data-placement", "bottom");
            $("#"+id).popover('show');
            return false;
        }
    }

    var arrManager = [];
    for(var i=0;i<$("[id^=txtProjectManagerName]").length;i++){
        var id = $("[id^=txtProjectManagerName]")[i].id ;
        var name = ""+$("#"+id).data('dataCode');
        if(arrManager.indexOf(""+name) < 0) arrManager.push(""+name);
        else {
            bootbox.alert(Message.It_has_same_names);
            return false;
        }
    }

    return true;
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

function SaveModule(cost) {
    var boolData = checkModal();
    //var boolCost = checkCost();
    if (boolData == true) {
        if (cost == null) boolCost = checkCost($("#txtCostsModule1").val());
        else boolCost = true;
    }
    if (boolData == true && boolCost == true) {
        var boolSaveDB = saveModuleProjectToDB();
        if (boolSaveDB == true) {
            var allModuleManager = moduleManagerToFrontEnd(dataDetail.responseJSON.ModuleProject.length - 1);
            var allModuleMember = moduleMemberToFrontEnd(dataDetail.responseJSON.ModuleProject.length - 1);
            if (cost != null) {
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
                            dataAfterSave = xhr;
                            $("#txtCostsProject").val("" + dataAfterSave.responseJSON.projectCost);
                            first = true;
                            keepDataForCheckChange("project","oldDataProject");
                            return true;
                        }
                    },
                    async: false
                });
            }
            i = dataDetail.responseJSON.ModuleProject.length - 1;
            allModuleManager = ""+getAllModuleManager();
            allModuleMember = ""+getAllModuleMember();
            var html = "<div class='panel panel-default' style='outline: 1px solid gray;' id='subrecordsModule" + i + "'>" +
                "<div class='panel-heading' role='tab' id='heading" + i + "'>" +
                "<h4 class='panel-title'>" +
                "<x id='headName" + i + "' role='button' data-toggle='collapse' data-parent='#collapse" + i + "' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "'>" +
                "(" + $("#txtInitialModuleName1").val() + ")  " + $("#txtModuleName1").val() + "  [" + $("#txtCostsModule1").val() + "]" +
                "</x>" +
                "<span id='btnDeleteModule" + i + "' onclick='deleteModule(this)' type='button' class='btn btn-danger marginTop-5 pull-right'>" + Button.Delete + "</span>" +
                "<span id='btnEditModule" + i + "' onclick='editModule(this)' type='button' class='btn btn-info marginTop-5 marginRight5 pull-right'>" + Button.Edit + "</span>" +
                "</h4>" +
                "</div>" +
                "<div id='collapse" + i + "' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='heading" + i + "' style='height: auto;'>" +
                "<div class='panel-body'>" +
                "<div class='form-inline'>" +
                "<div class='col-sm-6'>" +
                "<label class='col-sm-5 control-label'>"+Label.Start_Date +" : </label>" +
                "<div class='col-sm-6 input-group'>" +
                "<label id='lbDateStartEditModule" + i + "' class='control-label'>" + $("#dateStartModule").val() + "</label>" +
                "</div>" +
                "</div>" +
                "<div class='col-sm-6'>" +
                "<label class='col-sm-5 control-label'>"+Label.End_Date+" : </label>" +
                "<div class='col-sm-7 input-group'>" +
                "<label id='lbDateEndEditModule" + i + "' class='control-label'>" + $("#dateEndModule").val() + "</label>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='form-inline'>" +
                "<div class='col-sm-6'>" +
                "<label class='col-sm-5 control-label'>"+Label.Module_manager+" :</label>" +
                "<div class='col-sm-7 input-group'>" +
                "<label id='lbEditModuleManager" + i + "' class='pull-left'>" + allModuleManager + "</input>" +
                "</div>" +
                "</div>" +
                "<div class='col-sm-6'>" +
                "<label class='col-sm-5 control-label'>"+Label.Module_member+" :</label>" +
                "<div class='col-sm-7 input-group'>" +
                "<label id='lbEditModuleMember" + i + "' class='pull-left'>" + allModuleMember + "</input>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
            $("#recordsModule").append(html);
            i++;
            clearModal();
        }
    }
}

function findData(projectId) {
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
        complete: function (xhr) {
            dataDetail = xhr;
            setData();
        },
        async: false
    });
    countProjectManager = dataDetail.responseJSON.ProjectManager.length+1;

    checkRole();
}

function checkRole(){
    if(role=="ModuleManager"){
        $("#btnSaveProject").hide();
        $("#btnIncresePoint").hide();
        $("#btnDecresePoint").hide();
        $("#btnAddPM").hide();
        $("#txtProjectName").prop('disabled','true');
        $("#txtProjectName").prop('style','background-color:white');
        $("#txtInitialProjectName").prop('disabled','true');
        $("#txtInitialProjectName").prop('style','background-color:white');
        $("#txtCostsProject").prop('disabled','true');
        $("#txtCostsProject").prop('style','background-color:white');
        $("#dateStartProject").prop('disabled','true');
        $("#dateStartProject").prop('style','background-color:white');
        $("#dateEndProject").prop('disabled','true');
        $("#dateEndProject").prop('style','background-color:white');
        $("[id^=txtProjectManagerName]").prop('disabled','true');
        $("[id^=txtProjectManagerName]").prop('style','background-color:white');
        $("[id^=btnDeletePM]").hide();
    }
}

function findDataKeepToParameter(projectId) {
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
        complete: function (xhr) {
            dataDetail = xhr;
        },
        async: false
    });
}

function setData() {
    findDetailEmpByEmpCode();
    $("#txtProjectName").val("" + dataDetail.responseJSON.Project[0].projectName);
    $("#txtInitialProjectName").val("" + dataDetail.responseJSON.Project[0].projectCode);
    $("#txtCostsProject").val("" + dataDetail.responseJSON.Project[0].projectCost);
    $("#dateStartProject").val("" + DateUtil.dataDateToFrontend(dataDetail.responseJSON.Project[0].dateStart, _language));
    $("#dateEndProject").val("" + DateUtil.dataDateToFrontend(dataDetail.responseJSON.Project[0].dateEnd, _language));
    var count_PM = dataDetail.responseJSON.ProjectManager.length;
    var test1 = detailEmp[dataDetail.responseJSON.ProjectManager[0].empCode];
    $("#txtProjectManagerName1").val("" + detailEmp[dataDetail.responseJSON.ProjectManager[0].empCode]);
    $("#txtProjectManagerName1").data("dataCode" ,""+ dataDetail.responseJSON.ProjectManager[0].empCode);
    for (var j = 1; j < count_PM; j++) {;
        var html = "<div style='' id='container_subProjectManager"+(j + 1) +"' class='form-group'><label class='col-sm-3 control-label'></label>" +
            "<div class='col-sm-3 display:inline-block''>"+
            "<div class='input-group display:inline-block'>"+
            "<input id='txtProjectManagerName"+(j + 1) +"' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtProjectManagerName"+(j + 1)+"' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>"+
            "<span class='input-group-addon'>"+
            "<span id='BtntxtProjectManagerName"+(j + 1) +"' onclick='UtilLov.lovEmp(this)' target='txtProjectManagerName"+(j + 1) +"' class='fa fa-search' style='cursor:pointer;'>"+
            "<jsp:text/>"+
            "</span>"+
            "</span>"+
            "</input>"+
            "</div>"+
            "</div>"+
            "<button id='btnDeletePM"+(j + 1) +"' type='button' class='btn btn-danger' onclick='btnDeleteProjectManager(this.id)' style='margin:0px'>"+Button.Delete+"</button>" +
            "</div>";
        $("#subProjectManager").append(html);
        $("#txtProjectManagerName" + (j + 1)).val("" + detailEmp[dataDetail.responseJSON.ProjectManager[j].empCode]);
        $("#txtProjectManagerName" + (j + 1)).data("dataCode" ,""+ dataDetail.responseJSON.ProjectManager[j].empCode);
    }

    var countModule = dataDetail.responseJSON.ModuleProject.length;
    for (var i = 0; i < countModule; i++) {
        ModuleProject[i] = dataDetail.responseJSON.ModuleProject[i];
        var allModuleManager = moduleManagerDetailToFrontEnd(i);
        var allModuleMember = moduleMemberDetailToFrontEnd(i);
        var html = "<div class='panel panel-default' style='outline: 1px solid gray;' id='subrecordsModule" + i + "'>" +
            "<div class='panel-heading' role='tab' id='heading" + i + "'>" +
            "<h4 class='panel-title'>" +
            "<x id='headName" + i + "' role='button' data-toggle='collapse' data-parent='#collapse" + i + "' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "'>" +
            "(" + dataDetail.responseJSON.ModuleProject[i].moduleCode + ")  " + dataDetail.responseJSON.ModuleProject[i].moduleName + "  [" + dataDetail.responseJSON.ModuleProject[i].moduleCost + "]" +
            "</x>" +
            "<span id='btnDeleteModule" + i + "' onclick='deleteModule(this)' type='button' class='btn btn-danger marginTop-5 pull-right'>" + Button.Delete + "</span>" +
            "<span id='btnEditModule" + i + "' onclick='editModule(this)' type='button' class='btn btn-info marginTop-5 marginRight5 pull-right'>" + Button.Edit + "</span>" +
            "</h4>" +
            "</div>" +
            "<div id='collapse" + i + "' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='heading" + i + "' style='height: auto;'>" +
            "<div class='panel-body'>" +
            "<div class='form-inline'>" +
            "<div class='col-sm-6'>" +
            "<label class='col-sm-5 control-label'>"+Label.Start_Date +" : </label>" +
            "<div class='col-sm-7 input-group'>" +
            "<label id='lbDateStartEditModule" + i + "' class='pull-left'>" + DateUtil.dataDateToFrontend(dataDetail.responseJSON.ModuleProject[i].dateStart, _language) + "</label>" +
            "</div>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            "<label class='col-sm-5 control-label'>"+Label.End_Date+" : </label>" +
            "<div class='col-sm-7 input-group'>" +
            "<label id='lbDateEndEditModule" + i + "' class='pull-left'>" + DateUtil.dataDateToFrontend(dataDetail.responseJSON.ModuleProject[i].dateEnd, _language) + "</label>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='form-inline'>" +
            "<div class='col-sm-6'>" +
            "<label class='col-sm-5 control-label'>"+Label.Module_manager+" :</label>" +
            "<div class='col-sm-7 input-group'>" +
            "<label id='lbEditModuleManager" + i + "' class='pull-left'>" + allModuleManager + "</input>" +
            "</div>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            "<label class='col-sm-5 control-label'>"+Label.Module_member+" :</label>" +
            "<div class='col-sm-7 input-group'>" +
            "<label id='lbEditModuleMember" + i + "' class='pull-left'>" + allModuleMember + "</input>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        $("#recordsModule").append(html);
    }
    keepDataForCheckChange("project", "oldDataProject");
}

function findDetailEmpByEmpCode(){
    detailEmp = [] ;
    var empDetials = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/central/findAllEmployeeByEmpCodeArray',
        complete: function (xhr) {

        },
        async: false
    });
    for(var i = 0 ; i < empDetials.responseJSON.length ; i++){
        var empcode = empDetials.responseJSON[i].empCode;
        detailEmp[empcode] = ""+empDetials.responseJSON[i].empCode+" : "+empDetials.responseJSON[i].empFirstName+" "+empDetials.responseJSON[i].empLastName+" ("+empDetials.responseJSON[i].empNickName+")";
    }
}

function btnDeleteProjectManager(id) {
    id = id.replace("btnDeletePM", "container_subProjectManager");
    $("#" + id).remove();
}

function keepDataForCheckChange(option, dataType) {
    if (option == "project") {
        if (dataType == "oldDataProject") {
            var numOfProjectManagerOld = numOfProjectManager;
            oldDataProject[0] = ($("#txtProjectName").val());
            oldDataProject[1] = ($("#txtInitialProjectName").val());
            oldDataProject[2] = ($("#txtCostsProject").val());
            oldDataProject[3] = ($("#dateStartProject").val());
            oldDataProject[4] = ($("#dateEndProject").val());
            oldDataProject[5] = (getAllProjectManager());
            numOfProjectManager = oldDataProject[5].split('<br/>').length-1;
            if(first != true) changeArrModuleMember(numOfProjectManagerOld);
            first = false;
        } else {
            newDataProject[0] = ($("#txtProjectName").val());
            newDataProject[1] = ($("#txtInitialProjectName").val());
            newDataProject[2] = ($("#txtCostsProject").val());
            newDataProject[3] = ($("#dateStartProject").val());
            newDataProject[4] = ($("#dateEndProject").val());
            newDataProject[5] = (getAllProjectManager());
        }
    }
}

function checkChangeData() {
    for (var i = 0; i < 6; i++) {
        if (oldDataProject[i] != newDataProject[i]) return false;
    }
    return true;
}

function getAllProjectManager() {
    var allNameProjectManager = "";
    var count_Element = $('[id^=txtProjectManagerName]').length;
    for (var i = 0; i < count_Element; i++) {
        var id = $('[id^=txtProjectManagerName]')[i].id;
        allNameProjectManager += "" + $("#" + id).val() + "<br/>";
    }
    return allNameProjectManager;
}

function moduleManagerToFrontEnd(module) {
    var moduleManager = "";
    var count_Element = dataDetail.responseJSON.ModuleManager[module].length;
    for (var i = 0; i < count_Element; i++) {
        moduleManager += "" + dataDetail.responseJSON.ModuleManager[module][i].empCode + "<br/>";
    }
    return moduleManager;
}

function moduleManagerDetailToFrontEnd(module) {
    var moduleManager = "";
    var count_Element = dataDetail.responseJSON.ModuleManager[module].length;
    for (var i = 0; i < count_Element; i++) {
        moduleManager += "" + detailEmp[dataDetail.responseJSON.ModuleManager[module][i].empCode] + "<br/>";
    }
    return moduleManager;
}

function moduleMemberToFrontEnd(module) {
    var moduleMember = "";
    var count_Element = dataDetail.responseJSON.ModuleMember[module].length;
    for (var i = 0; i < count_Element; i++) {
        moduleMember += "" + dataDetail.responseJSON.ModuleMember[module][i].empCode + "<br/>";
    }
    return moduleMember;
}

function moduleMemberDetailToFrontEnd(module) {
    var moduleMember = "";
    var count_Element = dataDetail.responseJSON.ModuleMember[module].length;
    for (var i = 0; i < count_Element; i++) {
        moduleMember += "" + detailEmp[dataDetail.responseJSON.ModuleMember[module][i].empCode] + "<br/>";
    }
    return moduleMember;
}

function editModule(objectModule) {
    var id = objectModule.id;
    var numID = id.split("btnEditModule");
    var number = numID[1];
    var statusEditModule = "Y";
    if(role!="ProjectManager"){
        statusEditModule = $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url: contextPath + '/moduleprojects/checkRoleByModuleProjectId',
            data: {
                moduleProjectId: dataDetail.responseJSON.ModuleProject[number].id
            },
            complete: function (xhr) {

            },
            async: false
        });
        statusEditModule = statusEditModule.responseText;
    }
    if(statusEditModule=="Y") {
        if (compareData() == true) {
            $("#modalEditModule").modal('show');
            editModuleName = dataDetail.responseJSON.ModuleProject[parseInt(number)].moduleCode;
            countEditModuleManager = dataDetail.responseJSON.ModuleManager[parseInt(number)].length;
            countEditModuleMember = dataDetail.responseJSON.ModuleMember[parseInt(number)].length;
            clearEditModal();
            var changeIDbtnSave = $('[id^=btnEditSaveModule]')[0].id;
            $('#' + changeIDbtnSave).attr('id', 'btnEditSaveModule' + number);
            $("#txtEditModuleName1").val(dataDetail.responseJSON.ModuleProject[number].moduleName);
            $("#txtEditInitialModuleName1").val(dataDetail.responseJSON.ModuleProject[number].moduleCode);
            $("#txtCostsEditModule1").val(dataDetail.responseJSON.ModuleProject[number].moduleCost);
            $("#dateStartEditModule").val(DateUtil.dataDateToFrontend(dataDetail.responseJSON.ModuleProject[number].dateStart, _language));
            $("#dateEndEditModule").val(DateUtil.dataDateToFrontend(dataDetail.responseJSON.ModuleProject[number].dateEnd, _language));
            var textModuleManager = moduleManagerToFrontEnd(number);
            var splitTextModuleManager = textModuleManager.split("<br/>");
            $("#txtEditModuleManagerName1").val(detailEmp[splitTextModuleManager[0]]);
            $("#txtEditModuleManagerName1").data("dataCode", "" + splitTextModuleManager[0]);
            for (var i = 2; i < splitTextModuleManager.length; i++) {
                var html = "<div style='' id='container_subEditModuleManager" + i + "' class='form-group'><label class='col-sm-3 control-label'></label>" +
                    "<div class='col-sm-4 display:inline-block''>" +
                    "<div class='input-group display:inline-block'>" +
                    "<input id='txtEditModuleManagerName" + i + "' onchange='editModuleManagerChange(this)' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtEditModuleManagerName" + i + "' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>" +
                    "<span class='input-group-addon'>" +
                    "<span id='BtntxtEditModuleManagerName" + i + "' onclick='UtilLov.lovEmp(this)' target='txtEditModuleManagerName" + i + "' class='fa fa-search' style='cursor:pointer;'>" +
                    "<jsp:text/>" +
                    "</span>" +
                    "</span>" +
                    "</input>" +
                    "</div>" +
                    "</div>" +
                    "<button id='btnDeleteEditMM" + i + "' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleManager(this.id)' style='margin:0px;'>" + Button.Delete + "</button>" +
                    "</div>";
                $("#subEditModuleManager").append(html);
                $("#txtEditModuleManagerName" + i).val(detailEmp[splitTextModuleManager[i - 1]]);
                $("#txtEditModuleManagerName" + i).data("dataCode", "" + splitTextModuleManager[i - 1].split(' ')[0]);
            }
            var textModuleMember = moduleMemberToFrontEnd(number);
            var splitTextModuleMember = textModuleMember.split("<br/>");
            var same1 = findSameModuleManagerOrProjectManager(splitTextModuleMember[0].split(' ')[0]);
            $("#txtEditModuleMemberName1").val(detailEmp[splitTextModuleMember[0]]);
            $("#txtEditModuleMemberName1").data("dataCode", "" + splitTextModuleMember[0]);
            $("#txtEditModuleMemberName1").prop('disabled',true);
            $("#txtEditModuleMemberName1").prop('style','background-color:white');
            if (same1 != "nosame") {
                if (same1 == "module") $("#container_subEditModuleMember1").attr("from", "modulemanager");
                else $("#container_subEditModuleMember1").attr("from", "project");
            }
            for (var i = 2; i < splitTextModuleMember.length; i++) {
                var same = findSameModuleManagerOrProjectManager(splitTextModuleMember[i - 1].split(' ')[0]);
                var html =
                    "<div style='' id='container_subEditModuleMember" + i + "' class='form-group'>" +
                    "<label class='col-sm-3 control-label'></label>" +
                    "<div class='col-sm-4 display:inline-block''>" +
                    "<div class='input-group display:inline-block'>" +
                    "<input id='txtEditModuleMemberName" + i + "' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtEditModuleMemberName" + i + "' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' class='form-control' autocomplete='off' type='department-lov'>" +
                    "<span class='input-group-addon'>" +
                    "<span id='BtntxtEditModuleMemberName" + i + "' onclick='UtilLov.lovEmp(this)' target='txtEditModuleMemberName" + i + "' class='fa fa-search' style='cursor:pointer;'>" +
                    "<jsp:text/>" +
                    "</span>" +
                    "</span>" +
                    "</input>" +
                    "</div>" +
                    "</div>";
                if (same == "nosame")
                    html += "<button id='btnDeleteEditMMem" + i + "' type='button' class='btn btn-danger' onclick='btnDeleteEditModuleMember(this.id)' style='margin:0px;'>" + Button.Delete + "</button>";
                else
                    html += "<div class='btn'>&nbsp</div>";
                html += "</div>";
                $("#subEditModuleMember").append(html);
                $("#txtEditModuleMemberName" + i).val(detailEmp[splitTextModuleMember[i - 1]]);
                $("#txtEditModuleMemberName" + i).data("dataCode", "" + splitTextModuleMember[i - 1]);
                if (same != "nosame") {
                    if (same == "module") $("#container_subEditModuleMember" + i).attr("from", "modulemanager");
                    else $("#container_subEditModuleMember" + i).attr("from", "project");
                    $("#txtEditModuleMemberName" + i).data("dataCode", "" + splitTextModuleMember[i - 1]);
                    $("#txtEditModuleMemberName" + i).prop('disabled','true');
                    $("#txtEditModuleMemberName" + i).prop('style','background-color:white');
                }
            }
            countEditModuleManager = $("[id^=btnDeleteEditMM]").length;
            countEditModuleMember = $("[id^=txtEditModuleMemberName]").length;
            saveDataEditModule();
            if(role!="ProjectManager"){
                $("[id^=btnDeleteEditMM]").hide();
                $("[id^=btnDeleteEditMMem]").show();
                $("[id^=txtEditModuleManagerName]").prop('disabled',true);
                $("[id^=txtEditModuleManagerName]").prop('style','background-color:white');
                $("#btnEditAddMM1").hide();
            }
        } else {
            bootbox.alert(Message.Cant_make_any_action + "\n" + Message.Confirm_editing_data);
        }
    }else{
        bootbox.alert(Message.No_role);
    }
}

function clearModal() {
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

function clearEditModal() {
    $("#subEditModuleManager").empty();
    $("#subEditModuleMember").empty();
}

function checkModal() {
    if ($("#txtModuleName1").val() == "" || $("#txtModuleName1").val() == " ") {
        $('#txtModuleName1').attr("data-placement", "bottom");
        $('#txtModuleName1').attr("data-content", Message.Complete_this_feld);
        $('#txtModuleName1').popover('show');
        return false;
    }
    if ($("#txtInitialModuleName1").val() == "" || $("#txtInitialModuleName1").val() == " ") {
        $('#txtInitialModuleName1').attr("data-placement", "bottom");
        $('#txtInitialModuleName1').attr("data-content", Message.Complete_this_feld);
        $('#txtInitialModuleName1').popover('show');
        return false;
    }
    if ($("#txtCostsModule1").val() == "" || $("#txtCostsModule1").val() == " ") {
        $('#txtCostsModule1').attr("data-placement", "bottom");
        $('#txtCostsModule1').attr("data-content", Message.Complete_this_feld);
        $('#txtCostsModule1').popover('show');
        return false;
    }
    else {
        var textCost = "" + $("#txtCostsModule1").val();
        if (!$.isNumeric(textCost)){
            $('#txtCostsModule1').attr("data-placement", "bottom");
            $('#txtCostsModule1').attr("data-content", Message.Number_only);
            $('#txtCostsModule1').popover('show');
            return false;
        }
        else if(parseFloat(textCost) < 0) {
            $('#txtCostsModule1').attr("data-placement", "bottom");
            $('#txtCostsModule1').attr("data-content", Message.Number_only);
            $('#txtCostsModule1').popover('show');
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
    if ($("#dateStartModule").val() == "" || $("#dateStartModule").val() == " ") {
        $('#dateStartModule').attr("data-placement", "bottom");
        $('#dateStartModule').attr("data-content", Message.Complete_this_feld);
        $('#dateStartModule').popover('show');
        return false;
    }
    if ($("#dateEndModule").val() == "" || $("#dateEndModule").val() == " ") {
        $('#dateEndModule').attr("data-placement", "bottom");
        $('#dateEndModule').attr("data-content", Message.Complete_this_feld);
        $('#dateEndModule').popover('show');
        return false;
    }
    var count_Element = $("[id^=txtModuleManagerName").length;
    for (var i = 0; i < count_Element; i++) {
        var id = $("[id^=txtModuleManagerName")[i].id;
        if ($("#" + id).val() == "" || $("#" + id).val() == " " || $("#"+id).data("dataCode") == null || $("#"+id).data("dataCode") == "") {
            $("#" + id).attr("data-placement", "bottom");
            $("#" + id).attr("data-content", Message.Complete_this_feld);
            $("#" + id).popover('show');
            return false;
        }
    }

    count_Element = $("[id^=txtModuleMemberName").length;
    for (var i = 0; i < count_Element; i++) {
        var id = $("[id^=txtModuleMemberName")[i].id;
        if ($("#" + id).val() == "" || $("#" + id).val() == " " || $("#"+id).data("dataCode") == null || $("#"+id).data("dataCode") == "") {
            $("#" + id).attr("data-placement", "bottom");
            $("#" + id).attr("data-content", Message.Complete_this_feld);
            $("#" + id).popover('show');
            return false;
        }
    }
    var boolCheckSameName = checkSameNameBeforeSave();
    if (boolCheckSameName == false) {
        bootbox.alert(Message.It_has_same_names);
        return false;
    }
    return true;
}

function checkCost(cost) {
    var count_Element = dataDetail.responseJSON.ModuleProject.length;
    var projectCost = parseInt($('#txtCostsProject').val());
    var totalModuleCost = parseInt(cost);
    for (var i = 0; i < count_Element; i++) {
        totalModuleCost += parseInt(dataDetail.responseJSON.ModuleProject[i].moduleCost);
    }
    if (totalModuleCost > projectCost) {
        confirmAddModuleWhenTotalCostMoreThanProject(totalModuleCost);
    } else {
        return true;
    }
}

function checkEditCost(cost, skipId, object) {
    var count_Element = dataDetail.responseJSON.ModuleProject.length;
    var projectCost = parseInt($('#txtCostsProject').val());
    var totalModuleCost = parseInt(cost);
    var skip = skipId.split("btnEditSaveModule");
    var idSkip = parseInt(skip[1]);
    for (var i = 0; i < count_Element; i++) {
        if (i != idSkip) totalModuleCost = totalModuleCost + parseInt(dataDetail.responseJSON.ModuleProject[i].moduleCost);
    }
    if (totalModuleCost > projectCost) {
        confirmEditModuleWhenTotalCostMoreThanProject(totalModuleCost, object);
    } else {
        return true;
    }
}

function confirmEditProject() {
    bootbox.confirm(Message.Edit_project, function (result) {
        if (result == true) {
            EditProjectByProjectId();
        }
    });
}

function confirmAddModuleWhenTotalCostMoreThanProject(totalModuleCost) {
    bootbox.confirm(Message.Cost_module_more_than_project + "\n" + Message.Confirm_add_module, function (result) {
        if (result == true) {
            SaveModule(totalModuleCost - parseInt($("#txtCostsProject").val()));
        }
    });
}

function confirmEditModuleWhenTotalCostMoreThanProject(totalModuleCost, object) {
    bootbox.confirm("" + Message.Cost_module_more_than_project + "\n" + Message.Confirm_edit_module, function (result) {
        if (result == true) {
            saveEditModule(object, totalModuleCost - parseInt($("#txtCostsProject").val()));
        }
    });
}

function saveModuleProjectToDB() {
    var boolSameModuleCode = findSameModuleCode();
    if (boolSameModuleCode == true) {
        var textdateStart = $('#dateStartModule').val();
        var textdateEnd = $('#dateEndModule').val();
        var convertFormatDateStart = DateUtil.dataDateToFrontend((DateUtil.dataDateToDataBase(textdateStart, _language)),'EN');
        var convertFormatDateEnd = DateUtil.dataDateToFrontend((DateUtil.dataDateToDataBase(textdateEnd, _language)),'EN');
        var crateModuleProject = {
            moduleCode: $("#txtInitialModuleName1").val(),
            moduleName: $("#txtModuleName1").val(),
            moduleCost: parseInt($("#txtCostsModule1").val()),
            dateStart: convertFormatDateStart,
            dateEnd: convertFormatDateEnd,
            projectId: projectId,
            arr_moduleManager: ModuleManagerToArray(),
            arr_moduleMember: ModuleMemberToArray()
        };
        var moduleProject =
            $.ajax({
                headers: {
                    Accept: "application/json"
                },
                type: "POST",
                url: contextPath + '/moduleprojects/saveModuleProject',
                data: crateModuleProject,
                complete: function (xhr) {
                    if (xhr.status === 201 || xhr.status === 200) {
                        bootbox.alert("" + Message.Save_success);
                        moduleProject = xhr;
                        $("#modalAddModule").modal('hide');
                    } else if (xhr.status === 500) {
                        bootbox.alert("" + Message.Save_error);
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
        bootbox.alert("[" + $('#txtInitialModuleName1').val() + "]" + Message.Has_in_project);
        return false;
    }
    return true;
}

function findSameModuleCode() {
    var retutnStatus = false;
    var dataJsonData = {
        moduleCode: $('#txtInitialModuleName1').val(),
        projectId: projectId,
        option: "size"
    };

    var size = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/moduleprojects/findModuleByModuleCodeAndProjectId',
        data: dataJsonData,
        complete: function (xhr) {
        },
        async: false
    });
    var returnSize = size.responseJSON;
    if (returnSize > 0) retutnStatus = false;
    else retutnStatus = true;
    return retutnStatus;
}

function findSameModuleCodeWhenEdit(editModuleName) {
    if (editModuleName == $('#txtEditInitialModuleName1').val()) return true;
    var dataJsonData = {
        moduleCode: $('#txtEditInitialModuleName1').val(),
        id: projectId,
        option: "size"
    }

    var size = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/moduleprojects/findModuleByModuleCodeAndProjectId',
        data: dataJsonData,
        complete: function (xhr) {
        },
        async: false
    });
    var returnSize = jQuery.parseJSON(size.responseText);
    if (returnSize != 0) return true;
    return false
}

function ModuleManagerToArray() {
    var moduleManager = "";
    for (var i = 0; i < $("[id^=txtModuleManagerName]").length; i++) {
        var id = $("[id^=txtModuleManagerName]")[i].id
        moduleManager +=""+$("#"+id).data("dataCode");
        if (i != $("[id^=txtModuleManagerName]").length - 1) moduleManager += "==";
    }
    return moduleManager;
}

function ModuleMemberToArray() {
    var moduleMember = "";
    for (var i = 0; i < $("[id^=txtModuleMemberName]").length; i++) {
        var id = $("[id^=txtModuleMemberName]")[i].id ;
        moduleMember +=""+$("#"+id).data("dataCode");
        if (i != $("[id^=txtModuleMemberName]").length - 1) moduleMember += "==";
    }
    return moduleMember;
}

function editModuleManagerToArray() {
    var moduleManager = "";
    for (var i = 0; i < $("[id^=txtEditModuleManagerName").length; i++) {
        var id = $("[id^=txtEditModuleManagerName")[i].id
        moduleManager +=""+$("#"+id).data("dataCode");
        if (i != $("[id^=txtEditModuleManagerName").length - 1) moduleManager += "==";
    }
    return moduleManager;
}

function editModuleMemberToArray() {
    var moduleMember = "";
    for (var i = 0; i < $("[id^=txtEditModuleMemberName").length; i++) {
        var id = $("[id^=txtEditModuleMemberName")[i].id
        moduleMember +=""+$("#"+id).data("dataCode");
        if (i != $("[id^=txtEditModuleMemberName").length - 1) moduleMember += "==";
    }
    return moduleMember;
}

function checkSameNameBeforeSave() {
    var count_Element = $("[id^=txtModuleManagerName").length;
    var arrManager = [];
    for (var i = 0; i < count_Element; i++) {
        var id = $("[id^=txtModuleManagerName]")[i].id;
        var name = "" + $("#" + id).data('dataCode');
        if (arrManager.indexOf("" + name) < 0) arrManager.push("" + name);
        else {
            return false;
        }
    }
    var count_Element2 = $("[id^=txtModuleMemberName]").length;
    var arrMember = [];
    for (var i = 0; i < count_Element2; i++) {
        var id = $("[id^=txtModuleMemberName]")[i].id;
        var name = "" + $("#" + id).data('dataCode');
        if (arrMember.indexOf("" + name) < 0) arrMember.push("" + name);
        else {
            return false;
        }
    }
    return true;
}

function deleteModule(object) {
    var id = object.id.replace("btnDeleteModule", "subrecordsModule");
    var statusEditModule = "Y";
    if(role=="ProjectManager") {
        var number = parseInt(id.split('subrecordsModule')[1]);
        statusEditModule = $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url: contextPath + '/moduleprojects/checkRoleByModuleProjectId',
            data: {
                moduleProjectId: dataDetail.responseJSON.ModuleProject[number].id
            },
            complete: function (xhr) {

            },
            async: false
        });
        statusEditModule = statusEditModule.responseText;
        if (statusEditModule == "Y") {
            if (compareData() == true) {
                bootbox.confirm(Message.Confirm_delete, function (result) {
                    if (result == true) {
                        var number = parseInt(id.split('subrecordsModule')[1]);
                        var dataJsonData = {
                            moduleCode: $("#headName" + number).text().split(')')[0].split('(')[1],
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
                            data: dataJsonData,
                            complete: function (xhr) {
                                if (xhr.status === 201 || xhr.status === 200) {
                                    $("#" + id).remove();
                                    bootbox.alert("" + Message.Delete_module_success);
                                } else {
                                    bootbox.alert("" + Message.Delete_module_failed);
                                }
                            },
                            async: false
                        });
                    }
                });
            } else {
                bootbox.alert(Message.Cant_make_any_action + "\n" + Message.Confirm_editing_data);
            }
        }
    }else{
        bootbox.alert(Message.No_role);
    }
}

function getAllEditModuleManager() {
    var allNameModuleManager = "";
    var count_Element = $('[id^=txtEditModuleManagerName]').length;
    for (var i = 0; i < count_Element; i++) {
        var id = $('[id^=txtEditModuleManagerName]')[i].id;
        allNameModuleManager += "" + $("#" + id).val() + " <br/> ";
    }
    return allNameModuleManager;
}

function getAllEditModuleMember() {
    var allNameModuleMember = "";
    var count_Element = $('[id^=txtEditModuleMemberName]').length;
    for (var i = 0; i < count_Element; i++) {
        var id = $('[id^=txtEditModuleMemberName]')[i].id;
        allNameModuleMember += "" + $("#" + id).val() + "<br/>";
    }
    return allNameModuleMember;
}

function getAllEditDetailModuleManager() {
    var allNameModuleManager = "";
    var count_Element = $('[id^=txtEditModuleManagerName]').length;
    for (var i = 0; i < count_Element; i++) {
        var id = $('[id^=txtEditModuleManagerName]')[i].id;
        allNameModuleManager += "" + detailEmp[$("#" + id).val()] + " <br/> ";
    }
    return allNameModuleManager;
}

function getAllEditDetailModuleMember() {
    var allNameModuleMember = "";
    var count_Element = $('[id^=txtEditModuleMemberName]').length;
    for (var i = 0; i < count_Element; i++) {
        var id = $('[id^=txtEditModuleMemberName]')[i].id;
        allNameModuleMember += "" + detailEmp[$("#" + id).val()] + "<br/>";
    }
    return allNameModuleMember;
}

function btnDeleteEditModuleManager(id) {
    id = id.replace("btnDeleteEditMM", "container_subEditModuleManager");
    $("#" + id).remove();
    editModuleManagerChange(null);
}

function btnDeleteEditModuleMember(id) {
    id = id.replace("btnDeleteEditMMem", "container_subEditModuleMember");
    $("#" + id).remove();
}

$("#btnIncresePoint").click(function () {
    if(compareData()==true) {
        $("#modalIncreseCost").modal('show');
        option = "increse";
        addDataToDDLModule();
        $("#ddlIncreseCostModuleName").attr("readonly", "true");
    }
    else{
        bootbox.alert(Message.Cant_make_any_action+"\n"+Message.Confirm_editing_data);
    }
});

$("#btnDecresePoint").click(function () {
    if(compareData()==true) {
        $("#modalIncreseCost").modal('show');
        option = "decrese";
        addDataToDDLModule();
        $("#ddlIncreseCostModuleName").attr("readonly", "true");
    }
    else{
        bootbox.alert(Message.Cant_make_any_action+"\n"+Message.Confirm_editing_data);
    }
});

function checkCostCanDecrese() {
    if (option == "decrese") {
        if ($("[value=project]").prop("checked") == true) {
            var totalUse = 0;
            var count_Element = $("[id^=btnEditModule]").length;
            for (var i = 0; i < count_Element; i++) {
                var id = $('[id^=btnEditModule]')[i].id;
                var number = parseInt(id.split("btnEditModule")[1]);
                totalUse += dataDetail.responseJSON.ModuleProject[number].moduleCost
            }
            var needDecrese = ($("#txtIncreseCostModuleCost").val());
            var canDecrese = ($("#txtCostsProject").val()) - totalUse;
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
        else {
            var totalUse = 0;
            totalUse += dataDetail.responseJSON.ModuleProject[$("#ddlIncreseCostModuleName").val() - 1].moduleCost;
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
    else {
        saveIncreseCost(null);
    }
}

function confirmWhenDecresePointLessThanCanDecrese(canDecrese) {
    bootbox.confirm(Message.You_can_decrese + " " + canDecrese + " " + Label.Point + "\n" + Message.Do_you_want_to_decrese + " " + canDecrese + " " + Message.Point_from_project + " ?", function (result) {
        if (result == true) {
            saveIncreseCost(canDecrese);
        }
    });
}

function saveIncreseCost(canDecrese) {
    if ($("[value=project]").prop("checked") == true) {
        var bool = checkDataBeforeSave("project");
        if (bool == true) {
            if (option == "decrese") {
                if (canDecrese == null) $("#txtIncreseCostModuleCost").val("-" + $("#txtIncreseCostModuleCost").val());
                else $("#txtIncreseCostModuleCost").val("-" + canDecrese);
            }
            var editCostProject = {
                projectId: projectId,
                increseCost: ($("#txtIncreseCostModuleCost").val())
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
                        if (option == "decrese")  bootbox.alert("" + Message.Decrese + " " + ($("#txtIncreseCostModuleCost").val()) + " " + Message.Point_from_project);
                        else bootbox.alert("" + Message.Increse + " " + ($("#txtIncreseCostModuleCost").val()) + " " + Message.Point_to_project);
                        recieveProject = xhr;
                        $("#txtCostsProject").val("" + recieveProject.responseJSON.projectCost);
                        first = true;
                        keepDataForCheckChange("project","oldDataProject");
                        return true;
                    } else if (xhr.status === 500) {
                        if (option == "decrese")  bootbox.alert("" + Message.Cant_Decrese + " " + ($("#txtIncreseCostModuleCost").val()) + " " + Message.Point_from_project);
                        else bootbox.alert("" + Message.Cant_Increse + " " + ($("#txtIncreseCostModuleCost").text()) + " " + Message.Point_to_project);
                        return false;
                    }
                },
                async: false
            });
            clearModalIncresePoint();
            $("#modalIncreseCost").modal('hide');
            return true;
        } else {
            return false;
        }
    }
    else {
        var bool = checkDataBeforeSave("module");
        if (bool == true) {
            if (option == "decrese") $("#txtIncreseCostModuleCost").val("-" + $("#txtIncreseCostModuleCost").val());
            var idModuleProject = $("#ddlIncreseCostModuleName").val();
            var editCostModuleProject = {
                projectId: projectId,
                codeModuleProject: idModuleProject,
                costIncrese: ($("#txtIncreseCostModuleCost").val())
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
            first = true;
            keepDataForCheckChange("project","oldDataProject");
            clearModalIncresePoint();
            return true;
        } else {
            return false;
        }
    }
}

$("#btnSaveIncreseCostModule").click(function () {
    checkCostCanDecrese();
});

function clearModalIncresePoint() {
    $("#txtIncreseCostModuleCost").val("");
    $("[value=project]").prop("checked", true);
}

function changeParameterIncreseOrDecresePointByModuleCode(moduleCode, increseCost) {
    for (var i = 0; i < dataDetail.responseJSON.ModuleProject.length; i++) {
        if (dataDetail.responseJSON.ModuleProject[i].moduleCode == moduleCode) {
            dataDetail.responseJSON.ModuleProject[i].moduleCost = parseFloat(dataDetail.responseJSON.ModuleProject[i].moduleCost) + parseFloat(increseCost);
            break;
        }
    }
}

function addDataToDDLModule() {
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
        data: dataJsonData,
        complete: function (xhr) {

        },
        async: false
    });
    $("#ddlIncreseCostModuleName").empty();
    $("#ddlIncreseCostModuleName").append("<option value=''></option>");
    dataDDLByCode = dataDDLByCode.responseJSON;
    if (dataDDLByCode != undefined) {
        dataDDLByCode.forEach(function (name) {
            var text = "(" + name.moduleCode + ") " + name.moduleName
            $("#ddlIncreseCostModuleName").append("<option value='" + name.moduleCode + "'>" + text + "</option>");
        });
    }
}

function checkDataBeforeSave(option) {
    if (option == "module") {
        if ($("#ddlIncreseCostModuleName").val() == "") {
            $('#ddlIncreseCostModuleName').attr("data-placement", "bottom");
            $('#ddlIncreseCostModuleName').attr("data-content", Message.Please_select_module);
            $('#ddlIncreseCostModuleName').popover('show');
            return false;
        }
    }

    if ($("#txtIncreseCostModuleCost").val() == "" || $("#txtIncreseCostModuleCost").val() == " ") {
        $('#txtIncreseCostModuleCost').attr("data-placement", "bottom");
        $('#txtIncreseCostModuleCost').attr("data-content", Message.Complete_this_feld);
        $('#txtIncreseCostModuleCost').popover('show');
        return false;
    }
    else {
        var textCost = "" + $("#txtIncreseCostModuleCost").val();
        if (!$.isNumeric(textCost) ) {
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

function changeCostLabelModule(newCost) {
    var newCostToText = newCost.responseText;
    var subCost = newCostToText.split(',');
    $("#txtCostsProject").val("" + subCost[0]);
    var name = $("#ddlIncreseCostModuleName").val();
    var count_Element = $("[id^=headName]").length;
    for (var i = 0; i < count_Element; i++) {
        var id = $("[id^=headName]")[i].id;
        var headName = $("#" + id).text();
        if (findEqualName(headName, name)) {
            var oldName = $("#" + id).text();
            // replace Cost in [ ]
            var newName = replaceCost(oldName, subCost[1]);
            $("#" + id).text(newName);
        }
    }
}

function findEqualName(headName, name) {
    var x = headName.split(' ');
    var y = name.split(' ');
    var head = x[0].substr(1, x[0].length - 2);
    if (head == y[0]) return true;
    else return false;
}

function replaceCost(name, newCost) {
    var index = name.split('[');
    index[1] = "[" + newCost + "]";
    return index[0] + index[1];
}

$("input:radio[name=project]").click(function () {
    var value = $(this).val();
    if (value == "project") {
        $("#ddlIncreseCostModuleName").attr("readonly", "true");
    } else {
        $("#ddlIncreseCostModuleName").removeAttr("readonly");
    }
});

function compareData(){
    newDataProject[0] = ($("#txtProjectName").val());
    newDataProject[1] = ($("#txtInitialProjectName").val());
    newDataProject[2] = ($("#txtCostsProject").val());
    newDataProject[3] = ($("#dateStartProject").val());
    newDataProject[4] = ($("#dateEndProject").val());
    newDataProject[5] = (getAllProjectManager());
    for (var i = 0; i < 6; i++) {
        if (oldDataProject[i] != newDataProject[i]) return false;
    }
    return true;
}

function btnDeleteModuleMember(id) {
    id = id.replace("btnDeleteMMem","container_subModuleMember");
    $("#"+id).remove();
}

function btnDeleteModuleManager(id) {
    id = id.replace("btnDeleteMM","container_subModuleManager");
    $("#"+id).remove();
    moduleManagerChange(null);
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
                "<div class='btn'></div>"+
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
        arrProjectManager.push(""+name);
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
            $("#txtEditModuleMemberName"+[count_elements + 1]).data("dataCode",""+$("[id^=txtEditModuleManagerName]")[i].value.split(' ')[0]);
            $("#txtEditModuleMemberName" + [count_elements + 1]).prop('disabled',true);
            $("#txtEditModuleMemberName" + [count_elements + 1]).prop('style','background-color:white');
            countEditModuleMember++;
        }
    }
}

function changeArrModuleMember(num){
    var count = dataDetail.responseJSON.ModuleProject.length;
    for(var i = 0 ; i < count ; i++){
        var newArr = "";
        var x = projectManagerToArray();
        x = x.split("==");
        for(var j = 0 ; j < x.length ; j++)
            newArr += x[j]+"<br/>";
        for(var k = num ; k < dataDetail.responseJSON.ModuleMember[i].length ;k++) {
            var name = dataDetail.responseJSON.ModuleMember[i][k].empCode;
            if(x.indexOf(name) == -1) {
                newArr += dataDetail.responseJSON.ModuleMember[i][k].empCode ;
                if(k!=dataDetail.responseJSON.ModuleMember[i].length - 1) newArr += "<br/>";
            }
        }
        var va1 = newArr.split("<br/>").length;
        var va2 = dataDetail.responseJSON.ModuleMember[i].length;
        if(va2>va1) {
            for(var l = 0 ; l < va2 ; l++){
                if(l<va1) dataDetail.responseJSON.ModuleMember[i][l].empCode = newArr.split("<br/>")[l];
                else  dataDetail.responseJSON.ModuleMember[i].pop();
            }
        }else{
            for(var l = 0 ; l < va1 ; l++){
                if(l<va2) dataDetail.responseJSON.ModuleMember[i][l].empCode = newArr.split("<br/>")[l];
                else{
                    dataDetail.responseJSON.ModuleMember[i][l] = {} ;
                    dataDetail.responseJSON.ModuleMember[i][l].empCode = newArr.split("<br/>")[l];
                }
            }
        }
        $("#lbEditModuleMember"+i).empty();
        $("#lbEditModuleMember"+i).append(newArr);
    }
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

function editModuleWhenEdit(objectModule){
    var id = objectModule.id;
    var numID = id.split("btnEditModule");
    var number = numID[1];
    editModuleName = dataDetail.responseJSON.ModuleProject[parseInt(number)].moduleCode;
    clearEditModal();
    var changeIDbtnSave = $('[id^=btnEditSaveModule]')[0].id;
    $('#' + changeIDbtnSave).attr('id', 'btnEditSaveModule' + number);
    $("#txtEditModuleName1").val(dataDetail.responseJSON.ModuleProject[number].moduleName);
    $("#txtEditInitialModuleName1").val(dataDetail.responseJSON.ModuleProject[number].moduleCode);
    $("#txtCostsEditModule1").val(dataDetail.responseJSON.ModuleProject[number].moduleCost);
    $("#dateStartEditModule").val(DateUtil.dataDateToFrontend(dataDetail.responseJSON.ModuleProject[number].dateStart, _language));
    $("#dateEndEditModule").val(DateUtil.dataDateToFrontend(dataDetail.responseJSON.ModuleProject[number].dateEnd, _language));
    var textModuleManager = moduleManagerToFrontEnd(number);
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

    var textModuleMember = moduleMemberToFrontEnd(number);
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
    if (cost == null) boolCheckCost = checkEditCost($("#txtCostsEditModule1").val(), id, object);
    else boolCheckCost = true;
    var boolSameModuleCode = findSameModuleCodeWhenEdit(editModuleName);
    if (boolSameModuleCode == true) {
        if (boolCheckCost == true) {
            var boolSave = editDataModuleInDBWhenEdit(number[1], cost);
            if (boolSave == true) {
                //findDataKeepToParameter(projectId);
                if (cost != null) {
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
                                //findDataKeepToParameter(projectId);
                                $("#txtCostsProject").val("" + dataDetail.responseJSON.Project[0].projectCost);
                                return true;
                            }
                        },
                        async: false
                    });
                }
                var allModuleManager = "" + getAllEditDetailModuleManager();
                var allModuleMember = "" + getAllEditDetailModuleMember();
                $("#headName" + number[1]).text("(" + $("#txtEditInitialModuleName1").val() + ")  " + $("#txtEditModuleName1").val() + "  [" + $("#txtCostsEditModule1").val() + "]");
                $("#lbDateStartEditModule" + number[1]).text("" + $("#dateStartEditModule").val());
                $("#lbDateEndEditModule" + number[1]).text("" + $("#dateEndEditModule").val());
                $("#lbEditModuleManager" + number[1]).empty();
                $("#lbEditModuleManager" + number[1]).append("" + allModuleManager);
                $("#lbEditModuleMember" + number[1]).empty();
                $("#lbEditModuleMember" + number[1]).append("" + allModuleMember);
                //first = true ;
                //keepDataForCheckChange("project","oldDataProject");
            }
        }
        else if (boolSameName == false) {
            bootbox.alert("" + Message.It_has_same_names)
        }
    }
    else {
        bootbox.alert("[" + $('#txtEditInitialModuleName1').val() + "] " + Message.Has_in_database);
    }
}

function editDataModuleInDBWhenEdit(number,cost){
    var moduleCost = ($("#txtCostsEditModule1").val());
    var returnStatus = false;
    var convertFormatDateStart = DateUtil.dataDateToFrontend(DateUtil.dataDateToDataBase($('#dateStartEditModule').val(), _language),'EN');
    var convertFormatDateEnd = DateUtil.dataDateToFrontend(DateUtil.dataDateToDataBase($('#dateEndEditModule').val(), _language),'EN');
    var crateModuleProject = {
        moduleNeedEdit: editModuleName,
        moduleCode: $("#txtEditInitialModuleName1").val(),
        moduleName: $("#txtEditModuleName1").val(),
        moduleCost: moduleCost,
        dateStart: convertFormatDateStart,
        dateEnd: convertFormatDateEnd,
        arr_moduleManager: editModuleManagerToArray(),
        arr_moduleMember: editModuleMemberToArray(),
        projectId: projectId,
        version: ModuleProject[number].version
    };
    var responseHeader = null;
    var recieve = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "POST",
        url: contextPath + '/moduleprojects/editModuleProjectByModuleProjectCodeAndProjectId',
        data: crateModuleProject,
        complete: function (xhr) {
            if (xhr.status === 201 || xhr.status === 200) {
                returnStatus = true;
            } else if (xhr.status === 500) {
                returnStatus = false;
            }
        },
        async: false
    });
    if (number != null) {

    }
    return returnStatus;
}

function saveDataModule(){
    oldDataModule[0] = $("#txtModuleName1").val();
    oldDataModule[1] = $("#txtInitialModuleName1").val();
    oldDataModule[2] = $("#txtCostsModule1").val();
    oldDataModule[3] = $("#dateStartModule").val();
    oldDataModule[4] = $("#dateEndModule").val();
    oldDataModule[5] = ModuleManagerToArray();
    oldDataModule[6] = ModuleMemberToArray();
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

function compareDataModule(){
    newDataModule[0] = $("#txtModuleName1").val();
    newDataModule[1] = $("#txtInitialModuleName1").val();
    newDataModule[2] = $("#txtCostsModule1").val();
    newDataModule[3] = $("#dateStartModule").val();
    newDataModule[4] = $("#dateEndModule").val();
    newDataModule[5] = ModuleManagerToArray();
    newDataModule[6] = ModuleMemberToArray();
    for(var i = 0  ; i < 7 ; i++)
        if(oldDataModule[i] != newDataModule[i]) return false;
    return true;
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

$("#btnUpModule").click(function(){
    collapseShow(false);
});

$("#btnDownModule").click(function(){
    collapseShow(true);
});

function collapseShow(status){
    var countCollapse = $('[id^=collapse]').length ;
    if(status){
        for(var i = 0 ; i < countCollapse ; i++) {
            $("#collapse"+i).addClass("in");
            $("#collapse"+i).css("height","auto");
        }
    }
    else{
        for(var i = 0 ; i < countCollapse ; i++){
            $("#collapse"+i).removeClass("in");
            $("#collapse"+i).css("height","auto");
        }
    }
}

function checkSameNameMember(text){
    var count_Element2 = $("[id^=txtModuleMemberName]").length;
    for(var i=0;i<count_Element2;i++){
        var id = $("[id^=txtModuleMemberName]")[i].id;
        var name = ""+$("#"+id).data('dataCode');
        if(name.split(":")[0].trim()==text.split(":")[0].trim()) {
            return false;
        }
    }
    return true;
}

function checkEditSameNameMember(text){
    var count_Element2 = $("[id^=txtEditModuleMemberName]").length;
    for(var i=0;i<count_Element2;i++){
        var id = $("[id^=txtEditModuleMemberName]")[i].id;
        var name = ""+$("#"+id).data('dataCode');
        if(name.split(":")[0].trim()==text.split(":")[0].trim()) {
            return false;
        }
    }
    return true;
}