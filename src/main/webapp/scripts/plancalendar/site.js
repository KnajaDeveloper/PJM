var dateAddMaxId = 0;

// Ready page ----------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    // Fix bug for <textarea>
    $('#txtAddNote').text('');

    // Set current month and year
    setCurrentMonthYear();

    // Date picker for tab search job
    $("#cSearchDateBegin").datepicker({
        autoConversionField: true,
        onSelect: function (selected) {
            $("#cSearchDateEnd").datepicker("option", "minDate", selected);
        }
    });
    $("#cSearchDateEnd").datepicker({
        autoConversionField: true,
        onSelect: function (selected) {
            $("#cSearchDateBegin").datepicker("option", "maxDate", selected);
        }
    });

    // Date picker for first time in add modal
    $("#cAddDateBegin_0").datepicker({
        autoConversionField: true,
        onSelect: function (selected) {
            $("#cAddDateEnd_0").datepicker("option", "minDate", selected);
        }
    });
    $("#cAddDateEnd_0").datepicker({
        autoConversionField: true,
        onSelect: function (selected) {
            $("#cAddDateBegin_0").datepicker("option", "maxDate", selected);
        }
    });

    // Date picker for edit modal
    $("#cEditDateBegin").datepicker({
        autoConversionField: true,
        onSelect: function (selected) {
            $("#cEditDateEnd").datepicker("option", "minDate", selected);
        }
    });
    $("#cEditDateEnd").datepicker({
        autoConversionField: true,
        onSelect: function (selected) {
            $("#cEditDateBegin").datepicker("option", "maxDate", selected);
        }
    });

    // Load and map all module

    // Load and map all job type

    // Load and map plan
    $('#calendar').fullCalendar({
        defaultDate: '2016-01-12',
        editable: false,
        eventLimit: false,
        events: [
            {
                title: 'All Day Event',
                start: '2016-01-01',
            },
            {
                title: 'Long Event',
                start: '2016-01-07',
                end: '2016-01-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2016-01-09'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2016-01-16'
            },
            {
                title: 'Conference',
                start: '2016-01-11',
                end: '2016-01-13'
            },
            {
                title: 'Meeting',
                start: '2016-01-12',
                end: '2016-01-12'
            },
            {
                title: 'Lunch',
                start: '2016-01-12'
            },
            {
                title: 'Meeting',
                start: '2016-01-12'
            },
            {
                title: 'Happy Hour',
                start: '2016-01-12'
            },
            {
                title: 'Dinner',
                start: '2016-01-12'
            },
            {
                title: 'Birthday Party',
                start: '2016-01-13'
            },
            {
                title: 'Click for Google',
                start: '2016-01-28'
            }
        ],
        eventClick: function (event) {
            var endDate = (event.end === null) ? event.start._i : event.end._i;
            openModalEditPlan(0, event.title, event.start._i, endDate);
            $('#mdEditToPlan').modal({backdrop: 'static'});
        }
    });
});

// Search plan ---------------------------------------------------------------------------------------------------------
$('#btnFindPlan').click(function () {
    // search plan by month and year
    // map to fullcalendar
});

// Search job [module]-----------------------------------------------------------------------------------------------
$('#btnSearchByModule').click(function () {
    //
    //

    // clear result list
    $('#grpResultModuleSearch').empty();

    // no result
    $('#lblNoResultSerchByModule').show();
});

// Search job [custom]-----------------------------------------------------------------------------------------------
$('#btnSearchByCustom').click(function () {
    //
    //

    // clear result list
    $('#grpResultCustomSearch').empty();

    // no result
    $('#lblNoResultSerchByCustom').show();
});

// Add plan ------------------------------------------------------------------------------------------------------------
function openModalAddPlan(jobElement) {
    var jobName = $.trim(jobElement.innerHTML.split('<span')[0]);
    //var jobType = $.trim(jobElement.innerHTML.split('right">')[1].split('</span>')[0]);
    var workCode = jobElement.getAttribute('workCode');
    var projectCode = jobElement.getAttribute('projectCode');
    var moduleCode = jobElement.getAttribute('moduleCode');

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
            $('#cAddDateBegin_' + id).parent().parent().remove();
            $('#cAddDateEnd_' + id).parent().parent().remove();
        }
    });

    // default note
    $('#txtAddNote').val('');

    // default check
    $('#radioPostpone_add').prop('checked', true);

    // show modal
    $('#mdAddToPlan').modal({backdrop: 'static'});

    // set hidden
    $('#workCode').html(workCode);
    $('#projectCode').html(projectCode);
    $('#moduleCode').html(moduleCode);
}
function getFirstEmptyDate(baseId) {
    // หา date field แรกที่ว่าง
    var obj = null;
    $('[id^=' + baseId + ']').each(function () {
        if (obj === null)
            if ($(this).val().length === 0)
                obj = $(this);
    });
    return obj;
}
function checkOverlapDate() {
    var isOverlap = false;

    $('[id^=cAddDateBegin_]').each(function () {              // loop parent
        var id1 = this.id.split('_')[1];
        var dateBegin1 = $('#cAddDateBegin_' + id1).datepicker('getDate');
        var dateEnd1 = $('#cAddDateEnd_' + id1).datepicker('getDate');

        $('[id^=cAddDateBegin_]').each(function () {          // loop child
            var id2 = this.id.split('_')[1];
            if (id2 !== id1) {   // not itself
                var dateBegin2 = $('#cAddDateBegin_' + id2).datepicker('getDate');
                var dateEnd2 = $('#cAddDateEnd_' + id2).datepicker('getDate');

                if (dates.inRange(dateBegin1, dateBegin2, dateEnd2) || dates.inRange(dateEnd1, dateBegin2, dateEnd2)) {
                    isOverlap = true;
                }
            }
        });
    });

    return isOverlap;
}
function setDatePicker(id) {
    $("#cAddDateBegin_" + id).datepicker({
        autoConversionField: true,
        onSelect: function (selected) {
            $("#cAddDateEnd_" + id).datepicker("option", "minDate", selected);
        }
    });
    $("#cAddDateEnd_" + id).datepicker({
        autoConversionField: true,
        onSelect: function (selected) {
            $("#cAddDateBegin_" + id).datepicker("option", "maxDate", selected);
        }
    });
}

