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
var dataTaskImportance = [];
var dataTaskImportanceName = [];
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
    dataTypeTaskName = [];
    dataTaskImportance = [];
    dataTaskImportanceName = [];
    dataEmpCode = [];
    dataDateStart = [];
    dataDateEnd = [];
    dataFileName = [];
    dataDetail = [];

    check = true;

    jsonData.forEach(function(value){
        dataTypeTask.push(value.typeTaskCode);
        dataTypeTaskName.push(value.typeTaskName);
        dataTaskImportance.push(value.TaskImportanceCode);
        dataTaskImportanceName.push(value.TaskImportanceName);
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
                + '<button onclick="openEditTask($(this), ' + value.version + ')" type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#modalTask" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdCodeTask" taskCode="' + value.taskCode + '" taskId="' + value.id + '" class="text-center" onclick="onClickTrTask(this)">' + value.taskCode + '</td>'
            + '<td id="tdNameTask" taskCode="' + value.taskCode + '" taskId="' + value.id + '" class="" onclick="onClickTrTask(this)">' + value.taskName + '</td>'
            + '<td id="tdCostTask" taskCode="' + value.taskCode + '" taskId="' + value.id + '" class="text-center" onclick="onClickTrTask(this)">' + value.taskCost + ' ' + Label.LABEL_POINT + '</td>'
            + '<td id="tdProgressTask" taskCode="' + value.taskCode + '" taskId="' + value.id + '" onclick="onClickTrTask(this)">'
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
        if(empFirstNameTask[i] == "" && empLastNameTask[i] == ""  && empNickNameTask[i] == "" && empPositionNameTask[i] == ""){
            dataEmpName[i] = "";
        }else{
            dataEmpName[i] = empFirstNameTask[i] + " " +
            empLastNameTask[i] + " (" + empPositionNameTask[i] + ")";
        }
    }
};

var dataTypeTaskCode = [];
function DDLDataTypeTask() {
    var ddlDataTypeTask = $.ajax({
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
    ddlDataTypeTask = ddlDataTypeTask.responseJSON;
    $('#ddlTypeTask').empty();
    $('#ddlTypeTask').append("<option></option>");
    ddlDataTypeTask.forEach(function(value){
        dataTypeTaskCode.push(value.typeTaskCode);
        $('#ddlTypeTask').append("<option value=" + value.typeTaskCode + ">" + value.typeTaskName + "</option>");
    });
}

var dataTaskImportanceCode = [];
function DDLDataTaskImportance() {
    var ddlDataTaskImportance = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/importancetasks/findAllTaskImportance',
        data : {},
        complete: function(xhr){

        },
        async: false
    });

    dataTaskImportanceCode = [];
    ddlDataTaskImportance = ddlDataTaskImportance.responseJSON;
    $('#ddlTaskImportance').empty();
    $('#ddlTaskImportance').append("<option></option>");
    ddlDataTaskImportance.forEach(function(value){
        dataTaskImportanceCode.push(value.importanceTaskCode);
        $('#ddlTaskImportance').append("<option value=" + value.importanceTaskCode + ">" + value.importanceTaskName + "</option>");
    });
}

var TaskID;
var checkTaskName;
var checkTaskCost;
var checkTypeTask;
var checkTaskImportance;
var checkEmpName;
var checkdateStart;
var checkdateEnd;
var checkProgress;
var checkFileName;
var checkDescription;
var TaskVersion;

var empCodeTaskFollower = [];
var empFirstNameTaskFollower = [];
var empLastNameTaskFollower = [];
var empNickNameTaskFollower = [];

function findEmpCodeByTaskID(TaskID){
    var valueEmp = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/followertasks/findEmpCodeByTaskID',
        data: {
            taskId : TaskID
        },
        complete: function(xhr){
        },
        async: false
    });

    empCodeTaskFollower = [];
    empFirstNameTaskFollower = [];
    empLastNameTaskFollower = [];
    empNickNameTaskFollower = [];

    valueEmp = valueEmp.responseJSON
    valueEmp.forEach(function(value){
        empCodeTaskFollower.push(value.empCode);
        empFirstNameTaskFollower.push(value.empFirstName);
        empLastNameTaskFollower.push(value.empLastName);
        empNickNameTaskFollower.push(value.empNickName);
    });
}

