var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var paggination = $.extend({},UtilPaggination);
$(document).ready(function(){

    taskTodayPlanTofirstPage();

});

var idTask; var taskType ; var checkEdit ; var checkNote ; var versionPlan,versionTask ; var idTaskBackLog_Today;

$('#taskDetailHeaderEdit').click(function(){
    var isOpenCollapse = $(this).children('span').hasClass('fa-angle-up');

    if(isOpenCollapse){
        $(this).children('span').removeClass('fa-angle-up');
        $(this).children('span').addClass('fa-angle-down');
        $('#taskDetailPartEdit').slideUp();
    }else{
        $(this).children('span').removeClass('fa-angle-down');
        $(this).children('span').addClass('fa-angle-up');
        $('#taskDetailPartEdit').slideDown();
    }

});



function taskTodayPlanTofirstPage() {
    var dataJsonData = {} ;
    paggination.setOptionJsonData({
        url: contextPath + "/plans/selectPlanTofirstPage",
        data: dataJsonData
    });
    paggination.setOptionJsonSize({
        url: contextPath + "/plans/planPaggingSize",
        data: dataJsonData
    });
    paggination.search(paggination);
}  //--functionSearch--//
//$("#close").click(function () {
//    $("#modalProgress").modal('hide');
//});

    paggination.setEventPaggingBtn("paggingSimple", paggination);
    paggination.loadTable = function loadTable(jsonData) {
        $('#ResualtSearchTaskToday').empty();
        var tableData1 = "";
        if(jsonData.length > 0 ) {
            jsonData.forEach(function (value) {
                var progress,taskId,taskCode,taskName,stDate,enDate,stDateTask,enDateTask,projectName,moduleName,cost,importanceName,planNote,followerName,note,taskType = 0 ;
               if(value.taskProgress != null ){
                   progress = value.taskProgress ;
                   taskId = value.taskId ;
                   idTaskBackLog_Today = taskId;
                   taskCode = value.taskCode;
                   taskName = value.taskName;
                   stDate = DateUtil.dataDateToFrontend(value.stDate, _language);
                   enDate = DateUtil.dataDateToFrontend(value.enDate, _language);
                   cost = value.cost +' '+LABEL.LABEL_POINT+'';
                   taskType = 1 ;
                   if(value.stDateTask != null){ stDateTask = DateUtil.dataDateToFrontend(value.stDateTask,_language);
                   }
                  else{
                       stDateTask = '-';
                   }
                   if(value.enDateTask != null){
                       enDateTask = DateUtil.dataDateToFrontend(value.enDateTask,_language);
                   }
                   else {
                       enDateTask = '-';
                   }

                   if(value.project != null) {
                       projectName = value.project ;
                   }
                   else {
                       projectName = '-';
                   }
                   if(value.module != null){
                       moduleName = value.module ;
                   }
                   else{
                       moduleName = '-';
                   }
                   if(value.note != null){

                       note = value.note ;
                   }
                   else { note = '';}
                   if(value.importanceName && value.importanceCode){
                       //importanceCode = value.importanceCode ;
                       importanceName = value.importanceName + ' ('+ value.importanceCode+')' ;

                   }
                   else {
                       importanceName = null;
                   }

                   if(value.follower != null) {
                       followerName = value.follower.empFirstName + ' '+ value.follower.empLastName ;
                       //console.log(followerName);
                   }
                   else {
                       followerName = '-';
                   }
                   if(value.notePlan != null){
                       planNote = value.notePlan ;
                   }
                   else {
                       planNote = '';
                   }
               }
               else {
                   progress = value.otherTaskProgress ;
                   taskId = value.otherTaskId
                   idTaskBackLog_Today = taskId;
                   taskCode = '';
                   taskName = value.otherTaskName;
                   stDate = DateUtil.dataDateToFrontend(value.stDate, _language);
                   enDate = DateUtil.dataDateToFrontend(value.enDate, _language);
                   cost = value.cost +' '+LABEL.LABEL_POINT+'';
                   if(value.notePlan != null){
                       planNote = value.notePlan ;
                   }
                   else {
                       planNote = '';
                   }
               }
                var colorProgress =  progress  == "100" ? "progress-bar-success" : "progress-bar-warning";
                tableData1 = ''
                    + '<tr>'
                    + '<td id="' + taskId + '" class="text-center" style="color: #000">'
                    + '<button id="taskId_'+taskId+'" stDateTask="'+stDateTask+'" versionPlan="'+value.versionPlan+'" versionTask="'+value.versionTask+'" project="'+projectName+'" planNote="'+planNote+'" planId="'+value.id+'" module="'+moduleName+'" enDateTask="'+enDateTask+'" note="'+note+'" cost="'+cost+'" followerName="'+followerName+'"  ' +
                    'importanceName="'+importanceName+'" progress="'+progress+'" taskType="'+taskType+'" taskCode="'+taskCode+'" taskName="'+taskName+'" stDate="'+stDate+'" enDate="'+enDate+'" class="btn btn-info btn-xs" type="button">' +
                    '<span name="editClick" class="glyphicon glyphicon-plus" aria-hidden="true" ></span></button>'
                    + '</td>'
                + '<td id="' + value.id + '" class="text-center" style="color: #000">'
                + taskCode
                + '</td>'
                + '<td id="' + value.id + '" class="text-left" style="color: #000">'
                + taskName
                + '</td>'
                + '<td id="dateStart' + value.id + '" class="text-center" style="color: #000">'
                + DateUtil.dataDateToFrontend(value.stDate, _language)
                + '</td>'
                + '<td id="dateEnd' + value.id + '" class="text-center" style="color: #000">'
                + DateUtil.dataDateToFrontend(value.enDate, _language)
                + '</td>'
                    + '<td id="' + value.id + '" class="text-center" style="">'
                    + '<div class="progress-bar ' + colorProgress + '" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"'
                    + 'style="width: ' + progress + '%; color: black; ">' +progress + '%</div>'
                    + '</td>'
                + '</tr>';
                $('#ResualtSearchTaskToday').append(
                    tableData1
                );

            });
        }
        else {
                tableData1 = ''
                    + '<tr class="text-center" >'
                    + '<td colspan="6" style="color: #000">'
                    + MESSAGE.MS_DATA_NOT_FOUND
                    + '</td>'
                    + '</tr>';
                $('#ResualtSearchTaskToday').append(
                    tableData1
                );
            }

    };