$('#btnAddTime').click(function () {
    var b = getFirstEmptyDate('cAddDateBegin_');
    var e = getFirstEmptyDate('cAddDateEnd_');
    if (b !== null) {
        b.popover('show');
    } else if (e !== null) {
        e.popover('show');
    } else if (checkOverlapDate()) {
        bootbox.alert("เวลาทับซ้อน! กรุณาเลือกเวลาที่ไม่ทับซ้อนกัน");
    } else {
        ++dateAddMaxId;
        $('#grpDate').append('<div class="form-group">'
            + '<label class="control-label col-xs-3 required">วันที่เริ่ม </label>'
            + '<div class="col-xs-6">'
            + '<input id="cAddDateBegin_'
            + dateAddMaxId
            + '" type="text" class="form-control" readonly="" data-placement="bottom" data-content="กรุณาระบุวันที่เริ่มต้น"/>'
            + '</div>'
            + '</div>');
        $('#grpDate').append('<div class="form-group">'
            + '<label class="control-label col-xs-3 required">วันที่สิ้นสุด </label>'
            + '<div class="col-xs-6">'
            + '<input id="cAddDateEnd_'
            + dateAddMaxId
            + '" type="text" class="form-control" readonly="" data-placement="bottom" data-content="กรุณาระบุวันที่สิ้นสุด"/>'
            + '</div>'
            + '<div class="col-sm-1">'
            + '<button id="btnDeleteAddDate_'
            + dateAddMaxId
            + '" type="button" class="btn btn-danger col-sm-12">ลบ</button>'
            + '</div>'
            + '</div>');

        setDatePicker(dateAddMaxId);
    }
});
$('#grpDate').on('click', '[id^=btnDeleteAddDate_]', function () {
    var id = this.id.split('_')[1];
    $('#cAddDateBegin_' + id).parent().parent().remove();
    $('#cAddDateEnd_' + id).parent().parent().remove();
});

$('#btnSaveAddPlan').click(function () {
    var b = getFirstEmptyDate('cAddDateBegin_');
    var e = getFirstEmptyDate('cAddDateEnd_');

    if (b !== null) {
        b.popover('show');
    } else if (e !== null) {
        e.popover('show');
    } else if (checkOverlapDate()) {
        bootbox.alert("เวลาทับซ้อน! กรุณาเลือกเวลาที่ไม่ทับซ้อนกัน");
    } else {
        var plan = {
            workCode: $('#workCode').html(),
            note: $('#txtAddNote').val(),
            progress: 0,
            empCode: 'EM001',
            projectCode: $('#projectCode').html(),
            moduleCode: $('#moduleCode').html()
        };

        var planDate = [];
        $('[id^=cAddDateBegin_]').each(function () {
            var id = this.id.split('_')[1];
            planDate.push({
                    dateStart: $('#cAddDateBegin_' + id).datepicker({dateFormat: 'dd-mm-yyyy'}).val(),
                    dateEnd: $('#cAddDateEnd_' + id).datepicker({dateFormat: 'dd-mm-yyyy'}).val()
                }
            );
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url: contextPath + '/plans/insertplan',
            data: JSON.stringify([plan, planDate]),
            complete: function (xhr) {
                if (xhr.status === 201) {
                    bootbox.alert("บันทึกข้อมูลสำเร็จ");
                    $('#mdAddToPlan').modal('hide');
                } else if (xhr.status === 500) {
                    bootbox.alert("บันทึกข้อมูลไม่สำเร็จ");
                }
            },
            async: false
        });
    }
});
$('#btnCancelAddPlan').click(function () {
    $('#mdAddToPlan').modal('hide');
});

// Edit plan -----------------------------------------------------------------------------------------------------------
function openModalEditPlan(planId, title, startDate, endDate) {
    // set name
    $('#lblEditNameWork').html(title);

    // set complete percentage
    $('#txtPercentage').val(0);

    // set begin datepicker
//    $('#cEditDateBegin').datepicker({
//        autoConversionField: true,
//        onSelect: function (selected) {
//            $("#cEditDateEnd").datepicker("option", "minDate", selected);
//        }
//    });
    console.log(startDate);

    // set end datepicker
    console.log(endDate);

    // set shifting
}

$('#btnCancelEditPlan').click(function () {
    $('#mdEditToPlan').modal('hide');
});
$('#btnSaveEditPlan').click(function () {
    // Save process
});
$('#btnDeleteEditPlan').click(function () {
    // Delete process
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
    var m = d.getMonth() + 1;
    var y = d.getFullYear();

    $('#ddlMonthSearch').val(m);
    $('#txtYearSearch').val(y);
}

