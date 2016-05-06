var dateAddMaxId = 0;

var _language = commonData.language;
var dateLang = checkLanguageDatePicker(_language);

var _month;
var _year;

var _eventDate = {};
var _otherTaskDate = {};

var taskStatusColor = {
    delay: '#cc3333',
    normal: '#337ab7',
    other: '#999',
    passTask: '#669900',
    passOtherTask: '#33cc33',
    ready: '#ff8000'
}

var taskStatus = {
    new: 'N',
    ready: 'R',
    complete: 'C'
}

// Ready page ----------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    // Load and map plan
    $('#calendar').fullCalendar({
        defaultDate: moment().format('YYYY-MM-DD'),
        editable: false,
        eventLimit: false,
        eventClick: function (event) {
            openModalEditPlan(event);
        }
    });

    // Set current month/year and load current plan
    setCurrentMonthYear();
    if(_language == 'EN')
        _year += 543;
    loadAndMapPlan(_month, _year-543);

    // Date picker for tab search job
    $("#cPlanDateBegin").datepicker(dateLang);
    $("#cPlanDateEnd").datepicker(dateLang);

    $("#cPlanDateBegin").on('change', function () {
        checkDateFormat($(this), MESSAGE.DATE_FORMAT, MESSAGE.COMPLETE_THIS_FIELD);
        DateUtil.setMinDate('cPlanDateBegin', 'cPlanDateEnd');
    });
    $("#cPlanDateEnd").on('change', function () {
        checkDateFormat($(this), MESSAGE.DATE_FORMAT, MESSAGE.COMPLETE_THIS_FIELD);
        DateUtil.setMaxDate('cPlanDateEnd', 'cPlanDateBegin');
    });

    // Date picker for first time in add modal
    $("#cAddDateBegin_0").datepicker(dateLang);
    $("#cAddDateEnd_0").datepicker(dateLang);

    $("#cAddDateBegin_0").on('change', function () {
        checkDateFormat($(this), MESSAGE.DATE_FORMAT, MESSAGE.COMPLETE_THIS_FIELD);
        DateUtil.setMinDate('cAddDateBegin_0', 'cAddDateEnd_0');
    });
    $("#cAddDateEnd_0").on('change', function () {
        checkDateFormat($(this), MESSAGE.DATE_FORMAT, MESSAGE.COMPLETE_THIS_FIELD);
        DateUtil.setMaxDate('cAddDateEnd_0', 'cAddDateBegin_0');
    });

    // Date picker for edit modal
    $("#cEditDateBegin_0").datepicker(dateLang);
    $("#cEditDateEnd_0").datepicker(dateLang);

    $("#cEditDateBegin_0").on('change', function () {
        checkDateFormat($(this), MESSAGE.DATE_FORMAT, MESSAGE.COMPLETE_THIS_FIELD);
        DateUtil.setMinDate('cEditDateBegin_0', 'cEditDateEnd_0');
    });
    $("#cEditDateEnd_0").on('change', function () {
        checkDateFormat($(this), MESSAGE.DATE_FORMAT, MESSAGE.COMPLETE_THIS_FIELD);
        DateUtil.setMaxDate('cEditDateEnd_0', 'cEditDateBegin_0');
    });

    loadAndMapAllProject();
    loadAndMapModule(0);
    loadAndMapAllTaskType();
});

// Search plan ---------------------------------------------------------------------------------------------------------
$('#btnSearchPlan').click(function () {
    searchPlan();
});
$('#txtYearSearch').keydown(function (e) {
    if (e.keyCode == 13) {
        searchPlan();
    }
});

function searchPlan() {
    // search plan by month and year
    var month = $('#ddlMonthSearch').val();
    var year = $('#txtYearSearch').val();
    if ($.isNumeric(year) && year.indexOf('.') < 0) {
        if (commonData.language != 'TH')
            year = parseInt(year) + 543;

        _month = month;
        _year = year;
        loadAndMapPlan(_month, _year-543);

        var defaultDate = (year - 543) + '-' + (month >= 10 ? month : '0' + month) + '-01';
        $('#calendar').fullCalendar('gotoDate', moment(defaultDate).format('YYYY-MM-DD'));

    } else {         // not correct year format
        $('#txtYearSearch').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    }
}

// Get module -----------------------------------------------------------------------------------------------
$('#ddlProject').change(function() {
    var projectId = $(this).val();
    if(projectId == 0){
        loadAndMapModule(0);
    }else{
        loadAndMapModule(projectId);
    }
});


// Search job [module]-----------------------------------------------------------------------------------------------
$('#btnSearchByModule').click(function () {
    $('#grpResultModuleSearch').empty();

    var projectCode = $('#ddlProject').val();
    var moduleCode = $('#ddlJobModule').val();
    var arrTypeTask = [];

    $('[name=checkTypeTask]:checked').each(function () {
        arrTypeTask.push($(this).val());
    });

    var getMyTask = $('#checkMyTask').prop('checked');
    var getOtherTask = $('#checkOtherTask').prop('checked');

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/plans/findTaskByModuleAndTypeTask',
        data: JSON.stringify([projectCode, moduleCode, arrTypeTask, getMyTask, getOtherTask]),
        success: function (data, status, xhr) {
            if (xhr.status == 200) {

                if(data.length > 10)
                    $('#grpResultModuleSearch').addClass('task-scorebar');
                else
                    $('#grpResultModuleSearch').removeClass('task-scorebar');

                if (data == null || data.length == 0) {
                    $('#lblNoResultSerchByModule').show();
                } else {
                    $('#lblNoResultSerchByModule').hide();
                    $.each(data, function (k, v) {
                        $('#grpResultModuleSearch').append(
                            '<a class="list-group-item ' + (v.empCode == null || v.empCode == '' ? 'danger' : 'success') +
                            '" taskId="' + v.id +
                            '" taskBegin="' + (v.dateStart != null ? DateUtil.dataDateToFrontend(v.dateStart, _language) : '') +
                            '" taskEnd="' + (v.dateEnd != null ? DateUtil.dataDateToFrontend(v.dateEnd, _language) : '') +
                            '" taskType="' + (v.empCode == null || v.empCode == '' ? 'public' : 'private') +
                            '" taskCode="' + v.taskCode +
                            '" taskName="' + v.taskName +
                            '" taskCost="' + v.taskCost +
                            '" taskProgramId="' + v.program.id +
                            '" taskProject="' + v.program.moduleProject.project.projectName +
                            '" taskModule="' + v.program.moduleProject.moduleName +
                            '" taskDetail="' + (v.detail == null ? '' : v.detail) +
                            '" taskFile="' + (v.fileName == null ? '' : v.fileName) +
                            '" taskImportance="' + v.importanceTask.importanceTaskName + ' (' + v.importanceTask.importanceTaskCode + ')' +
                            '" onclick="openModalAddPlan(this)">(' + v.typeTask.typeTaskName + ') ' +
                            v.taskCode + ' ' +
                            (v.dateStart == null ? '' : '[' + dataDateToShortDate(v.dateStart, _language, LABEL.SHORT_MONTH) + ' - ') +
                            (v.dateEnd == null ? '' : dataDateToShortDate(v.dateEnd, _language, LABEL.SHORT_MONTH) + ']' ) +
                            ' [' + v.taskCost + 'P]' +
                            ' [' + v.importanceTask.importanceTaskCode + ']' +
                            '</a>');
                    });
                }
            }
        },
        async: false
    });

    $('#searchTaskPart').slideUp();
    $('#searchTaskShow').show();
    $('#grpResultModuleSearch').slideDown();
    $('#noteTask').show();
});

