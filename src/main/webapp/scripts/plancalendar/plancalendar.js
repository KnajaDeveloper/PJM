var dateAddMaxId = 0;

var _language = commonData.language;
var dateLang = checkLanguageDatePicker(_language);

var _month;
var _year;

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
    loadAndMapPlan(_month, _year);

    // Date picker for tab search job
    $("#cPlanDateBegin").datepicker(dateLang);
    $("#cPlanDateEnd").datepicker(dateLang);

    $("#cPlanDateBegin").on('change', function () {
        DateUtil.setMinDate('cPlanDateBegin', 'cPlanDateEnd');
    });
    $("#cPlanDateEnd").on('change', function () {
        DateUtil.setMaxDate('cPlanDateEnd', 'cPlanDateBegin');
    });

    // Date picker for first time in add modal
    $("#cAddDateBegin_0").datepicker(dateLang);
    $("#cAddDateEnd_0").datepicker(dateLang);

    $("#cAddDateBegin_0").on('change', function () {
        DateUtil.setMinDate('cAddDateBegin_0', 'cAddDateEnd_0');
    });
    $("#cAddDateEnd_0").on('change', function () {
        DateUtil.setMaxDate('cAddDateEnd_0', 'cAddDateBegin_0');
    });

    // Date picker for edit modal
    $("#cEditDateBegin_0").datepicker(dateLang);
    $("#cEditDateEnd_0").datepicker(dateLang);

    $("#cEditDateBegin_0").on('change', function () {
        DateUtil.setMinDate('cEditDateBegin_0', 'cEditDateEnd_0');
    });
    $("#cEditDateEnd_0").on('change', function () {
        DateUtil.setMaxDate('cEditDateEnd_0', 'cEditDateBegin_0');
    });


    // Load and map all module
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/plans/findAllModule',
        success: function (data, status, xhr) {
            if (xhr.status === 200) {
                $.each(data, function (k, v) {
                    $('#ddlJobModule').append('<option value="' + v.id + '">' + v.moduleName + '</option>');
                });
            }
        },
        async: false
    });

    // Load and map all task type
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/plans/findAllTaskType',
        success: function (data, status, xhr) {
            $('#grpTaskType').html('');
            if (xhr.status == 200) {
                $.each(data, function (k, v) {
					$('#grpTaskType').append('<div class="checkbox"><label><input type="checkbox" value="' + v.id + '"/>'+v.typeTaskName+'</label></div>');
                });
            }
			$('#grpTaskType').append('<div class="checkbox"><label><input type="checkbox" id="checkMyTask"/>'+ MESSAGE.CHECKBOX_PRIVATE_TASK +'</label></div>');
			$('#grpTaskType').append('<div class="checkbox"><label><input type="checkbox" id="checkOtherTask"/>'+ MESSAGE.CHECKBOX_PUBLIC_TASK +'</label></div>');
        },
        async: false
    });
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
        loadAndMapPlan(_month, _year);

        var defaultDate = (year - 543) + '-' + (month >= 10 ? month : '0' + month) + '-01';
        $('#calendar').fullCalendar('gotoDate', moment(defaultDate).format('YYYY-MM-DD'));

    } else {         // not correct year format
        $('#txtYearSearch').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    }
}

// Search job [module]-----------------------------------------------------------------------------------------------
$('#btnSearchByModule').click(function () {

    // clear result list
    $('#grpResultModuleSearch').empty();

    // Load and map task by condition
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
        data: JSON.stringify([moduleCode, arrTypeTask, getMyTask, getOtherTask]),
        success: function (data, status, xhr) {
            if (xhr.status === 200) {
                if (data == null || data.length == 0) {
                    // no result
                    $('#lblNoResultSerchByModule').show();
                } else {
                    $('#lblNoResultSerchByModule').hide();
                    $.each(data, function (k, v) {
                        $('#grpResultModuleSearch').append('<a class="list-group-item ' + (v.empCode == null || v.empCode == '' ? 'danger' : 'success') + '" taskId="' + v.id + '" onclick="openModalAddPlan(this)">' + v.taskName + ' <span class="pull-right">' + v.typeTask.typeTaskName + '</span> </a>');
                    });
                }
            }
        },
        async: false
    });
});

// Add other plan -----------------------------------------------------------------------------------------------
$('#btnAddOtherPlan').click(function () {

    var taskName = $('#txtPlanName').val();
    var taskCost = $('#txtPlanCost').val();
    var dateStart = $('#cPlanDateBegin').val();
    var dateEnd = $('#cPlanDateEnd').val();
    
    if (taskName.length == 0) {
        $('#txtPlanName').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (taskCost.indexOf('.') > 0 || !$.isNumeric(taskCost)) {
        $('#txtPlanCost').attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
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
                dateEnd: DateUtil.dataDateToDataBase(dateEnd, _language)
            }),
            success: function (data, status, xhr) {
                if (xhr.status === 200) {
                    bootbox.alert(MESSAGE.SAVE_COMPLETED);
                    loadAndMapPlan(_month, _year);

                    $('#txtPlanName').val('');
                    $('#txtPlanCost').val('');
                    $('#cPlanDateBegin').val('');
                    $('#cPlanDateEnd').val('');

                } else if (xhr.status === 500) {
                    bootbox.alert(MESSAGE.SAVE_FAILED);
                }
            },
            async: false
        });
    }


});
$('.input-group-addon.date').click(function(){
    $(this).parent().children(':first').focus();
});


