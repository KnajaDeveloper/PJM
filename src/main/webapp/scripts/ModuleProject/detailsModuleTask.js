var pagginationTask = $.extend({},UtilPaggination);
var _language = commonData.language;
var dateLang = checkLanguageDatePicker(_language);
var programID;
var trProgramNum;

$(document).ready(function () {
    $("#dateStartProject").datepicker(dateLang);
    $("#dateEndProject").datepicker(dateLang);

    $("#dateStartProject").on('change', function () {
        if($(this).val() != '')
            DateUtil.setMinDate('dateStartProject', 'dateEndProject');

        checkDateFormat($(this), Message.MSG_DATE_INCOLLECT,  Message.MSG_PLEASE_COMPLETE_THIS_FIEID);
    });
    
    $("#dateEndProject").on('change', function () {
        if($(this).val() != '')
            DateUtil.setMaxDate('dateEndProject', 'dateStartProject');
        
        checkDateFormat($(this), Message.MSG_DATE_INCOLLECT,  Message.MSG_PLEASE_COMPLETE_THIS_FIEID);
    });

    $("#dateStartSpan").click(function () {
        $("#dateStartProject").focus();
    });
    
    $("#dateEndSpan").click(function () {
        $("#dateEndProject").focus();
    });
});

function paramProgramId(programId, trProgramNumber){
    programID = programId;
    trProgramNum = trProgramNumber;
}

function searchDataTask() {
    var dataJsonData = {
        id: programID
    }

    pagginationTask.setOptionJsonData({
        url:contextPath + "/tasks/findPaggingData",
        data:dataJsonData
    });

    pagginationTask.setOptionJsonSize({
        url:contextPath + "/tasks/findPaggingSize",
        data:dataJsonData
    });

    pagginationTask.search(pagginationTask);
}

var dataTypeTask = [];
var dataTypeTaskName = [];
var dataEmpCode = [];
var dataEmpName = [];
var dataDateStart = [];
var dataDateEnd = [];
var dataFileName = [];
var dataDetail = [];

pagginationTask.setEventPaggingBtn("paggingSimpleTask",pagginationTask);
pagginationTask.loadTable = function loadTable (jsonData) {

    $('#formADTask').show();
    $('#formTask').show();

    $('#ResualtSearchTask').empty();

    if(jsonData.length <= 0){
        $('#ResualtSearchTask').append('<tr><td colspan = 6 class="text-center">' + Message.MSG_DATA_NOT_FOUND + '</td></tr>');
    }

    var link = "";
    var i = 1;
    var tableData = "";

    dataTypeTask = [];
    dataEmpCode = [];
    dataDateStart = [];
    dataDateEnd = [];
    dataFileName = [];
    dataDetail = [];

    check = true;

    jsonData.forEach(function(value){
        dataTypeTask.push(value.typeTaskCode);
        dataTypeTaskName.push(value.typeTaskName);
        dataEmpCode.push(checkNullData(value.empCode));

        if(value.dateStart == null)
            dataDateStart.push("");
        else
            dataDateStart.push(DateUtil.dataDateToFrontend(value.dateStart, commonData.language));

        if(value.dateEnd == null)
            dataDateEnd.push("");
        else
            dataDateEnd.push(DateUtil.dataDateToFrontend(value.dateEnd, commonData.language));

        dataFileName.push(checkNullData(value.fileName));
        dataDetail.push(checkNullData(value.detail));

        var colorProgress =  value.progress == "100" ? "progress-bar-success" : "progress-bar-warning";

        tableData = ''
        + '<tr id="trTask' + i++ + '">'
            + '<td class="text-center">'
                + '<input inUse="' + (value.inUse > 0 ? 1 : 0) + '" id="' + value.id + '" taskCode="' + value.taskCode + '" class="checkboxTableTask" type="checkbox" name="chkdelete" />'
            + '</td>'
            + '<td class="text-center">'
                + '<button onclick="openEditTask($(this))" type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#modalTask" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdCodeTask" taskCode="' + value.taskCode + '" taskId="' + value.id + '" class="text-center" onclick="onClickTrTask(this)">' + value.taskCode + '</td>'
            + '<td id="tdNameTask" taskCode="' + value.taskCode + '" class="" onclick="onClickTrTask(this)">' + value.taskName + '</td>'
            + '<td id="tdCostTask" taskCode="' + value.taskCode + '" class="text-center" onclick="onClickTrTask(this)">' + value.taskCost + ' ' + Label.LABEL_POINT + '</td>'
            + '<td id="tdProgressTask" taskCode="' + value.taskCode + '" onclick="onClickTrTask(this)">'
                + '<div class="progress-bar ' + colorProgress + '" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"'
                + 'style="width: ' + value.progress + '%;">' + value.progress + '%</div>'
            + '</td>'
        + '</tr>';

        $('#ResualtSearchTask').append(
            tableData
        );
    });

    findEmpNameAndEmpPositionNameByEmpCode(dataEmpCode);
    dataEmpName = [];
    for(var i = 0; i < empFirstNameTask.length; i++){
        if(empFirstNameTask[i] == "" && empLastNameTask[i] == "" && empPositionNameTask[i] == ""){
            dataEmpName[i] = ""
        }else{
            dataEmpName[i] = empFirstNameTask[i] + " " +
            empLastNameTask[i] + " (" + empPositionNameTask[i] + ")";
        }
    }
};