$('#searchTaskShow').click(function(){
    $('#searchTaskPart').slideDown();
    $('#grpResultModuleSearch').hide();
    $('#lblNoResultSerchByModule').hide();
    $(this).hide();
    $('#noteTask').hide();
});

// Add other plan -----------------------------------------------------------------------------------------------
$('#btnAddOtherPlan').click(function () {

    var taskName = $('#txtPlanName').val();
    var taskCost = $('#txtPlanCost').val();
    var dateStart = $('#cPlanDateBegin').val();
    var dateEnd = $('#cPlanDateEnd').val();
    var note = $('#txtPlanNote').val();

    if (taskName.length == 0) {
        $('#txtPlanName').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (taskCost.length == 0) {
        $('#txtPlanCost').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if(!$.isNumeric(taskCost)) {
        $('#txtPlanCost').attr('data-content', MESSAGE.COST_FORMAT).popover('show');
    } else if(taskCost < 0){
        $('#txtPlanCost').attr('data-content', MESSAGE.ONLY_INTEGER).popover('show');
    } else if(taskCost.indexOf('.') > 0 && taskCost.split('.')[1].length > 4) {
        $('#txtPlanCost').attr('data-content', MESSAGE.COST_DECIMAL_FORMAT).popover('show');
    } else if (dateStart.length == 0) {
        $('#cPlanDateBegin').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (dateEnd.length == 0) {
        $('#cPlanDateEnd').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url: contextPath + '/plans/insertOtherPlan',
            data: JSON.stringify({
                taskName: taskName,
                taskCost: taskCost,
                dateStart: DateUtil.dataDateToDataBase(dateStart, _language),
                dateEnd: DateUtil.dataDateToDataBase(dateEnd, _language),
                note: note
            }),
            success: function (data, status, xhr) {
                if (xhr.status == 200) {
                    bootbox.alert(MESSAGE.SAVE_COMPLETED);
                    loadAndMapPlan(_month, _year-543);

                    $('#txtPlanName').val('');
                    $('#txtPlanCost').val('');
                    $('#cPlanDateBegin').val('');
                    $('#cPlanDateEnd').val('');
                    $('#txtPlanNote').val('');

                    $('#cPlanDateBegin').change();
                    $('#cPlanDateEnd').change();

                } else {
                    bootbox.alert(MESSAGE.SAVE_FAILED);
                }
            },
            error: function(){
                bootbox.alert(MESSAGE.SAVE_FAILED);
            },
            async: false
        });
    }


});
$('.input-group-addon.date').click(function(){
    $(this).parent().children(':first').focus();
});


// Add plan ------------------------------------------------------------------------------------------------------------
$('#taskDetailHeaderAdd, #taskDetailHeaderEdit').click(function(){
    var isOpenCollapse = $(this).children('span').hasClass('fa-angle-up');

    if(isOpenCollapse){
        $(this).children('span').removeClass('fa-angle-up');
        $(this).children('span').addClass('fa-angle-down');
        $('#taskDetailPartAdd, #taskDetailPartEdit').slideUp();
    }else{
        $(this).children('span').removeClass('fa-angle-down');
        $(this).children('span').addClass('fa-angle-up');
        $('#taskDetailPartAdd, #taskDetailPartEdit').slideDown();
    }
});

function openModalAddPlan(taskElement) {
    var taskId = taskElement.getAttribute('taskId');
    var taskCode = taskElement.getAttribute('taskCode');
    var taskName = taskElement.getAttribute('taskName');
    var taskType = taskElement.getAttribute('taskType');
    var taskCost = taskElement.getAttribute('taskCost');
    var taskBegin = taskElement.getAttribute('taskBegin');
    var taskEnd = taskElement.getAttribute('taskEnd');
    var taskProject = taskElement.getAttribute('taskProject');
    var taskModule = taskElement.getAttribute('taskModule');
    var taskDetail = taskElement.getAttribute('taskDetail');
    var taskProgramId = taskElement.getAttribute('taskProgramId');
    var taskFile = taskElement.getAttribute('taskFile');
    var taskImportance = taskElement.getAttribute('taskImportance');

    if(taskType == 'public') {
        $('#btnCancelTask').hide();
    }else{
        $('#btnCancelTask').show();
    }

    // set task detail
    $('#lblAddTaskProject').html(taskProject);
    $('#lblAddTaskModule').html(taskModule);
    $('#lblAddTaskCode').html(taskCode);
    $('#lblAddNameWork').html(taskName);
    $('#lblAddTaskCost').html(taskCost + ' ' + LABEL.POINT);
    $('#lblAddDateBegin').html(taskBegin == '' ? '-' : taskBegin);
    $('#lblAddDateEnd').html(taskEnd == '' ? '-' : taskEnd);
    $('#txtAddTaskDetail').html(taskDetail);
    $('#lblAddTaskImportant').html(taskImportance);
    loadAndMapFollower('lblAddTaskFollwer', taskId);

    $('#lblAddDownloadFile').html(taskFile);
    $('#btnAddDownloadFile').attr('onclick', 'downloadFile("' + taskProgramId + '", "' + taskCode + '", "' + taskFile + '")');

    $('#taskDetailPartAdd').hide();
    $('#taskDetailHeaderAdd').children('span')
                            .removeClass('fa-angle-up')
                            .addClass('fa-angle-down');

    // default date picker
    dateAddMaxId = 0;
    $('[id^=cAddDateBegin_]').each(function () {
        var id = this.id.split('_')[1];
        if (id === '0') {
            $('#cAddDateBegin_0, #cAddDateEnd_0').attr('value', '').popover('hide');
            $('#cAddDateBegin_0, #cAddDateEnd_0').each(function () {
                $.datepicker._clearDate(this);
            });
        } else {
            $('#cAddDateBegin_' + id).parent().parent().parent().remove();
            $('#cAddDateEnd_' + id).parent().parent().parent().remove();
        }
    });

    // default
    var longDateEnd = DateUtil.dataDateToDataBase(taskEnd, _language)
    $('#cAddDateEnd_0').val(taskEnd);
    $('#cAddDateEnd_0_convert').val(moment(new Date(longDateEnd)).format('DD/MM/YYYY'));
    $('#cAddDateEnd_0').change();

    $('#txtAddNote').val('');
    $('#radioNoPostpone_add').prop('checked', true);

    $('#mdAddToPlan').modal({backdrop: 'static'});

    $('#mdAddToPlan').attr('taskId', taskId);
    $('#mdAddToPlan').attr('taskBegin', taskBegin);
    $('#mdAddToPlan').attr('taskEnd', taskEnd);
}

function getFirstEmptyDate(baseId) {
    var obj = null;
    $('[id^=' + baseId + ']').each(function () {
        if (obj === null) {
            if ($(this).val().length === 0) {
                obj = $(this);
            }
        }
    });
    return obj;
}

function checkOverlapDate(idDateBegin, idDateEnd) {
    var isOverlap = false;
    var xx = commonData.language == 'TH' ? '_convert' : '';

    $('[id^=' + idDateBegin + ']').each(function () {              // loop parent
        var id1 = this.id.split('_')[1];
        var dateBegin1 = date2EnStyle($('#' + idDateBegin + id1 + xx).val());
        var dateEnd1 = date2EnStyle($('#' + idDateEnd + id1 + xx).val());

        $('[id^=' + idDateBegin + ']').each(function () {          // loop child
            var id2 = this.id.split('_')[1];
            if (id2 !== id1) {   // not itself
                var dateBegin2 = date2EnStyle($('#' + idDateBegin + id2 + xx).val());
                var dateEnd2 = date2EnStyle($('#' + idDateEnd + id2 + xx).val());
                if (dates.inRange(dateBegin1, dateBegin2, dateEnd2) || dates.inRange(dateEnd1, dateBegin2, dateEnd2)) {
                    isOverlap = true;
                }
            }

        });

    });

    return isOverlap;
}
function setDatePicker(idDateBegin, idDateEnd, id) {
    $("#" + idDateBegin + id).datepicker(dateLang);
    $("#" + idDateEnd + id).datepicker(dateLang);

    $("#" + idDateBegin + id).on('change', function () {
        checkDateFormat($(this), MESSAGE.DATE_FORMAT, MESSAGE.COMPLETE_THIS_FIELD);

            DateUtil.setMinDate(idDateBegin + id, idDateEnd + id);
    });
    $("#" + idDateEnd + id).on('change', function () {
        checkDateFormat($(this), MESSAGE.DATE_FORMAT, MESSAGE.COMPLETE_THIS_FIELD);

            DateUtil.setMaxDate(idDateEnd + id, idDateBegin + id);
    });

    $("#" + idDateBegin + id).on('focus', function () {
        $(this).popover('hide');
    });
    $("#" + idDateEnd + id).on('focus', function () {
        $(this).popover('hide');
    });
}

$('#btnAddTime').click(function () {
    var b = getFirstEmptyDate('cAddDateBegin_');
    var e = getFirstEmptyDate('cAddDateEnd_');
    if (b !== null) {
        b.attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (e !== null) {
        e.attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (checkOverlapDate('cAddDateBegin_', 'cAddDateEnd_')) {
        bootbox.alert(MESSAGE.DATE_OVERLAY);
    } else {
        ++dateAddMaxId;
        $('#grpAddDate').append('<div class="form-group">'
            + '<label class="control-label col-xs-4 required">'+LABEL.DATE_BEGIN+' </label>'
            + '<div class="col-xs-5">'
            + '<div class="input-group">'
            + '<input id="cAddDateBegin_'
            + dateAddMaxId
            + '" type="text" class="form-control" data-placement="bottom" maxlength="10"/>'
            + '<span class="input-group-addon date"><span class="glyphicon glyphicon-calendar "></span></span>'
            + '</div>'
            + '</div>'
            + '</div>');

        $('#grpAddDate').append('<div class="form-group">'
            + '<label class="control-label col-xs-4 required">'+LABEL.DATE_END+' </label>'
            + '<div class="col-xs-5">'
            + '<div class="input-group">'
            + '<input id="cAddDateEnd_'
            + dateAddMaxId
            + '" type="text" class="form-control" data-placement="bottom" maxlength="10"/>'
            + '<span class="input-group-addon date"><span class="glyphicon glyphicon-calendar "></span></span>'
            + '</div>'
            + '</div>'
            + '<div class="col-sm-2">'
            + '<button id="btnDeleteAddDate_'
            + dateAddMaxId
            + '" type="button" class="btn btn-danger col-sm-12">'+BUTTON.DELETE+'</button>'
            + '</div>'
            + '</div>');

        setDatePicker('cAddDateBegin_', 'cAddDateEnd_', dateAddMaxId);
    }
});
$('#grpAddDate').on('click', '[id^=btnDeleteAddDate_]', function () {
    var id = this.id.split('_')[1];
    $('#cAddDateBegin_' + id).parent().parent().parent().remove();
    $('#cAddDateEnd_' + id).parent().parent().parent().remove();
});
$('#grpAddDate').on('click', '.input-group-addon.date', function () {
    $(this).parent().children(':first').focus();
});

$('#btnSaveAddPlan').click(function () {
    var b = getFirstEmptyDate('cAddDateBegin_');
    var e = getFirstEmptyDate('cAddDateEnd_');
    var shiftPlan = $('#radioPostpone_add').prop('checked');
    var note = $('#txtAddNote').val();

    if (b !== null) {
        b.attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (e !== null) {
        e.attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (checkOverlapDate('cAddDateBegin_', 'cAddDateEnd_')) {
        bootbox.alert(MESSAGE.DATE_OVERLAY);
    } else {
        var taskId = $('#mdAddToPlan').attr('taskId');
        var plans = [taskId, shiftPlan, note];

        if (_language == 'TH') {
            $('[id^=cAddDateBegin_][id$=_convert]').each(function () {
                var id = this.id.split('_')[1];
                var dateBegin = $('#cAddDateBegin_' + id).val();
                var dateEnd = $('#cAddDateEnd_' + id).val();
                plans.push({
                        dateStart: DateUtil.dataDateToDataBase(dateBegin, commonData.language),
                        dateEnd: DateUtil.dataDateToDataBase(dateEnd, commonData.language)
                    }
                );
            });
        } else {
            $('[id^=cAddDateBegin_]').each(function () {
                if (this.id.indexOf('_convert') < 0) {
                    var id = this.id.split('_')[1];
                    var dateBegin = $('#cAddDateBegin_' + id).val();
                    var dateEnd = $('#cAddDateEnd_' + id).val();
                }
                plans.push({
                        dateStart: DateUtil.dataDateToDataBase(dateBegin, commonData.language),
                        dateEnd: DateUtil.dataDateToDataBase(dateEnd, commonData.language)
                    }
                );
            });
        }

        var taskBegin = $('#mdAddToPlan').attr('taskBegin');
        var taskEnd = $('#mdAddToPlan').attr('taskEnd');

        if(taskEnd != '' && isExpiredDate(plans.slice(3), taskEnd)){
            bootbox.confirm(MESSAGE.CONFIRM_SAVE_WITH_EXPIRED, function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=UTF-8",
                        dataType: "json",
                        headers: {
                            Accept: "application/json"
                        },
                        url: contextPath + '/plans/insertPlan',
                        data: JSON.stringify(plans),
                        success: function (data, status, xhr) {
                            if (xhr.status == 200) {
                                bootbox.alert(MESSAGE.SAVE_COMPLETED);
                                $('#mdAddToPlan').modal('hide');
                                $('#grpResultModuleSearch').children('[taskId=' + taskId + ']').remove();
                                loadAndMapPlan(_month, _year-543);
                            } else {
                                bootbox.alert(MESSAGE.SAVE_FAILED);
                            }
                        },
                        error: function(){
                            bootbox.alert(MESSAGE.SAVE_FAILED);
                        },
                        async: false
                    });
                }
            });
        } else {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url: contextPath + '/plans/insertPlan',
                data: JSON.stringify(plans),
                success: function (data, status, xhr) {
                    if (xhr.status == 200) {
                        bootbox.alert(MESSAGE.SAVE_COMPLETED);
                        $('#mdAddToPlan').modal('hide');
                        $('#grpResultModuleSearch').children('[taskId=' + taskId + ']').remove();
                        loadAndMapPlan(_month, _year-543);
                    } else {
                        bootbox.alert(MESSAGE.SAVE_FAILED);
                    }
                },
                error: function(){
                    bootbox.alert(MESSAGE.SAVE_FAILED);
                },
                async: false
            });
        }
    }
});