function openEditTask(element, version){
    var id = element.parent().parent().attr("id").split('k')[1];
    TaskVersion = version;
    chkAETask = 1;
    DDLDataTypeTask();
    DDLDataTaskImportance();

    $(".modal-title").text(Label.LABEL_EDIT_TASK);
    $('#txtTaskCode').val(null).popover('hide').attr('disabled', false);
    $('#txtTaskName').val(null).popover('hide');
    $('#txtTaskCost').val(null).popover('hide');
    $('#ddlTypeTask').popover('hide');
    $('#ddlTaskImportance').popover('hide');
    $('#txtEmpName').val(null);
    $('#dateStartProject').val(null).popover('hide').change();
    $('#dateEndProject').val(null).popover('hide').change();

    $('#txtProgress').val(null);
    $("#myInput").val("");
    $('#fileName').text("");
    $('#txtaDescription').val("");
    $('#btnModalTaskNext').hide();

    var count_Element = $('[id^=btnDeleteEmpNameTaskFollower]').length;
    for(var i = 0; i < count_Element; i++){
        var idBtnDeleteEmpNameTaskFollower = $('[id^=btnDeleteEmpNameTaskFollower]')[0].id;
        btnDeleteEmpNameTaskFollower(idBtnDeleteEmpNameTaskFollower);
    }
    
    $('#txtEmpNameTaskFollower1').val("");

    TaskID = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdCodeTask").attr("taskId");

    $('#txtTaskCode').val(element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdCodeTask").text()).attr('disabled', true);

    $('#txtBalancTaskCost').val($('#lblModuleCostBalance').text().split(' ')[0]);

    checkTaskName = checkTaskName = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdNameTask").text();
    $('#txtTaskName').val(checkTaskName).text();

    checkTaskCost = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdCostTask").text().split(' ')[0];
    $('#txtTaskCost').val(checkTaskCost).text().split(' ')[0];

    checkTypeTask = dataTypeTask[id - 1];
    $('#ddlTypeTask').val(checkTypeTask);

    checkTaskImportance = dataTaskImportance[id - 1];
    $('#ddlTaskImportance').val(checkTaskImportance);

    findEmpCodeByTaskID(TaskID);

    for(var i = 1; i < empCodeTaskFollower.length + 1; i++){
        if(i > 1){
            var html = "" +
            "<div id='container_subModuleMember" + (i) + "'>" +
                "<div class='col-sm-offset-4 col-sm-6' style='margin-top: 10px;'>" +
                    "<div class='input-group'>" +
                        "<input id='txtEmpNameTaskFollower" + (i) + "' class='form-control' type='department-lov' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtEmpNameTaskFollower" + (i) + "' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' autocomplete='off'>" +
                            "<span class='input-group-addon'>"+
                                "<span id='BtnEmpNameTaskFolower" + (i) + "' class='fa fa-search' onclick='UtilLov.lovEmp(this)' target='txtEmpNameTaskFollower" + (i) + "' style='cursor:pointer;'>" +
                                    "<jsp:text/>" +
                                "</span>" +
                            "</span>" +
                        "</input>" +
                    "</div>" +
                "</div>" +
                "<div class='col-sm-2' style='margin-top: 10px;'>" +
                    "<button id='btnDeleteEmpNameTaskFollower" + (i) + "' type='button' class='btn btn-danger' onclick='btnDeleteEmpNameTaskFollower(this.id)' style='margin:0px;'>" + Button.BUTTON_DELETE + "</button>" +
                "</div>" +
            "<div>";
            $("#subTaskFollower").append(html);
        }

        $("#" + $('[id^=txtEmpNameTaskFollower]')[i - 1].id).val(empCodeTaskFollower[i - 1] + " : " + empFirstNameTaskFollower[i - 1] + "  " + empLastNameTaskFollower[i - 1] + "  (" + empNickNameTaskFollower[i - 1] + ")");
        $("#" + $('[id^=txtEmpNameTaskFollower]')[i - 1].id).data("dataCode", empCodeTaskFollower[i - 1]);
    }

    if(dataEmpName[id - 1] != ""){
        var empName = dataEmpName[id - 1].split(" ");
        checkEmpName = dataEmpCode[id - 1] + " : " + empName[0] + "  " + empName[1] + "  (" + empNickNameTask[id - 1] + ")";   
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

var empLastNameTaskShow = [];
var empFirstNameTaskShow = [];
var empPositionNameShow = [];

function findEmpCodeByTaskIDShow(TaskID){
    var valueEmp = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/followertasks/findEmpCodeByTaskID',
        data: {
            taskId : TaskID
        },
        complete: function(xhr){
        },
        async: false
    });

    empFirstNameTaskShow = [];
    empLastNameTaskShow = [];
    empPositionNameShow = [];

    valueEmp = valueEmp.responseJSON
    valueEmp.forEach(function(value){
        empFirstNameTaskShow.push(value.empFirstName);
        empLastNameTaskShow.push(value.empLastName);
        empPositionNameShow.push(value.empPositionName);
    });
}

function onClickTrTask(object){
    var id = object.parentElement.id.split('k')[1];
    findEmpCodeByTaskIDShow(object.attributes.taskId.textContent);
    var TaskFollower = "";
    $('#lblTaskFollower').text("");
    for (var i = 0; i < empFirstNameTaskShow.length; i++) {
        TaskFollower += empFirstNameTaskShow[i]  + " " + empLastNameTaskShow[i]  + " (" +  empPositionNameShow[i] + ")<br/>";
    }

    $('#lblTaskFollower').append(TaskFollower == "" ? "-" : TaskFollower);
    $('#lblEmpName').text(dataEmpName[id - 1] == "" ? "-" : dataEmpName[id - 1]);
    $('#lblTaskName').text(dataTypeTaskName[id - 1]);
    $('#lblTaskImportance').text(dataTaskImportanceName[id - 1]);
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
    DDLDataTypeTask();
    DDLDataTaskImportance();
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

    var count_Element = $('[id^=btnDeleteEmpNameTaskFollower]').length;
    for(var i = 0; i < count_Element; i++){
        var idBtnDeleteEmpNameTaskFollower = $('[id^=btnDeleteEmpNameTaskFollower]')[0].id;
        btnDeleteEmpNameTaskFollower(idBtnDeleteEmpNameTaskFollower);
    }
    
    $('#txtEmpNameTaskFollower1').val("");
});

