var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var pagginationBackLog = $.extend({},UtilPaggination);

$(document).ready(function(){

    taskBacklogPlanTofirstPage();

});

var versionPlan,versionTask ;

$('#taskBacklog').on("click", "[id^=taskId_]", function () {
    $("#modalProgressBackLog").modal('show');
});

function taskBacklogPlanTofirstPage() {
    var dataJsonData = {} ;
    pagginationBackLog.setOptionJsonData({
        url: contextPath + "/plans/selectPlanBaclLogTofirstPage",
        data: dataJsonData
    });
    pagginationBackLog.setOptionJsonSize({
        url: contextPath + "/plans/planPaggingSizeTaskBackLog",
        data: dataJsonData
    });
    pagginationBackLog.search(pagginationBackLog);
}  //--functionSearch--//

$('#taskDetailHeaderEditBackLog').click(function(){
    var isOpenCollapse = $(this).children('span').hasClass('fa-angle-up');

    if(isOpenCollapse){
        $(this).children('span').removeClass('fa-angle-up');
        $(this).children('span').addClass('fa-angle-down');
        $('#taskDetailPartEditBackLog').slideUp();
    }else{
        $(this).children('span').removeClass('fa-angle-down');
        $(this).children('span').addClass('fa-angle-up');
        $('#taskDetailPartEditBackLog').slideDown();
    }

});

pagginationBackLog.setEventPaggingBtn("paggingSimple2", pagginationBackLog);
pagginationBackLog.loadTable = function loadTable(jsonData) {
    $('#ResualtSearchTaskBackLog').empty();
    var tableData = "";
    if(jsonData.length > 0 ) {
    jsonData.forEach(function (value) {

        var progress,taskId,taskCode,taskName,stDate,enDate,stDateTask,enDateTask,projectName,moduleName,cost,importanceName,planNote,followerName,note,taskType = 0 ;
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
            taskId = value.otherTaskId ;
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
        if(taskId != idTaskBackLog_Today) {
            tableData = ''

                + '<tr>'
                + '<td id="' + taskId + '" class="text-center" style="color: #000">'
                + '<button id="taskId_' + taskId + '" stDateTask="' + stDateTask + '" project="' + projectName + '" versionPlan="' + value.versionPlan + '" versionTask="' + value.versionTask + '" planNote="' + planNote + '" module="' + moduleName + '" enDateTask="' + enDateTask + '" note="' + note + '" cost="' + cost + '" followerName="' + followerName + '"  ' +
                'importanceName="' + importanceName + '" progress="' + progress + '" taskType="' + taskType + '" taskCode="' + taskCode + '" taskName="' + taskName + '" stDate="' + stDate + '" enDate="' + enDate + '" class="btn btn-info btn-xs" type="button">' +
                '<span name="editClick" class="glyphicon glyphicon-plus" aria-hidden="true" ></span></button>'
                + '</td>'
                + '<td id="' + value.id + '" class="text-center" style="color: #000">'
                + (value.taskCode != null ? '' + value.taskCode + '' : '')
                + '</td>'
                + '<td id="' + value.id + '" class="text-left" style="color: #000">'
                + ( value.taskName != null ? '' + value.taskName + '' : '' + value.otherTaskName + '')
                + '</td>'
                + '<td id="dateStart' + value.id + '" class="text-center" style="color: #000">'
                + DateUtil.dataDateToFrontend(value.stDate, _language)
                + '</td>'
                + '<td id="dateEnd' + value.id + '" class="text-center" style="color: #000">'
                + DateUtil.dataDateToFrontend(value.enDate, _language)
                + '</td>'
                + '<td id="' + value.id + '" class="text-center" style="">'
                + '<div class="progress-bar ' + colorProgress + '" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"'
                + 'style="width: ' + progress + '%; color: black; ">' + progress + '%</div>'
                + '</td>'

                + '</tr>';
            $('#ResualtSearchTaskBackLog').append(
                tableData
            );
        }

    });

}
else {
    tableData = ''
        + '<tr class="text-center" >'
        + '<td colspan="6" style="color: #000">'
        + MESSAGE.MS_DATA_NOT_FOUND
        + '</td>'
        + '</tr>';
    $('#ResualtSearchTaskBackLog').append(
        tableData
    );
}

};