$('#btnCancelAddPlan').click(function () {
    $('#mdAddToPlan').modal('hide');
});

$('#btnCancelTask').click(function () {
    var taskId = $('#mdAddToPlan').attr('taskid');
    bootbox.confirm(MESSAGE.CONFIRM_LEAVE, function (result) {
        if (result) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url: contextPath + '/plans/cancelTask',
                data: taskId,
                complete: function (xhr) {
                    if (xhr.status == 201) {
                        bootbox.alert(MESSAGE.LEAVE_COMPLETED);
                        $('#mdAddToPlan').modal('hide');
                        $('[taskId=' + taskId + ']').removeClass('success').addClass('danger');
                    } else {
                        bootbox.alert(MESSAGE.LEAVE_FAILED);
                    }
                },
                async: false
            });
        }
    });
});

// Edit/Delete plan -----------------------------------------------------------------------------------------------------------
function openModalEditPlan(event) {
    _eventDate = event;
    _otherTaskDate = {};

    if(event.taskStatus != 'otherTask') {
        $('#lblEditTaskProject').html(event.taskProject).parent().parent().show();
        $('#lblEditTaskModule').html(event.taskModule).parent().parent().show();
        $('#lblTaskName').removeClass('col-sm-3').addClass('col-sm-2');

        $('#lblEditTaskCode').html(event.taskCode).parent().show();
        $('#lblEditTaskCode').parent().parent().children(':first').show();
        $('#lblEditDateBegin').html(event.taskBegin != '-'? DateUtil.dataDateToFrontend(event.taskBegin, _language) : '-').parent().parent().show();
        $('#lblEditDateEnd').html(event.taskEnd != '-'? DateUtil.dataDateToFrontend(event.taskEnd, _language): '-').parent().parent().show();
        $('#lblEditDownloadFile').html(event.taskFile).parent().parent().show();
        $('#lblEditTaskImportant').html(event.taskImportance).parent().parent().show();
        loadAndMapFollower('lblEditTaskFollwer', event.taskId);
        $('#lblEditTaskFollwer').parent().parent().show();
        $('#btnEditDownloadFile').attr('onclick', 'downloadFile("'+ event.taskProgramId +'", "' + event.taskCode + '", "' + event.taskFile + '")');
        $('#txtEditTaskDetail').html(event.taskDetail).parent().parent().show();

        $('#lblEditNameWork').parent().show();
        $('#lblEditTaskCost').parent().show();
        $('#txtEditNameWork').hide();
        $('#txtEditTaskCost').parent().hide();

        $('#mdEditToPlan').attr('typeTask', 'task');
    } else {
        $('#lblEditTaskProject').parent().parent().hide();
        $('#lblEditTaskModule').parent().parent().hide();
        $('#lblTaskName').removeClass('col-sm-2').addClass('col-sm-3');
        $('#lblEditTaskCode').parent().hide();
        $('#lblEditTaskCode').parent().parent().children(':first').hide();
        $('#lblEditDateBegin').parent().parent().hide();
        $('#lblEditDateEnd').parent().parent().hide();
        $('#lblEditTaskImportant').html('').parent().parent().hide();
        $('#lblEditTaskFollwer').html('').parent().parent().hide();
        $('#lblEditDownloadFile').parent().parent().hide();
        $('#txtEditTaskDetail').parent().parent().hide();

        $('#lblEditNameWork').parent().hide();
        $('#lblEditTaskCost').parent().hide();
        $('#txtEditNameWork').show();
        $('#txtEditTaskCost').parent().show();

        $('#mdEditToPlan').attr('typeTask', 'otherTask');

        _otherTaskDate = {
            taskName: event.title,
            taskCost: event.taskCost
        };
    }
    $('#lblEditNameWork').html(event.title);
    $('#lblEditTaskCost').html(event.taskCost + ' ' + LABEL.POINT);
    $('#txtEditTaskCost').val(event.taskCost);
    $('#txtEditNameWork').val(event.title);

    $('#txtPercentage').val(event.progress);
    if(event.taskStatus == taskStatus.complete || (event.taskStatus == 'otherTask' && event.progress == 100)) {
        $('#txtEditNameWork, #txtEditTaskCost, #txtPercentage, #cEditDateBegin_0, #cEditDateEnd_0, #txtEditNote,[name=optradio]').attr('disabled', 'disabled');
        $('#btnSaveEditPlan, #btnAddTime_edit, #btnDeleteEditPlan').hide();
    } else {
        $('#txtPercentage, #cEditDateBegin_0, #cEditDateEnd_0, #txtEditNote, [name=optradio]').removeAttr('disabled');
        $('#btnSaveEditPlan, #btnAddTime_edit, #btnDeleteEditPlan').show();
    }

    $('#taskDetailPartEdit').hide();
    $('#taskDetailHeaderEdit').children('span')
                            .removeClass('fa-angle-up')
                            .addClass('fa-angle-down');

    // set begin/end date picker
    var startDate = event.start._i.split('T')[0];
    var endDate = event.end._i.split('T')[0];

    $('#mdEditToPlan').attr('taskBegin', event.taskBegin);
    $('#mdEditToPlan').attr('taskEnd', event.taskEnd);

    $('#mdEditToPlan').attr('versionPlan', event.versionPlan);
    $('#mdEditToPlan').attr('versionTaskOrOtherTask', event.versionTaskOrOtherTask);

    if (commonData.language == 'TH') {
        $('#cEditDateBegin_0').val(parseDateToBE(parseDatePicker(startDate)));
        $('#cEditDateEnd_0').val(parseDateToBE(parseDatePicker(endDate)));
        $('#cEditDateBegin_0_convert').val(parseDatePicker(startDate));
        $('#cEditDateEnd_0_convert').val(parseDatePicker(endDate));
    } else {
        $('#cEditDateBegin_0').val(parseDatePicker(startDate));
        $('#cEditDateEnd_0').val(parseDatePicker(endDate));
    }

    $('#txtEditNote').val(event.note);
    $('#cEditDateBegin_0, #cEditDateEnd_0').popover('hide');

    dateAddMaxId = 0;
    $('[id^=cEditDateBegin_]').each(function () {
        var id = this.id.split('_')[1];
        if (id !== '0') {
            $('#cEditDateBegin_' + id).parent().parent().parent().remove();
            $('#cEditDateEnd_' + id).parent().parent().parent().remove();
        }
    });

    DateUtil.setMinDate('cEditDateBegin_0', 'cEditDateEnd_0');
    DateUtil.setMaxDate('cEditDateEnd_0', 'cEditDateBegin_0');

    // set shifting
    $('#radioNoPostpone_edit').prop('checked', true);

    // set plan id
    $('#mdEditToPlan').attr('planId', event.planId);

    // show modal
    $('#mdEditToPlan').modal({backdrop: 'static'});
}

