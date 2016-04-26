var resultTypeTask ;
var pagginationFollow = $.extend({},UtilPaggination);
var empDetail ;
addTaskToDDL();
addStatusToDDL();
findEmpDetail();

$("#txtProjectName").on('change',function(){
    addModuleToDDL();
});

$("#btnSearch").click(function (){
    findData();
});

function findData(){
    var empCode = $("#txtFollower").data("dataCode");
    var projectId = "" + $("#txtProjectName").data("data-id");
    if (projectId == "" || projectId == "undefined") projectId = "";
    var moduleId = "" + $("#ddlModule").val();
    if (moduleId == "" || moduleId == "null") moduleId = "";
    var typrTaskId = "" + $("#ddlTypeTask").val();
    if (typrTaskId == "" || typrTaskId == "null") typrTaskId = "";
    var statusTask = "" + $("#ddlStatusTask").val();
    if (statusTask == "" || statusTask == "null") statusTask = "";
    if(empCode=="") {
        var dataJsonData = {
            projectId: projectId,
            option: "",
            moduleId: moduleId,
            typeTaskId: typrTaskId,
            statusTask: statusTask,
            empCode:""
        };
        pagginationFollow.setOptionJsonData({
            url: contextPath + "/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus",
            data: dataJsonData
        });
        var findsize = {
            projectId: projectId,
            option: "size",
            moduleId: moduleId,
            typeTaskId: typrTaskId,
            statusTask: statusTask,
            empCode:""
        };
        pagginationFollow.setOptionJsonSize({
            url: contextPath + "/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus",
            data: findsize
        });
        pagginationFollow.search(pagginationFollow);
    }
    else{
        var dataJsonData = {
            projectId: projectId,
            option: "",
            moduleId: moduleId,
            typeTaskId: typrTaskId,
            statusTask: statusTask,
            empCode:empCode
        };
        pagginationFollow.setOptionJsonData({
            url: contextPath + "/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus",
            data: dataJsonData
        });
        var findsize = {
            projectId: projectId,
            option: "size",
            moduleId: moduleId,
            typeTaskId: typrTaskId,
            statusTask: statusTask,
            empCode:empCode
        };
        pagginationFollow.setOptionJsonSize({
            url: contextPath + "/tasks/findTaskByProjectIdOrModuleIdOrTypeTaskIdOrTaskStatus",
            data: findsize
        });
        pagginationFollow.search(pagginationFollow);
    }
}

pagginationFollow.setEventPaggingBtn("paggingSimple3", pagginationFollow);
pagginationFollow.loadTable = function loadTable(jsonData) {
    $('#ResualtSearchTaskFollow').empty();
    var tableData = "";
    if(jsonData.length==0){
        tableData = "<tr><td colspan='6' class='text-center'>"+MESSAGE.MS_DATA_NOT_FOUND+"</td></tr>";
        $('#ResualtSearchTaskFollow').append(
            tableData
        );
    }
    jsonData.forEach(function (value) {
        var empManager = "";
        for(i=0;i<value.moduleManager.length;i++){
            empManager+=""+value.moduleManager[i].empCode ;
            if(i!=value.moduleManager.length - 1) empManager+="==";
        }
        tableData = ''
            + '<tr>'
            + '<td class="text-center">'
            + '<button id="checkTask_'+value.id +'" projectName="'+ value.project
            +'" moduleName="'+ value.module
            +'" programName="'+ value.program +'" taskName="'+ value.taskName
            +'" managerEmpCode="'+ empManager +'" followEmpCode="'+ value.follower
            +'" class="btn btn-info btn-xs" type="button" >' +
            '<span name="editClick" class="glyphicon glyphicon-check" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="' + value.id + '" class="text-left" style="color: #000">'
            +value.project
            + '</td>'
            + '</td>'
            + '<td id="' + value.id + '" class="text-left" style="color: #000">'
            +value.module
            + '</td>'
            + '</td>'
            + '<td id="' + value.id + '" class="text-left" style="color: #000">'
            + value.program
            + '</td>'
            + '<td id="taskName' + value.id + '" class="text-left" style="color: #000">'
            + value.taskName
            + '</td>'
            + '<td id="taskName' + value.id + '" class="text-center" style="color: #000">'
            + value.progress +'%'
            + '</td>'
            + '</tr>';
        $('#ResualtSearchTaskFollow').append(
            tableData
        );

    });
}

function addModuleToDDL() {
    var dataJsonData = {
        projectId: $("#txtProjectName").data("data-id")
    };
    var resultModule = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/moduleprojects/findModuleByProjectId',
        data: dataJsonData,
        complete: function (xhr) {
            if (xhr.status === 201 || xhr.status === 200) {

            } else if (xhr.status === 500) {
                resultModule = null;
            }
        },
        async: false
    });
    if (resultModule != null) {
        $("#ddlModule").empty();
        $("#ddlModule").append("<option value=null></option>");
        for (var i = 0; i < resultModule.responseJSON.length; i++) {
            $("#ddlModule").append("<option value='" + resultModule.responseJSON[i].id + "'>" + resultModule.responseJSON[i].moduleName + "</option>");
        }
    }
}