$('#taskToday').on("click", "[id^=taskId_]", function () {
    $('[hide=1]').show();
    $('#taskDetailPartEdit').slideUp();

    var id = this.id.split('taskId_')[1];
    idTask = id ;
    taskType = $(this).attr('taskType');
    $('#projectNameToday').html($(this).attr('project'));
    $('#moduleNameToday').html($(this).attr('module'));
    //$('#taskCodeToday').html($(this).attr('taskCode'));
    //$('#taskNameToday').val($(this).attr('taskName'));
    $('#stDateTask').html($(this).attr('stDateTask'));
    $('#enDateTask').html($(this).attr('enDateTask'));
    $('#taskCost').html($(this).attr('cost'));
    $('#taskImportant').html($(this).attr('importanceName'));
    $('#taskFollwer').html($(this).attr('followerName'));
    $('#taskDetail').html($(this).attr('note'));

    $('#progressToday').val($(this).attr('progress'));
    $('#taskCodeToday').html($(this).attr('taskCode'));
    $('#taskNameToday').html($(this).attr('taskName'));
    $('#stDatePlan').html($(this).attr('stDate'));
    $('#enDatePlan').html($(this).attr('enDate'));
    $('#txtEditNoteToday').val($(this).attr('planNote'));
    if(taskType != 1){
        $('[hide=1]').hide();
    }
    checkEdit =  $(this).attr('progress');
    checkNote =  $(this).attr('planNote');
    versionPlan = $(this).attr('versionPlan');
    versionTask = $(this).attr('versionTask');
    //console.log(checkNote);
    $("#modalProgress").modal('show');

});


$('#btnsaveToday').click( function(){

    var progress = $('#progressToday').val();
    var notePlan = $('#txtEditNoteToday').val();
    if(progress == '') {
        $('#progressToday').attr('data-content',MESSAGE.MS_COMPLETE_THIS_FIELD).popover('show');
    } else if (!$.isNumeric(progress) || progress.indexOf('.') >= 0) {
        $('#progressToday').attr('data-content', MESSAGE.MS_COMPLETE_INTEGER_NUMBER).popover('show');
    } else if (progress < 0 || progress > 100) {
        $('#progressToday').attr('data-content',MESSAGE.MS_ZERO_TO_HUNDRED).popover('show');
    }
    else {
        var check = $('#progressToday').val();
        var check2 = $('#txtEditNoteToday').val();
        //console.log(check2);
        if(checkEdit == check && check2 == checkNote){
            bootbox.alert(MESSAGE.MS_NO_INFORMATION_CHANGED);
        }
        else
        {
            //console.log(notePlan);
            updateTaskStatusAndProgressToday(idTask,progress,taskType,notePlan,versionPlan,versionTask);

        }

    }
});

$('#closeToday').click( function(){

    var check = $('#progressToday').val();
    var check2 = $('#txtEditNoteToday').val();
    if(checkEdit != check || check2 != checkNote){
        bootbox.confirm( MESSAGE.MS_EDIT_CHANGED, function (result) {
            if (result === true) {
                $("#modalProgress").modal('hide');
                $('#progressToday').popover('hide');
                $('#taskDetailPartEdit').slideUp()
                $('#taskDetailHeaderEdit').children('span').removeClass('fa-angle-up');
                $('#taskDetailHeaderEdit').children('span').addClass('fa-angle-down');
            }
        })
    }
    else
    {
        $("#modalProgress").modal('hide');
        $('#taskDetailPartEdit').slideUp()
        $('#taskDetailHeaderEdit').children('span').removeClass('fa-angle-up');
        $('#taskDetailHeaderEdit').children('span').addClass('fa-angle-down');
    }

});

function updateTaskStatusAndProgressToday(id,progress,taskType,notePlan,versionPlan,versionTask) {

    var dataJsonData = {
        taskId: id,
        taskType : taskType,
        progress: progress,
        notePlan : notePlan,
        versionPlan :versionPlan,
        versionTask : versionTask

    }
    $.ajax({
        type: "POST",
        //contentType: "application/json; charset=utf-8",
        //dataType: "json",
        //headers: {
        //    Accept: "application/json"
        //},
        url: contextPath + '/tasks/updateTaskStatusAndProgress',
        data: dataJsonData,
        complete: function (xhr) {
            if (xhr.status === 200) {
                $("#modalProgress").modal('hide');
                bootbox.alert(MESSAGE.MS_SAVE_SUCCESS);
                tasktaskFollowPlanTofirstPage();
                taskBacklogPlanTofirstPage();
                taskTodayPlanTofirstPage();

            } else if (xhr.status === 500) {
                bootbox.alert(MESSAGE.MS_SAVE_FAIL);
            }
            else  if (xhr.status == 0){
                bootbox.alert(MESSAGE.MS_SAVE_FAIL);
            }
            else  if (xhr.status == 404){
                bootbox.alert(MESSAGE.MS_REFRESH);
            }

        },
        async: false
    });
} //--functionEditData--//