$('#btnAddTime_edit').click(function () {
    var b = getFirstEmptyDate('cEditDateBegin_');
    var e = getFirstEmptyDate('cEditDateEnd_');

    if (b !== null) {
        b.attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (e !== null) {
        e.attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (checkOverlapDate('cEditDateBegin_', 'cEditDateEnd_')) {
        bootbox.alert(MESSAGE.DATE_OVERLAY);
    } else {
        ++dateAddMaxId;
        $('#grpEditDate').append('<div class="form-group">'
            + '<label class="control-label col-xs-4 required">'+LABEL.DATE_BEGIN+' </label>'
            + '<div class="col-xs-5">'
            + '<div class="input-group">'
            + '<input id="cEditDateBegin_'
            + dateAddMaxId
            + '" type="text" class="form-control" data-placement="bottom" data-content="" maxlength="10"/>'
            + '<span class="input-group-addon date"><span class="glyphicon glyphicon-calendar "></span></span>'
            + '</div>'
            + '</div>'
            + '</div>');

        $('#grpEditDate').append('<div class="form-group">'
            + '<label class="control-label col-xs-4 required">'+LABEL.DATE_END+' </label>'
            + '<div class="col-xs-5">'
            + '<div class="input-group">'
            + '<input id="cEditDateEnd_'
            + dateAddMaxId
            + '" type="text" class="form-control" data-placement="bottom" data-content="" maxlength="10"/>'
            + '<span class="input-group-addon date"><span class="glyphicon glyphicon-calendar "></span></span>'
            + '</div>'
            + '</div>'
            + '<div class="col-sm-2">'
            + '<button id="btnDeleteEditDate_'
            + dateAddMaxId
            + '" type="button" class="btn btn-danger col-sm-12">'+BUTTON.DELETE+'</button>'
            + '</div>'
            + '</div>');

        setDatePicker('cEditDateBegin_', 'cEditDateEnd_', dateAddMaxId);
    }
});

$('#grpEditDate').on('click', '.input-group-addon.date', function () {
    $(this).parent().children(':first').focus();
});

$('#grpEditDate').on('click', '[id^=btnDeleteEditDate_]', function () {
    var id = this.id.split('_')[1];
    $('#cEditDateBegin_' + id).parent().parent().parent().remove();
    $('#cEditDateEnd_' + id).parent().parent().parent().remove();
});

$('#btnCancelEditPlan').click(function () {
    if(changePlan()) {
        bootbox.confirm(MESSAGE.CONFIRM_CANCEL, function (result) {
            if (result)
                $('#mdEditToPlan').modal('hide');
        });
    } else {
        $('#mdEditToPlan').modal('hide');
    }
});

$('#btnSaveEditPlan').click(function () {
    var b = getFirstEmptyDate('cEditDateBegin_');
    var e = getFirstEmptyDate('cEditDateEnd_');
    var progress = $('#txtPercentage').val();
    var shiftPlan = $('#radioPostpone_edit').prop('checked');
    var note = $('#txtEditNote').val();
    var versionPlan = $('#mdEditToPlan').attr('versionPlan');
    var versionTaskOrOtherTask = $('#mdEditToPlan').attr('versionTaskOrOtherTask');
    var typeTask = $('#mdEditToPlan').attr('typeTask');

    var otherTaskName = $('#txtEditNameWork').val();
    var otherTaskPoint = $('#txtEditTaskCost').val();

    if(typeTask == 'otherTask' && otherTaskName == '') {
        $('#txtEditNameWork').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if(typeTask == 'otherTask' && otherTaskPoint == '') {
        $('#txtEditTaskCost').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if(typeTask == 'otherTask' && !$.isNumeric(otherTaskPoint)){
        $('#txtEditTaskCost').attr('data-content', MESSAGE.COST_FORMAT).popover('show');
    } else if(typeTask == 'otherTask' && otherTaskPoint < 0){
        $('#txtEditTaskCost').attr('data-content', MESSAGE.ONLY_INTEGER).popover('show');
    } else if(typeTask == 'otherTask' && (otherTaskPoint.indexOf('.') > 0 && otherTaskPoint.split('.')[1].length > 4)){
        $('#txtEditTaskCost').attr('data-content', MESSAGE.COST_DECIMAL_FORMAT).popover('show');
    }

    else if(progress == '') {
        $('#txtPercentage').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (!$.isNumeric(progress) || progress.indexOf('.') >= 0) {
        $('#txtPercentage').attr('data-content', MESSAGE.PROGRESS_FORMAT).popover('show');
    } else if (progress < 0 || progress > 100) {
        $('#txtPercentage').attr('data-content', MESSAGE.PROGRESS_FORMAT).popover('show');
    } else if (b !== null) {
        b.attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (e !== null) {
        e.attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (checkOverlapDate('cEditDateBegin_', 'cEditDateEnd_')) {
        bootbox.alert(MESSAGE.DATE_OVERLAY);
    } else {
        var planId = $('#mdEditToPlan').attr('planId');
        var plans = [planId, shiftPlan, progress, note, versionPlan, versionTaskOrOtherTask, otherTaskName, otherTaskPoint];

        if (_language == 'TH') {
            $('[id^=cEditDateBegin_][id$=_convert]').each(function () {
                var id = this.id.split('_')[1];
                var dateBegin = $('#cEditDateBegin_' + id).val();
                var dateEnd = $('#cEditDateEnd_' + id).val();
                plans.push({
                        dateStart: DateUtil.dataDateToDataBase(dateBegin, commonData.language),
                        dateEnd: DateUtil.dataDateToDataBase(dateEnd, commonData.language)
                    }
                );
            });
        } else {
            $('[id^=cEditDateBegin_]').each(function () {
                if (this.id.indexOf('_convert') < 0) {
                    var id = this.id.split('_')[1];
                    var dateBegin = $('#cEditDateBegin_' + id).val();
                    var dateEnd = $('#cEditDateEnd_' + id).val();

                    plans.push({
                        dateStart: DateUtil.dataDateToDataBase(dateBegin, commonData.language),
                        dateEnd: DateUtil.dataDateToDataBase(dateEnd, commonData.language)
                    });
                }
            });
        }

        if(changePlan()) {
            var taskEnd = $('#mdEditToPlan').attr('taskEnd');
            if(taskEnd != '' && taskEnd != '-') {
                taskEnd = DateUtil.dataDateToFrontend(Number(taskEnd), _language);
            }

            if(taskEnd != '' && taskEnd != '-' && isExpiredDate(plans.slice(6), taskEnd)){
                bootbox.confirm(MESSAGE.CONFIRM_SAVE_WITH_EXPIRED, function (result) {
                    if (result) {
                        updatePlan(plans);
                    }
                });
            } else {
                updatePlan(plans);
            }
        } else {
            bootbox.alert(MESSAGE.DATA_NO_CHANGE);
        }


    }
});

function updatePlan(plans) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/plans/updatePlan',
        data: JSON.stringify(plans),
        success: function (data, status, xhr) {
            if (xhr.status == 200 && data == 'not match version') {
                bootbox.alert(MESSAGE.VERSION_NOT_MATCH);
            } else if(xhr.status == 200) {
                bootbox.alert(MESSAGE.SAVE_COMPLETED);
                $('#mdEditToPlan').modal('hide');
                loadAndMapPlan(_month, _year-543);
            } else {
                bootbox.alert(MESSAGE.SAVE_FAILED);
            }
        },
        error: function(){
            bootbox.alert(MESSAGE.SAVE_FAILED);
        },
        async: false
    });
}

$('#btnDeleteEditPlan').click(function () {

    var planId = $('#mdEditToPlan').attr('planId');

    bootbox.confirm(MESSAGE.CONFIRM_DELETE, function (result) {
        if (result) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url: contextPath + '/plans/deletePlan',
                data: planId,
                complete: function (xhr) {
                    if (xhr.status === 201) {
                        bootbox.alert(MESSAGE.DELETE_COMPLETED);
                        $('#mdEditToPlan').modal('hide');
                        $('#calendar').fullCalendar('removeEvents', planId);
                        $('#calendar').fullCalendar("rerenderEvents");
                    } else {
                        bootbox.alert(MESSAGE.DELETE_FAILED);
                    }
                },
                async: false
            });
        }
    });
});

// Utilities function --------------------------------------------------------------------------------------------------
var dates = {
    convert: function (d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp)
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                    d.constructor === Number ? new Date(d) :
                        d.constructor === String ? new Date(d) :
                            typeof d === "object" ? new Date(d.year, d.month, d.date) :
                                NaN
        );
    },
    compare: function (a, b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a = this.convert(a).valueOf()) &&
            isFinite(b = this.convert(b).valueOf()) ?
            (a > b) - (a < b) :
                NaN
        );
    },
    inRange: function (d, start, end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(d = this.convert(d).valueOf()) &&
            isFinite(start = this.convert(start).valueOf()) &&
            isFinite(end = this.convert(end).valueOf()) ?
            start <= d && d <= end :
                NaN
        );
    }
}