var resultTaskStatus;
function addStatusToDDL(){
    resultTaskStatus = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/parameterdetails   ',
        success: function (xhr) {
            if (xhr.status === 201 || xhr.status === 200) {

            } else if (xhr.status === 500) {

            }
        },
        async: false
    });
    $("#ddlStatusTask").empty();
    $("#ddlStatusTask").append("<option value='null'</option>");
    for (var i = 0; i < resultTaskStatus.responseJSON.length; i++) {
        var statusCode = resultTaskStatus.responseJSON[i].parameterValue1;
        var text = "";
        if (statusCode == 'N') text = LABEL.LABEL_NEW_TASK;
        else if (statusCode == 'R') text = LABEL.LABEL_READY_TASK;
        else if (statusCode == 'C') text = LABEL.LABEL_COMPLETE_TASK;
        $("#ddlStatusTask").append("<option value='" + statusCode + "'>" + text + "</option>");
    }
}

function addTaskToDDL(){
    resultTypeTask = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/typetasks/findAllTypeTask',
        complete: function (xhr) {
            if (xhr.status === 201 || xhr.status === 200) {

            } else if (xhr.status === 500) {

            }
        },
        async: false
    });
    if (resultTypeTask != null) {
        $("#ddlTypeTask").empty();
        $("#ddlTypeTask").append("<option value=null></option>");
        for (var i = 0; i < resultTypeTask.responseJSON.length; i++) {
            $("#ddlTypeTask").append("<option value='" + resultTypeTask.responseJSON[i].id + "'>" + resultTypeTask.responseJSON[i].typeTaskName + "</option>");
        }
    }
}

var empLastName = [];
var empFirstName = [];
function findEmpDetail(){
    empDetail = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/central/findAllEmployeeByEmpCodeArray',
        complete: function(xhr){
        },
        async: false
    });

}

function getEmpDeatailToFrontEnd(empCode){
    var returnText = "";
    var splitEmpCode = empCode.split('==');
    empDetail.responseJSON.forEach(function(value){
        if(splitEmpCode.indexOf(""+value.empCode)>-1)
        {
            returnText+=""+value.empCode+" : "+value.empFirstName+" "+value.empLastName+"<br/>";
        }
    });
    check = false;
    return returnText;
}

var empCodeToPage = [];
var empCode = "";
var project,module,program,task;

$('#taskFollow').on("click", "[id^=checkTask_]", function () {
    var checkRole = $(this).attr('followempcode');
    checkRole+="=="+$(this).attr('managerempcode').split('==');
    if(checkRole.indexOf(""+nowUser) > -1) {
        empCode = ($(this).attr('managerEmpCode'));
        var detailFollower = getEmpDeatailToFrontEnd($(this).attr('followempcode'));
        project = $(this).attr('projectName');
        module = $(this).attr('moduleName');
        program = $(this).attr('programName');
        task = $(this).attr('taskName');
        var detailManager = getEmpDeatailToFrontEnd(empCode);
        appendLabel(detailManager, detailFollower,this.id.split("_")[1]);
        $("#modalFollowTask").modal('show');
    }
    else{
        bootbox.alert(MESSAGE.MS_NO_ROLE);
    }
});

$("#close").click(function () {
    $("#modalFollowTask").modal('hide');
});

$("#btnModalTaskAdd").click(function () {
    var id = ''; var taskStatus ='';
    $('input[name=optradio]:checked').each(function () {
        id = $(this).attr('taskId');
        taskStatus = $(this).attr('status');
    });
    editTaskStatus(id,taskStatus);
    findData();
});

var labelModal = "";

function appendLabel(detailManager,detailFollower,taskId) {
    $('#label_modal').empty();
    labelModal = ''
        + '<div class="form-group"><label class="control-label col-sm-5 "><h5>'+LABEL.LABEL_PROJECT_NAME +'</h5></label>'
        + ' <label class="control-label"><h5>'+ project +'</h5></label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 "><h5>'+LABEL.LABEL_MODULE_NAME+'</h5></label>'
        + ' <label class="control-label"><h5>'+ module +'</h5></label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 "><h5>'+LABEL.LABEL_PROGRAM_NAME+'</h5></label>'
        + ' <label class="control-label"><h5>'+ program +'</h5></label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 "><h5>'+LABEL.LABEL_TASK_NAME+'</h5></label>'
        + ' <label class="control-label"><h5>'+ task +'</h5></label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 "><h5>'+LABEL.LABEL_MANAGER+'</h5></label>'
        + ' <label class="control-label"><h5>' +detailManager+'<h5></label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 "><h5>'+LABEL.LABEL_FOLLOWER+'</h5></label>'
        + ' <label class="control-label"><h5>' +detailFollower+'<h5></label></div>'
        +'<div class="form-group"> <label class="radio-inline control-label col-sm-6"><input id="radioPass" type="radio" taskId="'+ taskId +'" status="C" name="optradio" checked="check"/>'+ LABEL.LABEL_PASS +'</label>'
        + '<label class="radio-inline "><input id="radioFail" type="radio" taskId="'+ taskId +'" status="N" name="optradio"/>'+ LABEL.LABEL_FAIL +'</label></div>'
    ;
    $('#label_modal').append(
        labelModal
    );
    empCodeToPage = []
}

function editTaskStatus(id, status) {
    var dataJsonData = {
        taskId: id,
        status: status
    };
    $.ajax({
        type: "POST",
        //contentType: "application/json; charset=utf-8",
        //dataType: "json",
        //headers: {
        //    Accept: "application/json"
        //},
        url: contextPath + '/tasks/editTaskStatus',
        data: dataJsonData,
        complete: function (xhr) {
            if (xhr.status === 200) {
                $('#modalFollowTask').modal('hide');
                bootbox.alert(MESSAGE.MS_SAVE_SUCCESS);
            } else if (xhr.status === 500) {
                bootbox.alert(MESSAGE.MS_SAVE_FAIL);
            }
        },
        async: false
    });
}
