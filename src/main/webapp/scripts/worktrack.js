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
});

pagginationFollow.setEventPaggingBtn("paggingSimple3", pagginationFollow);
pagginationFollow.loadTable = function loadTable(jsonData) {
    $('#ResualtSearchTaskFollow').empty();
    var tableData = "";
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

function addStatusToDDL(){
    $("#ddlStatusTask").append("<option value='N'>งานใหม่</option>");
    $("#ddlStatusTask").append("<option value='R'>พร้อมทดสอบ</option>");
    $("#ddlStatusTask").append("<option value='C'>สำเร็จ</option>");
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
    var checkRole = $(this).attr('followempcode').split('==');
    if(checkRole.indexOf(""+nowUser) > -1) {
        empCode = ($(this).attr('managerEmpCode'));
        var detailFollower = getEmpDeatailToFrontEnd($(this).attr('followempcode'));
        project = $(this).attr('projectName');
        module = $(this).attr('moduleName');
        program = $(this).attr('programName');
        task = $(this).attr('taskName');
        var detailManager = getEmpDeatailToFrontEnd(empCode);
        appendLabel(detailManager, detailFollower);
        $("#modalFollowTask").modal('show');
    }
    else{
        bootbox.alert("ไม่มีสิทธิ์");
    }
});

$("#close").click(function () {
    $("#modalFollowTask").modal('hide');
});

var labelModal = "";

function appendLabel(detailManager,detailFollower) {
    $('#label_modal').empty();
    labelModal = ''
        + '<div class="form-group"><label class="control-label col-sm-5 ">Project</label>'
        + ' <label class="control-label">'+ project +'</label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 ">Module Project</label>'
        + ' <label class="control-label">'+ module +'</label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 ">Program</label>'
        + ' <label class="control-label">'+ program +'</label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 ">Task</label>'
        + ' <label class="control-label">'+ task +'</label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 ">Manager</label>'
        + ' <label class="control-label">' +detailManager+'</label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 ">Follower</label>'
        + ' <label class="control-label">' +detailFollower+'</label></div>'
        +'<div class="form-group"> <label class="radio-inline control-label col-sm-6"><input type="radio" name="optradio" checked="check"/>Pass</label>'
        + '<label class="radio-inline "><input type="radio" name="optradio"/>Fail</label> </div>'
    ;
    $('#label_modal').append(
        labelModal
    );
    empCodeToPage = []
}