function setCurrentMonthYear() {
    var d = new Date();
    _month = d.getMonth() + 1;
    _year = d.getFullYear();

    if (commonData.language == 'TH')
        _year = parseInt(_year) + 543;

    $('#ddlMonthSearch').val(_month);
    $('#txtYearSearch').val(_year);

    var textMonth = $('#ddlMonthSearch option:selected').text();

    $('#lblTaskPlanSummaryMonth, #lblOtherTaskPlanSummaryMonth').html(textMonth);
    $('#lblTaskPlanSummaryYear, #lblOtherTaskPlanSummaryYear').html(_year);
}
function loadAndMapPlan(month, year) {
    var events = [];
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/plans/findPlanByMonth?month=' + month + '&year=' + year,
        success: function (data, status, xhr) {
            $.each(data, function (k, v) {
                var startDate = DateUtil.dataDateToFrontend(v.dateStart, commonData.language);
                var endDate = DateUtil.dataDateToFrontend(v.dateEnd, commonData.language);

                startDate = parseFullCalendar(parseFormatDateToString(startDate, commonData.language)) + 'T00:00:00';
                endDate = parseFullCalendar(parseFormatDateToString(endDate, commonData.language)) + 'T24:00:00';

                // set bg color ----------------------------------------------------------------------------------------
                var bgColor = taskStatusColor.normal;
                var allDay = true;
                if(v.task != null) {
                    if(v.task.dateEnd != null && v.dateEnd > v.task.dateEnd) {
                        //bgColor = taskStatusColor.delay;
                        allDay = false;
                    }
                    if(v.task.taskStatus == taskStatus.new) {
                        bgColor = taskStatusColor.normal;
                    } else if(v.task.taskStatus == taskStatus.ready) {
                        bgColor = taskStatusColor.ready;
                    } else if(v.task.taskStatus == taskStatus.complete) {
                        bgColor = taskStatusColor.passTask;
                    }

                } else {
                    if(v.otherTask.progress == 100){
                        bgColor = taskStatusColor.passOtherTask;
                    }else{
                        bgColor = taskStatusColor.other;
                    }
                }
                // -----------------------------------------------------------------------------------------------------

                var event = {
                    _id: v.id,
                    title: v.task != null ? v.task.taskName : v.otherTask.taskName,
                    start: startDate,
                    end: endDate,
                    taskId: v.task != null ? v.task.id : null,
                    taskBegin: v.task != null ? (v.task.dateStart != null ? v.task.dateStart:'-') : '-',
                    taskEnd: v.task != null ? (v.task.dateEnd != null ? v.task.dateEnd:'-') : '-',
                    taskCode: v.task != null ? v.task.taskCode : '',
                    taskCost: v.task != null ? v.task.taskCost : v.otherTask.taskCost,
                    taskDetail: v.task != null ? (v.task.detail != null ? v.task.detail : '') : '',
                    taskFile: v.task != null ? (v.task.fileName != null ? v.task.fileName : '') : '',
                    taskImportance: v.task != null ? (v.task.importanceTask.importanceTaskName != null ? v.task.importanceTask.importanceTaskName + ' ('+ v.task.importanceTask.importanceTaskCode + ')' : '') : '',
                    taskProgramId: v.task != null ? v.task.program.id : '',
                    taskProject: v.task != null ? v.task.program.moduleProject.project.projectName : '',
                    taskModule: v.task != null ? v.task.program.moduleProject.moduleName : '',
                    taskStatus: v.task != null ? v.task.taskStatus : 'otherTask',
                    otherTaskId: v.otherTask != null ? v.otherTask.id : null,
                    planId: v.id,
                    note: v.note,
                    versionPlan: v.version,
                    versionTaskOrOtherTask: v.task != null ? v.task.version : v.otherTask.version,
                    progress: v.task != null ? v.task.progress : v.otherTask.progress,
                    backgroundColor: bgColor,
                    allDay: allDay
                };
                events.push(event);
            });
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar').fullCalendar('addEventSource', events);
            $('#calendar').fullCalendar('rerenderEvents');
        },
        async: false
    });

    loadAndMapSummaryPlan(month, year);
    $('.fc-time').html('*');
}