var ddlData;
var dataTypeTaskCode = [];
function DDLData() {
    ddlData = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/typetasks/findAllTypeTask',
        data : {},
        complete: function(xhr){

        },
        async: false
    });

    dataTypeTaskCode = [];
    ddlData = ddlData.responseJSON;
    $('#ddlTypeTask').empty();
    $('#ddlTypeTask').append("<option></option>");
    ddlData.forEach(function(value){
        dataTypeTaskCode.push(value.typeTaskCode);
        var text = value.typeTaskName;
        $('#ddlTypeTask').append("<option value=" + value.typeTaskCode + ">" + text + "</option>");
    });
}

var TaskID;
var checkTaskName;
var checkTaskCost;
var checkTypeTask;
var checkEmpName;
var checkdateStart;
var checkdateEnd;
var checkProgress;
var checkFileName;
var checkDescription;

function openEditTask(element){
    var id = element.parent().parent().attr("id").split('k')[1];

    chkAETask = 1;
    DDLData();

    $(".modal-title").text(Label.LABEL_EDIT_TASK);
    $('#txtTaskCode').val(null).popover('hide').attr('disabled', false);
    $('#txtTaskName').val(null).popover('hide');
    $('#txtTaskCost').val(null).popover('hide');
    $('#ddlTypeTask').popover('hide');
    $('#txtEmpName').val(null);
    $('#dateStartProject').val(null).popover('hide').change();
    $('#dateEndProject').val(null).popover('hide').change();

    $('#txtProgress').val(null);
    document.getElementById("myInput").value = "";
    $('#fileName').text("");
    $('#txtaDescription').val("");
    $('#btnModalTaskNext').hide();

    TaskID = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdCodeTask").attr("taskId");

    $('#txtTaskCode').val(element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdCodeTask").text()).attr('disabled', true);

    $('#txtBalancTaskCost').val($('#lblModuleCostBalance').text().split(' ')[0]);

    checkTaskName = checkTaskName = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdNameTask").text();
    $('#txtTaskName').val(checkTaskName).text();

    checkTaskCost = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdCostTask").text().split(' ')[0];
    $('#txtTaskCost').val(checkTaskCost).text().split(' ')[0];

    checkTypeTask = dataTypeTask[id - 1];
    document.getElementById("ddlTypeTask").value = checkTypeTask;

    if(dataEmpName[id - 1] != ""){
        var empName = dataEmpName[id - 1].split(" ");
        checkEmpName = dataEmpCode[id - 1] + " : " + empName[0] + " " + empName[1];   
    }else{ checkEmpName = dataEmpName[id - 1]; }
    
    $('#txtEmpName').val(checkEmpName);
    $("#txtEmpName").data("dataCode", dataEmpCode[id - 1]);

    checkdateStart = dataDateStart[id - 1];
    $('#dateStartProject').val(checkdateStart);
    DateUtil.setMinDate('dateStartProject', 'dateEndProject');

    checkdateEnd = dataDateEnd[id - 1];
    $('#dateEndProject').val(checkdateEnd);
    DateUtil.setMaxDate('dateEndProject', 'dateStartProject');

    checkProgress = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdProgressTask").text().split('%')[0];
    $('#txtProgress').val(checkProgress);

    checkFileName = dataFileName[id - 1];
    if((checkFileName).indexOf('.') > 20){
        $('#fileName').text((checkFileName).substring(0, 20) + "...").attr("title" , checkFileName);
    }else{
        $('#fileName').text(checkFileName).attr("title" , checkFileName);
    }

    checkDescription = dataDetail[id - 1];
    $('#txtaDescription').val(checkDescription);
}

var taskCode;
var fileNameDownload;

function onClickTrTask(object){
    var id = object.parentElement.id.split('k')[1];
    $('#lblEmpName').text(dataEmpName[id - 1] == "" ? "-" : dataEmpName[id - 1]);
    $('#lblTaskName').text(dataTypeTaskName[id - 1]);
    $('#lblSDate').text(dataDateStart[id - 1] == "" ? "-" : dataDateStart[id - 1]);
    $('#lblEDate').text(dataDateEnd[id - 1] == "" ? "-" : dataDateEnd[id - 1]);

    if((dataFileName[id - 1]).indexOf('.') > 20){
        $('#lblFileName').text((dataFileName[id - 1]).substring(0, 20) + "...").attr('title' , dataFileName[id - 1]);
    }else{
        $('#lblFileName').text(dataFileName[id - 1]).attr("title" , dataFileName[id - 1]);
    }

    $('#txtaDetail').val(dataDetail[id - 1]);

    taskCode = object.attributes.taskCode.textContent;

    var lengthTr = $('#TableTask').find('tr').length;
    for (var i = 1; i < lengthTr; i++) {
        $('#trTask' + i).css('background-color', '#FFF');
    }

    $(object.parentElement).css('background-color', '#F5F5F5');
}

$('#btnAddTask').click(function() {
    chkAETask = 0;
    $(".modal-title").text(Label.LABEL_ADD_TASK);
    $('#btnModalTaskNext').show();
    DDLData();
    $('#txtTaskCode').val(null).popover('hide').attr('disabled', false);
    $('#txtTaskName').val(null).popover('hide');
    $('#txtTaskCost').val(null).popover('hide');
    $('#txtBalancTaskCost').val($('#lblModuleCostBalance').text().split(' ')[0]);
    $('#txtEmpName').val(null);
    $('#dateStartProject').val(null).popover('hide').change();
    $('#dateEndProject').val(null).popover('hide').change();
    DateUtil.setMinDate('dateStartProject', 'dateEndProject');
    DateUtil.setMaxDate('dateEndProject', 'dateStartProject');
    $('#txtProgress').val("0");
    $('#txtaDescription').val("");
});

var chkAETask = 0;

// function checkTaskCode() {
//     var elem = document.getElementById('txtTaskCode').value;
//     if(!elem.match(/^([a-z0-9\_])+$/i)){
//         $('#txtTaskCode').attr("data-content" , Message.MSG_PLEASE_ENTER_THE_TASK_CODE_AS_a_TO_z_OR_A_TO_Z_OR_0_TO_9).popover('show');
//         return false;
//     }else{
//         return true;
//     }
// };

var index;
function myFunction() {
    index = (document.getElementById("ddlTypeTask").selectedIndex) - 1;
}

function checkDateBeforeSaveData(dateEndTask, dateEndModule) {
    var dateTask = dateEndTask.split('/');
    var dateModule = dateEndModule.split('/');

    var ddTask = dateTask[0];
    var mmTask = dateTask[1];
    var yyyyTask =  dateTask[2];

    var ddModule = dateModule[0];
    var mmModule = dateModule[1];
    var yyyyModule =  dateModule[2];

    if(yyyyTask > yyyyModule){
        return false;
    }else if(yyyyTask == yyyyModule){
        if(mmTask > mmModule){
            return false;
        }else if(mmTask == mmModule){
            if(ddTask > ddModule){
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    }else{
        return true;
    }
}

function convertDate(date){
    var splitDate = date.split('/');
    return splitDate[0] + "-" + splitDate[1] + "-" + splitDate[2];
}

function saveDataToDataBase(id) {
    var dateStart = $('#dateStartProject').val() == "" ? null : convertDate(parseFormatDateToString($('#dateStartProject').val(), commonData.language));
    var dateEnd = $('#dateEndProject').val() == "" ? null : convertDate(parseFormatDateToString($('#dateEndProject').val(), commonData.language));
    if(chkAETask == 0){
        if(checkDataTask() == 0){
            if(parseInt($('#txtTaskCost').val()) > parseInt($("#lblModuleCostBalance").text())){
                bootbox.alert(Message.MSG_TOTAL_COST_OVER_BALANCE_TOTAL_COST);
            }else{
                if(fileSize <= 104857600){
                    var formData = new FormData();
                    formData.append("myInput", myInput.files[0]);
                    var empName = $('#txtEmpName').val() == "" ? null : $("#txtEmpName").data("dataCode")
                    var description = $('#txtaDescription').val() == "" ? null : $('#txtaDescription').val()
                    $.ajax({
                        type: "POST",
                        headers: {
                            Accept: 'application/json',
                        },
                        contentType: "application/json; charset=UTF-8",
                        dataType: "json",
                        url: contextPath + '/tasks/saveTask/' + $('#txtTaskCode').val() + 
                                                          '/' + $('#txtTaskName').val() +
                                                          '/' + $('#txtTaskCost').val() +
                                                          '/' + dataTypeTaskCode[index] +
                                                          '/' + empName +
                                                          '/' + dateStart +
                                                          '/' + dateEnd +
                                                          '/' + fileName +
                                                          '/' + description +
                                                          '/' + $('#txtProgress').val() +
                                                          '/' + programID,
                        processData: false,
                        contentType: false,
                        data: formData,
                        complete: function(xhr){
                            if(xhr.status == 201){
                                if(id == 'Add'){
                                    bootbox.alert(Message.MSG_SAVE_SUCCESS);
                                    $('#modalTask').modal('hide');
                                }
                                $('#txtTaskCode').val(null);
                                $('#txtTaskName').val(null);
                                $('#txtTaskCost').val(null);
                                $('#txtEmpName').val(null);
                                $('#dateStartProject').val(null);
                                $('#dateEndProject').val(null);
                                $("#dateStartProject").change();
                                $("#dateEndProject").change();
                                document.getElementById("myInput").value = "";
                                $('#fileName').text("");
                                $('#txtaDescription').val("");
                                DDLData();

                                var pageNumber = $("#paggingSimpleProgramCurrentPage").val();
                                searchDataProgram();
                                pagginationProgram.loadPage(pageNumber, pagginationProgram);

                                var pageNumber = $("#paggingSimpleTaskCurrentPage").val();
                                searchDataTask();
                                pagginationTask.loadPage(pageNumber, pagginationTask);

                                $('#trProgram' + trProgramNum).css('background-color', '#F5F5F5');
                                $("#lblModuleCostBalance").text(searchTaskCost($("#lblModuleCost").text()) + " " + Label.LABEL_POINT);
                            }else if(xhr.status == 500){
                                bootbox.alert(Message.MSG_SAVE_FAILED);
                            }
                        },
                        async: false
                    });
                }else{
                    bootbox.alert(Message.MSG_YOU_SELECT_A_FILE_SIZE_OVER_LIMIT);
                }
            }
        }else{
            bootbox.alert(Message.MSG_PLEASE_ENTER_A_NEW_TASK_CODE);
        }
    }else if(chkAETask == 1){
        if($('#txtTaskName').val() == checkTaskName &&
            $('#txtTaskCost').val() == checkTaskCost &&
            dataTypeTaskCode[index] == checkTypeTask &&
            $('#txtEmpName').val() == checkEmpName &&
            $('#dateStartProject').val() == checkdateStart &&
            $('#dateEndProject').val() == checkdateEnd &&
            $('#txtProgress').val() == checkProgress &&
            $('#fileName').attr('title') == checkFileName &&
            $('#txtaDescription').val() == checkDescription){
            bootbox.alert(Message.MSG_NO_INFORMATION_CHANGED);
        }else{
            if(parseInt($('#txtTaskCost').val()) > parseInt($("#lblModuleCostBalance").text())){
                bootbox.alert(Message.MSG_TOTAL_COST_OVER_BALANCE_TOTAL_COST);
            }else{
                if(fileSize <= 104857600){
                    var formData = new FormData();
                    formData.append("myInput", myInput.files[0]);
                    var empName = $('#txtEmpName').val() == "" ? null : $("#txtEmpName").data("dataCode")
                    var description = $('#txtaDescription').val() == "" ? null : $('#txtaDescription').val()
                    $.ajax({
                        type: "POST",
                        headers: {
                            Accept: 'application/json',
                        },
                        contentType: "application/json; charset=UTF-8",
                        dataType: "json",
                        url: contextPath + '/tasks/findEditTask/' + TaskID +
                                                              '/' + $('#txtTaskCode').val() +
                                                              '/' + $('#txtTaskName').val() +
                                                              '/' + $('#txtTaskCost').val() +
                                                              '/' + dataTypeTaskCode[index] +
                                                              '/' + empName +
                                                              '/' + dateStart +
                                                              '/' + dateEnd +
                                                              '/' + fileName +
                                                              '/' + description +
                                                              '/' + $('#txtProgress').val() +
                                                              '/' + programID,
                        processData: false,
                        contentType: false,
                        data: formData,
                        complete: function(xhr){
                            if(xhr.status == 200){
                                bootbox.alert(Message.MSG_EDIT_SUCCESSFULLY);
                                $('#modalTask').modal('hide');
                                $('#txtTaskCode').val(null);
                                $('#txtTaskName').val(null);
                                $('#txtTaskCost').val(null);
                                $('#txtEmpName').val(null);
                                $('#dateStartProject').val(null);
                                $('#dateEndProject').val(null);
                                document.getElementById("myInput").value = "";
                                $('#fileName').text("");
                                $('#txtaDescription').val("");

                                var pageNumber = $("#paggingSimpleTaskCurrentPage").val();
                                pagginationTask.loadPage(pageNumber, pagginationTask);

                                $("#lblModuleCostBalance").text(searchTaskCost($("#lblModuleCost").text()) + " " + Label.LABEL_POINT);
                            }else if(xhr.status == 500){
                                bootbox.alert(Message.MSG_EDIT_UNSUCCESSFUL);
                            }
                        },
                        async: false
                    });
                }else{
                    bootbox.alert(Message.MSG_YOU_SELECT_A_FILE_SIZE_OVER_LIMIT);
                }
            }
        }
    }
}

$('[id^=btnModalTask]').click(function() {
    var id = this.id.split('k')[1];
    myFunction();
    if(id === 'Cancel'){
        if(chkAETask == 1){
            if($('#txtTaskName').val() == checkTaskName &&
                $('#txtTaskCost').val() == checkTaskCost &&
                dataTypeTaskCode[index] == checkTypeTask &&
                $('#txtEmpName').val() == checkEmpName &&
                $('#dateStartProject').val() == checkdateStart &&
                $('#dateEndProject').val() == checkdateEnd &&
                $('#txtProgress').val() == checkProgress &&
                $('#fileName').attr('title') == checkFileName &&
                $('#txtaDescription').val() == checkDescription){
                $('#modalTask').modal('hide');
                $('#txtTaskCode').popover('hide'); $('#txtTaskCode').val(null);
                $('#txtTaskName').popover('hide'); $('#txtTaskName').val(null);
                $('#txtTaskCost').popover('hide'); $('#txtTaskCost').val(null);
                $('#ddlTypeTask').popover('hide');
                $('#txtEmpName').val(null);
                $('#dateStartProject').val(null);
                $('#dateEndProject').val(null);
                document.getElementById("myInput").value = "";
                $('#fileName').text("");
                $('#txtaDescription').val("");
            }else{
                bootbox.confirm(Message.MSG_WANT_TO_CANCEL_EDITING_THE_DATA_HAS_CHANGED_OR_NOT, function(result) {
                    if(result == true){
                        $('#modalTask').modal('hide');
                        $('#txtTaskCode').popover('hide'); $('#txtTaskCode').val(null);
                        $('#txtTaskName').popover('hide'); $('#txtTaskName').val(null);
                        $('#txtTaskCost').popover('hide'); $('#txtTaskCost').val(null);
                        $('#ddlTypeTask').popover('hide');
                        $('#txtEmpName').val(null);
                        $('#dateStartProject').val(null);
                        $('#dateEndProject').val(null);
                        document.getElementById("myInput").value = "";
                        $('#fileName').text("");
                        $('#txtaDescription').val("");
                    }
                });
            }
        }else{
            $('#modalTask').modal('hide');
            $('#txtTaskCode').popover('hide'); $('#txtTaskCode').val(null);
            $('#txtTaskName').popover('hide'); $('#txtTaskName').val(null);
            $('#txtTaskCost').popover('hide'); $('#txtTaskCost').val(null);
            $('#ddlTypeTask').popover('hide');
            $('#txtEmpName').val(null);
            $('#dateStartProject').val(null);
            $('#dateEndProject').val(null);
            document.getElementById("myInput").value = "";
            $('#fileName').text("");
            $('#txtaDescription').val("");
        }
    }else{
        if($('#txtTaskCode').val() == ""){
            $('#txtTaskCode').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
        }else if($('#txtTaskName').val() == ""){
            $('#txtTaskName').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
        }else if($('#txtTaskCost').val() == ""){
            $('#txtTaskCost').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
        }else if($('#ddlTypeTask').val() == ""){
            $('#ddlTypeTask').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
        }else{
            if($.isNumeric($('#txtTaskCost').val())){
                if(parseInt($('#txtTaskCost').val()) >= 0){
                    if(($('#txtTaskCost').val().length - 1) - $('#txtTaskCost').val().indexOf('.') > 4){
                        $('#txtTaskCost').attr("data-content" , Message.MSG_PLEASE_ENTER_NO_MORE_THAN_FOUR_DECIMAL_NUMBERS).popover('show');
                    }else{
                        if($.isNumeric($('#txtProgress').val()) &&
                            $('#txtProgress').val().indexOf('.') < 0 &&
                            parseInt($('#txtProgress').val()) >= 0 &&
                            parseInt($('#txtProgress').val()) <= 100){
                            if(checkDateBeforeSaveData($('#dateEndProject').val(), $('#lblModuleDateEnd').text())){
                                saveDataToDataBase(id);
                            }else{
                                bootbox.confirm(Message.MSG_YOU_WANT_TO_SAVE_DATA, function(result) {
                                    if(result == true){ saveDataToDataBase(id); }
                                });
                            }
                        }else{
                            $('#txtProgress').attr("data-content" , Message.MSG_PLEASE_ENTER_THE_PROGRESS_BETWEEN_0_TO_100).popover('show');
                        }
                    }
                }else{
                    $('#txtTaskCost').attr("data-content" , Message.MSG_PLEASE_ENTER_A_ONLY_POSITIVE_INTEGER_NUMBERS).popover('show');
                }
            }else{
                $('#txtTaskCost').attr("data-content" , Message.MSG_PLEASE_ENTER_ONLY_NUMBERS).popover('show');
            }
        }
    }
});

function checkDataTask() {
    var checkdDb = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/tasks/findSizeTaskByTaskCode',
        data : {
            taskCode: $('#txtTaskCode').val(),
            id: programID
        },
        complete: function(xhr){
        },
        async: false
    });

    return checkdDb.responseJSON;
}

var chkDTaskStatus200 = 0;
var chkDTaskStatus500 = 0;

function deleteDataTask() {
    $.each($(".checkboxTableTask:checked"),function(index,value){
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url: contextPath + '/tasks/findDeleteTask',
            data : {
                id: programID,
                taskID: $(this).attr("id"),
                taskCode: $(this).attr("taskCode")
            },
            complete: function(xhr){
                if(xhr.status === 200)
                    chkDTaskStatus200++;
                if(xhr.status === 500)
                    chkDTaskStatus500++;
            },
            async: false
        });
    });
}

