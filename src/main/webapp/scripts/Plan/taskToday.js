var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var paggination = $.extend({},UtilPaggination);
$(document).ready(function(){

    taskTodayPlanTofirstPage();

});

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
                var progress,taskId,taskCode,taskName,stDate,enDate,stDateTask,enDateTask,projectName,moduleName,cost,importanceName,importanceCode,followerName,note,taskType = 0 ;
               if(value.taskProgress != null ){
                   progress = value.taskProgress ;
                   taskId = value.taskId ;
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
                   if(value.note == null){
                       note = '';
                   }
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
               }
               else {
                   progress = value.otherTaskProgress ;
                   taskId = value.otherTaskId ;
                   taskCode = '';
                   taskName = value.otherTaskName;
                   stDate = DateUtil.dataDateToFrontend(value.stDate, _language);
                   enDate = DateUtil.dataDateToFrontend(value.enDate, _language);
                   cost = value.cost +' '+LABEL.LABEL_POINT+'';
               }
                var colorProgress =  progress  == "100" ? "progress-bar-success" : "progress-bar-warning";
                tableData1 = ''
                    + '<tr>'
                    + '<td id="' + taskId + '" class="text-center" style="color: #000">'
                    + '<button id="taskId_'+taskId+'" stDateTask="'+stDateTask+'" project="'+projectName+'" module="'+moduleName+'" enDateTask="'+enDateTask+'" note="'+note+'" cost="'+cost+'" followerName="'+followerName+'"  ' +
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

    var idTask; var taskType ; var checkEdit ;
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
    if(taskType != 1){
        $('[hide=1]').hide();
    }
    checkEdit =  $(this).attr('progress');
    $("#modalProgress").modal('show');

});


$('#btnsaveToday').click( function(){

    var progress = $('#progressToday').val();
    if(progress == '') {
        $('#progressToday').attr('data-content',MESSAGE.MS_COMPLETE_THIS_FIELD).popover('show');
    } else if (!$.isNumeric(progress) || progress.indexOf('.') >= 0) {
        $('#progressToday').attr('data-content', MESSAGE.MS_COMPLETE_INTEGER_NUMBER).popover('show');
    } else if (progress < 0 || progress > 100) {
        $('#progressToday').attr('data-content', "0-100").popover('show');
    }
    else {
        var check = $('#progressToday').val();
        if(checkEdit == check){
            bootbox.alert(MESSAGE.MS_NO_INFORMATION_CHANGED);
        }
        else
        {
            updateTaskStatusAndProgress(idTask,progress,taskType);
            $("#modalProgress").modal('hide');
            tasktaskFollowPlanTofirstPage();
            taskBacklogPlanTofirstPage();
            taskTodayPlanTofirstPage();
        }

    }
});

$('#closeToday').click( function(){

    var check = $('#progressToday').val();
    if(checkEdit != check){
        bootbox.confirm( MESSAGE.MS_EDIT_CHANGED, function (result) {
            if (result === true) {
                $("#modalProgress").modal('hide');
            }
        })
    }
    else
    {
        $("#modalProgress").modal('hide');
    }

});

function updateTaskStatusAndProgress(id,progress,taskType) {
    var dataJsonData = {
        taskId: id,
        taskType : taskType,
        progress: progress

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
            } else if (xhr.status === 500) {
                bootbox.alert(MESSAGE.MS_SAVE_FAIL);
            }
        },
        async: false
    });
} //--functionEditData--//