$('#btnAddLovEmployee').click(function() {
    var count_elements = parseInt($('[id^=txtEmpNameTaskFollower]')[($('[id^=txtEmpNameTaskFollower]').length) - 1].id.split('r')[1]) + 1;
    if($("#" + $('[id^=txtEmpNameTaskFollower]')[($('[id^=txtEmpNameTaskFollower]').length) - 1].id).val() != ""){
        var html = "" +
        "<div id='container_subModuleMember" + count_elements + "'>" +
            "<div class='col-sm-offset-4 col-sm-6' style='margin-top: 10px;'>" +
                "<div class='input-group'>" +
                    "<input id='txtEmpNameTaskFollower" + count_elements + "' class='form-control' type='department-lov' onkeypress='UtilLov.onChangeInputLovEmp(this,event)' onfocus='UtilLov.onFocus(this)' target='txtEmpNameTaskFollower" + count_elements + "' data-toggle='popover' data-content='${dataContent}' data-placement='bottom' autocomplete='off'>" +
                        "<span class='input-group-addon'>"+
                            "<span id='BtnEmpNameTaskFolower" + count_elements + "' class='fa fa-search' onclick='UtilLov.lovEmp(this)' target='txtEmpNameTaskFollower" + count_elements + "' style='cursor:pointer;'>" +
                                "<jsp:text/>" +
                            "</span>" +
                        "</span>" +
                    "</input>" +
                "</div>" +
            "</div>" +
            "<div class='col-sm-2' style='margin-top: 10px;'>" +
                "<button id='btnDeleteEmpNameTaskFollower" + count_elements + "' type='button' class='btn btn-danger' onclick='btnDeleteEmpNameTaskFollower(this.id)' style='margin:0px;'>" + Button.BUTTON_DELETE + "</button>" +
            "</div>" +
        "<div>";
        $("#subTaskFollower").append(html);
        count_elements++;
    }
});