$('#btnDeleteTask').click(function() {
    if($(".checkboxTableTask:checked").length <= 0){
        bootbox.alert(Message.MSG_PLEASE_SELECT_THE_DATA_TO_BE_DELETED);
        return false;
    }else{
        bootbox.confirm(Message.MSG_DO_YOU_WANT_TO_REMOVE_THE_SELECTED_ITEMS, function(result) {
            if(result == true){
                deleteDataTask();

                dataTaskCode = [];
                dataTypeTask = [];
                dataTypeTaskName = [];
                dataEmpCode = [];
                dataDateStart = [];
                dataDateEnd = [];
                dataFileName = [];
                dataDetail = [];

                var pageNumber = $("#paggingSimpleTaskCurrentPage").val();
                searchDataTask();
                pagginationTask.loadPage(pageNumber, pagginationTask);

                var pageNumber = $("#paggingSimpleProgramCurrentPage").val();
                searchDataProgram();
                pagginationProgram.loadPage(pageNumber, pagginationProgram);

                $('#trProgram' + trProgramNum).css('background-color', '#F5F5F5');
                $('#checkboxAllTask').prop('checked', false);

                if(chkDTaskStatus500 === 0){
                    bootbox.alert(Message.MSG_DELETE_SUCCESS + " " + chkDTaskStatus200 + " " + Message.MSG_LIST);
                }else{
                    bootbox.alert(Message.MSG_DELETE_SUCCESS + " " + chkDTaskStatus200 + " " + Message.MSG_LIST + " " + Message.MSG_DELETE_FAILED + " " + chkDTaskStatus500 + " " + Message.MSG_LIST);
                }

                chkDTaskStatus200 = 0;
                chkDTaskStatus500 = 0;

                $("#lblModuleCostBalance").text(searchTaskCost($("#lblModuleCost").text()) + " " + Label.LABEL_POINT);
            }
        });
    }
});