var idTask; var taskType ; var checkEdit ; var checkNote ;
$('#taskBacklog').on("click", "[id^=taskId_]", function () {
    $('[hide=1]').show();
    $('#taskDetailPartEditBackLog').slideUp();
    var id = this.id.split('taskId_')[1];
    idTask = id ;
    taskType = $(this).attr('taskType');

    $('#projectNameBackLog').html($(this).attr('project'));
    $('#moduleNameBackLog').html($(this).attr('module'));
    $('#stDateTaskBackLog').html($(this).attr('stDateTask'));
    $('#enDateTaskBackLog').html($(this).attr('enDateTask'));
    $('#taskCostBackLog').html($(this).attr('cost'));
    $('#taskImportantBackLog').html($(this).attr('importanceName'));
    $('#taskFollwerBackLog').html($(this).attr('followerName'));
    $('#taskDetailBackLog').html($(this).attr('note'));

    $('#txtProgressBackLog').val($(this).attr('progress'));
    $('#taskCodeBackLog').html($(this).attr('taskCode'));
    $('#taskNameBackLog').html($(this).attr('taskName'));
    $('#taskStDateBackLog').html($(this).attr('stDate'));
    $('#taskEnDateBackLog').html($(this).attr('enDate'));
    $('#txtEditNoteBacklog').val($(this).attr('planNote'));
    if(taskType != 1){
        $('[hide=1]').hide();
    }

    checkEdit =  $(this).attr('progress');
    checkNote =  $(this).attr('planNote');
    versionPlan = $(this).attr('versionPlan');
    versionTask = $(this).attr('versionTask');
    $("#modalProgressBackLog").modal('show');
});


$('#btnsaveBackLog').click( function(){

    var progress = $('#txtProgressBackLog').val();
    var notePlan = $('#txtEditNoteBacklog').val();
    if(progress == '') {
        $('#txtProgressBackLog').attr('data-content',MESSAGE.MS_COMPLETE_THIS_FIELD).popover('show');
    } else if (!$.isNumeric(progress) || progress.indexOf('.') >= 0) {
        $('#txtProgressBackLog').attr('data-content', MESSAGE.MS_COMPLETE_INTEGER_NUMBER).popover('show');
    } else if (progress < 0 || progress > 100) {
        $('#txtProgressBackLog').attr('data-content',MESSAGE.MS_ZERO_TO_HUNDRED).popover('show');
    }
    else {
        var check = $('#txtProgressBackLog').val();
        var check2 = $('#txtEditNoteBacklog').val();
        if(checkEdit == check && check2 == checkNote ){
            bootbox.alert(MESSAGE.MS_NO_INFORMATION_CHANGED);
        }
        else
        {
            updateTaskStatusAndProgressBackLog(idTask,progress,taskType,notePlan,versionPlan,versionTask);
            //$("#modalProgressBackLog").modal('hide');

        }

    }
});

$('#closeBaclLog').click( function(){

    var check = $('#txtProgressBackLog').val();
    var check2 = $('#txtEditNoteBacklog').val();
    if(checkEdit != check || check2 != checkNote){
        bootbox.confirm(MESSAGE.MS_EDIT_CHANGED, function (result) {
            if (result === true) {
                $("#modalProgressBackLog").modal('hide');
                $('#txtProgressBackLog').popover('hide');
                $('#taskDetailPartEditBackLog').slideUp();
                $('#taskDetailHeaderEditBackLog').children('span').removeClass('fa-angle-up');
                $('#taskDetailHeaderEditBackLog').children('span').addClass('fa-angle-down');
            }
        })
    }
    else
    {
        $("#modalProgressBackLog").modal('hide');
        $('#taskDetailPartEditBackLog').slideUp();
        $('#taskDetailHeaderEditBackLog').children('span').removeClass('fa-angle-up');
        $('#taskDetailHeaderEditBackLog').children('span').addClass('fa-angle-down');
    }

});

function updateTaskStatusAndProgressBackLog(id,progress,taskType,notePlan) {
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
                $("#modalProgressBackLog").modal('hide');
                bootbox.alert(MESSAGE.MS_SAVE_SUCCESS);
                tasktaskFollowPlanTofirstPage();
                taskBacklogPlanTofirstPage();
                taskTodayPlanTofirstPage();

            } else if (xhr.status === 500) {
                bootbox.alert(MESSAGE.MS_SAVE_FAIL);
            }
            else  if (xhr.status == 0){
                bootbox.alert(MESSAGE.MS_SAVE_FAIL);
            } else  if (xhr.status == 404){
                bootbox.alert(MESSAGE.MS_REFRESH);
            }
        },
        async: false
    });
} //--functionEditData--//