function date2EnStyle(date) {
    // dd/mm/yyyy -> mm/dd/yyyy
    date = date.split('/');
    return date[1] + '/' + date[0] + '/' + date[2];
}
function parseFullCalendar(date) {
    // dd/mm/yyyy -> yyyy-mm-dd
    date = date.split('/');
    return date[2] + '-' + date[1] + '-' + date[0];
}
function parseDatePicker(date) {
    // yyyy-mm-dd -> dd/mm/yyyy
    date = date.split('-');
    return date[2] + '/' + date[1] + '/' + date[0];
}
function parseDateToBE(date) {
    date = date.split('/');
    return date[0] + '/' + date[1] + '/' + (parseInt(date[2]) + 543);
}

function changePlan(){
    var percentage = $('#txtPercentage').val();
    var dateBegin = $('#cEditDateBegin_0').val();
    var dateEnd = $('#cEditDateEnd_0').val();
    var inputBegin = (_language == 'TH') ? $('[id^=cEditDateBegin_][id$=_convert]') : $('[id^=cEditDateBegin_]');
    var isShift = $('#radioPostpone_edit').prop('checked');
    var note = $('#txtEditNote').val();
    var otherTaskName = $('#txtEditNameWork').val();
    var otherTaskCost = $('#txtEditTaskCost').val();

    if(FormUtil.isDateFormat(dateBegin)) {
        if(_language == 'TH') {
            dateBegin = dateBegin.split('/')[0] + '/' + dateBegin.split('/')[1] + '/' + (parseInt(dateBegin.split('/')[2]) - 543);
        }
        dateBegin = parseFullCalendar(dateBegin);
    }
    if(FormUtil.isDateFormat(dateEnd)) {
        if(_language == 'TH') {
            dateEnd = dateEnd.split('/')[0] + '/' + dateEnd.split('/')[1] + '/' + (parseInt(dateEnd.split('/')[2]) - 543);
        }
        dateEnd = parseFullCalendar(dateEnd);
    }

    var percentageOld = _eventDate.progress;
    var dateBeginOld = _eventDate.start._i.split('T')[0];
    var dateEndOld = _eventDate.end._i.split('T')[0];
    var noteOld = _eventDate.note;
    if(noteOld == null || noteOld == 'null'){
        noteOld = '';
    }

    var noChangeDate = (inputBegin.length == 1) ? (dateBeginOld == dateBegin && dateEndOld == dateEnd): false;
    var changeOther = _eventDate.taskStatus == 'otherTask' ? changeOtherTask(otherTaskName, otherTaskCost) : false;

    if(percentageOld != percentage || !noChangeDate || isShift || noteOld != note || changeOther) {
        return true;
    }
    return false;
}