$('#checkboxAllTask').click(function(){
    if($(".checkboxTableTask[inUse=0]").length == 0){
        bootbox.alert(Message.MSG_DATA_ALL_IN_USED);
        $(this).prop("checked", false);
    }
    $(".checkboxTableTask").prop('checked', $(this).prop('checked'));
    $.each($(".checkboxTableTask[inUse=1]"),function(index, value){
        $(this).prop("checked", false);
    });
});

$('#TableTask').on("click", ".checkboxTableTask", function () {
    if($(this).attr("inUse") > 0){
        $(this).prop("checked", false);
        bootbox.alert(Message.MSG_DATA_IS_USE);
    }
    if($(".checkboxTableTask:checked").length == $(".checkboxTableTask[inUse=0]").length && $(".checkboxTableTask[inUse=0]").length != 0){
        $("#checkboxAllTask").prop("checked", true);
    }else{
        $("#checkboxAllTask").prop("checked", false);
    }
});

function checkNullData(value) {
    if(FormUtil.isEmpty(value) || value == 'null'){
        return "";
    }else{
        return value;
    }
}

$('#btnDownloadFile').click(function() {
    if(checkNullData($('#lblFileName').attr('title')) == ""){
        bootbox.alert(Message.MSG_FILE_NOT_FOUND);
    }else{
        window.location.href = contextPath + '/tasks/downloadFile/' + programID + 
                                                                '/' + taskCode +
                                                                '/' + $('#lblFileName').attr('title') + '/';
    }
});