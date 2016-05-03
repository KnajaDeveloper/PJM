var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var pagginationFollow = $.extend({},UtilPaggination);

$(document).ready(function(){

    tasktaskFollowPlanTofirstPage();

});

var empCodeToPage = [];
var empCode =[];
var project,module,program,task,version;
var statusTask ;

function tasktaskFollowPlanTofirstPage() {
    var dataJsonData = {} ;
    pagginationFollow.setOptionJsonData({
        url: contextPath + "/tasks/selectTaskFollowTofirstPage",
        data: dataJsonData
    });
    pagginationFollow.setOptionJsonSize({
        url: contextPath + "/tasks/taskPaggingSizeTaskFollow",
        data: dataJsonData
    });
    pagginationFollow.search(pagginationFollow);
}  //--functionSearch--//



pagginationFollow.setEventPaggingBtn("paggingSimple3", pagginationFollow);
pagginationFollow.loadTable = function loadTable(jsonData) {
    $('#ResualtSearchTaskFollow').empty();
    var tableData = "";
    if(jsonData.length > 0 ) {

        jsonData.forEach(function (value) {
            var progress =  value.progress ;
            var colorProgress =  progress  == "100" ? "progress-bar-success" : "progress-bar-warning";
            tableData = ''
                + '<tr>'
                + '<td class="text-center">'
                + '<button id="checkTask_' + value.id + '" version="'+value.version+'" projectName="' + value.project
                + '" moduleName="' + value.module
                + '" programName="' + value.program + '" status="'+value.status+'" taskName="' + value.taskName
                + '" managerEmpCode="' + value.managerEmpCode + '" followEmpCode="' + value.followEmpCode
                + '" class="btn btn-info btn-xs" type="button" >' +
                '<span name="editClick" class="glyphicon glyphicon-check" aria-hidden="true" ></span></button>'
                + '</td>'
                + '<td id="' + value.id + '" class="text-left" style="color: #000">'
                + value.project
                + '</td>'
                + '</td>'
                + '<td id="' + value.id + '" class="text-left" style="color: #000">'
                + value.module
                + '</td>'
                + '</td>'
                + '<td id="' + value.id + '" class="text-left" style="color: #000">'
                + value.program
                + '</td>'
                + '<td id="taskName_' + value.id + '" class="text-left" style="color: #000">'
                + value.taskName
                + '</td>'
                + '<td id="' + value.id + '" class="text-center" style="">'
                + '<div class="progress-bar ' + colorProgress + '" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"'
                + 'style="width: ' + progress + '%; color: black; ">' +progress + '%</div>'
                + '</td>'
                + '</tr>';
            $('#ResualtSearchTaskFollow').append(
                tableData
            );

        });
    }
    else {
        tableData = ''
            + '<tr class="text-center" >'
            + '<td colspan="6" style="color: #000">'
            + MESSAGE.MS_DATA_NOT_FOUND
            + '</td>'
            + '</tr>';
        $('#ResualtSearchTaskFollow').append(
            tableData
        );
    }
}

////////////////////////////////////////////////////////////////////////////////////////
var empLastName = [];
var empFirstName = [];
function findEmpNameAndEmpPositionNameByEmpCode(empCode){
    var valueEmp = $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/moduleprojects/findEmpNameAndEmpPositionNameByEmpCode',
        data: JSON.stringify(empCode),
        complete: function(xhr){
        },
        async: false
    });


    empFirstName = [];
    empLastName = [];

    valueEmp = valueEmp.responseJSON
    valueEmp.forEach(function(value){
            empFirstName.push(value.empFirstName);
            empLastName.push(value.empLastName);
    });

    check = false;
}

$('#taskFollow').on("click", "[id^=checkTask_]", function () {
    var id = this.id.split('checkTask_')[1];
    statusTask = $(this).attr('status');
    empCode.push($(this).attr('managerEmpCode'));
    empCode.push($(this).attr('followEmpCode'));
    project = $(this).attr('projectName');
    module = $(this).attr('moduleName');
    program = $(this).attr('programName');
    task = $(this).attr('taskName');
    version = $(this).attr('version');
    findEmpNameAndEmpPositionNameByEmpCode(empCode);
    empCodeToPage = empCode ;
    empCode = [];
    //console.log(empCodeToPage);
    //console.log(empFirstName);
    //console.log(empLastName);
    appendLabel(id);
    $("#modalFollowTask").modal('show');
});

$("#close").click(function () {
    $("#modalFollowTask").modal('hide');
});

$("#btnsave").click(function () {

    if( statusTask == 'R'){
        var id = ''; var taskStatus ='';
        $('input[name=optradio]:checked').each(function () {
            id = $(this).attr('taskId');
            taskStatus = $(this).attr('status');
        });
        //console.log(version);
        editTaskStatus(id,taskStatus,version);

    }
    else
    {
        bootbox.alert( MESSAGE.LABEL_NOT_TEST);
    }

});


var labelModal = "";
function appendLabel(taskId) {
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
        + ' <label class="control-label"><h5>' +empCodeToPage[0]+" : "+empFirstName[0]+" "+empLastName[0]+'</h5></label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 "><h5>'+LABEL.LABEL_FOLLOWER+'</h5></label>'
        + ' <label class="control-label"><h5>' +empCodeToPage[1]+" : "+empFirstName[1]+" "+empLastName[1]+'</h5></label></label></div>'
        +'<div class="form-group"> <label class="radio-inline control-label col-sm-6"><input id="radioPass" type="radio" taskId="'+ taskId +'" status="C" name="optradio" checked="check"/>'+ LABEL.LABEL_PASS +'</label>'
        + '<label class="radio-inline "><input id="radioFail" type="radio" taskId="'+ taskId +'" status="N" name="optradio"/>'+ LABEL.LABEL_FAIL +'</label></div>'
    ;
    $('#label_modal').append(
        labelModal
    );
    empCodeToPage = []
}

function editTaskStatus(id, status,version) {
    var dataJsonData = {
        taskId: id,
        status: status,
        version : version
    }
    $.ajax({
        type: "POST",
        //contentType: "application/json; charset=utf-8",
        //dataType: "json",
        //headers: {
        //    Accept: "application/json"
        //},
        url: contextPath + '/tasks/editTaskStatusCheckWhoCanEdit',
        data: dataJsonData,
        complete: function (xhr) {
            if (xhr.status === 200) {
                $('#modalFollowTask').modal('hide');
                bootbox.alert(MESSAGE.MS_SAVE_SUCCESS);
                tasktaskFollowPlanTofirstPage();
                taskBacklogPlanTofirstPage();
                taskTodayPlanTofirstPage();
            } else if (xhr.status === 500) {
                bootbox.alert(MESSAGE.MS_SAVE_FAIL);
            } else if (xhr.status === 0) {
                bootbox.alert(MESSAGE.MS_SAVE_FAIL);
            }
            else  if (xhr.status == 404){
                bootbox.alert(MESSAGE.MS_REFRESH);
            }
        },
        async: false
    });
} //--functionEditData--//