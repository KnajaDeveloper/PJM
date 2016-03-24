var pagginationTask = $.extend({},UtilPaggination);
var _language = commonData.language;
var dateLang = checkLanguageDatePicker(_language);
var programID;
var trProgramNum;

$(document).ready(function () {
    $("#dateStartProject").datepicker(dateLang);
    $("#dateEndProject").datepicker(dateLang);

    $("#dateStartProject").on('change', function () {
        DateUtil.setMinDate('dateStartProject', 'dateEndProject');
        checkDateFormat($(this), Message.MSG_DATE_INCOLLECT,  Message.MSG_PLEASE_COMPLETE_THIS_FIEID);
    });
    
    $("#dateEndProject").on('change', function () {
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
var dataDateStart = [];
var dataDateEnd = [];
var dataFileName = [];
var dataDetail = [];

pagginationTask.setEventPaggingBtn("paggingSimpleTask",pagginationTask);
pagginationTask.loadTable = function loadTable (jsonData) {

    $('#formADTask').show();
    $('#formTask').show();

    if(jsonData.length <= 0){
       bootbox.alert(Message.MSG_DATA_NOT_FOUND);
       $('#lblEmpName').text("");
        $('#lblTaskName').text("");
        $('#lblSDate').text("");
        $('#lblEDate').text("");
        $('#lblFileName').text("");
        $('#txtaDetail').val(null);
    }

    $('#ResualtSearchTask').empty();

    var link = "";
    var i = 1;
    var tableData = "";

    dataTypeTask = [];
    dataEmpCode = [];
    dataDateStart = [];
    dataDateEnd = [];
    dataFileName = [];
    dataDetail = [];

    jsonData.forEach(function(value){
        dataTypeTask.push(value.typeTask.typeTaskCode);
        dataTypeTaskName.push(value.typeTask.typeTaskName);
        dataEmpCode.push(value.empCode);

        if(DateUtil.dataDateToFrontend(value.dateStart, commonData.language) == "01/01/1970")
            dataDateStart.push("");
        else
            dataDateStart.push(DateUtil.dataDateToFrontend(value.dateStart, commonData.language));

        if(DateUtil.dataDateToFrontend(value.dateEnd, commonData.language) == "01/01/1970")
            dataDateEnd.push("");
        else
            dataDateEnd.push(DateUtil.dataDateToFrontend(value.dateEnd, commonData.language));

        dataFileName.push(value.fileName);
        dataDetail.push(value.detail);

        var colorProgress =  value.progress == "100" ? "progress-bar-success" : "progress-bar-warning";

        tableData = ''
        + '<tr id="trTask' + i++ + '" style="background-color: #fff">'
            + '<td class="text-center">'
                + '<input id="' + value.id + '" class="checkboxTableTask" type="checkbox" name="chkdelete" />'
            + '</td>'
            + '<td class="text-center">'
                + '<button onclick="openEditTask($(this))" type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#modalTask" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdCodeTask" taskId="' + value.id + '" class="text-center" onclick="onClickTrTask(this)">' + value.taskCode + '</td>'
            + '<td id="tdNameTask" class="text-center" onclick="onClickTrTask(this)">' + value.taskName + '</td>'
            + '<td id="tdCostTask" class="text-center" onclick="onClickTrTask(this)">' + value.taskCost + ' Point</td>'
            + '<td id="tdProgressTask" onclick="onClickTrTask(this)">'
                + '<div class="progress-bar ' + colorProgress + '" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"'
                + 'style="width: ' + value.progress + '%;">' + value.progress + '%</div>'
            + '</td>'
        + '</tr>';

        $('#ResualtSearchTask').append(
            tableData
        );
    });
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
    $('#txtTaskCode').popover('hide'); $('#txtTaskCode').val(null).attr('disabled', false);
    $('#txtTaskName').popover('hide'); $('#txtTaskName').val(null);
    $('#txtTaskCost').popover('hide'); $('#txtTaskCost').val(null);
    $('#ddlTypeTask').popover('hide');
    $('#txtEmpName').val(null);
    $('#dateStartProject').val(null).popover('hide');;
    $('#dateEndProject').val(null).popover('hide');;
    $("#dateStartProject").change();
    $("#dateEndProject").change();

    $('#txtProgress').val(null).attr('disabled', true);
    document.getElementById("myInput").value = "";
    $('#fileName').text("");
    $('#txtaDescription').val("");
    $('#btnModalTaskNext').hide();

    TaskID = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdCodeTask").attr("taskId");

    $('#txtTaskCode').val(element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdCodeTask").text()).attr('disabled', true);

    checkTaskName = checkTaskName = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdNameTask").text();
    $('#txtTaskName').val(checkTaskName).text();

    checkTaskCost = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdCostTask").text().split(' ')[0];
    $('#txtTaskCost').val(checkTaskCost).text().split(' ')[0];

    checkTypeTask = dataTypeTask[id - 1];
    document.getElementById("ddlTypeTask").value = checkTypeTask;

    checkEmpName = dataEmpCode[id - 1];
    $('#txtEmpName').val(checkEmpName);

    checkdateStart = dataDateStart[id - 1];
    $('#dateStartProject').val(checkdateStart);
    DateUtil.setMinDate('dateStartProject', 'dateEndProject');

    checkdateEnd = dataDateEnd[id - 1];
    $('#dateEndProject').val(checkdateEnd);
    DateUtil.setMaxDate('dateEndProject', 'dateStartProject');

    checkProgress = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdProgressTask").text().split('%')[0];
    $('#txtProgress').val(checkProgress).attr('disabled', false);

    checkFileName = dataFileName[id - 1];
    $('#fileName').text(checkFileName)

    checkDescription = dataDetail[id - 1];
    $('#txtaDescription').val(checkDescription);
}

function onClickTrTask(object){
    var id = object.parentElement.id.split('k')[1];
    $('#lblEmpName').text(dataEmpCode[id - 1]);
    $('#lblTaskName').text(dataTypeTaskName[id - 1]);
    $('#lblSDate').text(dataDateStart[id - 1]);
    $('#lblEDate').text(dataDateEnd[id - 1]);
    $('#lblFileName').text(dataFileName[id - 1]);
    $('#txtaDetail').val(dataDetail[id - 1]);

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
    $('#txtTaskCode').attr('disabled', false);
    $('#txtProgress').attr('disabled', true);
    $('#txtTaskCode').val(null);
    $('#txtTaskName').val(null);
    $('#txtTaskCost').val(null);
    $('#txtEmpName').val(null);
    $('#dateStartProject').val(null).popover('hide');;
    $('#dateEndProject').val(null).popover('hide');;
    $("#dateStartProject").change();
    $("#dateEndProject").change();
    $('#txtProgress').val("0");
    $('#txtaDescription').val("");
});

var chkAETask = 0;

function checkTaskCode() {
    var elem = document.getElementById('txtTaskCode').value;
    if(!elem.match(/^([a-z0-9\_])+$/i)){
        $('#txtTaskCode').attr("data-content" , Message.MSG_PLEASE_ENTER_THE_TASK_CODE_AS_a_TO_z_OR_A_TO_Z_OR_0_TO_9).popover('show');
        return false;
    }else{
        return true;
    }
};

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

function saveDateToDataBase(id) {
    var dateStart = $('#dateStartProject').val() == "" ? null : dataDateToDataBase($('#dateStartProject').val(), commonData.language);
    var dateEnd = $('#dateEndProject').val() == "" ? null : dataDateToDataBase($('#dateEndProject').val(), commonData.language);
    if(chkAETask == 0){
        if(checkDataTask() == 0){
            if(parseInt($('#txtTaskCost').val()) > parseInt($("#lblModuleCostBalance").text())){
                bootbox.alert(Message.MSG_COMPLETE_THIS_FIEID_OVER_BALANCE_TOTAL_COST);
            }else{
                $.ajax({
                    headers: {
                        Accept: "application/json"
                    },
                    type: "POST",
                    url: contextPath + '/tasks/saveTask',
                    data : {
                        taskCode: $('#txtTaskCode').val(),
                        taskName: $('#txtTaskName').val(),
                        taskCost: parseInt($('#txtTaskCost').val()),
                        typeTask: dataTypeTaskCode[index],
                        empCode: $('#txtEmpName').val(),
                        dateStart: new Date(dateStart),
                        dateEnd: new Date(dateEnd),
                        fileName: $('#fileName').text(),
                        detail: $('#txtaDescription').val(),
                        progress: $('#txtProgress').val(),
                        id: programID
                    },
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
                            document.getElementById("myInput").value = "";
                            $('#fileName').text("");
                            $('#txtaDescription').val("");
                            DDLData();
                            searchDataTask();
                            searchDataProgram();
                            $('#trProgram' + trProgramNum).css('background-color', '#F5F5F5');
                            $("#lblModuleCostBalance").text(searchTaskCost($("#lblModuleCost").text()));
                        }else if(xhr.status == 500){
                            bootbox.alert(Message.MSG_EDIT_UNSUCCESSFUL);
                        }
                    },
                    async: false
                });
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
            $('#fileName').text() == checkFileName &&
            $('#txtaDescription').val() == checkDescription){
            bootbox.alert(Message.MSG_NO_INFORMATION_CHANGED);
        }else{
            $.ajax({
                headers: {
                    Accept: "application/json"
                },
                type: "GET",
                url: contextPath + '/tasks/findEditTask',
                data : {
                    id: TaskID,
                    taskCode: $('#txtTaskCode').val(),
                    taskName: $('#txtTaskName').val(),
                    taskCost: parseInt($('#txtTaskCost').val()),
                    typeTask: dataTypeTaskCode[index],
                    empCode: $('#txtEmpName').val(),
                    dateStart: new Date(dateStart),
                    dateEnd: new Date(dateEnd),
                    fileName: $('#fileName').text(),
                    detail: $('#txtaDescription').val(),
                    progress: $('#txtProgress').val()
                },
                complete: function(xhr){
                    if(xhr.status === 200){
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
                        searchDataTask();
                        $("#lblModuleCostBalance").text(searchTaskCost($("#lblModuleCost").text()));
                    }else if(xhr.status === 500){
                        bootbox.alert(Message.MSG_EDIT_UNSUCCESSFUL);
                    }
                },
                async: false
            });
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
                $('#fileName').text() == checkFileName &&
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
        }
    }else{
        if($('#txtTaskCode').val() == ""){
            $('#txtTaskCode').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
        }else if($('#txtTaskName').val() == ""){
            if(checkTaskCode() == true){
                $('#txtTaskName').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
            }
        }else if($('#txtTaskCost').val() == ""){
            if(checkTaskCode() == true){
                $('#txtTaskCost').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
            }
        }else if($('#ddlTypeTask').val() == ""){
            if(checkTaskCode() == true){
                $('#ddlTypeTask').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
            }
        }else{
            if(checkTaskCode() == true){
                if($.isNumeric($('#txtTaskCost').val()) && $('#txtTaskCost').val().indexOf('.') < 0){
                    if($.isNumeric($('#txtProgress').val()) &&
                        $('#txtProgress').val().indexOf('.') < 0 &&
                        parseInt($('#txtProgress').val()) >= 0 &&
                        parseInt($('#txtProgress').val()) <= 100){
                        if(checkDateBeforeSaveData($('#dateEndProject').val(), $('#lblModuleDateEnd').text())){
                            saveDateToDataBase(id);
                        }else{
                            bootbox.confirm(Message.MSG_YOU_WANT_TO_SAVE_DATA, function(result) {
                                if(result == true){
                                    saveDateToDataBase(id);
                                }
                            });
                        }
                    }else{
                        bootbox.alert(Message.MSG_PLEASE_ENTER_THE_PROGRESS_BETWEEN_0_TO_100);
                    }
                }else{
                    bootbox.alert(Message.MSG_PLEASE_ENTER_ONLY_NUMBERS);
                }
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
                taskID: $(this).attr("id")
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
                searchDataTask();
                searchDataProgram();

                dataTaskCode = [];
                dataTypeTask = [];
                dataTypeTaskName = [];
                dataEmpCode = [];
                dataDateStart = [];
                dataDateEnd = [];
                dataFileName = [];
                dataDetail = [];

                $('#trProgram' + trProgramNum).css('background-color', '#F5F5F5');
                $('#checkboxAllTask').prop('checked', false);

                if(chkDTaskStatus500 === 0){
                    bootbox.alert(Message.MSG_DELETE_SUCCESS + " " + chkDTaskStatus200 + " " + Message.MSG_LIST);
                }else{
                    bootbox.alert(Message.MSG_DELETE_SUCCESS + " " + chkDTaskStatus200 + " " + Message.MSG_LIST + " " + Message.MSG_DELETE_FAILED + " " + chkDTaskStatus500 + " " + Message.MSG_LIST);
                }

                chkDTaskStatus200 = 0;
                chkDTaskStatus500 = 0;

                $("#lblModuleCostBalance").text(searchTaskCost($("#lblModuleCost").text()));
            }
        });
    }
});

$('#checkboxAllTask').click(function(){
    $(".checkboxTableTask").prop('checked', $(this).prop('checked'));
});

$('#TableTask').on("click", ".checkboxTableTask", function () {
    if($(".checkboxTableTask:checked").length == $(".checkboxTableTask").length){
        $("#checkboxAllTask").prop("checked", true);
    }else{
        $("#checkboxAllTask").prop("checked", false);
    }
});