function btnDeleteEmpNameTaskFollower(id) {
    id = id.replace("btnDeleteEmpNameTaskFollower","container_subModuleMember");
    $("#" + id).remove();
}

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

var indexTypeTask;
function myFunctionTypeTask() {
    indexTypeTask = (document.getElementById("ddlTypeTask").selectedIndex) - 1;
}

var indexTaskImportance;
function myFunctionTaskImportance() {
    indexTaskImportance = (document.getElementById("ddlTaskImportance").selectedIndex) - 1;
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

var empCodeFollowerTask = [];

function getEmpCodeTaskFollower(){
    var checkEmpcode = false;
    empCodeFollowerTask = [];
    var count_Element = $('[id^=txtEmpNameTaskFollower]').length;
    for(var i = 0; i < count_Element; i++){
        var id = $('[id^=txtEmpNameTaskFollower]')[i].id;
        if($("#"+id).val().split(' ')[0] == ""){
            empCodeFollowerTask.push("null");
        }else{
            empCodeFollowerTask.push($("#"+id).val().split(' ')[0]);
            for(var j = 0 ; j < empCodeFollowerTask.length - 1; j++){
                if(empCodeFollowerTask[empCodeFollowerTask.length - 1] == empCodeFollowerTask[j]){
                    checkEmpcode = true;
                }
            }
        }
    }

    return checkEmpcode;
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
                    if($('#txtaDescription').val().indexOf('~') == -1 && $('#txtaDescription').val().indexOf('`') == -1){
                        var formData = new FormData();
                        formData.append("myInput", myInput.files[0]);
                        var empName = $('#txtEmpName').val() == "" ? null : $("#txtEmpName").data("dataCode")
                        var description = $('#txtaDescription').val() == "" ? null : $('#txtaDescription').val().replace(/\//g, "~").replace(/\?/g, "`");
                        if(!getEmpCodeTaskFollower()){
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
                                                                  '/' + dataTypeTaskCode[indexTypeTask] +
                                                                  '/' + dataTaskImportanceCode[indexTaskImportance] +
                                                                  '/' + JSON.stringify(empCodeFollowerTask) +
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
                                        $('#myInput').val("");
                                        $('#fileName').text("");
                                        $('#txtaDescription').val("");

                                        var count_Element = $('[id^=btnDeleteEmpNameTaskFollower]').length;
                                        for(var i = 0; i < count_Element; i++){
                                            var idBtnDeleteEmpNameTaskFollower = $('[id^=btnDeleteEmpNameTaskFollower]')[0].id;
                                            btnDeleteEmpNameTaskFollower(idBtnDeleteEmpNameTaskFollower);
                                        }
                                        
                                        $('#txtEmpNameTaskFollower1').val("");

                                        DDLDataTypeTask();
                                        DDLDataTaskImportance();

                                        var pageNumber = $("#paggingSimpleProgramCurrentPage").val();
                                        searchDataProgram();
                                        pagginationProgram.loadPage(pageNumber, pagginationProgram);

                                        var pageNumber = $("#paggingSimpleTaskCurrentPage").val();
                                        searchDataTask();
                                        pagginationTask.loadPage(pageNumber, pagginationTask);

                                        $('#trProgram' + trProgramNum).css('background-color', '#F5F5F5');
                                        $("#lblModuleCostBalance").text(searchTaskCost($("#lblModuleCost").text()) + " " + Label.LABEL_POINT);
                                        $("#txtBalancTaskCost").val($("#lblModuleCostBalance").text());
                                    }else if(xhr.status == 500 || xhr.status == 0){
                                        bootbox.alert(Message.MSG_SAVE_FAILED);
                                    }
                                },
                                async: false
                            });
                        }else{
                            bootbox.alert(Message.MSG_IT_IS_HAS_A_SAME_NAMES);
                        }
                    }else{
                        bootbox.alert(Message.MSG_CAN_NOT_PUT_MARK_INTO_IN_DETAILS);
                    }
                }else{
                    bootbox.alert(Message.MSG_YOU_SELECT_A_FILE_SIZE_OVER_LIMIT);
                }
            }
        }else{
            bootbox.alert(Message.MSG_PLEASE_ENTER_A_NEW_TASK_CODE);
        }
    }else if(chkAETask == 1){
        var checkTaskFollower = false;
        var countTaskFollower = 0;
        if(!getEmpCodeTaskFollower()){
            if(empCodeTaskFollower.length == empCodeFollowerTask.length){                                                                                      
                for(var i = 0; i < empCodeTaskFollower.length; i++){
                    for(var j = 0; j < empCodeTaskFollower.length; j++){
                        if(empCodeTaskFollower[i] == empCodeFollowerTask[j]){
                            countTaskFollower++;
                        }
                    }
                }

                if(empCodeTaskFollower.length == countTaskFollower){
                    checkTaskFollower = true;
                }
            }

            if($('#txtTaskName').val() == checkTaskName &&
                $('#txtTaskCost').val() == checkTaskCost &&
                dataTypeTaskCode[indexTypeTask] == checkTypeTask &&
                dataTaskImportanceCode[indexTaskImportance] == checkTaskImportance &&
                $('#txtEmpName').val() == checkEmpName &&
                $('#dateStartProject').val() == checkdateStart &&
                $('#dateEndProject').val() == checkdateEnd &&
                $('#txtProgress').val() == checkProgress &&
                $('#fileName').attr('title') == checkFileName &&
                $('#txtaDescription').val() == checkDescription &&
                empCodeTaskFollower.length == empCodeFollowerTask.length &&
                checkTaskFollower == true){
                bootbox.alert(Message.MSG_NO_INFORMATION_CHANGED);
            }else{
                if(parseInt($('#txtTaskCost').val()) > parseInt($("#lblModuleCostBalance").text())){
                    bootbox.alert(Message.MSG_TOTAL_COST_OVER_BALANCE_TOTAL_COST);
                }else{
                    if(fileSize <= 104857600){
                        if($('#txtaDescription').val().indexOf('~') == -1 && $('#txtaDescription').val().indexOf('`') == -1){
                            var formData = new FormData();
                            formData.append("myInput", myInput.files[0]);
                            var empName = $('#txtEmpName').val() == "" ? null : $("#txtEmpName").data("dataCode")
                            var description = $('#txtaDescription').val() == "" ? null : $('#txtaDescription').val().replace(/\//g, "~").replace(/\?/g, "`");
                            if(!getEmpCodeTaskFollower()){
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
                                                                          '/' + dataTypeTaskCode[indexTypeTask] +
                                                                          '/' + dataTaskImportanceCode[indexTaskImportance] +
                                                                          '/' + JSON.stringify(empCodeFollowerTask) +
                                                                          '/' + empName +
                                                                          '/' + dateStart +
                                                                          '/' + dateEnd +
                                                                          '/' + fileName +
                                                                          '/' + description +
                                                                          '/' + $('#txtProgress').val() +
                                                                          '/' + programID +
                                                                          '/' + TaskVersion,
                                    processData: false,
                                    contentType: false,
                                    data: formData,
                                    complete: function(xhr){
                                        if(xhr.status == 200){
                                            if(xhr.responseJSON == false){
                                                bootbox.alert(Message.MSG_NOT_UPDATED_DATA_PLEASE_REFRESH_AND_CONTINUE_YOUR_TRANSACTION);
                                            }else {
                                                bootbox.alert(Message.MSG_EDIT_SUCCESSFULLY);
                                            }
                                            
                                            $('#modalTask').modal('hide');
                                            $('#txtTaskCode').val(null);
                                            $('#txtTaskName').val(null);
                                            $('#txtTaskCost').val(null);
                                            $('#txtEmpName').val(null);
                                            $('#dateStartProject').val(null);
                                            $('#dateEndProject').val(null);
                                            $("#myInput").val("");
                                            $('#fileName').text("");
                                            $('#txtaDescription').val("");

                                            var count_Element = $('[id^=btnDeleteEmpNameTaskFollower]').length;
                                            for(var i = 0; i < count_Element; i++){
                                                var idBtnDeleteEmpNameTaskFollower = $('[id^=btnDeleteEmpNameTaskFollower]')[0].id;
                                                btnDeleteEmpNameTaskFollower(idBtnDeleteEmpNameTaskFollower);
                                            }
                                            
                                            $('#txtEmpNameTaskFollower1').val("");

                                            var pageNumber = $("#paggingSimpleTaskCurrentPage").val();
                                            pagginationTask.loadPage(pageNumber, pagginationTask);

                                            $("#lblModuleCostBalance").text(searchTaskCost($("#lblModuleCost").text()) + " " + Label.LABEL_POINT);
                                        }else if(xhr.status == 500 || xhr.status == 0){
                                            bootbox.alert(Message.MSG_EDIT_UNSUCCESSFUL);
                                        }
                                    },
                                    async: false
                                });
                            }else{
                                bootbox.alert(Message.MSG_IT_IS_HAS_A_SAME_NAMES);
                            }
                        }else{
                            bootbox.alert(Message.MSG_CAN_NOT_PUT_MARK_INTO_IN_DETAILS);
                        }
                    }else{
                        bootbox.alert(Message.MSG_YOU_SELECT_A_FILE_SIZE_OVER_LIMIT);
                    }
                }
            }
        }else{
            bootbox.alert(Message.MSG_IT_IS_HAS_A_SAME_NAMES);
        }
    }
}

