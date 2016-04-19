var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var pagginationFollow = $.extend({},UtilPaggination);

$(document).ready(function(){

    tasktaskFollowPlanTofirstPage();

});


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
    jsonData.forEach(function (value) {
        tableData = ''
            + '<tr>'
            + '<td class="text-center">'
            + '<button id="checkTask_'+value.id +'" projectName="'+ value.project.projectName
            +'" moduleName="'+ value.module.moduleName
            +'" programName="'+ value.program.programName +'" taskName="'+ value.taskName
            +'" managerEmpCode="'+ value.managerEmpCode +'" followEmpCode="'+ value.followEmpCode
            +'" class="btn btn-info btn-xs" type="button" >' +
            '<span name="editClick" class="glyphicon glyphicon-check" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="' + value.id + '" class="text-left" style="color: #000">'
            +value.project.projectName
            + '</td>'
            + '</td>'
            + '<td id="' + value.id + '" class="text-left" style="color: #000">'
            +value.module.moduleName
            + '</td>'
            + '</td>'
            + '<td id="' + value.id + '" class="text-left" style="color: #000">'
            + value.program.programName
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
var empCodeToPage = [];
var empCode =[];
var project,module,program,task;
////////////////////////////////////////////////////////////////////////////////////////
$('#taskFollow').on("click", "[id^=checkTask_]", function () {
      empCode.push($(this).attr('managerEmpCode'));
      empCode.push($(this).attr('followEmpCode'));
    project = $(this).attr('projectName');
    module = $(this).attr('moduleName');
    program = $(this).attr('programName');
    task = $(this).attr('taskName');
    findEmpNameAndEmpPositionNameByEmpCode(empCode);
    empCodeToPage = empCode ;
    empCode = [];
    //console.log(empCodeToPage);
    //console.log(empFirstName);
    //console.log(empLastName);
    appendLabel();
    $("#modalFollowTask").modal('show');
});

$("#close").click(function () {
    $("#modalFollowTask").modal('hide');
});

var labelModal = "";

function appendLabel() {
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
        + ' <label class="control-label">' +empCodeToPage[0]+" : "+empFirstName[0]+" "+empLastName[0]+'</label></div>'
        + '<div class="form-group"><label class="control-label col-sm-5 ">Follower</label>'
        + ' <label class="control-label">' +empCodeToPage[1]+" : "+empFirstName[1]+" "+empLastName[1]+'</label></div>'
        +'<div class="form-group"> <label class="radio-inline control-label col-sm-6"><input type="radio" name="optradio" checked="check"/>Pass</label>'
        + '<label class="radio-inline "><input type="radio" name="optradio"/>Fail</label> </div>'
    ;
    $('#label_modal').append(
        labelModal
    );
    empCodeToPage = []
}