// Add plan ------------------------------------------------------------------------------------------------------------
function openModalAddPlan(jobElement) {
    if(jobElement.attributes[2].nodeValue.indexOf('danger') >= 0) {
        $('#btnCancelTask').hide();
    }else{
        $('#btnCancelTask').show();
    }

    var jobName = $.trim(jobElement.innerHTML.split('<span')[0]);
    var taskId = jobElement.getAttribute('taskId');

    // set name
    $('#lblAddNameWork').html(jobName);

    // default date picker
    dateAddMaxId = 0;
    $('[id^=cAddDateBegin_]').each(function () {
        var id = this.id.split('_')[1];
        if (id === '0') {
            $('#cAddDateBegin_0, #cAddDateEnd_0').attr('value', '');
            $('#cAddDateBegin_0, #cAddDateEnd_0').each(function () {
                $.datepicker._clearDate(this);
            });
        } else {
            $('#cAddDateBegin_' + id).parent().parent().parent().remove();
            $('#cAddDateEnd_' + id).parent().parent().parent().remove();
        }
    });

    // default note
    $('#txtAddNote').val('');

    // default check
    $('#radioNoPostpone_add').prop('checked', true);

    // show modal
    $('#mdAddToPlan').modal({backdrop: 'static'});

    // set hidden
    $('#taskId').val(taskId);

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
        DateUtil.setMinDate(idDateBegin + id, idDateEnd + id);
    });
    $("#" + idDateEnd + id).on('change', function () {
        DateUtil.setMaxDate(idDateEnd + id, idDateBegin + id);
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
            + '" type="text" class="form-control" data-placement="bottom" data-content=""/>'
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
            + '" type="text" class="form-control" data-placement="bottom" data-content=""/>'
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

    if (b !== null) {
        b.attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (e !== null) {
        e.attr('data-content', MESSAGE.COMPLETE_THIS_FIELD).popover('show');
    } else if (checkOverlapDate('cAddDateBegin_', 'cAddDateEnd_')) {
        bootbox.alert(MESSAGE.DATE_OVERLAY);
    } else {
        var taskId = $('#taskId').val();
        var plans = [taskId, shiftPlan];

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
                if (xhr.status === 200) {
                    bootbox.alert(MESSAGE.SAVE_COMPLETED);
                    $('#mdAddToPlan').modal('hide');
                    $('#grpResultModuleSearch').children('[taskId=' + taskId + ']').remove();
                    loadAndMapPlan(_month, _year);
                } else if (xhr.status === 500) {
                    bootbox.alert(MESSAGE.SAVE_FAILED);
                }
            },
            async: false
        });
    }
});
$('#btnCancelAddPlan').click(function () {
    $('#mdAddToPlan').modal('hide');
});
$('#btnCancelTask').click(function () {
    var taskId = $('#taskId').val();

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
            if (xhr.status === 201) {
                bootbox.alert(MESSAGE.LEAVE_COMPLETED);
                $('#mdAddToPlan').modal('hide');
                $('[taskId=' + taskId + ']').removeClass('success').addClass('danger');
            } else if (xhr.status === 500) {
                bootbox.alert(MESSAGE.LEAVE_FAILED);
            }
        },
        async: false
    });
});

// Edit/Delete plan -----------------------------------------------------------------------------------------------------------
function openModalEditPlan(event) {
    // set name
    $('#lblEditNameWork').html(event.title);

    // set complete percentage
    $('#txtPercentage').val(event.progress);

    // set begin/end date picker
    var startDate = event.start._i.split('T')[0];
    var endDate = event.end._i.split('T')[0];

    if (commonData.language == 'TH') {
        $('#cEditDateBegin_0').val(parseDateToBE(parseDatePicker(startDate)));
        $('#cEditDateEnd_0').val(parseDateToBE(parseDatePicker(endDate)));
        $('#cEditDateBegin_0_convert').val(parseDatePicker(startDate));
        $('#cEditDateEnd_0_convert').val(parseDatePicker(endDate));
    } else {
        $('#cEditDateBegin_0').val(parseDatePicker(startDate));
        $('#cEditDateEnd_0').val(parseDatePicker(endDate));
    }

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
    $('#txtEditPlanId').val(event.planId);

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
            + '" type="text" class="form-control" data-placement="bottom" data-content=""/>'
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
            + '" type="text" class="form-control" data-placement="bottom" data-content=""/>'
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
    $('#mdEditToPlan').modal('hide');
});

$('#btnSaveEditPlan').click(function () {
    var b = getFirstEmptyDate('cEditDateBegin_');
    var e = getFirstEmptyDate('cEditDateEnd_');
    var progress = $('#txtPercentage').val();
    var shiftPlan = $('#radioPostpone_edit').prop('checked');

    if(progress == '') {
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
        var planId = $('#txtEditPlanId').val();
        var plans = [planId, shiftPlan, progress];

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
                if (xhr.status === 200) {
                    bootbox.alert(MESSAGE.SAVE_COMPLETED);
                    $('#mdEditToPlan').modal('hide');
                    loadAndMapPlan(_month, _year);
                } else if (xhr.status === 500) {
                    bootbox.alert(MESSAGE.SAVE_FAILED);
                }
            },
            async: false
        });
    }
});

$('#btnDeleteEditPlan').click(function () {
    
    var planId = $('#txtEditPlanId').val();

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
                    } else if (xhr.status === 500) {
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

                var event = {
                    _id: v.id,
                    title: v.task != null ? v.task.taskName : v.otherTask.taskName,
                    start: startDate,
                    end: endDate,
                    taskId: v.task != null ? v.task.id : null,
                    otherTaskId: v.otherTask != null ? v.otherTask.id : null,
                    planId: v.id,
                    note: v.note,
                    progress: v.task != null ? v.task.progress : v.otherTask.progress,
                };
                events.push(event);
            });
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar').fullCalendar('addEventSource', events);
            $('#calendar').fullCalendar('rerenderEvents');
        },
        async: false
    });
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