$('[id^=btnModalTask]').click(function() {
    var id = this.id.split('k')[1];
    myFunctionTypeTask();
    myFunctionTaskImportance();
    if(id == 'Cancel'){
        if(chkAETask == 1){
            var checkTaskFollower = false;
            var countTaskFollower = 0;
            getEmpCodeTaskFollower();

            if(empCodeTaskFollower.length == 0){
                empCodeTaskFollower.push("null");
            }

            if(empCodeTaskFollower.length == empCodeFollowerTask.length){                                                                                      
                for(var i = 0; i < empCodeTaskFollower.length; i++){
                    for(var j = 0; j < empCodeTaskFollower.length; j++){
                        if(empCodeTaskFollower[i] == empCodeFollowerTask[j]){
                            countTaskFollower++;
                        }
                    }
                }

                if(empCodeTaskFollower.length == countTaskFollower){
                    checkTaskFollower = true;
                }
            }
            
            if($('#txtTaskName').val() == checkTaskName &&
                $('#txtTaskCost').val() == checkTaskCost &&
                dataTypeTaskCode[indexTypeTask] == checkTypeTask &&
                dataTaskImportanceCode[indexTaskImportance] == checkTaskImportance &&
                $('#txtEmpName').val() == checkEmpName &&
                $('#dateStartProject').val() == checkdateStart &&
                $('#dateEndProject').val() == checkdateEnd &&
                $('#txtProgress').val() == checkProgress &&
                $('#fileName').attr('title') == checkFileName &&
                $('#txtaDescription').val() == checkDescription &&
                empCodeTaskFollower.length == empCodeFollowerTask.length &&
                checkTaskFollower == true){
                $('#modalTask').modal('hide');
                $('#txtTaskCode').popover('hide'); $('#txtTaskCode').val(null);
                $('#txtTaskName').popover('hide'); $('#txtTaskName').val(null);
                $('#txtTaskCost').popover('hide'); $('#txtTaskCost').val(null);
                $('#ddlTypeTask').popover('hide');
                $('#ddlTaskImportance').popover('hide');
                $('#txtEmpName').val(null);
                $('#dateStartProject').val(null);
                $('#dateEndProject').val(null);
                $("#myInput").val("");
                $('#fileName').text("");
                $('#txtaDescription').val("");

                var count_Element = $('[id^=btnDeleteEmpNameTaskFollower]').length;
                for(var i = 0; i < count_Element; i++){
                    var idBtnDeleteEmpNameTaskFollower = $('[id^=btnDeleteEmpNameTaskFollower]')[0].id;
                    btnDeleteEmpNameTaskFollower(idBtnDeleteEmpNameTaskFollower);
                }
        
                $('#txtEmpNameTaskFollower1').val("");
            }else{
                bootbox.confirm(Message.MSG_WANT_TO_CANCEL_EDITING_THE_DATA_HAS_CHANGED_OR_NOT, function(result) {
                    if(result == true){
                        $('#modalTask').modal('hide');
                        $('#txtTaskCode').popover('hide'); $('#txtTaskCode').val(null);
                        $('#txtTaskName').popover('hide'); $('#txtTaskName').val(null);
                        $('#txtTaskCost').popover('hide'); $('#txtTaskCost').val(null);
                        $('#ddlTypeTask').popover('hide');
                        $('#ddlTaskImportance').popover('hide');
                        $('#txtEmpName').val(null);
                        $('#dateStartProject').val(null);
                        $('#dateEndProject').val(null);
                        $("#myInput").val("");
                        $('#fileName').text("");
                        $('#txtaDescription').val("");

                        var count_Element = $('[id^=btnDeleteEmpNameTaskFollower]').length;
                        for(var i = 0; i < count_Element; i++){
                            var idBtnDeleteEmpNameTaskFollower = $('[id^=btnDeleteEmpNameTaskFollower]')[0].id;
                            btnDeleteEmpNameTaskFollower(idBtnDeleteEmpNameTaskFollower);
                        }
                        
                        $('#txtEmpNameTaskFollower1').val("");
                    }
                });
            }
        }else{
            $('#modalTask').modal('hide');
            $('#txtTaskCode').popover('hide'); $('#txtTaskCode').val(null);
            $('#txtTaskName').popover('hide'); $('#txtTaskName').val(null);
            $('#txtTaskCost').popover('hide'); $('#txtTaskCost').val(null);
            $('#ddlTypeTask').popover('hide');
            $('#ddlTaskImportance').popover('hide');
            $('#txtEmpName').val(null);
            $('#dateStartProject').val(null);
            $('#dateEndProject').val(null);
            $("#myInput").val("");
            $('#fileName').text("");
            $('#txtaDescription').val("");

            var count_Element = $('[id^=btnDeleteEmpNameTaskFollower]').length;
            for(var i = 0; i < count_Element; i++){
                var idBtnDeleteEmpNameTaskFollower = $('[id^=btnDeleteEmpNameTaskFollower]')[0].id;
                btnDeleteEmpNameTaskFollower(idBtnDeleteEmpNameTaskFollower);
            }
            
            $('#txtEmpNameTaskFollower1').val("");
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
        }else if($('#ddlTaskImportance').val() == ""){
            $('#ddlTaskImportance').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
        }else{
            if($.isNumeric($('#txtTaskCost').val())){
                if(parseFloat($('#txtTaskCost').val()) >= 0){
                    if((($('#txtTaskCost').val().length - 1) - $('#txtTaskCost').val().indexOf('.')) > 4 && $('#txtTaskCost').val().indexOf('.') != -1){
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

    if(checkdDb.responseJSON == null){
        return 0;
    }

    return checkdDb.responseJSON;
}

var chkDTaskStatus0 = 0;
var chkDTaskStatus200 = 0;
var chkDTaskStatus500 = 0;

function deleteDataTask() {
    $.each($(".checkboxTableTask:checked"),function(index,value){
        $.ajax({
            type: "POST",
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
                if(xhr.status == 0)
                    chkDTaskStatus0++;
                if(xhr.status == 200)
                    chkDTaskStatus200++;
                if(xhr.status == 500)
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

                if(chkDTaskStatus0 > 0){
                    bootbox.alert(Message.MSG_DELETE_FAILED);
                }else if(chkDTaskStatus500 == 0){
                    bootbox.alert(Message.MSG_DELETE_SUCCESS + " " + chkDTaskStatus200 + " " + Message.MSG_LIST);
                }else{
                    bootbox.alert(Message.MSG_DELETE_SUCCESS + " " + chkDTaskStatus200 + " " + Message.MSG_LIST + " " + Message.MSG_DELETE_FAILED + " " + chkDTaskStatus500 + " " + Message.MSG_LIST);
                }

                chkDTaskStatus0 = 0;
                chkDTaskStatus200 = 0;
                chkDTaskStatus500 = 0;

                dataTaskCode = [];
                dataTypeTask = [];
                dataTypeTaskName = [];
                dataTaskImportanceName = [];
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