function changeOtherTask(taskName, taskCost){
    if(_eventDate.title != taskName || _eventDate.taskCost != taskCost){
        return true;
    }
    return false;
}

function loadAndMapAllProject(){
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/plans/findAllProject',
        success: function (data, status, xhr) {
            if (xhr.status == 200) {
                $.each(data, function (k, v) {
                    $('#ddlProject').append('<option value="' + v.id + '">' + v.projectName + '</option>');
                });
            }
        },
        async: false
    });
}

function loadAndMapModule(projectId){
    $('#ddlJobModule').children('option[value!=0]').remove();

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/plans/findModuleByProject?id=' + projectId,
        success: function (data, status, xhr) {
            if (xhr.status == 200) {
                $.each(data, function (k, v) {
                    $('#ddlJobModule').append('<option value="' + v.id + '">' + v.moduleName + '</option>');
                });
            }
        },
        async: false
    });
}

function loadAndMapAllTaskType(){
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/plans/findAllTaskType',
        success: function (data, status, xhr) {
            if(data.length > 9)
                $('#grpTaskType').addClass('task-scorebar');
            else
                $('#grpTaskType').removeClass('task-scorebar');

            $('#grpTaskType').html('');
            if (xhr.status == 200) {
                $.each(data, function (k, v) {
                    $('#grpTaskType').append('<div class="checkbox"><label><input name="checkTypeTask" type="checkbox" value="' + v.id + '"/>'+v.typeTaskName+'</label></div>');
                });
            }
            $('#grpTaskType').append('<div class="checkbox"><label><input type="checkbox" id="checkMyTask"/>'+ MESSAGE.CHECKBOX_PRIVATE_TASK +'</label></div>');
            $('#grpTaskType').append('<div class="checkbox"><label><input type="checkbox" id="checkOtherTask"/>'+ MESSAGE.CHECKBOX_PUBLIC_TASK +'</label></div>');
        },
        async: false
    });
}

function loadAndMapSummaryPlan(month, year){
    var textMonth = $('#ddlMonthSearch option:selected').text();
    var textYear = $('#txtYearSearch').val();
    $('#lblTaskPlanSummaryMonth, #lblOtherTaskPlanSummaryMonth').html(textMonth);
    $('#lblTaskPlanSummaryYear, #lblOtherTaskPlanSummaryYear').html(textYear);

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/plans/getTotalPlanPoint?month=' + month + '&year=' + year,
        success: function (data, status, xhr) {
            if (xhr.status == 200){
                $('#lblTaskPointInMonth').html(data.pointCompleteTaskMonth + ' ' + LABEL.POINT);
                $('#lblTaskPointInYear').html(data.pointCompleteTaskYear + ' ' + LABEL.POINT);
                $('#lblOtherTaskPointInMonth').html(data.pointCompleteOtherTaskMonth + ' ' + LABEL.POINT);
                $('#lblOtherTaskPointInYear').html(data.pointCompleteOtherTaskYear + ' ' + LABEL.POINT);
            }
        },
        async: false
    });
}

function loadAndMapFollower(lableElementId, taskId) {
    $.ajax({
            type: "GET",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url: contextPath + '/followertasks/findFollowerTaskByTaskId?id=' + taskId,
            success: function (data, status, xhr) {
                $('#'+lableElementId).html('-');

                if (xhr.status == 200 && data.length > 0) {
                    $('#'+lableElementId).html('');
                    $.each(data, function(k, v){
                        $('#'+lableElementId).append(v.nameFollower + '<br/>');
                    });
                }
            },
            async: false
        });
}

Date.prototype.withoutTime = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0, 0);
    return d
}

function isExpiredDate(dates, dateEnd) {
    var expired = false;
    dateEnd = DateUtil.dataDateToDataBase(dateEnd, _language);
    $.each(dates, function(k, v){
        if(new Date(v.dateEnd).withoutTime() > dateEnd)
            expired = true;
    });
    return expired;
}

function dataDateToShortDate(date, lang, arrShortMonths) {
    var date = DateUtil.dataDateToFrontend(date, lang);
    date = date.split('/');
    var month = parseInt(date[1]) - 1;
    return date[0] + ' ' + arrShortMonths[month];
}

function downloadFile(taskProgramId, taskCode, fileName){
    if(fileName != '') {
        window.location.href = contextPath + '/tasks/downloadFile/' + taskProgramId + '/' + taskCode + '/' + fileName + '/';
    } else {
        bootbox.alert(MESSAGE.FILE_NOT_FOUND);
    }
}
